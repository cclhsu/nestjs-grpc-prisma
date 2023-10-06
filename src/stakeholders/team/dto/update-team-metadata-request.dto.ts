// path: src/stakeholders/team/dto/update-team-metadata-request.dto.ts
// DESC: update team metadata request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { TeamMetadataDTO } from './team-metadata.dto';

export class UpdateTeamMetadataRequestDTO {
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      UpdateTeamMetadataRequestDTO.name,
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
  @Type(() => TeamMetadataDTO)
  @ValidateNested({ each: true })
  metadata: TeamMetadataDTO;

  constructor(UUID: string, metadata: TeamMetadataDTO) {
    this.UUID = UUID;
    this.metadata = metadata;
  }
}

export default UpdateTeamMetadataRequestDTO;
