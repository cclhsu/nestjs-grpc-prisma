// Path: src/stakeholders/user/repository/user-repository.interface.ts
// DESC: Implement the interface for the user repository
'use strict';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
} from '../dto';
import { UserEntity } from '../entity';

export interface UserRepositoryInterface {
  listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]>;
  listUsers(): Promise<UserEntity[]>;
  getUser(UUID: string): Promise<UserEntity>;
  createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity>;
  updateUser(UUID: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity>;
  deleteUser(UUID: string): Promise<UserEntity>;
  getUserByID(ID: string): Promise<UserEntity>;
  getUserByName(name: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  updateUserMetadata(uuid: string, updatedMetadata: UserMetadataDTO): Promise<UserMetadataDTO>;
  updateUserContent(uuid: string, updatedContent: UserContentDTO): Promise<UserContentDTO>;
  getUserMetadata(uuid: string): Promise<UserMetadataDTO>;
  getUserContent(uuid: string): Promise<UserContentDTO>;
  // searchUsers(query: string): Promise<UserEntity[]>;
}

// export interface UserRepositoryInterface {
//   listUsers(query?: UserQuery): Promise<UserEntity[]>;
//   getUser(identifier: string, type: UserIdentifierType): Promise<UserEntity | null>;
//   createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserEntity>;
//   updateUser(uuid: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserEntity | null>;
//   deleteUser(uuid: string): Promise<boolean>;
//   updateUserData(uuid: string, updatedData: UserUpdateData): Promise<UserEntity | null>;
// }

// interface UserQuery {
//   name?: string;
//   username?: string;
//   email?: string;
// }

// type UserIdentifierType = 'UUID' | 'ID' | 'name' | 'username' | 'email';

// interface UserUpdateData {
//   metadata?: UserMetadataDTO;
//   content?: UserContentDTO;
// }
