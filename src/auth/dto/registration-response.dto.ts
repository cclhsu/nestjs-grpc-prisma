// Path: src/auth/dto/registration-request.dto.ts
// DESC: DTO for Registration Request
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { EMAIL_MSG } from '../../common/dto-validation';

export class RegistrationResponseDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + RegistrationResponseDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      RegistrationResponseDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an UUID' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message: 'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description: EMAIL_MSG.message + ' for ' + RegistrationResponseDTO.name,
    example: EMAIL_MSG.example,
  })
  @Expose({ name: 'email', toPlainOnly: true })
  @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  @IsString({ message: EMAIL_MSG.typeMessage })
  @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  email: string;

  constructor(RegistrationResponseDTO: RegistrationResponseDTO) {
    this.ID = RegistrationResponseDTO.ID;
    this.UUID = RegistrationResponseDTO.UUID;
    this.email = RegistrationResponseDTO.email;
  }
}

export default RegistrationResponseDTO;
