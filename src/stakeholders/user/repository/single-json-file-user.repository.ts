// Path: src/stakeholders/user/repository/single-json-file-user.repository.ts
// DESC: Implement the single JSON file strategy for the user repository
'use strict';
import { Logger, NotFoundException } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
} from '../dto';
import { UserContentEntity, UserEntity, UserMetadataEntity } from '../entity';
import { UserRepositoryInterface } from './user-repository.interface';

export class SingleJsonFileUserRepository implements UserRepositoryInterface {
  private readonly logger = new Logger(SingleJsonFileUserRepository.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    return users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.readFromJSON<UserEntity>(this.filePath);
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const user: UserEntity | undefined = users.find((user) => user.UUID === UUID);
    if (!user) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    return user;
  }

  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
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
    users.push(newUser);
    this.writeToJSON(this.filePath, users);
    return newUser;
  }

  async updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...users[userIndex].metadata,
      ...instanceToPlain(updateUserRequestDTO.metadata),
    };
    const updatedUserContent: UserContentEntity = {
      ...users[userIndex].content,
      ...updateUserRequestDTO.content,
    };
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      UUID,
      updatedUserMetadata,
      updatedUserContent,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser;
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === UUID);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
    const deletedUser: UserEntity = users.splice(userIndex, 1)[0];
    this.writeToJSON(this.filePath, users);
    return deletedUser;
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const user: UserEntity | undefined = users.find((user) => user.ID === ID);
    if (!user) {
      throw new NotFoundException(`User ${ID} cannot be found`);
    }
    return user;
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const user: UserEntity | undefined = users.find((user) => user.metadata.name === name);
    if (!user) {
      throw new NotFoundException(`User ${name} cannot be found`);
    }
    return user;
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    this.logger.log(`User Email: ${email}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const user = users.find((user) => user.content.email === email);
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
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserMetadata: UserMetadataEntity = {
      ...users[userIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      uuid,
      updatedUserMetadata,
      users[userIndex].content,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser.metadata;
  }

  // Update a user content by UUID
  async updateUserContent(uuid: string, updatedContent: UserContentDTO): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    const updatedUserContent: UserContentEntity = {
      ...users[userIndex].content,
      ...updatedContent,
    };
    users[userIndex].metadata.dates.updatedAt = new Date();
    const updatedUser = new UserEntity(
      users[userIndex].ID,
      uuid,
      users[userIndex].metadata,
      updatedUserContent,
    );
    users[userIndex] = updatedUser;
    this.writeToJSON(this.filePath, users);
    return updatedUser.content;
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return users[userIndex].metadata;
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const users: UserEntity[] = await this.readFromJSON<UserEntity>(this.filePath);
    const userIndex = users.findIndex((user) => user.UUID === uuid);
    if (userIndex === -1) {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
    return users[userIndex].content;
  }
}
