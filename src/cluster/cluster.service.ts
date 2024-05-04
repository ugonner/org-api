import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, QueryOptions, Schema } from 'mongoose';
import { Cluster, ClusterDocument } from './schemas/cluster.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClusterDTO, UpdateClusterDTO } from './dtos/cluster.dto';
import { ApiResponse, IGenericResponse } from "../shared/apiResponse";
import { QueryReturn, find } from '../shared/utils/db';
import { User } from '../user/schemas/user.schema';
import { DBUtils } from '../shared/utils/db/db_commands';
import { ISearchDTO } from '../shared/interfaces';



@Injectable()
export class ClusterService {
    constructor(
        @InjectModel(Cluster.name)
        private clusterModel: Model<ClusterDocument>
    ){}

    async createCluster(dto: ClusterDTO): Promise<IGenericResponse<ClusterDocument>> {
        try{
            const cluster = await this.clusterModel.create(dto);
            return ApiResponse.success("cluster created", HttpStatus.CREATED, cluster)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async updateCluster(dto: UpdateClusterDTO): Promise<IGenericResponse<ClusterDocument>> {
        try{
            const cluster = await this.clusterModel.findByIdAndUpdate(dto.clusterId, dto, {new: true});
            if(!cluster) return ApiResponse.fail("no such cluster found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("cluster updated", HttpStatus.OK, cluster)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async getCluster(clusterId: string): Promise<IGenericResponse<ClusterDocument>> {
        try{
            const cluster = await this.clusterModel.findById(clusterId)
            .populate(`lastManagedBy`, {firstName: 1, avatar: 1}, User.name)
            .populate(`users`, {firstName: 1, avatar: 1}, User.name);

            if(!cluster) return ApiResponse.fail("no such cluster found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("cluster updated", HttpStatus.OK, cluster)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
       
    }

    searchFields = [
        "clusterName",
        "contactAddress"
    ]

    async findClusters(query: QueryOptions): Promise<IGenericResponse<QueryReturn<ClusterDocument>>> {
        try{

            query._populate = [`lastManagedBy`, "users"];
            

            const searchDto: ISearchDTO<ClusterDocument> = {
                baseModel: this.clusterModel, 
                searchTerm: query._searchBy,
                searchFields: this.searchFields,
                populateFields: ["lastManagedBy"],
                page: query._page ?? 0
            }
            
            const clusters = query._searchBy ? await DBUtils.searchItem(searchDto) : await find(this.clusterModel, query);
            return ApiResponse.success("cluster updated", HttpStatus.OK, clusters as any)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }

}
