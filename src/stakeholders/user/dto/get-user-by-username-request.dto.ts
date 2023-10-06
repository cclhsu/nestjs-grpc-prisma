// Path: src/stakeholders/user/dto/get-user-by-username-request.dto.ts
// DESC: get user by username request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class GetUserByUsernameRequestDTO {
  @ApiProperty({
    description: 'Username of the user to retrieve.',
    example: 'john.doe',
  })
  @Expose({ name: 'username', toPlainOnly: true })
  @IsString({ message: 'Username must be a string.' })
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}

export default GetUserByUsernameRequestDTO;
