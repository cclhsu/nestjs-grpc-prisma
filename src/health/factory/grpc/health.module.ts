// Path: src/health/health.module.ts
// DESC: health module
'use strict';
import { Module } from '@nestjs/common';
import { HealthServiceController } from './health-service.controller';
import { HealthController } from '../restful/health.controller';
import { HealthService } from '../../health.service';
import { TerminusModule } from '@nestjs/terminus';
// import { healthGrpcClientOptions } from 'src/grpc.options';
// import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [TerminusModule],
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'health',
  //       ...healthGrpcClientOptions,
  //     },
  //   ]),
  // ],
  controllers: [HealthServiceController, HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
