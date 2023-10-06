// Path: src/hello/hello.controller.ts
// DESC: hello controller
'use strict';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HelloJsonResponseDTO } from '../../dto/hello-json-response.dto';
import { HelloStringResponseDTO } from '../../dto/hello-string-response.dto';
import { HelloService } from '../../hello.service';
// import { PrometheusMetricsProvider } from '../../../utils/metrics/metrics.provider';
// import ElasticsearchLoggerService from
// '../../../utils/logger/logger.service';

// interface HelloExternalInterface {
//   getHelloString(): HelloStringResponseDTO;
//   getHelloJson(): HelloJsonResponseDTO;
// }

@ApiTags('Hello')
@Controller('hello')
export class HelloController {
  // private readonly logger: Logger = new Logger(HelloController.name);
  // private readonly logger: ElasticsearchLoggerService,
  // private readonly PrometheusMetricsProvider: PrometheusMetricsProvider,
  constructor(private readonly helloService: HelloService) {}

  // curl -s -X GET http://0.0.0.0:3001/hello/string -w "\n"
  @ApiOperation({ summary: 'Get Hello String' })
  @ApiProduces('text/plain')
  @ApiResponse({
    status: 200,
    description: 'Hello String',
    type: HelloStringResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('string')
  getHelloStringRest(): HelloStringResponseDTO {
    // this.logger.log('Hello, Nest.js!');
    // this.PrometheusMetricsProvider.incrementCustomMetric();
    return this.helloService.getHelloString();
  }

  // curl -s -X GET http://0.0.0.0:3001/hello/json | jq
  @ApiOperation({ summary: 'Get Hello JSON' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'Hello JSON',
    type: HelloJsonResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('json')
  getHelloJsonRest(): HelloJsonResponseDTO {
    // this.logger.log('Hello, Nest.js!');
    // this.PrometheusMetricsProvider.incrementCustomMetric();
    return this.helloService.getHelloJson();
  }
}
