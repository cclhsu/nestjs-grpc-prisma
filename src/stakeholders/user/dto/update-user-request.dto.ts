// Path: src/stakeholders/user/dto/update-user-request.dto.ts
// DESC: update user request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { UserContentDTO } from './user-content.dto';
import { UserMetadataDTO } from './user-metadata.dto';

export class UpdateUserRequestDTO {
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      UpdateUserRequestDTO.name,
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

  @ApiProperty()
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsObject()
  @Type(() => UserMetadataDTO)
  @ValidateNested({ each: true })
  metadata: UserMetadataDTO;

  @ApiProperty()
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => UserContentDTO)
  @ValidateNested({ each: true })
  content: UserContentDTO;

  constructor(UUID: string, metadata: UserMetadataDTO, content: UserContentDTO) {
    this.UUID = UUID;
    this.metadata = metadata;
    this.content = content;
  }
}

export default UpdateUserRequestDTO;
