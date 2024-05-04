import {
  Body,
  Query,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
  Req,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { DeleteAttachmentDTO, SocialpostDTO, UpdateSocialpostDTO } from './dto/socialpost.dto';
import { User } from '../shared/decorators/user.decorator';
import { SocialpostService } from './socialpost.service';
import { CreateSocialpostCommentDTO, UpdatePostCommentDTO } from "./dto/socialpost-comment.dto";
import { ApiResponse } from '../shared/apiResponse';
import { Request, query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../shared/guards/roles.guard';
import { MaxFileSize } from '../shared/file/validators/file-size.validator';
import { SocialPostReportDTO } from './dto/report_social_post.dto';
import { Roles } from '../shared/decorators/roles.decorator';
import { AddOrRemoveFromGroupDTO, GetEntitiesFromModelArrayPropertyDTO, GetInstancePropertyMembersDTO, PeopleDTO } from '../shared/interfaces';

@ApiTags('socialpost')
@ApiBearerAuth()
@Controller('post')
export class SocialpostController {
  constructor(
    private socialpostService: SocialpostService,
  ) {}

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post()
  async createSocialpost(
    @Body() payload: SocialpostDTO,
    @User('id') userId: string,
  ) {
    
    const westernContent = false;
    return await this.socialpostService.createSocialpost(
      payload,
      userId,
      westernContent,
    );
  }


  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiInternalServerErrorResponse()
  @ApiCreatedResponse()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("user")
  @Post('/create')
  async createSocialPostWithFileUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSize({ maxSize: 100 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() payload: SocialpostDTO,
    @User("id") userId: string,
    @Req() req: Request,
  ) {

    return await this.socialpostService.createSocialPostWithFileUpload(
      payload,
      userId,
      file,
      req,
    );
  }


  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Put()
  async updateSocialpost(
    @Body() payload: UpdateSocialpostDTO,
    @User('id') userId: string,
  ) {
    return await this.socialpostService.updateSocialpost(payload.socialpostId, userId, payload);
  }
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Put("/comment")
  async updateSocialpostComment(
    @Body() payload: UpdatePostCommentDTO,
    @User('id') userId: string,
  ) {
    return await this.socialpostService.updateSocialpostComment(userId, payload);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Put("/admin")
  async updateSocialpostByAdmin(
    @Body() payload: UpdateSocialpostDTO,
    @User('id') userId: string,
  ) {
    return await this.socialpostService.updateSocialpost(payload.socialpostId, userId, payload, {isAdmin: true});
  }

  

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post('/add-or-remove/:fromFeature')
  async addOrRemovePostFromGroup(
    @Param("fromFeature") fromFeature: string,
    @Body() payload: AddOrRemoveFromGroupDTO<string>
  ) {
    return await this.socialpostService.addOrRemoveEntityFromGroups(
      payload,
      fromFeature as "comment" | "post"
    );
  }
  

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/posts')
  async findSocialPosts(
    @Query() query,
  ) {
    return await this.socialpostService.findSocialPosts(query);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/people/:fromFeature')
  async getPeopleFromEntityGroup(
    @Param("fromFeature") fromFeature: "post" | "comment",
    @Query() query: GetEntitiesFromModelArrayPropertyDTO,
  ) {
    return await this.socialpostService.getEntitiesFromModelArrayProperty(query, fromFeature)
  }


  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/comments')
  async findSocialPostComments(
    @Query() query,
  ) {
    return await this.socialpostService.findSocialPostComments(query);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/count')
  async countPosts(
    @Query() query,
  ) {
    return await this.socialpostService.countPostDocuments(query);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post('/report')
  async reportSocialPosts(
    @Body() payload: SocialPostReportDTO,
    @User("id") userId: string
  ) {
    return await this.socialpostService.reportPost(payload, userId);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post('/comment')
  async createSocialpostComment(
    @User('id') userId: string,
    @Body() payload: CreateSocialpostCommentDTO,
  ) {
    const comment = await this.socialpostService.commentOnSocialpost(
      payload,
      userId,
    );
    
    return comment;
  }

  
  @Get('/people')
  async viewPeopleOnPost(@Query() payload: GetInstancePropertyMembersDTO) {

    return await this.socialpostService.getMembersOfSocialpostProperty(
      payload,
      "likedBy"
    );
  }

  @Get('/comment/people')
  async viewPeopleOnPostComment(@Query() payload: GetInstancePropertyMembersDTO) {
    return await this.socialpostService.getMembersOfSocialpostCommentProperty(
      payload, "likedBy"
    );
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/comments')
  async getSocialpostComment(
    @Query() payload: GetInstancePropertyMembersDTO,
  ) {
    return await this.socialpostService.getMembersOfSocialpostProperty(
      payload, "comments"
    );
  }


  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/:socialpostId')
  @UseGuards(AuthGuard)
  async getSocialpost(
    @User('id') userId: string,
    @Param('socialpostId') socialpostId: string,
  ) {

    return await this.socialpostService.getSocialpost(
      socialpostId, userId
    );
  }

  @Delete('/attachments')
  @UseGuards(AuthGuard)
  async deleteAttachmet(
    @Body() payload: DeleteAttachmentDTO,
  ) {
    console.log("got toe controller")
    return await this.socialpostService.deleteAttachmentFiles(payload)
  }

  @Delete('/:socialpostId')
  @UseGuards(AuthGuard)
  async deleteSocialpost(
    @User('id') userId: string,
    @Param('socialpostId') socialpostId: string,
  ) {
    return await this.socialpostService.deleteSocialpost(socialpostId, userId);
  }
}
