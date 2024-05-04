import * as crypto from 'crypto';

/* eslint-disable no-underscore-dangle */
import * as _ from 'lodash';
import { ApiResponse, IGenericResponse } from '../../apiResponse';
import { HttpStatus } from '@nestjs/common';
import mongoose, { Model, Query, QueryOptions } from 'mongoose';
import { Document } from 'mongoose';
import { Length } from 'class-validator';

const skippedArrayFields = ['$or'];
const processOperators = (queryA: any) => {
  const query = queryA;
  const operators = ['lt', 'lte', 'gt', 'gte', 'in', 'nin', 'ne', 'eq'];
  operators.forEach((operator) => {
    if (query[operator]) {
      query[`$${operator}`] = query[operator];
    }
  });
  Object.keys(query).forEach((value) => {
    if (query[value]) {
      if (query[value] === 'true') {
        query[value] = true;
      } else if (query[value] === 'false') {
        query[value] = false;
      }
      if (typeof query[value] === 'string') {
        if (query[value].split('<=').length > 1) {
          query[value] = { $lte: query[value].split('<=')[1] };
        } else if (query[value].split('>=').length > 1) {
          query[value] = { $gte: query[value].split('>=')[1] };
        } else if (query[value].split('!=').length > 1) {
          query[value] = { $ne: query[value].split('!=')[1] };
        } else if (query[value].split('<').length > 1) {
          query[value] = { $lt: query[value].split('<')[1] };
        } else if (query[value].split('>').length > 1) {
          query[value] = { $gt: query[value].split('>')[1] };
        } else if (query[value].split('#').length > 1) {
          query[value] = new RegExp(query[value].split('#')[1], 'i');
        } else if (query[value].split('%').length > 1) {
          query[value] = { $size: query[value].split('%')[1] };
        } else if (query[value].split('==').length > 1) {
          query[value] = { $in: query[value].split('==')[1].split(',') };
        }
      }
    }
  });
  return query;
};

const processPopulate = (query: string): string => {
  const paths = query.split('.');
  let currentPopulate;
  while (paths.length) {
    const path = paths.pop();
    const populate = { path };
    if (currentPopulate) {
      currentPopulate = { path, populate: currentPopulate };
    } else {
      currentPopulate = populate;
    }
  }

  return currentPopulate;
};

export type QueryReturn<DT> = {
  docs: DT[];
  page: number;
  limit: number;
  totalDocs: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  previousPage?: number | null;
  nextPage?: number | null;
  totalPages?: number;
};

