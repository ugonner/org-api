import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FocalareaService } from './focalarea.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { FocalareaDTO, UpdateFocalareaDTO } from './dtos/focalarea.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { User } from '../shared/decorators/user.decorator';

@Controller('focalarea')
export class FocalareaController {

    constructor(private focalareaService: FocalareaService){}

    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @UseGuards(AuthGuard)
    @Post()
    async createFocalarea(
        @Body() payload: FocalareaDTO,
        @User("id") userId: string
    ){
        payload.lastManagedBy = userId
        return this.focalareaService.createFocalarea(payload);
    }
    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Put()
    async updateFocalarea(
        @Body() payload: UpdateFocalareaDTO
    ){
        return this.focalareaService.updateFocalarea(payload);
    }

    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/focalareas")
    async getFocalareas(
        @Query() payload
    ){
        return this.focalareaService.findFocalareas(payload)
    }
 
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/:focalareaId")
    async getFocalarea(
        @Param("focalareaId") focalareaId: string
    ){
        return this.focalareaService.getFocalarea(focalareaId)
    }   
}
