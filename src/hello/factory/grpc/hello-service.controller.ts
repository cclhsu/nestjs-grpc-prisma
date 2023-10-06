// Path: src/hello/hello.controller.ts
// DESC: hello controller
'use strict';
import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import {
  HelloJsonResponse,
  HelloServiceController as HelloServiceControllerInterface,
  HelloStringResponse,
} from '../../../../generated/grpc/hello/hello.pb';
import { HelloJsonResponseDTO } from '../../dto/hello-json-response.dto';
import { HelloStringResponseDTO } from '../../dto/hello-string-response.dto';
import { HelloService } from '../../hello.service';

// interface HelloExternalInterface {
//   getHelloString(): HelloStringResponseDTO;
//   getHelloJson(): HelloJsonResponseDTO;
// }

// grpcurl -plaintext localhost:5000 list
// grpcurl -plaintext 0.0.0.0:5000 describe hello.HelloService
// grpcurl -plaintext -proto api/grpc/proto/hello.proto -import-path api/grpc/proto 0.0.0.0:5000 describe hello.HelloService
@Controller('hello')
export class HelloServiceController implements HelloServiceControllerInterface {
  private readonly logger: Logger = new Logger(HelloServiceController.name);
  constructor(private readonly helloService: HelloService) {}

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 hello.HelloService/GetHelloString
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/hello.proto -import-path api/grpc/proto 0.0.0.0:5000 hello.HelloService/GetHelloString
  @GrpcMethod('HelloService', 'GetHelloString')
  async getHelloString(
    _request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<HelloStringResponse> {
    const helloStringResponseDTO: HelloStringResponseDTO = await this.helloService.getHelloString();
    const helloStringResponse: HelloStringResponse = instanceToPlain(
      helloStringResponseDTO,
    ) as HelloStringResponse;

    if (!helloStringResponseDTO) {
      throw new Error('Error getting hello string');
    }

    return helloStringResponse;
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 hello.HelloService/GetHelloJson
  // grpcurl -plaintext -d '{}'  -proto api/grpc/proto/hello.proto -import-path api/grpc/proto localhost:5000 hello.HelloService/GetHelloJson
  @GrpcMethod('HelloService', 'GetHelloJson')
  async getHelloJson(
    _request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<HelloJsonResponse> {
    try {
      const helloJsonResponseDTO: HelloJsonResponseDTO = await this.helloService.getHelloJson();
      const helloJsonResponse: HelloJsonResponse = instanceToPlain(
        helloJsonResponseDTO,
      ) as HelloJsonResponse;

      return helloJsonResponse;
    } catch (error: any) {
      // logger.error(error);
      throw new RpcException(error);
    }
  }
}

export default HelloServiceController;