// merge
// _populate: [ 'createdBy', 'createdBy.colleges', 'createdBy.profile' ]
// _populate job
export const mergeQueries = (
  queryA: any,
  queryB: { [key: string]: string | Array<string> },
) => {
  const query = queryA;
  Object.keys(queryB).forEach((field) => {
    if (query[field]) {
      if (Array.isArray(query[field])) {
        query[field] = [
          ...query[field],
          ...(Array.isArray(queryB[field]) ? queryB[field] : [queryB[field]]),
        ];
      } else {
        query[field] = [
          query[field],
          ...(Array.isArray(queryB[field]) ? queryB[field] : [queryB[field]]),
        ];
      }
      //else turn q
      // query[field] = { ...query[field], ...queryB[field] };
    } else {
      query[field] = queryB[field];
    }
  });
  return query;
};
const get = async <DT>(
  model: Model<DT>,
  queryA: { [key: string]: string },
  conditionsA: any = {},
  multiple = true,
  config: { fetchAll: boolean } = { fetchAll: false },
) => {
  try {
    let query = queryA;
    let conditions = conditionsA;
    const populate = query._populate || conditions._populate;
    const select = query._select || conditions._select;
    const limit = parseInt(query._limit || conditions._limit || '10', 10);
    const page = parseInt(query._page || conditions._page || '1', 10);
    const orderBy = query._orderBy || conditions._orderBy || 'createdAt';
    const order = query._order || conditions._order || 'desc';
    const searchBy = query._searchBy || conditions._searchBy;
    const keyword = query._keyword || conditions._keyword;
    const skip = (page - 1) * limit;

    // omit any field in query that's not in the model

    query = _.omit(query, [
      '_select',
      '_order',
      '_orderBy',
      '_populate',
      '_limit',
      '_offset',
      '_page',
    ]);
    conditions = _.omit(conditions, [
      '_select', // To select a particular field
      '_order', // Ascending or Descending. asc / desc
      '_orderBy', // the field to order
      '_populate',
      '_limit',
      '_offset', // The number of records to skip
      '_page',
    ]);

    // deep copy required conditions
    const requiredConditions = _.cloneDeep(conditions);

    //console.log(query, 'conditions', conditions);
    if (!_.isEmpty(query)) {
      processOperators(query);
      Object.keys(query).forEach((field: string) => {
        conditions[field] = query[field];
      });
    }

    conditions = _.omit(conditions, ['_searchBy', '_keyword']);

    // get all key item that have value as array
    const arrayFields = _.pickBy(conditions, (value) => Array.isArray(value));
    //console.log('arrayFields', arrayFields);

    const andQueries: any[] = [];
    // process operator for each arrayFields
    Object.keys(arrayFields).forEach((field) => {
      //field e.g updatedAt
      // //console.log('field', field)
      // skip if field is in skippedArrayFields
      if (skippedArrayFields.includes(field)) {
        return;
      }
      const arrayField = arrayFields[field];
      // const arrayFieldQuery = {};
      arrayField.forEach((value: any) => {
        const processedOp = processOperators({
          [field]: value,
        });
        //console.log('processedOp', processedOp);
        andQueries.push(processedOp);
      });
      // andQueries.push({ [field]: arrayFieldQuery });
    });

    // delete all array fields from conditions
    Object.keys(arrayFields).forEach((field) => {
      delete conditions[field];
    });

    conditions = {
      ...conditions,
      $and: [...andQueries, requiredConditions],
    };
    if (searchBy || keyword) {
      if (Array.isArray(searchBy)) {
        const searchQuery: { [x: number]: any }[] = [];
        searchBy.forEach((field) => {
          // searchQuery[field] = _keyword;
          searchQuery.push({ [field]: new RegExp(keyword, 'i') });
        });
        conditions = {
          ...conditions,
          $or: searchQuery,
        };
      }

      // else if (_searchBy) {
      //   searchQuery[_searchBy] = new RegExp(_keyword, 'i');
      //   Object.keys(searchQuery).forEach((field) => {
      //     conditions[field] = searchQuery[field];
      //     // use or instead of and
      //   });
      // }
      // remove the _searchBy and _keyword from the conditions
      conditions = _.omit(conditions, ['_searchBy', '_keyword']);
      // add the searchQuery to the conditions
    }

    //console.log('conditions before filtering', conditions);

    const fields = Object.keys(model.schema.paths);
    // const filteredQuery = _.pick(conditions, fields);
    // filter query without removing those that start with $
    // check if the model is set to strict or not
    const schema: any = model?.schema || {};
    const { strict } = (schema?.options || {}) as { strict: boolean };
    //console.log('strict', strict);
    let _filterOnPopulate = false;
    if (conditions._filterOnPopulate) {
      const models: any = {};

      mongoose.modelNames().forEach((modelName) => {
        models[modelName?.toLowerCase()] = mongoose.model(modelName);
        //TODO: Do a work around for refPath
      });

      const mainModel = model;
      // console.info(models, 'models', model.schema.paths.contacts?.caster?.options?.ref);
      for (const field of Object.keys(conditions || {})) {
        const fieldParts = field.split('.');
        const docName =
          (mainModel.schema?.paths[fieldParts[0]] as any)?.caster?.options
            ?.ref ||
          (mainModel.schema?.paths[fieldParts[0]] as any)?.options?.ref ||
          '';
        // console.info(docName, 'docName', models);
        // const model = models[fieldParts[0]?.toLowerCase()];
        const model: Model<any> = models[docName?.toLowerCase()];
        // console.info(model, 'model');
        if (model) {
          // const modelFields = Object.keys(model.schema.paths);
          // search by the other parts of fieldParts
          console.info(fieldParts, 'fieldParts');
          const modelFields = fieldParts.slice(1);
          console.info(modelFields, 'modelFields');
          const filteredQuery: any = {};
          modelFields.forEach((modelField) => {
            const theField = fieldParts[0].concat('.', modelField);
            filteredQuery[modelField] = conditions[theField];
          });
          // if filtered query is not empty
          if (!_.isEmpty(filteredQuery)) {
            const ids = await model.find(filteredQuery, '_id');
            console.info(filteredQuery, 'filteredQuery', ids, 'ids');
            if (!conditions[fieldParts[0]]) {
              conditions[fieldParts[0]] = { $in: ids };
            }
          }
          delete conditions[field];
          console.info(conditions, 'conditions', conditions[fieldParts[0]]);
        }
      }
      _filterOnPopulate = true;
      delete conditions._filterOnPopulate;
    } else if (strict) {
      const filteredQuery = _.pickBy(conditions, (value, key) => {
        if (key.startsWith('$')) {
          return true;
        }
        return fields.includes(key);
      });
      conditions = filteredQuery;
      //console.log('conditions after filtering', conditions);
    }

    //console.log('final condition before query', conditions);

    // let q = model[multiple ? 'find' : 'findOne'](conditions);
    // let q: mongoose.Query<DT, DT>;
    let q: any;

    if (multiple) {
      q = model.find(conditions);
    } else {
      q = model.findOne(conditions);
    }

    //console.log('final Populate: ', populate);
    if (populate) {
      if (Array.isArray(populate) && populate.length) {
        populate.forEach((field) => {
          q = q.populate(processPopulate(field));
          //q = q.populate(field);
        });
      } else {
        q = q.populate(processPopulate(populate));
        //q = q.populate(populate);
      }
    }
    if (select) {
      if (Array.isArray(select) && select.length) {
        q = q.select(select.join(' '));
      } else {
        q = q.select(select);
      }
    }
    if (multiple) {
      const total = await model.countDocuments(conditions);
      const orderSign = /desc/i.test(order) || `${order}` === '-1' ? '-' : '';
      q = q
        //.skip(skip)
        //.limit(limit)
        //.sort({ [orderBy]: order });
        .sort(`${orderSign}${orderBy}`);
      const docs = config.fetchAll ? await q : await q.skip(skip).limit(limit);
      //console.log('final condition', conditions);
      ////console.log("THE DOCS ARE", docs)
      return {
        docs,
        page,
        hasNextPage: total > page * limit,
        hasPreviousPage: page > 1,
        nextPage: page + 1 > total ? null : page + 1,
        previousPage: page - 1 < 1 ? null : page - 1,
        limit,
        totalDocs: total,
        totalPages: Math.ceil(total / limit) > 0 ? Math.ceil(total / limit) : 1,
      };
    }
    return q;
  } catch (e) {
    //console.log(e);
    throw new Error('An error occured with your query');
  }
};
export const find = async <DT>(
  model: Model<DT>,
  query: any,
  conditions?: object | undefined,
  config: {fetchAll: boolean} = {fetchAll: false}
): Promise<QueryReturn<DT>> => get(model, query, conditions, true, config);

