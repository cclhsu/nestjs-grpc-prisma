// Path: src/health/health.controller.ts
// DESC: health controller
'use strict';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HealthService } from '../../health.service';
import {
  HealthRequest,
  HealthResponse,
  HealthServiceController as HealthServiceControllerInterface,
} from '../../../../generated/grpc/health/health.pb';
// import { Response } from 'express';

// interface HealthExternalInterface {
//   isALive(request: HealthRequestDTO): Promise<HealthResponseDTO>;
//   isReady(request: HealthRequestDTO): Promise<HealthResponseDTO>;
//   isHealthy(request: HealthRequestDTO): Promise<HealthResponseDTO>;
// }

// grpcurl -plaintext localhost:5000 list
// grpcurl -plaintext 0.0.0.0:5000 describe health.HealthService
// grpcurl -plaintext -proto api/grpc/proto/health.proto -import-path api/grpc/proto 0.0.0.0:5000 describe health.HealthService
@Controller('health')
export class HealthServiceController implements HealthServiceControllerInterface {
  constructor(private readonly healthService: HealthService) {}

  // grpcurl -plaintext -d '{"service": "Health"}' 0.0.0.0:5000 health.HealthService/IsHealthy | jq
  // grpcurl -plaintext -d '{"service": "Health"}' -proto api/grpc/proto/health.proto -import-path api/grpc/proto 0.0.0.0:5000 health.HealthService/IsHealthy | jq
  @GrpcMethod('HealthService', 'IsHealthy')
  isHealthy(
    request: HealthRequest,
    _metadata: Metadata,
    ..._rest: any
  ): HealthResponse | Promise<HealthResponse> | Observable<HealthResponse> {
    return this.healthService.isHealthy(request);
  }

  // grpcurl -plaintext -d '{"service": "Health"}' 0.0.0.0:5000 health.HealthService/IsALive | jq
  // grpcurl -plaintext -d '{"service": "Health"}' -proto api/grpc/proto/health.proto -import-path api/grpc/proto 0.0.0.0:5000 health.HealthService/IsALive | jq
  @GrpcMethod('HealthService', 'IsALive')
  isALive(
    request: HealthRequest,
    _metadata: Metadata,
    ..._rest: any
  ): HealthResponse | Promise<HealthResponse> | Observable<HealthResponse> {
    return this.healthService.isALive(request);
  }

  // grpcurl -plaintext -d '{"service": "Health"}' 0.0.0.0:5000 health.HealthService/IsReady | jq
  // grpcurl -plaintext -d '{"service": "Health"}' -proto api/grpc/proto/health.proto -import-path api/grpc/proto 0.0.0.0:5000 health.HealthService/IsReady | jq
  @GrpcMethod('HealthService', 'IsReady')
  isReady(
    request: HealthRequest,
    _metadata: Metadata,
    ..._rest: any
  ): HealthResponse | Promise<HealthResponse> | Observable<HealthResponse> {
    return this.healthService.isReady(request);
  }
}
