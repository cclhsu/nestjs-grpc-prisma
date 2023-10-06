// Path: src/stakeholders/user/dto/get-user-by-id-request.dto.ts
// DESC: get user by id request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetUserByIdRequestDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + GetUserByIdRequestDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[a-z]+.[a-z]+\..*$/, {
    message: 'ID should follow the format "abc.xyz".',
  })
  ID: string;

  constructor(ID: string) {
    this.ID = ID;
  }
}

export default GetUserByIdRequestDTO;
