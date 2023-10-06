// path: src/common/entity/id-uuid.entity.ts
// DESC: id uuid entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class IdUuidEntity {
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
    description: 'ID is Unique identifier for ' + IdUuidEntity.name,
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
      IdUuidEntity.name,
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

  constructor(ID: string, UUID: string) {
    this.ID = ID;
    this.UUID = UUID;
  }
}

export default IdUuidEntity;
