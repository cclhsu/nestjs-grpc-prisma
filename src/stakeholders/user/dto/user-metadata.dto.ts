// Path: src/stakeholders/user/user-metadata.dto.ts
// DESC: user metadata dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { CommonDateDTO } from '../../../common/dto';

export class UserMetadataDTO {
  @ApiProperty({
    description: 'Name of the User Metadata.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Dates related to the User Metadata.',
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

export default UserMetadataDTO;
