// Path: src/common/dto/relation.dto.ts
// DESC: relation dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  DEFAULT_RELATION_TYPE,
  RELATION_TYPES,
  RELATION_TYPE_ARRAY,
} from '../constant/relation.constant';
import IdUuidDTO from './id-uuid.dto';

export class RelationDTO {
  // @ApiProperty({
  //   description: UUID_MSG.message,
  //   example: UUID_MSG.example,
  // })
  // @Expose({ name: 'UUID', toPlainOnly: true })
  // @IsNotEmpty({ message: UUID_MSG.requiredMessage })
  // @IsString({ message: UUID_MSG.typeMessage })
  // @IsUUID('all', { message: UUID_MSG.errorMessage })
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      IdUuidDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
    // example: UUID_MSG.example,
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'UUID cannot be empty' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message: 'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description: 'Relation Type',
    example: RELATION_TYPE_ARRAY,
    type: [String],
    default: DEFAULT_RELATION_TYPE,
  })
  @Expose({ name: 'relationType', toPlainOnly: true })
  @IsEnum(RELATION_TYPE_ARRAY, {
    message: 'Invalid relation type type. Allowed values: ' + RELATION_TYPE_ARRAY.join(', '),
    context: {
      reason: 'relationType',
    },
  })
  relationType: RELATION_TYPES;

  @ApiProperty({
    description: 'Source UUID',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'sourceUUID', toPlainOnly: true })
  @IsString({ message: 'sourceUUID must be a string' })
  @IsUUID('all', { message: 'Invalid UUID format' })
  sourceUUID: string;

  @ApiProperty({
    description: 'Target UUID',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'targetUUID', toPlainOnly: true })
  @IsString({ message: 'targetUUID must be a string' })
  @IsUUID('all', { message: 'Invalid UUID format' })
  targetUUID: string;

  @ApiProperty({
    description: 'Created At',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose({ name: 'createdAt', toPlainOnly: true })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated At',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose({ name: 'updatedAt', toPlainOnly: true })
  @IsDate()
  updatedAt: Date;

  constructor(
    UUID: string,
    relationType: RELATION_TYPES,
    sourceUUID: string,
    targetUUID: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.UUID = UUID;
    this.relationType = relationType;
    this.sourceUUID = sourceUUID;
    this.targetUUID = targetUUID;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default RelationDTO;
