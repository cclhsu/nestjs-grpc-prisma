// Path: src/common/dto-validation/project-role.dto.spec.ts
// DESC: This is a test file for project role DTO
'use strict';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRoleDTO } from './project-role.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_PROJECT_ROLE_TYPE } from '../constant';

describe('ProjectRoleDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ProjectRoleDTO],
    }).compile();
  });

  describe('Project Role', () => {
    it('should validate a valid project role', async () => {
      const dto = new ProjectRoleDTO(DEFAULT_PROJECT_ROLE_TYPE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ProjectRoleDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid project role', async () => {
      const dto = new ProjectRoleDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ProjectRoleDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid project role in the type of PM, EM, DEV, QA, BA, UX, I'],
          error: 'Bad Request',
        });
      }
    });
  });
});
