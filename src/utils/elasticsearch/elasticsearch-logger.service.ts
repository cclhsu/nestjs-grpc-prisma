// Path: src/utils/logger/logger.service.ts
// DESC: https://docs.nestjs.com/techniques/logger
// npm install @nestjs/core @nestjs/common @nestjs/platform-express winston winston-elasticsearch prom-client express
'use strict';
// import { Injectable, LoggerService, Logger } from '@nestjs/common';
// import { createLogger, format, transports } from 'winston';
// import ElasticsearchTransport from 'winston-elasticsearch';

// @Injectable()
// export class ElasticsearchLoggerService implements LoggerService {
//   private readonly logger = createLogger({
//     level: 'info',
//     format: format.combine(
//       format.timestamp(),
//       format.json()
//     ),
//     transports: [
//       new ElasticsearchTransport({
//         level: 'info',
//         indexPrefix: 'nestjs-app-logs', // Change as needed
//         clientOpts: { node: 'http://elasticsearch-host:9200' }, // Elasticsearch server URL
//       }),
//     ],
//   });

//   log(message: string) {
//     this.logger.info(message);
//   }

//   error(message: string, trace: string) {
//     this.logger.error(message, trace);
//   }

//   warn(message: string) {
//     this.logger.warn(message);
//   }

//   debug(message: string) {
//     this.logger.debug(message);
//   }

//   verbose(message: string) {
//     this.logger.verbose(message);
//   }
// }

// export default ElasticsearchLoggerService;

export {};
