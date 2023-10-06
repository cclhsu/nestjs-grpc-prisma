// Path: src/health/dto/health-request.dto.ts
// DESC: health-request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class HealthRequestDTO {
  @ApiProperty({
    description: 'The service to check',
    enum: ['cache', 'database', 'kafka'],
    required: false,
  })
  @IsString({ always: true })
  @IsOptional({ always: true })
  service: string;

  constructor(service: string) {
    this.service = service;
  }
}

export default HealthRequestDTO;
