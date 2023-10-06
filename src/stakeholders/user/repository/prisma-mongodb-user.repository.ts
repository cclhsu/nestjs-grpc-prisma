// Path: src/stakeholders/user/repository/prisma-mongodb-user.repository.ts
// DESC: Implement the Prisma strategy for the user repository
'use strict';
// import { Logger, NotFoundException } from '@nestjs/common';
// import {
//   Prisma,
//   PrismaClient,
//   CommonDateEntity as PrismaCommonDateEntity,
//   UserContentEntity as PrismaUserContentUserEntity,
//   UserEntity as PrismaUserEntity,
//   UserMetadataEntity as PrismaUserMetadataUserEntity,
// } from '../../../generated/prisma/postgres/client';
// import { CommonDateDTO } from '../../../common/dto';
// import { CommonDateEntity } from '../../../common/entity';
// import {
//   CreateUserRequestDTO,
//   UpdateUserRequestDTO,
//   UserContentDTO,
//   UserIdUuidDTO,
//   UserMetadataDTO,
// } from '../dto';
// import { UserContentEntity, UserEntity, UserMetadataEntity } from '../entity';
// import { UserRepositoryInterface } from './user-repository.interface';

// export class PrismaMongoDBUserRepository implements UserRepositoryInterface {
//   private readonly logger: Logger = new Logger(PrismaMongoDBUserRepository.name);
//   private readonly prisma: PrismaClient;
//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
//     const prismaUserEntities: PrismaUserEntity[] | null = await this.prisma.userEntity.findMany();
//     if (!prismaUserEntities || prismaUserEntities.length === 0) {
//       throw new NotFoundException('No users found');
//     }

//     const userIdUuidDTOs: UserIdUuidDTO[] = prismaUserEntities.map((prismaUserEntity) => {
//       if (!prismaUserEntity) {
//         throw new NotFoundException('Invalid user data found');
//       }
//       return new UserIdUuidDTO(prismaUserEntity.ID, prismaUserEntity.UUID);
//     });

//     return userIdUuidDTOs;
//   }

//   async listUsers(): Promise<UserEntity[]> {
//     const prismaUserEntities: PrismaUserEntity[] = await this.prisma.userEntity.findMany();
//     const userEntities: UserEntity[] = [];

//     for (const prismaUserEntity of prismaUserEntities) {
//       const prismaUserMetadata: PrismaUserMetadataUserEntity | null =
//         await this.prisma.userMetadataEntity.findUnique({
//           where: {
//             UUID: prismaUserEntity.metadataUUID,
//           },
//         });
//       if (!prismaUserMetadata) {
//         throw new NotFoundException(`User metadata not found for UUID: ${prismaUserEntity.UUID}`);
//       }

//       const prismaUserContent: PrismaUserContentUserEntity | null =
//         await this.prisma.userContentEntity.findUnique({
//           where: {
//             UUID: prismaUserEntity.contentUUID,
//           },
//         });
//       if (!prismaUserContent) {
//         throw new NotFoundException(`User content not found for UUID: ${prismaUserEntity.UUID}`);
//       }

//       const prismaCommonDate: PrismaCommonDateEntity | null =
//         await this.prisma.commonDateEntity.findUnique({
//           where: {
//             UUID: prismaUserMetadata.datesUUID,
//           },
//         });
//       if (!prismaCommonDate) {
//         throw new NotFoundException(`Common date not found for UUID: ${prismaUserEntity.UUID}`);
//       }

//       const userEntity: UserEntity = new UserEntity(
//         prismaUserEntity.ID,
//         prismaUserEntity.UUID,
//         new UserMetadataEntity(
//           prismaUserMetadata.name,
//           new CommonDateEntity(
//             new Date(prismaCommonDate.createdAt || 0),
//             prismaCommonDate.createdBy,
//             new Date(prismaCommonDate.updatedAt || 0),
//             prismaCommonDate.updatedBy,
//             prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
//             prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
//             prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
//             prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
//             prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
//             prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
//           ),
//         ),
//         new UserContentEntity(
//           prismaUserContent.email,
//           prismaUserContent.phone,
//           prismaUserContent.firstName,
//           prismaUserContent.lastName,
//           prismaUserContent.projectRoles,
//           prismaUserContent.scrumRoles,
//           prismaUserContent.password,
//         ),
//       );

