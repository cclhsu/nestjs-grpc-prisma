// Path: src/stakeholders/user/factory/grpc/user-service.controller.ts
// DESC: This is the main entry point for the grpc application.
'use strict';

import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateUserRequest,
  GetUserByEmailRequest,
  GetUserByIdRequest,
  GetUserByUsernameRequest,
  GetUserByUuidRequest,
  ListUsersContentResponse,
  ListUserIdUuid,
  ListUsersMetadataResponse,
  ListUsersResponse,
  UpdateUserContentRequest,
  UpdateUserMetadataRequest,
  UpdateUserRequest,
  User,
  UserContentResponse,
  UserMetadataResponse,
  UserServiceController as UserServiceControllerInterface,
} from 'generated/grpc/stakeholders/user/user.pb';
import { IdUuid, projectRoleTypes, scrumRoleTypes } from 'generated/grpc/common/common.pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY } from 'src/common/constant/project-role.constant';
import { SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY } from 'src/common/constant/scrum-role.constant';
import {
  CreateUserRequestDTO,
  UpdateUserContentRequestDTO,
  UpdateUserMetadataRequestDTO,
  UpdateUserRequestDTO,
  UserContentResponseDTO,
  UserIdUuidDTO,
  UserMetadataResponseDTO,
  UserResponseDTO,
} from '../../dto';
import { UserService } from '../../user.service';

