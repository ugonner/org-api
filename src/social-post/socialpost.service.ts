import { forwardRef, Inject, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Socialpost, SocialpostDocument } from './schema/socialpost.schema';
import { Model, Query, Types } from 'mongoose';
import { DeleteAttachmentDTO, SocialpostDTO } from './dto/socialpost.dto';
import { ApiResponse, IGenericResponse } from '../shared/apiResponse';
import { UserService } from '../user/user.service';
import { CreateSocialpostCommentDTO, UpdatePostCommentDTO } from './dto/socialpost-comment.dto';
import { SocialpostComment, SocialpostCommentDocument } from "./socialpost-comment.schema"
import { FileService } from '../shared/file/file.service';
import { MediaFile } from '../shared/file/media-file.schema';
import { Request } from 'express';
import { QueryReturn, find } from '../shared/utils/db';
import { SocialPostReport, SocialPostReportDocument } from './schema/reported_post.schema';
import { SocialPostReportDTO } from './dto/report_social_post.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { basicUserInfoSelectQuery } from '../user/dtos/user.interface';
import { DBUtils } from '../shared/utils/db/db_commands';
import { AddOrRemoveFromGroupDTO, GetEntitiesFromModelArrayPropertyDTO, GetInstancePropertyMembersDTO, ICountDTO, IGetInstancePopulatedMembersResult, ISearchDTO } from '../shared/interfaces';

@Injectable()
export class SocialpostService {
  constructor(
    @InjectModel(Socialpost.name)
    private socialpostModel: Model<SocialpostDocument>,
    @InjectModel(SocialPostReport.name)
    private socialposReporttModel: Model<SocialPostReportDocument>,
    @InjectModel(SocialpostComment.name)
    private commentModel: Model<SocialpostCommentDocument>,
    private fileService: FileService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>

  ) {}

async generateSocialPostShortCode(socialPostId: string): Promise<IGenericResponse<string>> {
  try{
    let shortCode = Math.random().toString(16).slice(2, 8);
    const socialPost = await this.socialpostModel.findOne({
      shortCode
    })
    if(!socialPost) return ApiResponse.success("code generated", HttpStatus.OK, shortCode);
    return await this.generateSocialPostShortCode(socialPostId);
  }catch(error){
    return error.message
  }
}

