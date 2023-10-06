// Path: src/utils/prisma/prisma-postgres.service.ts
// DESC: prisma postgres service
// URL: https://www.prisma.io/docs/guides/other/multi-schema
// URL: https://dulanwirajith.medium.com/how-to-connect-multiple-databases-using-prisma-in-nest-js-e8908529ba38
// 'use strict';
// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client/scripts/default-index';

// @Injectable()
// export class PrismaPostgresService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }

// export default PrismaPostgresService;

export {};
