import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PlainToInstanceTransformInterceptor implements NestInterceptor {
  constructor(private readonly classType: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => plainToInstance(this.classType, data)));
  }
}

@Injectable()
export class InstanceToPlainTransformInterceptor implements NestInterceptor {
  constructor(private readonly classType: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => instanceToPlain(data, { excludeExtraneousValues: true })));
  }
}
