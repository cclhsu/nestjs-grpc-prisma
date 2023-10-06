// Path: src/stakeholders/user/dto/get-user-by-name-request.dto.ts
// DESC: get user by name request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class GetUserByNameRequestDTO {
  @ApiProperty({
    description: 'Name of the user to retrieve.',
    example: 'John Doe',
  })
  @Expose({ name: 'name', toPlainOnly: true })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export default GetUserByNameRequestDTO;
