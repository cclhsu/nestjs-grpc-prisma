// Path: src/stakeholders/user/dto/user-metadata.dto.ts
// DESC: user metadata dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { UserMetadataDTO } from './user-metadata.dto';

export class UserMetadataResponseDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + UserMetadataResponseDTO.name,
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
      UserMetadataResponseDTO.name,
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

  constructor(ID: string, UUID: string, metadata: UserMetadataDTO) {
    this.ID = ID;
    this.UUID = UUID;
    this.metadata = metadata;
  }
}

export default UserMetadataResponseDTO;
