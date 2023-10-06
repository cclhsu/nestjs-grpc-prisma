// Path: src/common/dto-validation/scrum-roles.dto.ts
// DESC: This is a DTO for scrum roles
'use strict';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DEFAULT_SCRUM_ROLE_TYPE } from '../constant';
import { ScrumRolesDTO } from './scrum-roles.dto';

describe('ScrumRolesDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ScrumRolesDTO],
    }).compile();
  });

  describe('Scrum Roles', () => {
    it('should validate a valid scrum roles', async () => {
      const dto = new ScrumRolesDTO([DEFAULT_SCRUM_ROLE_TYPE]);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: ScrumRolesDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid scrum roles', async () => {
      const dto = new ScrumRolesDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: ScrumRolesDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid scrum roles in the type of PO, SM, MEMBER, I'],
          error: 'Bad Request',
        });
      }
    });
  });
});
