import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export const EMAIL_MSG = {
  regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  message: 'Email is Unique identifier in the format "john.doe@mail.com".',
  example: 'e.g. john.doe@mail.com',
  typeMessage: 'Email must be a string',
  requiredMessage: 'Please enter an email',
  invalidMessage: 'Please enter a valid email',
  errorMessage: 'Please enter a valid email format (e.g. john.doe@mail.com)',
};

export class EmailDTO {
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
