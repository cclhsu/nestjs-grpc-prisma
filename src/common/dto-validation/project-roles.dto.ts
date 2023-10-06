// Path: src/common/dto-validation/project-roles.dto.ts
// DESC: This is a DTO for project roles
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty } from 'class-validator';
import { DEFAULT_PROJECT_ROLE_TYPE, PROJECT_ROLE_TYPE, PROJECT_ROLE_TYPES_ARRAY } from '../constant';

export const PROJECT_ROLES_MSG = {
  regexp: new RegExp(`^(${PROJECT_ROLE_TYPES_ARRAY.join('|')})$`) as RegExp,
  message: 'Project roles is a type of PROJECT_ROLES_TYPES',
  example: PROJECT_ROLE_TYPES_ARRAY,
  default: DEFAULT_PROJECT_ROLE_TYPE,
  typeMessage: 'Project roles must be an array of string',
  requiredMessage: 'Please enter an project roles',
  invalidMessage:
    'Invalid project roles type. Allowed values: ' + PROJECT_ROLE_TYPES_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid project roles in the type of ' + PROJECT_ROLE_TYPES_ARRAY.join(', '),
};

export class ProjectRolesDTO {
  constructor(projectRoles: PROJECT_ROLE_TYPE[] = [DEFAULT_PROJECT_ROLE_TYPE]) {
    this.projectRoles = projectRoles;
  }

  @ApiProperty({
    description: PROJECT_ROLES_MSG.message,
    example: PROJECT_ROLES_MSG.example,
    type: [String],
    default: PROJECT_ROLES_MSG.default,
  })
  @Expose({ name: 'projectRoles', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ROLES_MSG.requiredMessage })
  @IsArray({ message: PROJECT_ROLES_MSG.typeMessage })
  @IsIn(PROJECT_ROLE_TYPES_ARRAY, {
    each: true,
    message: PROJECT_ROLES_MSG.invalidMessage,
  })
  projectRoles: PROJECT_ROLE_TYPE[];
}
