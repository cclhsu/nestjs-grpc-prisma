// Path: src/stakeholders/user/repository/user-repository.interface.ts
// DESC: Implement the interface for the user repository
'use strict';
import { Inject, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import {
  DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
  DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
  DEFAULT_REPOSITORY_DEVICE_TYPE,
  DEFAULT_REPOSITORY_FILE_TYPE,
  DEFAULT_USER_FILE_PATH,
  DEFAULT_USER_PATH,
} from '../../../common/constant';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
} from '../dto';
import { UserEntity } from '../entity';
import { MemoryUserRepository } from './memory-user.repository';
import { MultipleJsonFilesUserRepository } from './multiple-json-files-user.repository';
import { SingleJsonFileUserRepository } from './single-json-file-user.repository';
import { UserRepositoryInterface } from './user-repository.interface';
import PrismaPostgresUserRepository from './prisma-postgres-user.repository';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  private userRepositoryInterface: UserRepositoryInterface;

  private users: UserEntity[] = [];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readSingleFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeSingleToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readSingleFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeSingleToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readSingleFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeSingleToCSV: <T>(filePath: string, data: T) => void,
    // @Inject('ReadSingleFromMarkdown')
    // private readonly readSingleFromMarkdown: <T>(filePath: string) => Promise<T>,
    // @Inject('WriteSingleToMarkdown')
    // private readonly writeSingleToMarkdown: <T>(filePath: string, data: T) => void,
    @Inject('ReadArrayFromJSON')
    private readonly readArrayFromJSON: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToJSON')
    private readonly writeArrayToJSON: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromYAML')
    private readonly readArrayFromYAML: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToYAML')
    private readonly writeArrayToYAML: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromCSV')
    private readonly readArrayFromCSV: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToCSV')
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void, // @Inject('ReadArrayFromMarkdown') // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>, // @Inject('WriteArrayToMarkdown') // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  ) {
    this.userRepositoryInterface = this.getRepositoryInterface();
  }

  // Get all user IDs and UUIDs
  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.listUserIdsAndUUIDs();
  }

  // Get all users
  async listUsers(): Promise<UserEntity[]> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.listUsers();
  }

  // Get a user by UUID
  async getUser(UUID: string): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUser(UUID);
  }

  // Create a new user
  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.createUser(createUserRequestDTO);
  }

  // Update a user by UUID
  async updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.updateUser(UUID, updateUserRequestDTO);
  }

  // Delete a user by UUID
  async deleteUser(UUID: string): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.deleteUser(UUID);
  }

  // Get a user by ID
  async getUserByID(ID: string): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUserByID(ID);
  }

  // Get a user by name
  async getUserByName(name: string): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUserByName(name);
  }

  // Get a user by email
  async getUserByEmail(email: string): Promise<UserEntity> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUserByEmail(email);
  }

  // Update a user metadata by UUID
  async updateUserMetadata(
    UUID: string,
    updatedMetadata: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.updateUserMetadata(UUID, updatedMetadata);
  }

  // Update a user content by UUID
  async updateUserContent(UUID: string, updatedContent: UserContentDTO): Promise<UserContentDTO> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.updateUserContent(UUID, updatedContent);
  }

  // Get a user metadata by UUID
  async getUserMetadata(UUID: string): Promise<UserMetadataDTO> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUserMetadata(UUID);
  }

  // Get a user content by UUID
  async getUserContent(UUID: string): Promise<UserContentDTO> {
    const repository: UserRepositoryInterface = this.getRepositoryInterface();
    return repository.getUserContent(UUID);
  }

  private getRepositoryInterface(): UserRepositoryInterface {
    if (DEFAULT_REPOSITORY_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'json') {
        if (DEFAULT_REPOSITORY_FILE_TYPE === 'single') {
          return new SingleJsonFileUserRepository(
            DEFAULT_USER_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_REPOSITORY_FILE_TYPE === 'multiple') {
          return new MultipleJsonFilesUserRepository(
            DEFAULT_USER_PATH,
            this.readSingleFromJSON,
            this.writeSingleToJSON,
          );
        }
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'yaml') {
        // Implement YAML strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'csv') {
        // Implement CSV strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'md') {
        // Implement MD strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      }
    } else {
      if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'memory') {
        // Implement memory strategy...
        return new MemoryUserRepository();
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'sqlite') {
        // Implement sqlite strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'mongodb') {
        // Implement mongodb strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        );
        // return new PrismaMongoDBUserRepository();
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'postgres') {
        // Implement postgres strategy...
        // throw new Error(
        //   'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        // );
        return new PrismaPostgresUserRepository();
      }
    }
    throw new Error(
      'Unsupported repository configuration: ' +
        DEFAULT_REPOSITORY_DEVICE_TYPE +
        ' ' +
        DEFAULT_FILE_REPOSITORY_DEVICE_TYPE +
        ' ' +
        DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
    );
  }

  private generateUUID(): string {
    return String(this.users.length + 1);
    // return uuidv4();
  }

  async readUserFromJSON(filePath: string): Promise<UserEntity> {
    return this.readSingleFromJSON<UserEntity>(filePath);
  }

  async writeUserToJSON(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToJSON<UserEntity>(filePath, user);
  }

  async readUserFromYAML(filePath: string): Promise<UserEntity> {
    return this.readSingleFromYAML<UserEntity>(filePath);
  }

  async writeUserToYAML(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToYAML<UserEntity>(filePath, user);
  }

  async readUserFromCSV(filePath: string): Promise<UserEntity> {
    return this.readSingleFromCSV<UserEntity>(filePath);
  }

  async writeUserToCSV(filePath: string, user: UserEntity): Promise<void> {
    this.writeSingleToCSV<UserEntity>(filePath, user);
  }

  async readUsersFromJSON(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromJSON<UserEntity>(filePath);
  }

  async writeUsersToJSON(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToJSON<UserEntity>(filePath, users);
  }

  async readUsersFromYAML(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromYAML<UserEntity>(filePath);
  }

  async writeUsersToYAML(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToYAML<UserEntity>(filePath, users);
  }

  async readUsersFromCSV(filePath: string): Promise<UserEntity[]> {
    return this.readArrayFromCSV<UserEntity>(filePath);
  }

  async writeUsersToCSV(filePath: string, users: UserEntity[]): Promise<void> {
    this.writeArrayToCSV<UserEntity>(filePath, users);
  }

  // proetected isUserEntity(obj: any): obj is UserEntity {
  //   return obj && obj.metadata !== undefined && obj.content !== undefined;
  // }

  // proetected isUserMetadataEntity(obj: any): obj is UserMetadataEntity {
  //   return obj && obj.name !== undefined;
  // }

  // proetected isUserContentEntity(obj: any): obj is UserContentEntity {
  //   return obj && obj.members !== undefined;
  // }
}
