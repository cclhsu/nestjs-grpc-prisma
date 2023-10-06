// Path: src/stakeholders/user/dto/get-user-by-email-request.dto.ts
// DESC: get user by email request dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EMAIL_MSG } from '../../../common/dto-validation';

export class GetUserByEmailRequestDTO {
  @ApiProperty({
    description: EMAIL_MSG.message,
    example: EMAIL_MSG.example,
  })
  @Expose({ name: 'email', toPlainOnly: true })
  @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  @IsString({ message: EMAIL_MSG.typeMessage })
  @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export default GetUserByEmailRequestDTO;
