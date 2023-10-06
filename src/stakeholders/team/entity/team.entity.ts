// Path: src/stakeholders/team/entity/team-metadata.entity.ts
// DESC: team metadata entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { TeamContentEntity } from './team-content.entity';
import { TeamMetadataEntity } from './team-metadata.entity';

export class TeamEntity {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + TeamEntity.name,
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
      TeamEntity.name,
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
    type: TeamMetadataEntity,
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => TeamContentEntity)
  @ValidateNested({ each: true })
  metadata: TeamMetadataEntity;

  @ApiProperty({
    description: 'Content of the team.',
    type: TeamContentEntity,
  })
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => TeamContentEntity)
  @ValidateNested({ each: true })
  content: TeamContentEntity;

  constructor(ID: string, UUID: string, metadata: TeamMetadataEntity, content: TeamContentEntity) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }
}

export default TeamEntity;
