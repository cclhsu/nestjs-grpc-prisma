// Path: src/stakeholders/user/dto/user-id-uuid.dto.ts
// DESC: User ID and UUID DTO
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class UserIdUuidDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + UserIdUuidDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[a-z]+.[a-z]+\..*$/, {
    message: 'ID should follow the format "abc.xyz".',
  })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      UserIdUuidDTO.name,
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

  constructor(ID: string, UUID: string) {
    this.ID = ID;
    this.UUID = UUID;
  }
}

export default UserIdUuidDTO;
