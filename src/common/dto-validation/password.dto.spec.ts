import { Test, TestingModule } from '@nestjs/testing';
import { PasswordDTO } from './password.dto';
import { ValidationPipe } from '@nestjs/common';

describe('PasswordDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PasswordDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid password', async () => {
      const dto = new PasswordDTO('P@ssw0rd!234');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: PasswordDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid password', async () => {
      const dto = new PasswordDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: PasswordDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid password format (e.g. P@ssw0rd!234)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
