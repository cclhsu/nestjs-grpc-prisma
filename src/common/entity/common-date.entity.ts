// Path: src/common/entity/common-date.entity.ts
// DESC: common date entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CommonDateEntity {
  @ApiProperty({
    description: 'The date when the task was created.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'createdAt', toPlainOnly: true })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The name of the user who created the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'createdBy', toPlainOnly: true })
  @IsString({ message: 'Created by must be a string' })
  createdBy: string;

  @ApiProperty({
    description: 'The date when the task was updated.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'updatedAt', toPlainOnly: true })
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of the user who updated the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString({ message: 'Updated by must be a string' })
  updatedBy: string;

  @ApiProperty({
    description: 'The date when the task was started.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'startedAt', toPlainOnly: true })
  @IsDateString()
  @IsOptional()
  startedAt?: Date;

  @ApiProperty({
    description: 'The name of the user who started the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'startedBy', toPlainOnly: true })
  @IsString({ message: 'Started by must be a string' })
  @IsOptional()
  startedBy?: string;

  @ApiProperty({
    description: 'The date when the task should start.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'startDate', toPlainOnly: true })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'The date when the task should complete',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'endDate', toPlainOnly: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'The date when the task was completed.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'completedAt', toPlainOnly: true })
  @IsDateString()
  @IsOptional()
  completedAt?: Date;

  @ApiProperty({
    description: 'The name of the user who completed the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'completedBy', toPlainOnly: true })
  @IsString({ message: 'Completed by must be a string' })
  @IsOptional()
  completedBy?: string;

  constructor(
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
    startedAt?: Date,
    startedBy?: string,
    startDate?: Date,
    endDate?: Date,
    completedAt?: Date,
    completedBy?: string,
  ) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.startedAt = startedAt;
    this.startedBy = startedBy;
    this.startDate = startDate;
    this.endDate = endDate;
    this.completedAt = completedAt;
    this.completedBy = completedBy;
  }
}

export default CommonDateEntity;
