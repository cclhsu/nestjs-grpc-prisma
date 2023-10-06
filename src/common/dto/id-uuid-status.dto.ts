// src/models/common/id-uuid-status.dto.ts
// DESC: id uuid status dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import {
  DEFAULT_GENERAL_STATUS_TYPE,
  GENERAL_STATUS_TYPE,
  GENERAL_STATUS_TYPE_KEYS,
} from '../constant';

export class IdUuidStatusDTO {
  // @ApiProperty({
  //   description: ID_MSG.message,
  //   example: ID_MSG.example,
  // })
  // @Expose({ name: 'ID', toPlainOnly: true })
  // @IsNotEmpty({ message: ID_MSG.requiredMessage })
  // @IsString({ message: ID_MSG.typeMessage })
  // @Matches(ID_MSG.regexp, {
  //   message: ID_MSG.errorMessage,
  // })
  @ApiProperty({
    description: 'ID is Unique identifier for ' + IdUuidStatusDTO.name,
    example: 'abc.xyz',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[a-z]+.[a-z]+\..*$/, {
    message: 'ID should follow the format "abc.xyz".',
  })
  ID: string;

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
      IdUuidStatusDTO.name,
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
    description: 'The general status (' + GENERAL_STATUS_TYPE_KEYS.join(', ') + ').',
    enum: GENERAL_STATUS_TYPE_KEYS,
    example: DEFAULT_GENERAL_STATUS_TYPE,
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsIn(GENERAL_STATUS_TYPE_KEYS, {
    message: `Invalid general status. Possible values: ${GENERAL_STATUS_TYPE_KEYS.join(', ')}`,
  })
  status: GENERAL_STATUS_TYPE;

  constructor(ID: string, UUID: string, status: GENERAL_STATUS_TYPE) {
    this.ID = ID;
    this.UUID = UUID;
    this.status = status;
  }
}

export default IdUuidStatusDTO;