//       userEntities.push(userEntity);
//     }

//     return userEntities;
//   }

//   async getUser(UUID: string): Promise<UserEntity> {
//     const prismaUserEntity: PrismaUserEntity | null = await this.prisma.userEntity.findUnique({
//       where: {
//         UUID: UUID,
//       },
//     });
//     if (!prismaUserEntity) {
//       throw new NotFoundException(`User not found for UUID: ${UUID}`);
//     }

//     const prismaUserMetadata: PrismaUserMetadataUserEntity | null =
//       await this.prisma.userMetadataEntity.findUnique({
//         where: {
//           UUID: prismaUserEntity.metadataUUID,
//         },
//       });
//     if (!prismaUserMetadata) {
//       throw new NotFoundException(`UserMetadata not found for user UUID: ${UUID}`);
//     }

//     const prismaUserContent: PrismaUserContentUserEntity | null =
//       await this.prisma.userContentEntity.findUnique({
//         where: {
//           UUID: prismaUserEntity.contentUUID,
//         },
//       });
//     if (!prismaUserContent) {
//       throw new NotFoundException(`UserContent not found for UUID: ${UUID}`);
//     }

//     const prismaCommonDate: PrismaCommonDateEntity | null =
//       await this.prisma.commonDateEntity.findUnique({
//         where: {
//           UUID: prismaUserMetadata.datesUUID,
//         },
//       });
//     if (!prismaCommonDate) {
//       throw new NotFoundException(`CommonDate not found for user UUID: ${UUID}`);
//     }

//     return new UserEntity(
//       prismaUserEntity.ID,
//       prismaUserEntity.UUID,
//       new UserMetadataEntity(
//         prismaUserMetadata.name,
//         new CommonDateEntity(
//           new Date(prismaCommonDate.createdAt || 0), // Use a default value or handle null appropriately
//           prismaCommonDate.createdBy,
//           new Date(prismaCommonDate.updatedAt || 0), // Use a default value or handle null appropriately
//           prismaCommonDate.updatedBy,
//           prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
//           prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
//           prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
//           prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
//           prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
//           prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
//         ),
//       ),
//       new UserContentEntity(
//         prismaUserContent.email,
//         prismaUserContent.phone,
//         prismaUserContent.firstName,
//         prismaUserContent.lastName,
//         prismaUserContent.projectRoles,
//         prismaUserContent.scrumRoles,
//         prismaUserContent.password,
//       ),
//     );
//   }

//   async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity> {
//     try {
//       const userEntity: PrismaUserEntity = await this.prisma.userEntity.create({
//         data: {
//           ID: createUserRequestDTO.ID,
//           UUID: createUserRequestDTO.UUID,
//           metadata: {
//             create: {
//               name: createUserRequestDTO.metadata.name,
//               dates: {
//                 create: {
//                   createdAt: createUserRequestDTO.metadata.dates.createdAt,
//                   createdBy: createUserRequestDTO.metadata.dates.createdBy,
//                   updatedAt: createUserRequestDTO.metadata.dates.updatedAt,
//                   updatedBy: createUserRequestDTO.metadata.dates.updatedBy,
//                   startedAt: createUserRequestDTO.metadata.dates.startedAt,
//                   startedBy: createUserRequestDTO.metadata.dates.startedBy,
//                   startDate: createUserRequestDTO.metadata.dates.startDate,
//                   endDate: createUserRequestDTO.metadata.dates.endDate,
//                   completedAt: createUserRequestDTO.metadata.dates.completedAt,
//                   completedBy: createUserRequestDTO.metadata.dates.completedBy,
//                 },
//               },
//             },
//           },
//           content: {
//             create: {
//               email: createUserRequestDTO.content.email,
//               phone: createUserRequestDTO.content.phone,
//               firstName: createUserRequestDTO.content.firstName,
//               lastName: createUserRequestDTO.content.lastName,
//               projectRoles: createUserRequestDTO.content.projectRoles,
//               scrumRoles: createUserRequestDTO.content.scrumRoles,
//               password: createUserRequestDTO.content.password,
//             },
//           },
//         },
//       });
//       if (!userEntity) {
//         throw new Error(`User ${createUserRequestDTO.ID} cannot be created`);
//       }

