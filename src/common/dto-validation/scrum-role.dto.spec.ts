// Path: src/common/dto-validation/scrum-role.dto.ts
// DESC: This is a DTO for scrum role
'use strict';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DEFAULT_SCRUM_ROLE_TYPE } from '../constant';
import { ScrumRoleDTO } from './scrum-role.dto';

describe('ScrumRoleDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ScrumRoleDTO],
    }).compile();
  });

  describe('Scrum Role', () => {
    it('should validate a valid scrum role', async () => {
      const dto = new ScrumRoleDTO(DEFAULT_SCRUM_ROLE_TYPE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ScrumRoleDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid scrum role', async () => {
      const dto = new ScrumRoleDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ScrumRoleDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid scrum role in the type of PO, SM, MEMBER, I'],
          error: 'Bad Request',
        });
      }
    });
  });
});
