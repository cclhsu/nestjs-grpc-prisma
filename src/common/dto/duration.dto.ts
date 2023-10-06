// Path: src/models/common/duration.dto.ts
// DESC: duration dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class DurationDTO {
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
    description: 'ID is Unique identifier for ' + DurationDTO.name,
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
      DurationDTO.name,
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
    description: 'The date when the task should start.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'startDate', toPlainOnly: true })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'The date when the task should complete',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'endDate', toPlainOnly: true })
  @IsDateString()
  endDate: Date;

  constructor(ID: string, UUID: string, startDate: Date, endDate: Date) {
    this.ID = ID;
    this.UUID = UUID;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export default DurationDTO;
