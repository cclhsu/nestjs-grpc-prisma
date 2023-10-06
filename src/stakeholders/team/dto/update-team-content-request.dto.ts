// Path: src/stakeholders/team/dto/team-content.dto.ts
// DESC: team content dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateNested, Matches } from 'class-validator';
import { TeamContentDTO } from './team-content.dto';

export class UpdateTeamContentRequestDTO {
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      UpdateTeamContentRequestDTO.name,
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
  @Expose({ name: 'content', toPlainOnly: true })
  @IsObject()
  @Type(() => TeamContentDTO)
  @ValidateNested({ each: true })
  content: TeamContentDTO;

  constructor(UUID: string, content: TeamContentDTO) {
    this.UUID = UUID;
    this.content = content;
  }
}

export default UpdateTeamContentRequestDTO;
