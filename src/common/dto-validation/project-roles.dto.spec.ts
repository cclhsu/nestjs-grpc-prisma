// Path: src/common/dto-validation/project-roles.dto.spec.ts
// DESC: This is a test file for project roles DTO
'use strict';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DEFAULT_PROJECT_ROLE_TYPE } from '../constant';
import { ProjectRolesDTO } from './project-roles.dto';

describe('ProjectRolesDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectRolesDTO],
    }).compile();
  });

  describe('Project Roles', () => {
    it('should validate a valid project roles', async () => {
      const dto = new ProjectRolesDTO([DEFAULT_PROJECT_ROLE_TYPE]);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectRolesDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project roles', async () => {
      const dto = new ProjectRolesDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectRolesDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid project roles in the type of PM, EM, DEV, QA, BA, UX, I'],
          error: 'Bad Request',
        });
      }
    });
  });
});
