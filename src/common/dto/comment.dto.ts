// Path: src/common/dto/comment.dto.ts
// DESC: comment dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class CommentDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + CommentDTO.name,
    example: 'abc.xyz',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[a-z]+.[a-z]+\..*$/, {
    message: 'ID should follow the format "abc.xyz".',
  })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      CommentDTO.name,
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
    description: 'Content of the message.',
    example: 'This is a helpful message.',
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty({
    description: 'The name of the user who updated the task.',
    example: 'john.doe',
  })
  @Expose({ name: 'updatedBy', toPlainOnly: true })
  @IsString({ message: 'Updated by must be a string' })
  updatedBy: string;

  @ApiProperty({
    description: 'The date when the task was updated.',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'updatedAt', toPlainOnly: true })
  @IsDateString()
  updatedAt: Date;

  constructor(ID: string, UUID: string, content: string, updatedBy: string, updatedAt: Date) {
    this.ID = ID;
    this.UUID = UUID;
    this.content = content;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }
}

export default CommentDTO;
