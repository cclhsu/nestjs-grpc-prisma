// Path: src/common/dto-validation/scrum-roles.dto.ts
// DESC: This is a DTO for scrum roles
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { DEFAULT_SCRUM_ROLE_TYPE, SCRUM_ROLE_TYPE, SCRUM_ROLE_TYPE_KEYS } from '../constant';

export const SCRUM_ROLES_MSG = {
  regexp: new RegExp(`^(${SCRUM_ROLE_TYPE_KEYS.join('|')})$`) as RegExp,
  message: 'Scrum roles is a type of SCRUM_ROLES_TYPES',
  example: SCRUM_ROLE_TYPE_KEYS,
  default: DEFAULT_SCRUM_ROLE_TYPE,
  typeMessage: 'Scrum roles must be an array of string',
  requiredMessage: 'Please enter an scrum roles',
  invalidMessage: 'Invalid scrum roles type. Allowed values: ' + SCRUM_ROLE_TYPE_KEYS.join(', '),
  errorMessage:
    'Please enter a valid scrum roles in the type of ' + SCRUM_ROLE_TYPE_KEYS.join(', '),
};

export class ScrumRolesDTO {
  constructor(scrumRoles: SCRUM_ROLE_TYPE[] = [DEFAULT_SCRUM_ROLE_TYPE]) {
    this.scrumRoles = scrumRoles;
  }

  @ApiProperty({
    description: SCRUM_ROLES_MSG.message,
    example: SCRUM_ROLES_MSG.example,
    type: [String],
    default: SCRUM_ROLES_MSG.default,
  })
  @Expose({ name: 'scrumRoles', toPlainOnly: true })
  @IsNotEmpty({ message: SCRUM_ROLES_MSG.requiredMessage })
  @IsArray({ message: SCRUM_ROLES_MSG.typeMessage })
  @IsIn(SCRUM_ROLE_TYPE_KEYS, {
    each: true,
    message: SCRUM_ROLES_MSG.invalidMessage,
  })
  scrumRoles: SCRUM_ROLE_TYPE[];
}
