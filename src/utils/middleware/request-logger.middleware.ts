// Path: src/utils/middleware/request-logger.middleware.ts
// DESC:
'use strict';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;

      console.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} | IP: ${ip} | Status: ${statusCode} ${statusMessage} | Response Time: ${responseTime}ms`,
      );
    });

    next();
  }
}
