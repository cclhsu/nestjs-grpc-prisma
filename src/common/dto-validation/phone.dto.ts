import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export const PHONE_MSG = {
  regexp: /^\d{4}-\d{3}-\d{3}$/,
  message: 'Phone is Unique identifier in the format "0912-345-678".',
  example: 'e.g. 0912-345-678',
  typeMessage: 'Phone must be a string',
  requiredMessage: 'Please enter an phone',
  invalidMessage: 'Please enter a valid phone',
  errorMessage: 'Please enter a valid phone format (e.g. 0912-345-678)',
};

export class PhoneDTO {
  @ApiProperty({
    description: PHONE_MSG.message,
    example: PHONE_MSG.example,
  })
  @Expose({ name: 'phone', toPlainOnly: true })
  @IsNotEmpty({ message: PHONE_MSG.requiredMessage })
  @IsString({ message: PHONE_MSG.typeMessage })
  @Matches(PHONE_MSG.regexp, {
    message: PHONE_MSG.errorMessage,
  })
  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }
}
