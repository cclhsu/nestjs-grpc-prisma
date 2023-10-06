// Path: src/health/health.controller.ts
// DESC: health controller
'use strict';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthRequestDTO } from '../../dto/health-request.dto';
import { HealthResponseDTO } from '../../dto/health-response.dto';
import { HealthService } from '../../health.service';

// interface HealthExternalInterface {
//   isALive(request: HealthRequestDTO): Promise<HealthResponseDTO>;
//   isReady(request: HealthRequestDTO): Promise<HealthResponseDTO>;
//   isHealthy(request: HealthRequestDTO): Promise<HealthResponseDTO>;
// }

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // curl -s -X GET http://0.0.0.0:3001/health/live | jq
  // curl -s -X GET http://0.0.0.0:3001/health/live?service=cache | jq
  @ApiOperation({ summary: 'Check if the service is alive' })
  @ApiProduces('application/json')
  @ApiQuery({
    name: 'service',
    required: false,
    enum: ['cache', 'database', 'kafka'],
  })
  @ApiResponse({
    status: 200,
    description: 'The service is alive.',
    type: HealthResponseDTO,
  })
  @ApiResponse({
    status: 503,
    description: 'The service is not alive.',
    type: HealthResponseDTO,
  })
  @Get('live')
  async isALive(@Query() request: HealthRequestDTO): Promise<HealthResponseDTO> {
    return this.healthService.isALive(request);
  }

  // curl -s -X GET http://0.0.0.0:3001/health/ready | jq
  // curl -s -X GET http://0.0.0.0:3001/health/ready?service=cache | jq
  @ApiOperation({ summary: 'Check if the service is ready' })
  @ApiProduces('application/json')
  @ApiQuery({
    name: 'service',
    required: false,
    enum: ['cache', 'database', 'kafka'],
  })
  @ApiResponse({
    status: 200,
    description: 'The service is ready.',
    type: HealthResponseDTO,
  })
  @ApiResponse({
    status: 503,
    description: 'The service is not ready.',
    type: HealthResponseDTO,
  })
  @Get('ready')
  async isReady(@Query() request: HealthRequestDTO): Promise<HealthResponseDTO> {
    return this.healthService.isReady(request);
  }

  // curl -s -X GET http://0.0.0.0:3001/health/healthy | jq
  // curl -s -X GET http://0.0.0.0:3001/health/healthy?service=cache | jq
  @ApiOperation({ summary: 'Check if the service is healthy' })
  @ApiProduces('application/json')
  @ApiQuery({
    name: 'service',
    required: false,
    enum: ['cache', 'database', 'kafka'],
  })
  @ApiResponse({
    status: 200,
    description: 'The service is healthy.',
    type: HealthResponseDTO,
  })
  @ApiResponse({
    status: 503,
    description: 'The service is not healthy.',
    type: HealthResponseDTO,
  })
  @Get('healthy')
  async isHealthy(@Query() request: HealthRequestDTO): Promise<HealthResponseDTO> {
    return this.healthService.isHealthy(request);
  }
}
