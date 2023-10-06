// Path: src/auth/dto/jwt-payload.dto.ts
// DESC: DTO for JWT Payload
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
// import { EMAIL_MSG } from '../common/dto-validation';

export class JwtPayloadDTO {
  @ApiProperty({
    description: 'ID is Unique identifier for ' + JwtPayloadDTO.name,
    example: 'john.doe',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  @IsString({ message: 'ID must be a string' })
  ID: string;

  // @ApiProperty({
  //   description: EMAIL_MSG.message,
  //   example: EMAIL_MSG.example,
  // })
  // @Expose({ name: 'email', toPlainOnly: true })
  // @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  // @IsString({ message: EMAIL_MSG.typeMessage })
  // @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  // email: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      JwtPayloadDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'sub', toPlainOnly: true })
  @IsNotEmpty({ message: 'UUID cannot be empty' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message: 'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  sub: number | string | undefined;

  @Expose({ name: 'iat', toPlainOnly: true })
  @IsNotEmpty({ message: 'iat cannot be empty' })
  @IsNumber({}, { message: 'iat must be a number' })
  iat: number;

  @Expose({ name: 'exp', toPlainOnly: true })
  @IsNotEmpty({ message: 'exp cannot be empty' })
  @IsNumber({}, { message: 'exp must be a number' })
  exp: number;

  constructor(ID: string, sub: number | string | undefined, iat: number, exp: number) {
    this.ID = ID;
    this.sub = sub;
    this.iat = iat;
    this.exp = exp;
  }
}

export default JwtPayloadDTO;
