// Path: src/utils/metrics/metrics.module.ts
// DESC: Custom Local Logger Service
'use strict';
import { ConsoleLogger, Injectable } from '@nestjs/common';

export type LogLevel = 'output' | 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';
const DEBUG: boolean = process.env.DEBUG === 'true';

@Injectable()
export class MyConsoleLogger extends ConsoleLogger {
  output(message: any, context?: string, logLevel?: LogLevel): void {
    // console.log(message, context, logLevel);
    this.log(message, context, 'output');
  }

  log(message: any, context?: string, logLevel?: LogLevel): void {
    if (!DEBUG && logLevel === 'output') {
      console.log(message.response);
    } else {
      const timestamp = new Date().toLocaleString();
      super.log(`[${timestamp}] ${context} - ${message}`);
    }
  }

  fatal(message: any, context?: string, logLevel?: LogLevel): void {
    const timestamp = new Date().toLocaleString();
    super.fatal(`[${timestamp}] ${context} - ${message}`);
  }

  error(message: any, trace?: string, context?: string, logLevel?: LogLevel): void {
    const timestamp = new Date().toLocaleString();
    super.error(`[${timestamp}] ${context} - ${message}`, trace);
  }

  warn(message: any, context?: string, logLevel?: LogLevel): void {
    const timestamp = new Date().toLocaleString();
    super.warn(`[${timestamp}] ${context} - ${message}`);
  }

  debug(message: any, context?: string, logLevel?: LogLevel): void {
    const timestamp = new Date().toLocaleString();
    super.debug(`[${timestamp}] ${context} - ${message}`);
  }

  verbose(message: any, context?: string, logLevel?: LogLevel): void {
    const timestamp = new Date().toLocaleString();
    super.verbose(`[${timestamp}] ${context} - ${message}`);
  }
}

export default MyConsoleLogger;
