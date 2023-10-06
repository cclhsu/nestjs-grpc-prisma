// Path: src/common/dto-validation/project-role.dto.ts
// DESC: This is a DTO for project role
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DEFAULT_PROJECT_ROLE_TYPE, PROJECT_ROLE_TYPE, PROJECT_ROLE_TYPES_ARRAY } from '../constant';

export const PROJECT_ROLE_MSG = {
  regexp: new RegExp(`^(${PROJECT_ROLE_TYPES_ARRAY.join('|')})$`) as RegExp,
  message: 'Project role is a type of PROJECT_ROLE_TYPE',
  example: PROJECT_ROLE_TYPES_ARRAY,
  default: DEFAULT_PROJECT_ROLE_TYPE,
  typeMessage: 'Project role must be a string',
  requiredMessage: 'Please enter an project role',
  invalidMessage:
    'Invalid project role type. Allowed values: ' + PROJECT_ROLE_TYPES_ARRAY.join(', '),
  errorMessage:
    'Please enter a valid project role in the type of ' + PROJECT_ROLE_TYPES_ARRAY.join(', '),
};

export class ProjectRoleDTO {
  constructor(projectRole: PROJECT_ROLE_TYPE = DEFAULT_PROJECT_ROLE_TYPE) {
    this.projectRole = projectRole;
  }

  @ApiProperty({
    description: PROJECT_ROLE_MSG.message,
    example: PROJECT_ROLE_MSG.example,
    type: [String],
    default: PROJECT_ROLE_MSG.default,
  })
  @Expose({ name: 'projectRole', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ROLE_MSG.requiredMessage })
  @IsString({ message: PROJECT_ROLE_MSG.typeMessage })
  @IsEnum(PROJECT_ROLE_TYPES_ARRAY, {
    message: PROJECT_ROLE_MSG.invalidMessage,
    context: {
      reason: 'projectRole',
    },
  })
  projectRole: PROJECT_ROLE_TYPE;
}
