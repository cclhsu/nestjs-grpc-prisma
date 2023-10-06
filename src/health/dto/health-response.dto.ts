// Path: src/health/dto/health-response.dto.ts
// DESC: health-response dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum ServingStatus {
  UNKNOWN = 'UNKNOWN',
  SERVING = 'SERVING',
  NOT_SERVING = 'NOT_SERVING',
}

export class HealthResponseDTO {
  @ApiProperty({ example: ServingStatus.SERVING })
  @IsString()
  status: ServingStatus;

  @ApiProperty({ example: 'OK' })
  @IsString()
  message: string;

  constructor(status: ServingStatus, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default HealthResponseDTO;
