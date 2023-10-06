// Path: src/app-factory/service/service.main.ts
// DESC: This is the main entry point for the service application.
'use strict';
// import { ValidationPipe } from '@nestjs/common';
import { INestApplication, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { ServiceModule } from './service.module';
import { setupSwagger } from '../../utils/openapi/swagger.utils';

// import {
//   InstanceToPlainTransformInterceptor,
//   PlainToInstanceTransformInterceptor,
// } from './utils/interceptor/transform-interceptor';

// nvm use stable
// npx prisma generate --schema="db/prisma/schema.prisma"
// npm run start

// async function bootstrap() {
//   const DEBUG: boolean = configService.get<boolean>('DEBUG', false);
//   const LOG_LEVEL: LogLevel[] = DEBUG
//     ? ['log', 'fatal', 'error', 'warn', 'debug', 'verbose']
//     : ['fatal', 'error', 'warn'];

//   const app: INestApplication<any> = await NestFactory.create(ServiceModule, {
//     httpsOptions: isHttps ? getHttpsOptions(configService) : undefined,
//     logger: LOG_LEVEL,
//   });

//   const configService: ConfigService = app.get(ConfigService);
//   const host = configService.get<string>('SERVICE_HOST') || 'localhost';
//   const port = configService.get<number>('SERVICE_PORT') || 3001;

//   // // Use the ValidationPipe class to enable validation
//   // app.useGlobalPipes(new ValidationPipe({ transform: true }));

//   // Enable CORS
//   app.enableCors({
//     origin: true,
//     methods: 'GET, POST, PUT, DELETE, OPTIONS',
//     allowedHeaders: 'Content-Type, Authorization',
//   });

//   // Configure Swagger to serve the document at the specified route
//   await setupHttpSwagger(app, host, port);

//   // const reflector = app.get(Reflector);

//   // // Retrieve the metadata for the TransformInterceptor
//   // const transformInterceptorMetadata =
//   //   reflector.get<InstanceToPlainTransformInterceptor>(
//   //     'InstanceToPlainTransformInterceptor',
//   //     ServiceModule,
//   //   );
//   // const transformInterceptor = new InstanceToPlainTransformInterceptor(
//   //   transformInterceptorMetadata,
//   // );

//   // // Register the TransformInterceptor as a global interceptor
//   // app.useGlobalInterceptors(transformInterceptor);

//   // // Retrieve the metadata for the PlainToClassInterceptor
//   // const plainToClassInterceptorMetadata =
//   //   reflector.get<PlainToInstanceTransformInterceptor>(
//   //     'PlainToInstanceTransformInterceptor',
//   //     ServiceModule,
//   //   );
//   // const plainToClassInterceptor = new PlainToInstanceTransformInterceptor(
//   //   plainToClassInterceptorMetadata,
//   // );

//   // // Register the PlainToClassInterceptor as a global interceptor
//   // app.useGlobalInterceptors(plainToClassInterceptor);

//   await app.listen(port);
//   // console.log(`Application is running on: ${await app.getUrl()}`);
//   console.log(`Application is running on: http://${host}:${port}`);
//   console.log(`API Document is running on: http://${host}:${port}/doc/openapi`);
// }

export async function bootstrap() {
  try {
    // Load configuration from a dedicated service or module
    const configService: ConfigService = new ConfigService();

    // Create HTTP server
    const httpApp: INestApplication = await createServer(configService, false);

    // Create HTTPS server if enabled
    const httpsEnabled: boolean = await configService.get<boolean>('HTTPS_ENABLED', false);
    console.log(`HTTPS_ENABLED: ${httpsEnabled}`);
    let httpsApp: INestApplication | undefined;
    if (httpsEnabled === true) {
      try {
        httpsApp = await createServer(configService, true);
      } catch (err) {
        console.error('Failed to create HTTPS server', err);
        process.exit(1);
      }
    }

    // Start HTTP server
    const httpOptions: { host: string; port: number } = getConfiguredServerOptions(
      configService,
      false,
    );
    httpApp.listen(httpOptions.port, () => {
      console.log(`HTTP server is running on: http://${httpOptions.host}:${httpOptions.port}`);
      console.log(
        `API Document is running on: http://${httpOptions.host}:${httpOptions.port}/doc/openapi`,
      );
    });

    // Start HTTPS server if enabled
    if (httpsEnabled === true && httpsApp !== undefined) {
      console.log(`HTTPS_ENABLED: ${httpsEnabled}`);
      const httpsOptions = getConfiguredServerOptions(configService, true);
      httpsApp?.listen(httpsOptions.port, () => {
        console.log(
          `HTTPS server is running on: https://${httpsOptions.host}:${httpsOptions.port}`,
        );
        console.log(
          `API Document is running on: https://${httpsOptions.host}:${httpsOptions.port}/doc/openapi`,
        );
      });
    }
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // Exit with an error code
  }
}

async function createServer(
  configService: ConfigService,
  isHttps: boolean,
): Promise<INestApplication> {
  const DEBUG: boolean = configService.get<boolean>('DEBUG', false);
  const LOG_LEVEL: LogLevel[] = DEBUG
    ? ['log', 'fatal', 'error', 'warn', 'debug', 'verbose']
    : ['log', 'fatal', 'error', 'warn'];

  const app: INestApplication<any> = await NestFactory.create(ServiceModule, {
    httpsOptions: isHttps ? getHttpsOptions(configService) : undefined,
    logger: LOG_LEVEL,
  });

  // Enable CORS
  app.enableCors({
    origin: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Configure Swagger
  await setupSwagger(
    app,
    configService.get<string>('SERVICE_HOST') || 'localhost',
    configService.get<number>('SERVICE_PORT') || 3001,
  );

  return app;
}

function getConfiguredServerOptions(
  configService: ConfigService,
  isHttps: boolean,
): { host: string; port: number } {
  const hostKey: string = isHttps ? 'HTTPS_HOST' : 'HTTP_HOST';
  const portKey: string = isHttps ? 'HTTPS_PORT' : 'HTTP_PORT';

  return {
    host: configService.get<string>(hostKey) || 'localhost',
    port: configService.get<number>(portKey) || (isHttps ? 443 : 3001),
  };
}

function getHttpsOptions(configService: ConfigService): { key: any; cert: any } {
  return {
    key: fs.readFileSync(configService.get<string>('HTTPS_KEY') || 'pki/servers/server-key.pem'),
    cert: fs.readFileSync(
      configService.get<string>('HTTPS_CERT') || 'pki/servers/server-certificate.pem',
    ),
  };
}

export default bootstrap;
