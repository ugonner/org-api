import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IGenericResponse } from '../apiResponse';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if(/\/api\/share\/code\//.test(request.url)){
      return next.handle();
    }
  
    const genericResponse: Observable<IGenericResponse<any>> = next.handle();
    return genericResponse.pipe(
      map((data: IGenericResponse<any>) => {
        if (!data) {
          throw new HttpException(
            'no response from server function',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        const res = context.switchToHttp().getResponse();

        if (data.error) {
          console.log('intercepted error', data.error.name);
          if (
            data.error.name === 'ValidationError' ||
            data.error.name === 'MongooseValidatorError' ||
            data.error.name === 'UserExistsError' ||
            /mongo/i.test(data.error.name)
            
          ) {
            if (data.error.errors) {
              const errorKeysArray = Object.keys(data.error.errors);
              const errors: string[] = errorKeysArray.map(
                (key) => data.error.errors[key].message,
              );
              //const error = data.error.errors[errorKeysArray[0]];

              data.message = errors[0];
              data.error = errors;
              //data.error = new Error(error.message)
            } else {
              data.error = data.error.message;
            }
            data.statusCode = HttpStatus.BAD_REQUEST;
            res.status(Number(HttpStatus.BAD_GATEWAY))
          }
          console.log("response from server", data)
          console.log("res status", res.statusCode)
        
          return data;
        }
        res.status(data.statusCode);
        console.log("response", data)
        return data;
      }),
    );
  }
}
