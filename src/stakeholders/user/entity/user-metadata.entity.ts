// Path: src/stakeholders/user/entity/user-metadata.entity.ts
// DESC: user metadata entity
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CommonDateEntity } from '../../../common/entity/common-date.entity';

export class UserMetadataEntity {
  @ApiProperty({
    description: 'Name of the User Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the User Metadata.',
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

export default UserMetadataEntity;
