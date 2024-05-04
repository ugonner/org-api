import { AnyKeys, FilterQuery, Model, Query, UpdateQuery } from 'mongoose';
import { ApiResponse, IGenericResponse } from '../../apiResponse';
import { Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import {
  AddOrRemoveFromGroupDTO,
  AddOrRemoveFromGroupManyToManyDTO,
  GetEntitiesFromModelArrayPropertyDTO,
  GetInstancePropertyMembersDTO,
  ICountDTO,
  IGetInstancePopulatedMembersResult,
  ISearchDTO,
} from '../../interfaces';

import { QueryOptions } from 'mongoose';
import { QueryReturn } from '.';

export class DBUtils {
  static async joinOrLeaveProprty<TModelDocumentType, TValueType>(
    model: Model<TModelDocumentType>,
    dto: AddOrRemoveFromGroupDTO<TValueType>,
  ): Promise<IGenericResponse<TModelDocumentType>> {
    try {
      // if increment field is not set; set to "noIncrement"
      dto.primaryIncrementField = dto.primaryIncrementField
        ? dto.primaryIncrementField
        : 'noIncrements';

      const {
        primaryId,
        propertyName,
        propertyValue: value,
        forwardAction,
        primaryIncrementField,
      } = dto;

      const commandQuery = (forwardAction
        ? {
            $addToSet: { [propertyName]: value },
            $inc: { [primaryIncrementField]: 1 },
          }
        : {
            $pull: { [propertyName]: value },
            $inc: { [primaryIncrementField]: -1 },
          }) as unknown as AnyKeys<TModelDocumentType>;

      //delete increment if not provided
      if (/noIncrement/i.test(primaryIncrementField)) {
        delete commandQuery['$inc'];
      }
      const updatedDoc = await model.findByIdAndUpdate(
        primaryId,
        commandQuery as UpdateQuery<TModelDocumentType>,
      );
      if (!updatedDoc)
        return ApiResponse.fail(`no such ${model.name}`, HttpStatus.NOT_FOUND);

      let message = `${model.name} updated`;
      if (
        forwardAction &&
        (updatedDoc[propertyName] as Array<any>).includes(value)
      ) {
        message = `Already In ${model.name}`;
      }
      if (
        !forwardAction &&
        !(updatedDoc[propertyName] as Array<any>).includes(value)
      ) {
        message = `Never In ${model.name} Earlier`;
      }

      return ApiResponse.success<TModelDocumentType>(
        message,
        HttpStatus.OK,
        updatedDoc,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
  static async joinOrLeaveUserProprtyManyToMany<
    TPrimaryModelDocumentType,
    TSecondaryModelDocumentType,
  >(
    primaryModel: Model<TPrimaryModelDocumentType>,
    secondaryModel: Model<TSecondaryModelDocumentType>,
    dto: AddOrRemoveFromGroupManyToManyDTO,
  ): Promise<IGenericResponse<TPrimaryModelDocumentType>> {
    try {
      dto.primaryIncrementField = dto.primaryIncrementField
        ? dto.primaryIncrementField
        : 'noIncrements';

      const {
        primaryId,
        secondaryId,
        primaryPropertyName,
        secondaryPropertyName,
        primaryPropertyValue,
        secondaryPropertyValue,
        forwardAction,
        primaryIncrementField,
        secondaryIncrementField,
      } = dto;
      let secondaryCommandQuery = {};
      let primaryCommandQuery = {};
      if (forwardAction) {
        primaryCommandQuery = {
          $addToSet: { [primaryPropertyName]: primaryPropertyValue },
          $inc: { [primaryIncrementField]: 1 },
        };
        secondaryCommandQuery = {
          $addToSet: { [secondaryPropertyName]: secondaryPropertyValue },
          $inc: { [secondaryIncrementField]: 1 },
        };
      } else {
        primaryCommandQuery = {
          $pull: { [primaryPropertyName]: primaryPropertyValue },
          $inc: { [primaryIncrementField]: -1 },
        };
        secondaryCommandQuery = {
          $pull: { [secondaryPropertyName]: secondaryPropertyValue },
          $inc: { [secondaryIncrementField]: -1 },
        };
      }

      if (/noIncrement/i.test(primaryIncrementField)) {
        delete primaryCommandQuery['$inc'];
        delete secondaryCommandQuery['$inc'];
      }

      const updatedPrimaryDoc = await primaryModel.findByIdAndUpdate(
        primaryId,
        primaryCommandQuery as unknown as UpdateQuery<TPrimaryModelDocumentType>,
      );
      const updatedSecondaryDoc = await secondaryModel.findByIdAndUpdate(
        secondaryId,
        secondaryCommandQuery as unknown as UpdateQuery<TSecondaryModelDocumentType>,
      );
      if (!updatedPrimaryDoc)
        return ApiResponse.fail(
          `no such ${primaryModel.name}`,
          HttpStatus.NOT_FOUND,
        );
      if (!updatedSecondaryDoc)
        return ApiResponse.fail(
          `no such ${secondaryModel.name}`,
          HttpStatus.NOT_FOUND,
        );

      let message = `${primaryModel.name} and ${secondaryModel.name} updated`;
      if (
        forwardAction &&
        (updatedPrimaryDoc[primaryPropertyName] as Array<any>).includes(
          primaryPropertyValue,
        )
      ) {
        message = `Already In ${primaryModel.name}`;
      }
      if (
        !forwardAction &&
        !(updatedPrimaryDoc[primaryPropertyName] as Array<any>).includes(
          primaryPropertyValue,
        )
      ) {
        message = `Never In ${primaryModel.name} Earlier`;
      }

      return ApiResponse.success<TPrimaryModelDocumentType>(
        message,
        HttpStatus.OK,
        updatedPrimaryDoc,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  static async getInstancePropertyPopulatedMembers<
    BaseModelDocumentType,
    ForeignModelDocumentType,
  >(
    baseModel: Model<BaseModelDocumentType>,
    foreignModel: Model<ForeignModelDocumentType>,
    dto: GetInstancePropertyMembersDTO,
  ): Promise<
    IGenericResponse<
      IGetInstancePopulatedMembersResult<
        BaseModelDocumentType,
        ForeignModelDocumentType
      >
    >
  > {
    try {
      const instance = await baseModel.findById(dto.primaryId);
      if (!instance)
        return ApiResponse.fail(
          `no such ${baseModel.name}`,
          HttpStatus.NOT_FOUND,
        );
      const memberIds: string[] = instance[dto.property];
      if (!Array.isArray(memberIds))
        return ApiResponse.fail(
          'invalid field supplied as property',
          HttpStatus.BAD_REQUEST,
        );
      const ids =
        memberIds.length > dto.limit
          ? memberIds.slice(dto.offset, dto.limit)
          : memberIds.slice(dto.offset);
      const members = await foreignModel.find({
        _id: { $in: ids },
      });
      return ApiResponse.success(`${foreignModel.name} got`, HttpStatus.OK, {
        totalCount: memberIds.length,
        docs: members,
      });
    } catch (error) {
      return ApiResponse.fail(
        error.mesage,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  static async searchItem<TBaseModelDocumentType>(
    dto: ISearchDTO<TBaseModelDocumentType>
  ): Promise<QueryReturn<TBaseModelDocumentType>> {
    try {
      const {baseModel, searchFields, populateFields, searchTerm, page} = dto;
      let orQueries: { [key: string]: Object }[] = [];
      searchFields.forEach((field) => {
        const q = { [field]: { $regex: `${searchTerm}`, $options: 'i' } };
        orQueries.push(q);
      });
      const queryFilter = {
        $or: orQueries,
      } as FilterQuery<TBaseModelDocumentType>
      let query = baseModel.find(queryFilter);
      
      if(populateFields.length > 0){
        populateFields.forEach((pField) => {
          query = query.populate(pField) as any
        })
      }
      
      const totalDocs = await baseModel.countDocuments(queryFilter)
      const res = await query;
      const queryResult: QueryReturn<TBaseModelDocumentType> = {
        totalDocs: totalDocs,
        page: page ?? 0,
        limit: 50,
        docs: res,
      };
      return queryResult
      
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async getCount<TBaseModelDocumentType>(
    dto: ICountDTO<TBaseModelDocumentType>
  ): Promise<{totalDocs: number}> {
    try {
      const totalDocs = await dto.baseModel.countDocuments(dto.query)
      const queryResult: {totalDocs: number} = {
        totalDocs: totalDocs,
      };
      return queryResult
      
    } catch (error) {
      throw new Error(error.message)
    }
  }


  
  static async getEntitiesFromModelArrayProperty<TBaseModelDocumentType, TEntityModelDocumentType>(
    baseModel: Model<TBaseModelDocumentType>,
    entityModel: Model<TEntityModelDocumentType>,
    dto: GetEntitiesFromModelArrayPropertyDTO
  ): Promise<IGenericResponse<QueryReturn<TEntityModelDocumentType>>>{
    try{
      const offset = dto._page ? (dto._page - 1) : 0;
      const limit = dto._limit ?? 10;

      const baseModelDoc = await baseModel.findById(dto.basePrimaryId);
      if(!baseModelDoc) return ApiResponse.fail("no such entity found", HttpStatus.NOT_FOUND);
      const entitiesInArrayProperty = baseModelDoc[dto.arrayPropertyName] as string[];
      const slicedEntitiesArr = entitiesInArrayProperty.length - ((dto._page ?? 1) * limit) < limit ? entitiesInArrayProperty.slice(offset) : entitiesInArrayProperty.slice(offset, limit);

      const entitiesDocs = await entityModel.find({
        _id: {$in: slicedEntitiesArr.map((e) => new Types.ObjectId(e)) }
      })
      const queryReturn: QueryReturn<TEntityModelDocumentType> = {
        totalDocs: entitiesInArrayProperty.length,
        docs: entitiesDocs,
        page: dto._page,
        limit
      }
      return ApiResponse.success("entities got successfully", HttpStatus.OK, queryReturn);
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
}
