// Path: src/stakeholders/team/entity/team-metadata.entity.ts
// DESC: team metadata entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';

export class TeamMetadataEntity {
  @ApiProperty({
    description: 'Name of the team metadata.',
    example: 'Development Team',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the team metadata.',
    type: CommonDateEntity,
  })
  @Expose({ name: 'dates', toPlainOnly: true })
  @ValidateNested({ each: true })
  dates: CommonDateEntity;

  constructor(name: string, dates: CommonDateEntity) {
    this.name = name;
    this.dates = dates;
  }
}

export default TeamMetadataEntity;
