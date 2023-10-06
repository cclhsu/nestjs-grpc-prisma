// Path: src/utils/prisma/prisma-mongo.service.ts
// DESC: prisma mongo service
// URL: https://www.prisma.io/docs/guides/other/multi-schema
// URL: https://dulanwirajith.medium.com/how-to-connect-multiple-databases-using-prisma-in-nest-js-e8908529ba38
// 'use strict';
// import { PrismaClient } from '@prisma-mongo/prisma/client';
// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

// @Injectable()
// export class PrismaMongoService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }

// export default PrismaMongoService;

export {};