  async createSocialpost(
    dto: SocialpostDTO,
    user: string,
    westernContent: boolean,
  ): Promise<IGenericResponse<boolean | unknown>> {
    try {
      const createdSocialpost = await this.socialpostModel.create({
        ...dto,
        user: new Types.ObjectId(user),
        westernContent,
      });  
      return ApiResponse.success(
        'socialpost posted',
        HttpStatus.CREATED,
        createdSocialpost,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async updateSocialpost(
    socialpostId: string,
    userId: string,
    dto: SocialpostDTO,
    config: {isAdmin: boolean} = {isAdmin: false}
  ): Promise<IGenericResponse<boolean | unknown>> {
    try {
      const query = config.isAdmin ? {
        _id: new Types.ObjectId(socialpostId),
      } : {
        _id: new Types.ObjectId(socialpostId),
        user: userId
      }
      let post = await this.socialpostModel.findOne(query)

      if(!post) return ApiResponse.fail("you do not own such post and you are not an admin", HttpStatus.BAD_REQUEST)
      
      if(dto.attachment && dto.attachment.length > 0){
        const postAttachment = post.attachment;
        if(post.attachment?.length){

          // dto.attachment.forEach((pA) => {
          //   post.attachment.push(pA);
          // })
          const postAttachment = post.attachment;
          post.attachment = [...postAttachment, ...dto.attachment]
        }else {
          post.attachment = dto.attachment
        }
        await post.save();
        //post.attachment = [...postAttachment, ...dto.attachment]
        
        delete dto.attachment;
      }
      await this.socialpostModel.updateOne(
        query, dto
      );
      return ApiResponse.success(
        'socialpost updaged',
        HttpStatus.OK,
        post,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async updateSocialpostComment(
    userId: string,
    dto: UpdatePostCommentDTO,
    config: {isAdmin: boolean} = {isAdmin: false}
  ): Promise<IGenericResponse<boolean | unknown>> {
    try {
      const query = config.isAdmin ? {
        _id: new Types.ObjectId(dto.commentId),
      } : {
        _id: new Types.ObjectId(dto.commentId),
        user: userId
      }
      let comment = await this.commentModel.findOne(query)

      if(!comment) return ApiResponse.fail("you do not own such post and you are not an admin", HttpStatus.BAD_REQUEST)
      
      if(dto.attachment && dto.attachment.length > 0){
        const postAttachment = comment.attachment;
        if(comment.attachment?.length){

          // dto.attachment.forEach((pA) => {
          //   post.attachment.push(pA);
          // })
          const commentAttachment = comment.attachment;
          comment.attachment = [...commentAttachment, ...dto.attachment]
        }else {
          comment.attachment = dto.attachment
        }
        await comment.save();
        //post.attachment = [...postAttachment, ...dto.attachment]
        
        delete dto.attachment;
      }
      await this.commentModel.updateOne(
        query, dto
      );
      return ApiResponse.success(
        'comment updaged',
        HttpStatus.OK,
        comment,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteSocialpost(
    socialpostId: string,
    userId: string,
  ): Promise<IGenericResponse<boolean | unknown>> {
    try {
      const deletedSocialpost = await this.socialpostModel.findOneAndDelete({
        _id: new Types.ObjectId(socialpostId),
        user: userId,
      });


      if (!deletedSocialpost)
        return ApiResponse.fail(
          'you do not own such suggetion',
          HttpStatus.NOT_FOUND,
        );
      return ApiResponse.success(
        'socialpost deleted',
        HttpStatus.OK,
        deletedSocialpost,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async reportPost(
    dto: SocialPostReportDTO,
    user: string,
  ): Promise<IGenericResponse<SocialPostReportDocument>> {
    try {
      const createdReport = await this.socialposReporttModel.create({
        ...dto,
        user,
      });
      return ApiResponse.success(
        'report submitted',
        HttpStatus.CREATED,
        createdReport,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }


  async deleteAttachmentFiles(
    dto: DeleteAttachmentDTO
  ): Promise<IGenericResponse<unknown>> {
    try {
      const {primaryId, fromFeature: baseModelName, attachmentUrls} = dto;
      
      const baseModel = (/comment/i.test(baseModelName) ? this.commentModel : this.socialpostModel) as Model<SocialpostDocument>;
      console.log("got here to delete")
      const docObj = await baseModel.findById(primaryId);
      console.log("found doc", attachmentUrls)
      if(!docObj) return ApiResponse.fail("no such attachment on the post", HttpStatus.NOT_FOUND);
      
      this.fileService.deleteFilesByUrl(attachmentUrls)
      .then(() => console.log("file deleted"))
      
      docObj.attachment = docObj.attachment?.filter((a) => (!attachmentUrls.includes(a.mediaUrl)) || (!attachmentUrls.includes(a.mediaSecureUrl)) )
      await docObj.save();
      
      return ApiResponse.success("attachment deleted successully", HttpStatus.OK, true);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteSocialposts(
    socialpostIds: string[],
  ): Promise<IGenericResponse<boolean>> {
    try {
      const socialposts = await this.socialpostModel
        .find({
          _id: { $in: socialpostIds },
        })
        .select({ _id: 1 });

      //todo: Delete post files\
      await Promise.allSettled(
        socialposts.map((post) => {
          this.fileService.deleteFilesByUrl(
            [post.media.mediaSecureUrl, ...post.attachment?.map((a) => a.mediaUrl)],
          );
        }),
      );

      const deletedPosts = await this.socialpostModel.deleteMany({
        _id: { $in: socialpostIds },
      });
      if (!deletedPosts)
        return ApiResponse.fail('something went wrong', HttpStatus.BAD_GATEWAY);
      return ApiResponse.success(
        'posts and files deleted',
        HttpStatus.OK,
        true,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }




  async addOrRemoveEntityFromGroups(
    dto: AddOrRemoveFromGroupDTO<string>,
    fromFeature: "comment" | "post"
  ): Promise<IGenericResponse<boolean>> {
    try {
      const baseModel = /comment/i.test(fromFeature) ? this.commentModel : this.socialpostModel;
      const res = await DBUtils.joinOrLeaveProprty(baseModel as Model<any>, dto)
      if(!res.status) return ApiResponse.fail(res.message, res.statusCode);
      return ApiResponse.success(res.message, res.statusCode, true);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  searchFields = [
    "title", "content"
  ]

  async findSocialPosts(query){
    try{
      query._populate = ["user", "categorys"];
      

      const searchDto: ISearchDTO<SocialpostDocument> = {
        baseModel: this.socialpostModel, 
        searchTerm: query._searchTerm,
        searchFields: this.searchFields,
        populateFields: ["categorys", "user"],
        page: query._page ?? 0
    }
    
    const socialPostDocs = query._searchTerm ? await DBUtils.searchItem(searchDto) : await find(this.socialpostModel, query);
    //const socialPostDocs = await find(this.socialpostModel, query)
    return ApiResponse.success("social posts got", HttpStatus.OK, socialPostDocs); 
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  async findSocialPostComments(query){
    try{
      query._populate = ["user"];
    
    const commentDocs = await find(this.commentModel, query);
    return ApiResponse.success("comments got", HttpStatus.OK, commentDocs); 
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  private itemsPerPage = 50;


  async getSocialpost(
  socialpostId: string,
  user: string
    ): Promise<IGenericResponse<SocialpostDocument>>{
    try {
      const post = await this.socialpostModel.findByIdAndUpdate(
        socialpostId,
        {
          $addToSet: {viewers: new Types.ObjectId(user)},
          $inc: {noOfViews: 1} 
        },
        {new: true}
      )
      .populate("user");
      
      if(!post) return ApiResponse.fail("no such post ", HttpStatus.NOT_FOUND);
      return ApiResponse.success("post got", HttpStatus.OK, post)
    } catch (error) {
      return ApiResponse.fail(
        error.mesage,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  

  async commentOnSocialpost(
    dto: CreateSocialpostCommentDTO,
    userId: string,
  ): Promise<
    IGenericResponse<{
      comment: SocialpostCommentDocument;
      socialpost: SocialpostDocument;
    }>
  > {
    try {
      const socialpost = await this.socialpostModel.findById(dto.socialpost);
      if (!socialpost)
        return ApiResponse.fail('no such taglinge', HttpStatus.NOT_FOUND);

      const createdSocialpostComment = await this.commentModel.create({
        ...dto,
        user: userId,
      });

      socialpost.comments.push(createdSocialpostComment._id);
      socialpost.noOfComments += 1;
      await socialpost.save();

      return ApiResponse.success('commented', HttpStatus.OK, {
        comment: createdSocialpostComment,
        socialpost,
      });
    } catch (error) {
      return ApiResponse.fail(
        error.mesage,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async getMembersOfSocialpostProperty<TForeignModelDocumentType>(
    dto: GetInstancePropertyMembersDTO,
    modelName: "likedBy" | "comments" 
  ): Promise<IGenericResponse<IGetInstancePopulatedMembersResult<SocialpostDocument, TForeignModelDocumentType>>> {
    try {
      const foreignModel: Model<TForeignModelDocumentType> = ((modelName === "comments") ? this.commentModel : this.userModel) as unknown as Model<TForeignModelDocumentType> ;
      return DBUtils.getInstancePropertyPopulatedMembers(
        this.socialpostModel,
        foreignModel,
        dto
      )
    } catch (error) {
      return ApiResponse.fail(
        error.mesage,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
  async getMembersOfSocialpostCommentProperty<TForeignModelDocumentType>(
    dto: GetInstancePropertyMembersDTO,
    modelName: "likedBy" | "comments" 
  ): Promise<IGenericResponse<IGetInstancePopulatedMembersResult<SocialpostDocument, TForeignModelDocumentType>>> {
    try {
      const foreignModel: Model<TForeignModelDocumentType> = ((modelName === "comments") ? this.commentModel : this.userModel) as unknown as Model<TForeignModelDocumentType> ;
      return DBUtils.getInstancePropertyPopulatedMembers(
        this.socialpostModel,
        foreignModel,
        dto
      )
    } catch (error) {
      return ApiResponse.fail(
        error.mesage,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }


  
  async createSocialPostWithFileUpload(
    dto: SocialpostDTO,
    userId: string,
    file: Express.Multer.File,
    request: Request,
  ): Promise<IGenericResponse<SocialpostDocument>>{
    try {
      
      let socialpostFile: MediaFile = null;

      const createSocialpostData: any = {
        ...dto,
        userId,
      };
      if (file) {
        const fileObjectResult = await this.fileService.uploadFile(
          file,
          userId,
          'socialposts',
          "local"
        );

        if (!fileObjectResult.status) return fileObjectResult as any;
        const fileObjectData = fileObjectResult.data as any;
        socialpostFile = {
          mediaId: fileObjectData.id,
          mediaUrl: fileObjectData.url,
          mediaSecureUrl: fileObjectData.secureUrl,
          mediaType: fileObjectData.fileType,
        };

        createSocialpostData.media = socialpostFile;
      }

      const createdSocialpost = await this.socialpostModel.create(
        createSocialpostData,
      );

      this.generateSocialPostShortCode(createdSocialpost._id.toString())
      .then((res) => {
        if(res.status){
          this.socialpostModel.findByIdAndUpdate(createdSocialpost._id.toString(), {shortCode: res.data})
          .then(() => console.log("shortcode updated"))
          .catch((err) => console.log("error updating shortcode", err.message))
        }
      })
      .catch((err) => console.log("error generating shortcode", err.message))
      
        return ApiResponse.success(
          'social post created',
          HttpStatus.CREATED,
          createdSocialpost,
        );
      
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }

  }


  async countPostDocuments(query: Query<SocialpostDocument, SocialpostDocument>): Promise<IGenericResponse<{totalDocs: number}>>{
    try{
      const dto: ICountDTO<SocialpostDocument> = {
        baseModel: this.socialpostModel,
        query
      }
      const result = await DBUtils.getCount(dto)
      return ApiResponse.success("docs counted", HttpStatus.OK, result);
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }

  async getEntitiesFromModelArrayProperty(dto: GetEntitiesFromModelArrayPropertyDTO, fromFeature: "post" | "comment"): Promise<IGenericResponse<QueryReturn<UserDocument>>>{
    try{
      const baseModel = /comment/i.test(fromFeature) ? this.commentModel : this.socialpostModel;
      
      return DBUtils.getEntitiesFromModelArrayProperty(baseModel as Model<any>, this.userModel, dto);
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
}
