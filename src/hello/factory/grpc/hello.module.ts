// Path: src/hello/factory/grpc/hello.module.ts
// DESC: hello controller
'use strict';
import { Module } from '@nestjs/common';
import { HelloServiceController } from './hello-service.controller';
import { HelloController } from '../restful/hello.controller';
import { HelloService } from '../../hello.service';
// import { helloGrpcClientOptions } from 'src/grpc.options';
// import { ClientsModule } from '@nestjs/microservices';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'hello',
  //       ...helloGrpcClientOptions,
  //     },
  //   ]),
  // ],
  controllers: [HelloServiceController, HelloController],
  providers: [HelloService],
  exports: [HelloService],
})
export class HelloModule {}
