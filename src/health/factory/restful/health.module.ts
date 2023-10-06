// Path: src/health/health.module.ts
// DESC: health module
'use strict';
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from '../../health.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
