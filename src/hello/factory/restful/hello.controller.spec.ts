// Path: src/hello/hello.controller.spec.ts
// DESC: hello controller
'use strict';
import { Test } from '@nestjs/testing';
import { DataDTO, HelloJsonResponseDTO } from '../../dto/hello-json-response.dto';
import { HelloStringResponseDTO } from '../../dto/hello-string-response.dto';
import { HelloController } from './hello.controller';
import { HelloService } from '../../hello.service';

describe('HelloController', () => {
  let helloController: HelloController;
  let helloService: HelloService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    helloService = moduleRef.get<HelloService>(HelloService);
    helloController = moduleRef.get<HelloController>(HelloController);
  });

  describe('getHelloString', () => {
    it('should return Hello World string', () => {
      const expectedResult: HelloStringResponseDTO = 'Hello World!';
      jest.spyOn(helloService, 'getHelloString').mockReturnValue(expectedResult);

      const result = helloController.getHelloStringRest();

      expect(result).toBe(expectedResult);
      expect(helloService.getHelloString).toHaveBeenCalled();
    });
  });

  describe('getHelloJson', () => {
    it('should return Hello World JSON', () => {
      const expectedResult: HelloJsonResponseDTO = new HelloJsonResponseDTO(
        new DataDTO('Hello World!'),
      );
      jest.spyOn(helloService, 'getHelloJson').mockReturnValue(expectedResult);

      const result = helloController.getHelloJsonRest();

      expect(result).toEqual(expectedResult);
      expect(helloService.getHelloJson).toHaveBeenCalled();
    });
  });
});