//       return this.getUser(userEntity.UUID);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Create user failed: ${error.message}`);
//     }
//   }

//   async updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity> {
//     try {
//       const prismaUserEntity: PrismaUserEntity = await this.prisma.userEntity.update({
//         where: { UUID: UUID },
//         data: {
//           metadata: {
//             update: {
//               name: updateUserRequestDTO.metadata.name,
//               dates: {
//                 update: {
//                   createdAt: updateUserRequestDTO.metadata.dates.createdAt,
//                   createdBy: updateUserRequestDTO.metadata.dates.createdBy,
//                   updatedAt: updateUserRequestDTO.metadata.dates.updatedAt,
//                   updatedBy: updateUserRequestDTO.metadata.dates.updatedBy,
//                   startedAt: updateUserRequestDTO.metadata.dates.startedAt,
//                   startedBy: updateUserRequestDTO.metadata.dates.startedBy,
//                   startDate: updateUserRequestDTO.metadata.dates.startDate,
//                   endDate: updateUserRequestDTO.metadata.dates.endDate,
//                   completedAt: updateUserRequestDTO.metadata.dates.completedAt,
//                   completedBy: updateUserRequestDTO.metadata.dates.completedBy,
//                 },
//               },
//             },
//           },
//           content: {
//             update: {
//               email: updateUserRequestDTO.content.email,
//               phone: updateUserRequestDTO.content.phone,
//               firstName: updateUserRequestDTO.content.firstName,
//               lastName: updateUserRequestDTO.content.lastName,
//               projectRoles: updateUserRequestDTO.content.projectRoles,
//               scrumRoles: updateUserRequestDTO.content.scrumRoles,
//               password: updateUserRequestDTO.content.password,
//             },
//           },
//         },
//       });
//       if (!prismaUserEntity) {
//         throw new Error(`User ${UUID} cannot be updated`);
//       }

//       return this.getUser(prismaUserEntity.UUID);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Update user failed: ${error.message}`);
//     }
//   }

//   async deleteUser(UUID: string): Promise<UserEntity> {
//     try {
//       // Get the user entity first to return it later
//       const userEntity: UserEntity = await this.getUser(UUID);
//       const prismaUserEntity: PrismaUserEntity | null = await this.prisma.userEntity.findUnique({
//         where: { UUID },
//       });
//       if (!prismaUserEntity) {
//         throw new NotFoundException(`User not found for UUID: ${UUID}`);
//       }

//       const { metadataUUID, contentUUID }: PrismaUserEntity = prismaUserEntity;

//       const prismaUserMetadata: PrismaUserMetadataUserEntity | null =
//         await this.prisma.userMetadataEntity.findUnique({
//           where: { UUID: metadataUUID },
//         });
//       if (!prismaUserMetadata) {
//         throw new NotFoundException(`User metadata not found for UUID: ${metadataUUID}`);
//       }

//       const prismaUserContent: PrismaUserContentUserEntity | null =
//         await this.prisma.userContentEntity.findUnique({
//           where: { UUID: contentUUID },
//         });
//       if (!prismaUserContent) {
//         throw new NotFoundException(`User content not found for UUID: ${contentUUID}`);
//       }

//       // Finally, delete the user using Prisma
//       await this.prisma.userEntity.delete({ where: { UUID } });

//       // Delete user content and user metadata using Prisma
//       await Promise.all([
//         this.prisma.userContentEntity.delete({ where: { UUID: contentUUID } }),
//         this.prisma.userMetadataEntity.delete({ where: { UUID: metadataUUID } }),
//       ]);

//       // Delete the CommonDateEntity using Prisma
//       const { datesUUID } = prismaUserMetadata;

//       const deletedCommonDate: PrismaCommonDateEntity = await this.prisma.commonDateEntity.delete({
//         where: { UUID: datesUUID },
//       });
//       if (!deletedCommonDate) {
//         throw new Error(`Common date ${datesUUID} cannot be deleted`);
//       }

