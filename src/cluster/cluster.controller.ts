import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { ClusterDTO, UpdateClusterDTO } from './dtos/cluster.dto';
import { QueryOptions } from 'mongoose';
import { AuthGuard } from '../shared/guards/auth.guard';
import { User } from '../shared/decorators/user.decorator';

@Controller('cluster')
export class ClusterController {

    constructor(private clusterService: ClusterService){}

    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @UseGuards(AuthGuard)
    @Post()
    async createCluster(
        @Body() payload: ClusterDTO,
        @User("id") userId: string
    ){
        payload.lastManagedBy = userId
        return this.clusterService.createCluster(payload);
    }
    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Put()
    async updateCluster(
        @Body() payload: UpdateClusterDTO
    ){
        return this.clusterService.updateCluster(payload);
    }

    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/clusters")
    async getClusters(
        @Query() payload
    ){
        return this.clusterService.findClusters(payload)
    }
 
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/:clusterId")
    async getCluster(
        @Param("clusterId") clusterId: string
    ){
        return this.clusterService.getCluster(clusterId)
    }   
}
