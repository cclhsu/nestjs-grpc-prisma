// Path: src/utils/middleware/grpc-request-logger.middleware.ts
// DESC: This middleware is used to log gRPC requests and responses.
'use strict';
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction } from 'express';
// import { grpc } from '@nestjs/microservices';

// @Injectable()
// export class GrpcRequestLoggerMiddleware implements NestMiddleware {
//   use(call: grpc.ServerUnaryCall<any>, next: NextFunction) {
//     const start = process.hrtime();

//     // Log the gRPC method name and request data
//     console.log(`gRPC Request received: ${call.type.name}/${call.method}`);
//     console.log('Request Data:');
//     console.log(JSON.stringify(call.request, null, 2));

//     // Hook into the call's end event to log the response
//     call.on('end', () => {
//       const end = process.hrtime(start);
//       const executionTime = `${(end[0] * 1e9 + end[1]) / 1e6} ms`;

//       console.log(`gRPC Response sent for ${call.type.name}/${call.method} in ${executionTime}`);
//       console.log('Response Data:');
//       console.log(JSON.stringify(call.response, null, 2));
//     });

//     // Continue processing the gRPC call
//     next();
//   }
// }
