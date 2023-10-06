import { Test, TestingModule } from '@nestjs/testing';
import { EmailDTO } from './email.dto';
import { ValidationPipe } from '@nestjs/common';

describe('EmailDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [EmailDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid email', async () => {
      const dto = new EmailDTO('john.doe@mail.com');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: EmailDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid email', async () => {
      const dto = new EmailDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: EmailDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid email format (e.g. john.doe@mail.com)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