export const findOne = async <DT>(
  model: Model<DT>,
  query: any,
  conditions?: object | undefined,
): Promise<Document<DT> & DT> => get(model, query, conditions, false);

const customAlphabet = (alphabet: string, size: number) => () => {
  let id = '';
  const bytes = crypto.randomBytes(size);
  for (let i = 0; i < size; i += 1) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
};

export const createRandomLetters = (length: any) =>
  customAlphabet(process.env.APP_NAME || '', length)();

export async function generateUniqueCode<TModelDocumentType>(
  length: number,
  model: Model<TModelDocumentType> = null,
  uniqueFieldName?: string,
): Promise<IGenericResponse<string>> {
  try {
    const code = Math.random()
      .toString(16)
      .slice(2, length + 2);
    if (!model)
      return ApiResponse.success('code got', HttpStatus.CREATED, code);

    const codeExists = await model.findOne({
      [uniqueFieldName]: code,
    } as QueryOptions<TModelDocumentType>);
    if (!codeExists)
      return ApiResponse.success('code got', HttpStatus.CREATED, code);
    return generateUniqueCode(length, model, uniqueFieldName);
  } catch (error) {
    return ApiResponse.fail(
      error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
  }
}

export const createHex = (size = 20) =>
  crypto.randomBytes(size).toString('hex');

export default {
  createRandomLetters,
  createHex,
};

export async function getCountComparison(
  model: Model<any>,
  dateProperty: string,
  from: string,
  to: string,
): Promise<
  IGenericResponse<{ currentCount: number; previousPeriodCount: number }>
> {
  try {
    let comparingFromDate: string;
    if (!from || !to) {
      const fromTime = new Date(Date.now()).getTime();
      const toTime = fromTime + 2629746000;
      const prevFromTime = fromTime - 2629746000;
      from = new Date(fromTime).toISOString().split('T')[0];
      to = new Date(toTime).toISOString().split('T')[0];
      comparingFromDate = new Date(prevFromTime).toISOString().split('T')[0];
    } else {
      const fromTime = new Date(Date.now()).getTime();
      const prevFromTime = fromTime - 2629746000;
      comparingFromDate = new Date(prevFromTime).toISOString().split('T')[0];
    }

    const currentCount = await model.countDocuments({
      $and: [
        { [dateProperty]: { $gte: from } },
        { [dateProperty]: { $lte: to } },
      ],
    });

    const previousPeriodCount = await model.countDocuments({
      $and: [
        { [dateProperty]: { $gte: comparingFromDate } },
        { [dateProperty]: { $lt: from } },
      ],
    });

    return ApiResponse.success('comparison data got', HttpStatus.OK, {
      currentCount,
      previousPeriodCount,
    });
  } catch (error) {
    return ApiResponse.fail(
      error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
  }
}

export async function getComparisonData(
  model: Model<any>,
  dateProperty: string,
  from: string,
  to: string,
): Promise<
  IGenericResponse<{ currentData: Document[]; previousPeriodData: Document[] }>
> {
  try {
    let comparingFromDate: string;
    if (!from || !to) {
      const fromTime = new Date(Date.now()).getTime();
      const toTime = fromTime + 2629746000;
      const prevFromTime = fromTime - 2629746000;
      from = new Date(fromTime).toISOString().split('T')[0];
      to = new Date(toTime).toISOString().split('T')[0];
      comparingFromDate = new Date(prevFromTime).toISOString().split('T')[0];
    } else {
      const fromTime = new Date(Date.now()).getTime();
      const prevFromTime = fromTime - 2629746000;
      comparingFromDate = new Date(prevFromTime).toISOString().split('T')[0];
    }

    const currentData = await model.find({
      $and: [
        { [dateProperty]: { $gte: from } },
        { [dateProperty]: { $lte: to } },
      ],
    });

    const previousPeriodData = await model.find({
      $and: [
        { [dateProperty]: { $gte: comparingFromDate } },
        { [dateProperty]: { $lt: from } },
      ],
    });

    return ApiResponse.success('comparison data got', HttpStatus.OK, {
      currentData,
      previousPeriodData,
    });
  } catch (error) {
    return ApiResponse.fail(
      error.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
  }
}
