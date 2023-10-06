import { Test, TestingModule } from '@nestjs/testing';
import { PhoneDTO } from './phone.dto';
import { ValidationPipe } from '@nestjs/common';

describe('PhoneDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PhoneDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid phone', async () => {
      const dto = new PhoneDTO('0912-345-678');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: PhoneDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid phone', async () => {
      const dto = new PhoneDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: PhoneDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid phone format (e.g. 0912-345-678)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
