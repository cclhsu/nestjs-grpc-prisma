import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export const PASSWORD_MSG = {
  regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  message:
    'Password Must include at least one uppercase letter, one lowercase letter, one digit, and one special character in the format "P@ssw0rd!234".',
  example: 'e.g. P@ssw0rd!234',
  typeMessage: 'Password must be a string',
  requiredMessage: 'Please enter an password',
  invalidMessage: 'Please enter a valid password',
  errorMessage: 'Please enter a valid password format (e.g. P@ssw0rd!234)',
  MinLengthMessage: 'Password must be at least 8 characters long.',
  MaxLengthMessage: 'Password must be at most 20 characters long.',
};

export class PasswordDTO {
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

  constructor(password: string) {
    this.password = password;
  }
}