//       // Return the deleted user entity
//       return userEntity;
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Delete user failed: ${error.message}`);
//     }
//   }

//   async getUserByID(ID: string): Promise<UserEntity> {
//     try {
//       const userEntity: PrismaUserEntity | null = await this.prisma.userEntity.findUnique({
//         where: {
//           ID: ID,
//         },
//       });
//       if (!userEntity) {
//         throw new NotFoundException(`User not found for ID: ${ID}`);
//       }

//       return this.getUser(userEntity.UUID);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Get user by ID failed: ${error.message}`);
//     }
//   }

//   async getUserByName(name: string): Promise<UserEntity> {
//     try {
//       const userEntity: PrismaUserEntity | null = await this.prisma.userEntity.findFirst({
//         where: {
//           metadata: {
//             name: name,
//           },
//         },
//       });
//       if (!userEntity) {
//         throw new NotFoundException(`User not found for name: ${name}`);
//       }

//       return this.getUser(userEntity.UUID);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Get user by name failed: ${error.message}`);
//     }
//   }

//   async getUserByEmail(email: string): Promise<UserEntity> {
//     try {
//       const userEntity: PrismaUserEntity | null = await this.prisma.userEntity.findFirst({
//         where: {
//           content: {
//             email: email,
//           },
//         },
//       });
//       if (!userEntity) {
//         throw new NotFoundException(`User not found for email: ${email}`);
//       }

//       return this.getUser(userEntity.UUID);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Get user by email failed: ${error.message}`);
//     }
//   }

//   async updateUserMetadata(
//     UUID: string,
//     updatedMetadata: UserMetadataDTO,
//   ): Promise<UserMetadataDTO> {
//     try {
//       const prismaUserEntity: PrismaUserEntity | null = await this.prisma.userEntity.findUnique({
//         where: {
//           UUID: UUID,
//         },
//       });
//       if (!prismaUserEntity) {
//         throw new NotFoundException(`User not found for UUID: ${UUID}`);
//       }

//       const data: Prisma.UserMetadataEntityUpdateInput = {
//         UUID: prismaUserEntity.metadataUUID,
//         name: updatedMetadata.name,
//         dates: {
//           update: {
//             createdAt: updatedMetadata.dates.createdAt,
//             createdBy: updatedMetadata.dates.createdBy,
//             updatedAt: updatedMetadata.dates.updatedAt,
//             updatedBy: updatedMetadata.dates.updatedBy,
//             startedAt: updatedMetadata.dates.startedAt,
//             startedBy: updatedMetadata.dates.startedBy,
//             startDate: updatedMetadata.dates.startDate,
//             endDate: updatedMetadata.dates.endDate,
//             completedAt: updatedMetadata.dates.completedAt,
//             completedBy: updatedMetadata.dates.completedBy,
//           },
//         },
//       };

//       // Update the user metadata directly in the database
//       const updatedUserMetadata: PrismaUserMetadataUserEntity | null =
//         await this.prisma.userMetadataEntity.update({
//           where: { UUID: prismaUserEntity.metadataUUID },
//           data,
//         });
//       if (!updatedUserMetadata) {
//         throw new NotFoundException(`UserMetadata not found for UUID: ${UUID}`);
//       }

//       const prismaCommonDate: PrismaCommonDateEntity | null =
//         await this.prisma.commonDateEntity.findUnique({
//           where: {
//             UUID: updatedUserMetadata.datesUUID,
//           },
//         });
//       if (!prismaCommonDate) {
//         throw new NotFoundException(`CommonDate not found for user UUID: ${UUID}`);
//       }

//       // Create a CommonDateDTO DTO based on the updated data
//       const commonDateDTO: CommonDateDTO = new CommonDateDTO(
//         new Date(prismaCommonDate.createdAt || 0),
//         prismaCommonDate.createdBy,
//         new Date(prismaCommonDate.updatedAt || 0),
//         prismaCommonDate.updatedBy,
//         prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
//         prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
//         prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
//         prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
//         prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
//         prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
//       );

