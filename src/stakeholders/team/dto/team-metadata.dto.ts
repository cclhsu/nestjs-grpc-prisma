// Path: src/models/team/team-metadata.dto.ts
// DESC: team metadata dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CommonDateDTO } from '../../../common/dto';

export class TeamMetadataDTO {
  @ApiProperty({
    description: 'Name of the team metadata.',
    example: 'Development Team',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the team metadata.',
    type: CommonDateDTO,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateDTO;

  constructor(name: string, dates: CommonDateDTO) {
    this.name = name;
    this.dates = dates;
  }
}

export default TeamMetadataDTO;
