// Path: src/stakeholders/user/repository/memory-user.repository.ts
// DESC: Implement the memory strategy for the user repository
'use strict';
import { Logger, NotFoundException } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { PROJECT_ROLE_TYPES, SCRUM_ROLE_TYPES } from '../../../common/constant';
import { CommonDateEntity } from '../../../common/entity';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
} from '../dto';
import { UserContentEntity, UserEntity, UserMetadataEntity } from '../entity';
import { UserRepositoryInterface } from './user-repository.interface';

export class MemoryUserRepository implements UserRepositoryInterface {
  private readonly logger = new Logger(MemoryUserRepository.name);
  private users: UserEntity[] = [
    new UserEntity(
      'john.doe',
      '00000000-0000-0000-0000-000000000001',
      new UserMetadataEntity(
        'John Doe',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
        ),
      ),
      new UserContentEntity(
        'john.doe@mail.com',
        '123456789',
        'Doe',
        'John',
        // ['PROJECT_ROLE_TYPES_PM'],
        // ['SCRUM_ROLE_TYPES_PO'],
        [PROJECT_ROLE_TYPES.PROJECT_ROLE_TYPES_PM],
        [SCRUM_ROLE_TYPES.SCRUM_ROLE_TYPES_PO],
        '',
      ),
    ),
    new UserEntity(
      'jane.doe',
      '00000000-0000-0000-0000-000000000002',
      new UserMetadataEntity(
        'Jane Doe',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
        ),
      ),
      new UserContentEntity(
        'jane.doe@mail.com',
        '123456789',
        'Doe',
        'Jane',
        // ['PROJECT_ROLE_TYPES_EM'],
        // ['SCRUM_ROLE_TYPES_SM'],
        [PROJECT_ROLE_TYPES.PROJECT_ROLE_TYPES_EM],
        [SCRUM_ROLE_TYPES.SCRUM_ROLE_TYPES_SM],
        '',
      ),
    ),
  ];

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    return this.users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.users;
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find((user) => user.UUID === UUID);
    if (!user) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    return user;
  }

  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity> {
    const newUUID: string = uuidV4();
    const newUserMetadata: UserMetadataEntity = plainToInstance(
      UserMetadataEntity,
      createUserRequestDTO.metadata,
    );
    const newUserContent: UserContentEntity = plainToInstance(
      UserContentEntity,
      createUserRequestDTO.content,
    );
    const newUser: UserEntity = new UserEntity(
      createUserRequestDTO.ID,
      newUUID,
      newUserMetadata,
      newUserContent,
    );
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...this.users[userIndex].metadata,
      ...instanceToPlain(updateUserRequestDTO.metadata),
    };
    const updatedUserContent: UserContentEntity = {
      ...this.users[userIndex].content,
      ...updateUserRequestDTO.content,
    };
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      UUID,
      updatedUserMetadata,
      updatedUserContent,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const userIndex = this.users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const deletedUser: UserEntity = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find((user) => user.ID === ID);
    if (!user) {
      throw new NotFoundException(`User ${ID} cannot be found`);
    }
    return user;
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const user: UserEntity | undefined = this.users.find((user) => user.metadata.name === name);
    if (!user) {
      throw new NotFoundException(`User ${name} cannot be found`);
    }
    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const user = this.users.find((user) => user.content.email === email);
    if (!user) {
      throw new NotFoundException(`User ${email} cannot be found`);
    }
    return user;
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid} | User Metadata: ${updatedMetadata}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...this.users[userIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      uuid,
      updatedUserMetadata,
      this.users[userIndex].content,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser.metadata;
  }

  // Update a user content by UUID
  async updateUserContent(uuid: string, updatedContent: UserContentDTO): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserContent: UserContentEntity = {
      ...this.users[userIndex].content,
      ...updatedContent,
    };
    this.users[userIndex].metadata.dates.updatedAt = new Date();
    const updatedUser = new UserEntity(
      this.users[userIndex].ID,
      uuid,
      this.users[userIndex].metadata,
      updatedUserContent,
    );
    this.users[userIndex] = updatedUser;
    return updatedUser.content;
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return this.users[userIndex].metadata;
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const userIndex = this.users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return this.users[userIndex].content;
  }
}
