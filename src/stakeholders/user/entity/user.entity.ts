// Path: src/stakeholders/user/entity/user-metadata.entity.ts
// DESC: user metadata entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { UserContentEntity } from './user-content.entity';
import { UserMetadataEntity } from './user-metadata.entity';

export class UserEntity {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + UserEntity.name,
    example: 'john.doe',
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
      UserEntity.name,
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
    description: 'User metadata.',
    type: UserMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => UserMetadataEntity)
  @ValidateNested({ each: true })
  metadata: UserMetadataEntity;

  @ApiProperty({
    description: 'User content.',
    type: UserContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => UserContentEntity)
  @ValidateNested({ each: true })
  content: UserContentEntity;

  constructor(ID: string, UUID: string, metadata: UserMetadataEntity, content: UserContentEntity) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }
}

export default UserEntity;
