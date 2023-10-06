// Path: src/auth/dto/login-request.dto.ts
// DESC: DTO for Login Request
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { EMAIL_MSG, PASSWORD_MSG } from '../../common/dto-validation';

export class LoginRequestDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + LoginRequestDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  @ApiProperty({
    description: EMAIL_MSG.message,
    example: EMAIL_MSG.example,
  })
  @Expose({ name: 'email', toPlainOnly: true })
  @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  @IsString({ message: EMAIL_MSG.typeMessage })
  @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  email: string;

  @ApiProperty({
    description: PASSWORD_MSG.message,
    example: PASSWORD_MSG.example,
  })
  @Expose({ name: 'password', toPlainOnly: true })
  @IsNotEmpty({ message: PASSWORD_MSG.requiredMessage })
  @IsString({ message: PASSWORD_MSG.typeMessage })
  // @IsStrongPassword({}, { message: PASSWORD_MSG.errorMessage })
  @MinLength(8, { message: PASSWORD_MSG.MinLengthMessage })
  @MaxLength(20, { message: PASSWORD_MSG.MaxLengthMessage })
  @Matches(PASSWORD_MSG.regexp, {
    message: PASSWORD_MSG.errorMessage,
  })
  password: string;

  constructor(loginRequestDTO: LoginRequestDTO) {
    this.ID = loginRequestDTO.ID;
    this.email = loginRequestDTO.email;
    this.password = loginRequestDTO.password;
  }
}

export default LoginRequestDTO;
