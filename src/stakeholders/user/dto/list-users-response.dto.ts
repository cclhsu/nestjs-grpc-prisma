// Path: src/stakeholders/user/dto/list-users-response.dto.ts
// DESC: list users response dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { UserResponseDTO } from './user-response.dto';

export class ListUserResponseDTO {
  @ApiProperty({
    description: 'An array of user DTOs.',
    type: () => UserResponseDTO,
    isArray: true,
  })
  @Expose({ name: 'users', toPlainOnly: true })
  @IsArray()
  @ValidateNested({ each: true })
  users: UserResponseDTO[];

  constructor(users: UserResponseDTO[]) {
    this.users = users;
  }
}

export default ListUserResponseDTO;
