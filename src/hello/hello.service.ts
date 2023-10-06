// Path: src/hello/hello.controller.ts
// DESC: hello controller
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { HelloJsonResponseDTO } from './dto/hello-json-response.dto';
import { HelloStringResponseDTO } from './dto/hello-string-response.dto';
// import { PrometheusMetricsProvider } from '../../../utils/metrics/metrics.provider';
// import ElasticsearchLoggerService from '../../../utils/logger/logger.service';

// interface HelloInternalInterface {
//   getHelloString(): HelloStringResponseDTO;
//   getHelloJson(): HelloJsonResponseDTO;
// }

@Injectable()
export class HelloService {
  private readonly logger: Logger = new Logger(HelloService.name);
  // private readonly logger: ElasticsearchLoggerService,
  // private readonly PrometheusMetricsProvider: PrometheusMetricsProvider,

  getHelloString(): HelloStringResponseDTO {
    const helloStringResponse: HelloStringResponseDTO = 'Hello World!';
    this.logger.log(helloStringResponse);
    // this.PrometheusMetricsProvider.incrementCustomMetric();
    return helloStringResponse;
  }

  getHelloJson(): HelloJsonResponseDTO {
    const helloJsonResponse: HelloJsonResponseDTO = {
      data: { message: 'Hello, world!' },
    };
    this.logger.log(helloJsonResponse);
    // this.PrometheusMetricsProvider.incrementCustomMetric();
    return helloJsonResponse;
  }
}
