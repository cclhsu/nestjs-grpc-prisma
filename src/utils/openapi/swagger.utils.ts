// Path: src/utils/openapi/https/https-swagger.utils.ts
// DESC: This file contains the utility functions for the HTTPS Swagger UI.
'use strict';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'yaml';

export async function setupSwagger(app: INestApplication, host: string, port: number) {
  // Create options for the Swagger document
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('HTTPS API')
    .setDescription('HTTPS API documentation')
    .setVersion('1.0')
    .build();

  // Generate the Swagger document
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

  // Customize the Swagger document to include user input for host and port
  const swaggerCustomizationOptions = {
    swaggerOptions: {
      servers: [
        {
          url: '{protocol}://{host}:{port}',
          variables: {
            protocol: {
              enum: ['http', 'https'],
              default: 'https',
            },
            host: {
              default: host,
            },
            port: {
              default: port,
            },
          },
        },
      ],
      swaggerOptions: {
        docExpansion: 'none',
      },
    },
    explorer: true,
    swaggerPath: 'https-api-docs',
    swaggerDocument: document,
  };

  const dir: string = 'doc/openapi';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Save the Swagger JSON document to a file
  fs.writeFileSync(`${dir}/api-doc.json`, JSON.stringify(document));
  fs.writeFileSync(`${dir}/api-doc.yaml`, YAML.stringify(document, {}));

  // Configure Swagger to serve the document at the specified route
  SwaggerModule.setup(dir, app, document, swaggerCustomizationOptions);

  return document;
}