// grpcurl -plaintext localhost:5000 list
// grpcurl -plaintext 0.0.0.0:5000 describe user.UserService
// grpcurl -plaintext -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 describe user.UserService
@Controller('user')
export class UserServiceController implements UserServiceControllerInterface {
  private logger: Logger = new Logger(UserServiceController.name);
  constructor(private readonly userService: UserService) {}

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 user.UserService/ListUserIdsAndUUIDs
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/ListUserIdsAndUUIDs
  @GrpcMethod('UserService', 'ListUserIdsAndUUIDs')
  async listUserIdsAndUuiDs(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListUserIdUuid> {
    try {
      const userIdUuids: UserIdUuidDTO[] = await this.userService.listUserIdsAndUUIDs();

      const userIdUuidResponse: IdUuid[] = userIdUuids.map(({ UUID, ID }) => ({
        UUID,
        ID,
      }));

      return { userIdUuids: userIdUuidResponse };
    } catch (error: any) {
      this.logger.error(error);
      return { userIdUuids: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 user.UserService/ListUsers
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/ListUsers
  @GrpcMethod('UserService', 'ListUsers')
  async listUsers(_request: Empty, _metadata: Metadata, ..._rest: any): Promise<ListUsersResponse> {
    try {
      const userResponseDTOs: UserResponseDTO[] = await this.userService.listUsers();
      const users: User[] = userResponseDTOs.map((userEntity) => ({
        UUID: userEntity.UUID,
        ID: userEntity.ID,
        metadata: {
          ...userEntity.metadata,
          dates: {
            ...userEntity.metadata.dates,
            createdAt: userEntity.metadata.dates.createdAt.toISOString(), // Convert Date to string
            updatedAt: userEntity.metadata.dates.updatedAt.toISOString(), // Convert Date to string
            startedAt: userEntity.metadata.dates.startedAt?.toISOString(), // Convert Date to string (if it's not undefined)
            startDate: userEntity.metadata.dates.startDate?.toISOString(), // Convert Date to string (if it's not undefined)
            endDate: userEntity.metadata.dates.endDate?.toISOString(), // Convert Date to string (if it's not undefined)
            completedAt: userEntity.metadata.dates.completedAt?.toISOString(), // Convert Date to string (if it's not undefined)
          },
        },
        content: {
          ...userEntity.content,
          projectRoles: userEntity.content.projectRoles.map(
            (role) => role as unknown as projectRoleTypes,
          ), // Map to projectRoleTypes
          scrumRoles: userEntity.content.scrumRoles.map(
            (role) => role as unknown as scrumRoleTypes,
          ), // Map to scrumRoleTypes
        },
      }));

      return { users };
    } catch (error: any) {
      this.logger.error(error);
      return { users: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 user.UserService/ListUsersMetadata
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/ListUsersMetadata
  @GrpcMethod('UserService', 'ListUsersMetadata')
  async listUsersMetadata(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListUsersMetadataResponse> {
    try {
      const userMetadataResponseDTOs: UserMetadataResponseDTO[] =
        await this.userService.listUsersWithMetadata();

      const userMetadataResponses: UserMetadataResponse[] = userMetadataResponseDTOs.map(
        (userEntity) => ({
          UUID: userEntity.UUID,
          ID: userEntity.ID,
          metadata: {
            name: userEntity.metadata.name,
            dates: {
              createdAt: userEntity.metadata.dates.createdAt.toUTCString(),
              createdBy: userEntity.metadata.dates.createdBy,
              updatedAt: userEntity.metadata.dates.updatedAt.toISOString(),
              updatedBy: userEntity.metadata.dates.updatedBy,
              startDate: userEntity.metadata.dates.startDate?.toISOString(),
              endDate: userEntity.metadata.dates.endDate?.toISOString(),
              startedAt: userEntity.metadata.dates.startedAt?.toISOString(),
              startedBy: userEntity.metadata.dates.startedBy,
              completedAt: userEntity.metadata.dates.completedAt?.toISOString(),
              completedBy: userEntity.metadata.dates.completedBy,
            },
          },
        }),
      );

      return { userMetadataResponses };
    } catch (error: any) {
      this.logger.error(error);
      return { userMetadataResponses: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 user.UserService/ListUsersContent
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/ListUsersContent
  @GrpcMethod('UserService', 'ListUsersContent')
  async listUsersContent(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListUsersContentResponse> {
    try {
      const userContentResponseDTOs: UserContentResponseDTO[] =
        await this.userService.listUsersWithContent();

      const userContentResponses: UserContentResponse[] = userContentResponseDTOs.map(
        (userEntity) => ({
          UUID: userEntity.UUID,
          ID: userEntity.ID,
          content: {
            ...userEntity.content,
            projectRoles: userEntity.content.projectRoles.map(
              (role) => role as unknown as projectRoleTypes,
            ), // Map to projectRoleTypes
            scrumRoles: userEntity.content.scrumRoles.map(
              (role) => role as unknown as scrumRoleTypes,
            ), // Map to scrumRoleTypes
          },
        }),
      );

      return { userContentResponses };
    } catch (error: any) {
      this.logger.error(error);
      return { userContentResponses: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 user.UserService/GetUser
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUser
  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserByUuidRequest, _metadata: Metadata, ..._rest: any): Promise<User> {
    const { UUID } = request;
    const userEntity: UserResponseDTO = await this.userService.getUser(UUID);

    const { metadata, content } = userEntity;

    const user: User = {
      UUID: userEntity.UUID,
      ID: userEntity.ID,
      metadata: {
        name: metadata.name,
        dates: {
          createdAt: metadata.dates.createdAt.toISOString(),
          createdBy: metadata.dates.createdBy,
          updatedAt: metadata.dates.updatedAt.toISOString(),
          updatedBy: metadata.dates.updatedBy,
          startDate: metadata.dates.startDate?.toISOString(),
          endDate: metadata.dates.endDate?.toISOString(),
          startedAt: metadata.dates.startedAt?.toISOString(),
          startedBy: metadata.dates.startedBy,
          completedAt: metadata.dates.completedAt?.toISOString(),
          completedBy: metadata.dates.completedBy,
        },
      },
      content: {
        email: content.email,
        phone: content.phone,
        lastName: content.lastName,
        firstName: content.firstName,
        projectRoles: content.projectRoles.map((role) => role as unknown as projectRoleTypes), // Map to projectRoleTypes
        scrumRoles: content.scrumRoles.map((role) => role as unknown as scrumRoleTypes), // Map to scrumRoleTypes
        password: content.password,
      },
    };

    // if (!user) {
    //   throw new RpcException({
    //     code: grpc.status.NOT_FOUND,
    //     message: `User with UUID: ${UUID} not found`,
    //   });
    // }

    return user;
  }

  // grpcurl -plaintext -d '{
  //   "ID": "john.doe",
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "metadata": {
  //     "name": "John Doe",
  //     "dates": {
  //       "createdAt": "2021-08-28T00:00:00.000Z",
  //       "createdBy": "john.doe",
  //       "updatedAt": "2021-08-28T00:00:00.000Z",
  //       "updatedBy": "john.doe",
  //       "startDate": "2021-08-28T00:00:00.000Z",
  //       "endDate": "2021-08-28T00:00:00.000Z",
  //       "startedAt": "2021-08-28T00:00:00.000Z",
  //       "startedBy": "john.doe",
  //       "completedAt": "2021-08-28T00:00:00.000Z",
  //       "completedBy": "john.doe"
  //     }
  //   },
  //   "content": {
  //     "email": "john.doe@mail.com",
  //     "phone": "123-456-7890",
  //     "lastName": "Doe",
  //     "firstName": "John",
  //     "projectRoles": ["PROJECT_ROLE_TYPES_PM"],
  //     "scrumRoles": ["SCRUM_ROLE_TYPES_PO"],
  //     "password": "P@ssw0rd!234"
  //   }
  // }' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/CreateUser
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest, _metadata: Metadata, ..._rest: any): Promise<User> {
    try {
      // Destructure request object
      const { UUID, ID, metadata, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !ID || !metadata || !content) {
        throw new Error('Invalid arguments');
      }

      // Create CreateUserRequestDTO
      const createUserRequestDTO: CreateUserRequestDTO = new CreateUserRequestDTO(
        ID,
        UUID,
        {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        },
        {
          ...content,
          projectRoles: content.projectRoles.map(
            (role) => PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY[role],
          ),
          scrumRoles: content.scrumRoles.map((role) => SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY[role]),
        },
      );

      // Call userService to create user
      const userResponseDTO: UserResponseDTO =
        await this.userService.createUser(createUserRequestDTO);

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error creating user',
      });
    }
  }

  // grpcurl -plaintext -d '{
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "metadata": {
  //     "name": "John Doe",
  //     "dates": {
  //       "createdAt": "2021-08-28T00:00:00.000Z",
  //       "createdBy": "john.doe",
  //       "updatedAt": "2021-08-28T00:00:00.000Z",
  //       "updatedBy": "john.doe",
  //       "startDate": "2021-08-28T00:00:00.000Z",
  //       "endDate": "2021-08-28T00:00:00.000Z",
  //       "startedAt": "2021-08-28T00:00:00.000Z",
  //       "startedBy": "john.doe",
  //       "completedAt": "2021-08-28T00:00:00.000Z",
  //       "completedBy": "john.doe"
  //     }
  //   },
  //   "content": {
  //     "email": "john.doe@mail.com",
  //     "phone": "123-456-7890",
  //     "lastName": "Doe",
  //     "firstName": "Jane",
  //     "projectRoles": ["PROJECT_ROLE_TYPES_PM"],
  //     "scrumRoles": ["SCRUM_ROLE_TYPES_PO"],
  //     "password": "P@ssw0rd!234"
  //   }
  // }' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/UpdateUser
  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(request: UpdateUserRequest, _metadata: Metadata, ..._rest: any): Promise<User> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, metadata, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !metadata || !content) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateUserRequestDTO
      const updateUserRequestDTO: UpdateUserRequestDTO = new UpdateUserRequestDTO(
        UUID,
        {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        },
        {
          ...content,
          projectRoles: content.projectRoles.map(
            (role) => PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY[role],
          ),
          scrumRoles: content.scrumRoles.map((role) => SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY[role]),
        },
      );

      // Logging CreateUserRequestDTO for debugging
      this.logger.log(JSON.stringify(updateUserRequestDTO, null, 2));

      // Call userService to update user
      const userResponseDTO: UserResponseDTO = await this.userService.updateUser(
        UUID,
        updateUserRequestDTO,
      );

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating user',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 user.UserService/DeleteUser
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/DeleteUser
  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(
    request: GetUserByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<User> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call userService to delete user
      const userResponseDTO: UserResponseDTO = await this.userService.deleteUser(UUID);

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: userResponseDTO.metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error deleting user',
      });
    }
  }

  // grpcurl -plaintext -d '{"ID": "john.doe"}' 0.0.0.0:5000 user.UserService/GetUserById
  // grpcurl -plaintext -d '{"ID": "john.doe"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUserById
  @GrpcMethod('UserService', 'GetUserById')
  async getUserById(
    request: GetUserByIdRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<User> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { ID } = request;

      // Check for missing or invalid arguments
      if (!ID) {
        throw new Error('Invalid arguments');
      }

      // Call userService to get user
      const userResponseDTO: UserResponseDTO = await this.userService.getUserByID(ID);

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: userResponseDTO.metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting user',
      });
    }
  }

  // grpcurl -plaintext -d '{"username": "john.doe"}' 0.0.0.0:5000 user.UserService/GetUserByName
  // grpcurl -plaintext -d '{"username": "john.doe"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUserByName
  @GrpcMethod('UserService', 'GetUserByName')
  async getUserByName(
    request: GetUserByUsernameRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<User> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { username } = request;

      // Check for missing or invalid arguments
      if (!username) {
        throw new Error('Invalid arguments');
      }

      // Call userService to get user
      const userResponseDTO: UserResponseDTO = await this.userService.getUserByName(username);

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: userResponseDTO.metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting user',
      });
    }
  }

  // grpcurl -plaintext -d '{"email": "john.doe@mail.com"}' 0.0.0.0:5000 user.UserService/GetUserByEmail
  // grpcurl -plaintext -d '{"email": "john.doe@mail.com"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUserByEmail
  @GrpcMethod('UserService', 'GetUserByEmail')
  async getUserByEmail(
    request: GetUserByEmailRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<User> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { email } = request;

      // Check for missing or invalid arguments
      if (!email) {
        throw new Error('Invalid arguments');
      }

      // Call userService to get user
      const userResponseDTO: UserResponseDTO = await this.userService.getUserByEmail(email);

      // Create the User object
      const user: User = {
        ID: userResponseDTO.ID,
        UUID: userResponseDTO.UUID,
        metadata: {
          name: userResponseDTO.metadata.name,
          dates: {
            ...userResponseDTO.metadata.dates,
            createdAt: userResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...userResponseDTO.content,
          projectRoles: userResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return user;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting user',
      });
    }
  }

  // grpcurl -plaintext -d '{
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "metadata": {
  //     "name": "John Doe",
  //     "dates": {
  //       "createdAt": "2021-08-28T00:00:00.000Z",
  //       "createdBy": "john.doe",
  //       "updatedAt": "2021-08-28T00:00:00.000Z",
  //       "updatedBy": "john.doe",
  //       "startDate": "2021-08-28T00:00:00.000Z",
  //       "endDate": "2021-08-28T00:00:00.000Z",
  //       "startedAt": "2021-08-28T00:00:00.000Z",
  //       "startedBy": "john.doe",
  //       "completedAt": "2021-08-28T00:00:00.000Z",
  //       "completedBy": "john.doe"
  //     }
  //   }
  // }' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/UpdateUserMetadata
  @GrpcMethod('UserService', 'UpdateUserMetadata')
  async updateUserMetadata(
    request: UpdateUserMetadataRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<UserMetadataResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, metadata } = request;

      // Check for missing or invalid arguments
      if (!UUID || !metadata) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateUserMetadataRequestDTO
      const updateUserMetadataRequestDTO: UpdateUserMetadataRequestDTO =
        new UpdateUserMetadataRequestDTO(UUID, {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        });

      // Logging UpdateUserMetadataRequestDTO for debugging
      this.logger.log(JSON.stringify(updateUserMetadataRequestDTO, null, 2));

      // Call userService to update user
      const userMetadataResponseDTO: UserMetadataResponseDTO =
        await this.userService.updateUserMetadata(UUID, updateUserMetadataRequestDTO);

      // Create the User object
      const userMetadataResponse: UserMetadataResponse = {
        UUID: userMetadataResponseDTO.UUID,
        ID: userMetadataResponseDTO.ID,
        metadata: {
          name: userMetadataResponseDTO.metadata.name,
          dates: {
            ...userMetadataResponseDTO.metadata.dates,
            createdAt: userMetadataResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userMetadataResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userMetadataResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userMetadataResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userMetadataResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userMetadataResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
      };

      return userMetadataResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating user metadata',
      });
    }
  }

  // grpcurl -plaintext -d '{
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "content": {
  //     "email": "john.doe@mail.com",
  //     "phone": "123-456-7890",
  //     "lastName": "Doe",
  //     "firstName": "Jane",
  //     "projectRoles": ["PROJECT_ROLE_TYPES_PM"],
  //     "scrumRoles": ["SCRUM_ROLE_TYPES_PO"],
  //     "password": "P@ssw0rd!234"
  //   }
  // }' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/UpdateUserContent
  @GrpcMethod('UserService', 'UpdateUserContent')
  async updateUserContent(
    request: UpdateUserContentRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<UserContentResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !content) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateUserContentRequestDTO
      const updateUserContentRequestDTO: UpdateUserContentRequestDTO =
        new UpdateUserContentRequestDTO(UUID, {
          ...content,
          projectRoles: content.projectRoles.map(
            (role) => PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY[role],
          ),
          scrumRoles: content.scrumRoles.map((role) => SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY[role]),
        });

      // Logging UpdateUserContentRequestDTO for debugging
      this.logger.log(JSON.stringify(updateUserContentRequestDTO, null, 2));

      // Call userService to update user
      const userContentResponseDTO: UserContentResponseDTO =
        await this.userService.updateUserContent(UUID, updateUserContentRequestDTO);

      // Create the User object
      const userContentResponse: UserContentResponse = {
        UUID: userContentResponseDTO.UUID,
        ID: userContentResponseDTO.ID,
        content: {
          ...userContentResponseDTO.content,
          projectRoles: userContentResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userContentResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return userContentResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating user content',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 user.UserService/GetUserMetadata
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUserMetadata
  @GrpcMethod('UserService', 'GetUserMetadata')
  async getUserMetadata(
    request: GetUserByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<UserMetadataResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call userService to get user
      const userMetadataResponseDTO: UserMetadataResponseDTO =
        await this.userService.getUserMetadata(UUID);

      // Create the User object
      const userMetadataResponse: UserMetadataResponse = {
        UUID: userMetadataResponseDTO.UUID,
        ID: userMetadataResponseDTO.ID,
        metadata: {
          name: userMetadataResponseDTO.metadata.name,
          dates: {
            ...userMetadataResponseDTO.metadata.dates,
            createdAt: userMetadataResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: userMetadataResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: userMetadataResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: userMetadataResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: userMetadataResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: userMetadataResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
      };

      return userMetadataResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting user metadata',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 user.UserService/GetUserContent
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/user.proto -import-path api/grpc/proto 0.0.0.0:5000 user.UserService/GetUserContent
  @GrpcMethod('UserService', 'GetUserContent')
  async getUserContent(
    request: GetUserByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<UserContentResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call userService to get user
      const userContentResponseDTO: UserContentResponseDTO =
        await this.userService.getUserContent(UUID);

      // Create the User object
      const userContentResponse: UserContentResponse = {
        UUID: userContentResponseDTO.UUID,
        ID: userContentResponseDTO.ID,
        content: {
          ...userContentResponseDTO.content,
          projectRoles: userContentResponseDTO.content.projectRoles.map(
            (role) => projectRoleTypes[role as keyof typeof projectRoleTypes],
          ),
          scrumRoles: userContentResponseDTO.content.scrumRoles.map(
            (role) => scrumRoleTypes[role as keyof typeof scrumRoleTypes],
          ),
        },
      };

      return userContentResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting user content',
      });
    }
  }
}

export default UserServiceController;

// export {};
