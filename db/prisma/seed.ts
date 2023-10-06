// ts-node prisma/seed.ts
// import { Prisma, PrismaClient } from '../../../generated/prisma/postgres/client';

// async function main() {
//   const prisma = new PrismaClient();

//   // Create a UserEntity
//   const user1 = await prisma.userEntity.create({
//     data: {
//       UUID: '00000000-0000-0000-0000-000000000001',
//       metadata: {
//         create: {
//           UUID: '00000000-0000-0000-0000-000000000001',
//           name: 'John Doe',
//           dates: {
//             create: {},
//           },
//         },
//       },
//       content: {
//         create: {
//           UUID: '00000000-0000-0000-0000-000000000001',
//           email: 'john.doe@mail.com',
//           phone: '1234567890',
//           firstName: 'John',
//           lastName: 'Doe',
//           password: 'changeme',
//           projectRoles: ['DEV'],
//           scrumRoles: ['PO'],
//         },
//       },
//     },
//   });

//   const user2 = await prisma.userEntity.create({
//     data: {
//       UUID: '00000000-0000-0000-0000-000000000002',
//       metadata: {
//         create: {
//           UUID: '00000000-0000-0000-0000-000000000002',
//           name: 'Jane Doe',
//           dates: {
//             create: {},
//           },
//         },
//       },
//       content: {
//         create: {
//           UUID: '00000000-0000-0000-0000-000000000002',
//           email: 'jane.doe@mail.com',
//           phone: '9876543210',
//           firstName: 'Jane',
//           lastName: 'Doe',
//           password: 'password123',
//           projectRoles: ['QA'],
//           scrumRoles: ['SM'],
//         },
//       },
//     },
//   });

//   const users = await prisma.userEntity.findMany();
//   console.log(users);

//   await prisma.$disconnect();
// }

// main()
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   })
//   .finally(() => {
//     process.exit(0);
//   });
