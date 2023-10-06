// Path: src/common/dto-validation/scrum-role.dto.ts
// DESC: This is a DTO for scrum role
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DEFAULT_SCRUM_ROLE_TYPE, SCRUM_ROLE_TYPE, SCRUM_ROLE_TYPE_KEYS } from '../constant';

export const SCRUM_ROLE_MSG = {
  regexp: new RegExp(`^(${SCRUM_ROLE_TYPE_KEYS.join('|')})$`) as RegExp,
  message: 'Scrum role is a type of SCRUM_ROLE_TYPE',
  example: SCRUM_ROLE_TYPE_KEYS,
  default: DEFAULT_SCRUM_ROLE_TYPE,
  typeMessage: 'Scrum role must be a string',
  requiredMessage: 'Please enter an scrum role',
  invalidMessage: 'Invalid scrum role type. Allowed values: ' + SCRUM_ROLE_TYPE_KEYS.join(', '),
  errorMessage:
    'Please enter a valid scrum role in the type of ' + SCRUM_ROLE_TYPE_KEYS.join(', '),
};

export class ScrumRoleDTO {
  constructor(scrumRole: SCRUM_ROLE_TYPE = DEFAULT_SCRUM_ROLE_TYPE) {
    this.scrumRole = scrumRole;
  }

  @ApiProperty({
    description: SCRUM_ROLE_MSG.message,
    example: SCRUM_ROLE_MSG.example,
    type: [String],
    default: SCRUM_ROLE_MSG.default,
  })
  @Expose({ name: 'scrumRole', toPlainOnly: true })
  @IsNotEmpty({ message: SCRUM_ROLE_MSG.requiredMessage })
  @IsString({ message: SCRUM_ROLE_MSG.typeMessage })
  @IsEnum(SCRUM_ROLE_TYPE_KEYS, {
    message: SCRUM_ROLE_MSG.invalidMessage,
    context: {
      reason: 'scrumRole',
    },
  })
  scrumRole: SCRUM_ROLE_TYPE;
}
