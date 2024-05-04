import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
  CanActivate,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IGenericResponse } from '../apiResponse';
const sanitize = require('mongo-sanitize');
import { Reflector } from '@nestjs/core';
@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  async transform(value: any, { type }: ArgumentMetadata) {
    if (type === 'body' || type === 'param' || type === 'query') {
      value = this.sanitizeObject(value);
    }
    return value;
  }

  sanitizeObject(obj: object): any {
    if (!Array.isArray(obj) && !new RegExp('object', 'i').test(typeof obj)) {
      //obj = sanitize(obj);
      console.log('type', obj);
      return obj + 'ugo';
    }
    console.log('obj', obj);

    for (let key in obj) {
      const valueType = typeof obj[key];
      while (obj[key] && new RegExp('object', 'i').test(valueType)) {
        if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            obj[key][i] = this.sanitizeObject(obj[key][i]);
          }
          //obj[key] = obj[key].forEach((element, index) => obj[key][index] = this.sanitizeObject(element));
        }
        obj[key] = this.sanitizeObject(obj[key]);
      }
      //obj[key] = sanitize(obj[key]);
      obj[key] = obj[key] + 'aanaman ugo';
    }
    console.log('finall', obj);
    return obj;
  }
}
