// Path: src/hello/hello.controller.spec.ts
// DESC: hello controller
'use strict';
import { Test } from '@nestjs/testing';
import { DataDTO, HelloJsonResponseDTO } from '../../dto/hello-json-response.dto';
import { HelloStringResponseDTO } from '../../dto/hello-string-response.dto';
import { HelloController } from './hello-service.controller';
import { HelloService } from '../../hello.service';
import { HelloStringResponse, HelloJsonResponse } from '../../../../generated/grpc/hello/hello.pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

describe('HelloController', () => {
  let controller: HelloController;
  let service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    controller = module.get<HelloController>(HelloController);
    service = module.get<HelloService>(HelloService);
  });

  describe('getHelloString', () => {
    it('should return HelloStringResponse', () => {
      const response: HelloStringResponse = new HelloStringResponse();
      response.setMessage('Hello, world!');
      jest.spyOn(service, 'getHelloString').mockReturnValue(response);

      const result = controller.getHelloString(new Empty());

      expect(result).toBe(response);
      expect(service.getHelloString).toHaveBeenCalledWith(new Empty());
    });
  });

  describe('getHelloJson', () => {
    it('should return HelloJsonResponse', () => {
      const response: HelloJsonResponse = new HelloJsonResponse();
      // Set the necessary properties in the response
      response.setData({ message: 'Hello, world!' });
      jest.spyOn(service, 'getHelloJson').mockReturnValue(response);

      const result = controller.getHelloJson(new Empty());

      expect(result).toBe(response);
      expect(service.getHelloJson).toHaveBeenCalledWith(new Empty());
    });

    describe('getHelloStringRest', () => {
      it('should return HelloStringResponse', () => {
        const response: HelloStringResponse = new HelloStringResponse();
        response.setMessage('Hello, world!');
        jest.spyOn(service, 'getHelloString').mockReturnValue(response);

        return request(controller.getHelloStringRest())
          .get('/hello/string')
          .expect(HttpStatus.OK)
          .expect('Content-Type', 'text/plain')
          .expect('Hello, world!');
      });
    });

    describe('getHelloJsonRest', () => {
      it('should return HelloJsonResponse', () => {
        const response: HelloJsonResponse = new HelloJsonResponse();
        // Set the necessary properties in the response
        response.setData({ message: 'Hello, world!' });
        jest.spyOn(service, 'getHelloJson').mockReturnValue(response);

        return request(controller.getHelloJsonRest())
          .get('/hello/json')
          .expect(HttpStatus.OK)
          .expect('Content-Type', 'application/json')
          .expect({ data: { message: 'Hello, world!' } });
      });
    });
  });

  // Add test cases for the REST endpoints (getHelloStringRest and getHelloJsonRest) if needed
});
