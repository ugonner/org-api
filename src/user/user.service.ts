import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';
import { ApiResponse, IGenericResponse } from '../shared/apiResponse';
import { QueryReturn, find } from '../shared/utils/db';
import { DBUtils } from '../shared/utils/db/db_commands';
import { AddOrRemoveFromGroupDTO, GetEntitiesFromModelArrayPropertyDTO } from '../shared/interfaces';
import { UserMessageConfigDTO } from './dtos/users-message.dto';
import {
  GenericEmailTemplate,
  NoticeDTO,
} from '../shared/templates/generic.email';
import { MailOptions } from 'nodemailer/lib/smtp-transport';
import { query } from 'express';
import { EmailService } from '../shared/utils/email';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async updateUser(
    dto: UpdateUserDTO,
    userId: string,
    config: { isAdmin: boolean } = { isAdmin: false },
  ): Promise<IGenericResponse<UserDocument>> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        config.isAdmin ? dto.userId : userId,
        dto,
        {
          new: true,
        },
      );

      return ApiResponse.success('user updated', HttpStatus.CREATED, user);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async getUser(userId: string): Promise<IGenericResponse<UserDocument>> {
    try {
      const user = await this.userModel.findById(userId)
      .populate("clusters");
      return ApiResponse.success('user got', HttpStatus.CREATED, user);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async addOrRemoveFromGroup(
    dto: AddOrRemoveFromGroupDTO<string>,
  ): Promise<IGenericResponse<UserDocument>> {
    try {
      return await DBUtils.joinOrLeaveProprty(this.userModel, dto);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async getUsers(
    query: QueryOptions,
    config: { fetchAll: boolean } = { fetchAll: false },
  ): Promise<IGenericResponse<QueryReturn<UserDocument>>> {
    try {
      let users;
      if (config.fetchAll) {
        users = await find(this.userModel, query, {}, { fetchAll: true });
      } else {
        query._populate = [`clusters`];
        users = await find(this.userModel, query);
      }
      return ApiResponse.success('users found', HttpStatus.OK, users);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async sendMessageToUsers(
    userQuery,
    messageConfig: UserMessageConfigDTO,
  ): Promise<IGenericResponse<boolean>> {
    try {
      const users = await find(this.userModel, query, {}, { fetchAll: true });
      if (messageConfig.messageType === 'Email') {
        const userEmails = users.docs.map((user) => user.email);

        const messageDetail: NoticeDTO = new NoticeDTO();
        messageDetail.contentText = messageConfig.message;
        const emailTemplate =
          GenericEmailTemplate.generateEmailTemplate(messageDetail);
        const emailOptions: MailOptions = {
          to: userEmails,
          subject: messageConfig.subject,
          html: emailTemplate.html,
        };
        await EmailService.sendEmail(emailOptions);
      }

      return ApiResponse.success('message sent', HttpStatus.OK, true);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  
  async getEntitiesFromModelArrayProperty(dto: GetEntitiesFromModelArrayPropertyDTO, fromFeature: "post" | "comment"): Promise<IGenericResponse<QueryReturn<UserDocument>>>{
    try{
      const baseModel = this.userModel;
      return DBUtils.getEntitiesFromModelArrayProperty(baseModel as Model<any>, this.userModel, dto);
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
}