//       return new UserMetadataDTO(updatedMetadata.name, commonDateDTO);
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Update user metadata failed: ${error.message}`);
//     }
//   }

//   async updateUserContent(UUID: string, updatedContent: UserContentDTO): Promise<UserContentDTO> {
//     try {
//       const prismaUserEntity: PrismaUserEntity | null = await this.prisma.userEntity.findUnique({
//         where: {
//           UUID: UUID,
//         },
//       });
//       if (!prismaUserEntity) {
//         throw new NotFoundException(`User not found for UUID: ${UUID}`);
//       }

//       const data: Prisma.UserContentEntityUpdateInput = {
//         UUID: prismaUserEntity.contentUUID,
//         email: updatedContent.email,
//         phone: updatedContent.phone,
//         firstName: updatedContent.firstName,
//         lastName: updatedContent.lastName,
//         projectRoles: updatedContent.projectRoles,
//         scrumRoles: updatedContent.scrumRoles,
//         password: updatedContent.password,
//       };

//       // Update the user content directly in the database
//       const updatedUserContent: PrismaUserContentUserEntity | null =
//         await this.prisma.userContentEntity.update({
//           where: { UUID: prismaUserEntity.contentUUID },
//           data,
//         });
//       if (!updatedUserContent) {
//         throw new NotFoundException(`UserContent not found for UUID: ${UUID}`);
//       }

//       return new UserContentDTO(
//         updatedUserContent.email,
//         updatedUserContent.phone,
//         updatedUserContent.firstName,
//         updatedUserContent.lastName,
//         updatedUserContent.projectRoles,
//         updatedUserContent.scrumRoles,
//         updatedUserContent.password,
//       );
//     } catch (error: any) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       throw new Error(`Update user content failed: ${error.message}`);
//     }
//   }

//   async getUserMetadata(UUID: string): Promise<UserMetadataDTO> {
//     try {
//       // Fetch user metadata and common date data in parallel using Promise.all
//       const [prismaUserMetadata, prismaCommonDate] = await Promise.all([
//         this.prisma.userMetadataEntity.findUnique({
//           where: { UUID: UUID },
//         }),
//         this.prisma.commonDateEntity.findUnique({
//           where: { UUID: UUID },
//         }),
//       ]);

//       if (!prismaUserMetadata) {
//         throw new NotFoundException(`UserMetadata not found for user UUID: ${UUID}`);
//       }

//       if (!prismaCommonDate) {
//         throw new NotFoundException(`CommonDate not found for user UUID: ${UUID}`);
//       }

//       // Create the UserMetadataDTO instance using destructuring and object shorthand
//       const { name } = prismaUserMetadata;
//       // Create a CommonDateDTO DTO based on the updated data
//       const commonDateDTO: CommonDateDTO = new CommonDateDTO(
//         new Date(prismaCommonDate.createdAt || 0),
//         prismaCommonDate.createdBy,
//         new Date(prismaCommonDate.updatedAt || 0),
//         prismaCommonDate.updatedBy,
//         prismaCommonDate.startedAt ? new Date(prismaCommonDate.startedAt) : undefined,
//         prismaCommonDate.startedBy ? prismaCommonDate.startedBy : undefined,
//         prismaCommonDate.startDate ? new Date(prismaCommonDate.startDate) : undefined,
//         prismaCommonDate.endDate ? new Date(prismaCommonDate.endDate) : undefined,
//         prismaCommonDate.completedAt ? new Date(prismaCommonDate.completedAt) : undefined,
//         prismaCommonDate.completedBy ? prismaCommonDate.completedBy : undefined,
//       );

//       return new UserMetadataDTO(name, commonDateDTO);
//     } catch (error: any) {
//       throw new Error(`Failed to fetch user metadata: ${error.message}`);
//     }
//   }

//   async getUserContent(UUID: string): Promise<UserContentDTO> {
//     try {
//       const prismaUserContent: PrismaUserContentUserEntity | null =
//         await this.prisma.userContentEntity.findUnique({
//           where: { UUID: UUID },
//         });
//       if (!prismaUserContent) {
//         throw new NotFoundException(`UserContent not found for user UUID: ${UUID}`);
//       }

//       const { email, phone, firstName, lastName, projectRoles, scrumRoles, password } =
//         prismaUserContent;

//       return new UserContentDTO(
//         email,
//         phone,
//         firstName,
//         lastName,
//         projectRoles,
//         scrumRoles,
//         password,
//       );
//     } catch (error: any) {
//       throw new Error(`Failed to fetch user content: ${error.message}`);
//     }
//   }
// }

// export default PrismaMongoDBUserRepository;

export {};
