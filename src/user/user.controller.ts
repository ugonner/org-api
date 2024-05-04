import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../shared/decorators/user.decorator';
import { AuthGuard } from '../shared/guards/auth.guard';
import { QueryOptions } from 'mongoose';
import { AddOrRemoveFromGroupDTO, GetEntitiesFromModelArrayPropertyDTO } from '../shared/interfaces';
import { UserMessageConfigDTO } from './dtos/users-message.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@Body() payload:  UpdateUserDTO, @User('id') userId: string) {
    return await this.userService.updateUser(payload, userId);
  }

  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Put('/admin')
  @UseGuards(AuthGuard)
  async updateUserByAdmin(
    @Body() payload: UpdateUserDTO,
    @User('id') userId: string,
  ) {
      
    return await this.userService.updateUser(payload, userId, {
      isAdmin: true,
    });
  }

  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Get('/users')
  async geteUsers(@Query() payload: QueryOptions) {
    return await this.userService.getUsers(payload);
  }

  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Get('/users/all')
  async geteUsersAll(@Query() payload: QueryOptions) {
    return await this.userService.getUsers(payload, { fetchAll: true });
  }

  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Get('/:userId')
  async geteUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post('/add-or-remove')
  async addOrRemoveFromGroup(@Body() payload: AddOrRemoveFromGroupDTO<string>) {
    return await this.userService.addOrRemoveFromGroup(payload);
  }
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post('/send-message')
  async sendMessageToUsers(
    @Query() query,
    @Body() payload: UserMessageConfigDTO,
  ) {
    return await this.userService.sendMessageToUsers(query, payload);
  }

  
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @Get('/people/:fromFeature')
  async getPeopleFromEntityGroup(
    @Param("fromFeature") fromFeature: "post" | "comment",
    @Query() query: GetEntitiesFromModelArrayPropertyDTO,
  ) {
    return await this.userService.getEntitiesFromModelArrayProperty(query, fromFeature)
  }
}
