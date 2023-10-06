// Path: src/stakeholders/user/repository/multiple-json-files-user.repository.ts
// DESC: Implement the multiple JSON files strategy for the user repository
'use strict';
import { Logger, NotFoundException } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { existsSync } from 'fs';
import { glob } from 'glob';
import { v4 as uuidV4 } from 'uuid';
import { DEFAULT_FILE_REPOSITORY_EXTENSION } from '../../../common/constant';
import { deleteFile } from '../../../utils/file/file.utils';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
} from '../dto';
import { UserContentEntity, UserEntity, UserMetadataEntity } from '../entity';
import { UserRepositoryInterface } from './user-repository.interface';

export class MultipleJsonFilesUserRepository implements UserRepositoryInterface {
  private readonly logger = new Logger(MultipleJsonFilesUserRepository.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    const users: UserEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user) {
          users.push(user);
        }
      }
    }
    return users.map((user) => ({
      ID: user.ID,
      UUID: user.UUID,
    }));
  }

  async listUsers(): Promise<UserEntity[]> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    const users: UserEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user) {
          users.push(user);
        }
      }
    }
    return users;
  }

  async getUser(UUID: string): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<UserEntity>(filePath);
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
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
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    this.writeToJSON(filePath, newUser);
    return newUser;
  }

  async updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${UUID} cannot be found`);
      }
      const updatedUserMetadata: UserMetadataEntity = {
        ...user.metadata,
        ...instanceToPlain(updateUserRequestDTO.metadata),
      };
      const updatedUserContent: UserContentEntity = {
        ...user.content,
        ...updateUserRequestDTO.content,
      };
      const updatedUser = new UserEntity(user.ID, UUID, updatedUserMetadata, updatedUserContent);
      this.writeToJSON(filePath, updatedUser);
      return updatedUser;
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
  }

  async deleteUser(UUID: string): Promise<UserEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedUser: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!deletedUser) {
        throw new NotFoundException(`User ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedUser;
    } else {
      throw new NotFoundException(`User ${UUID} cannot be found`);
    }
  }

  async getUserByID(ID: string): Promise<UserEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user.ID === ID) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${ID} cannot be found`);
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user.metadata.name === name) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${name} cannot be found`);
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
        if (user.content.email === email) {
          return user;
        }
      }
    }
    throw new NotFoundException(`User ${email} cannot be found`);
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    uuid: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid} | User Metadata: ${updatedMetadata}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      const updatedUserMetadata: UserMetadataEntity = {
        ...user.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedUser = new UserEntity(user.ID, uuid, updatedUserMetadata, user.content);
      this.writeToJSON(filePath, updatedUser);
      return updatedUser.metadata;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Update a user content by UUID
  async updateUserContent(uuid: string, updatedContent: UserContentDTO): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid} | User Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      const updatedUserContent: UserContentEntity = {
        ...user.content,
        ...updatedContent,
      };
      user.metadata.dates.updatedAt = new Date();
      const updatedUser = new UserEntity(user.ID, uuid, user.metadata, updatedUserContent);
      this.writeToJSON(filePath, updatedUser);
      return updatedUser.content;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Get a user metadata by UUID
  async getUserMetadata(uuid: string): Promise<UserMetadataDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      return user.metadata;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }

  // Get a user content by UUID
  async getUserContent(uuid: string): Promise<UserContentDTO> {
    this.logger.log(`User UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const user: UserEntity = await this.readFromJSON<UserEntity>(filePath);
      if (!user) {
        throw new NotFoundException(`User ${uuid} cannot be found`);
      }
      return user.content;
    } else {
      throw new NotFoundException(`User ${uuid} cannot be found`);
    }
  }
}
