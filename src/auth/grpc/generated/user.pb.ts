/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CommonDate, IdUuid, projectRoleTypes, scrumRoleTypes } from "./common.pb";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "user";

export interface GetUserByEmailRequest {
  email: string;
}

export interface GetUserByIdRequest {
  ID: string;
}

export interface GetUserByNameRequest {
  name: string;
}

export interface GetUserByUsernameRequest {
  username: string;
}

export interface GetUserByUuidRequest {
  UUID: string;
}

export interface ListUserIdUuid {
  userIdUuids: IdUuid[];
}

export interface ListUserResponse {
  users: User[];
}

export interface ListUserMetadataResponse {
  userMetadataResponses: UserMetadataResponse[];
}

export interface ListUserContentResponse {
  userContentResponses: UserContentResponse[];
}

export interface CreateUserRequest {
  ID: string;
  UUID: string;
  metadata: UserMetadata | undefined;
  content: UserContent | undefined;
}

export interface UpdateUserRequest {
  UUID: string;
  metadata: UserMetadata | undefined;
  content: UserContent | undefined;
}

export interface UpdateUserMetadataRequest {
  UUID: string;
  metadata: UserMetadata | undefined;
}

export interface UpdateUserContentRequest {
  UUID: string;
  content: UserContent | undefined;
}

export interface UserMetadataResponse {
  ID: string;
  UUID: string;
  metadata: UserMetadata | undefined;
}

export interface UserContentResponse {
  ID: string;
  UUID: string;
  content: UserContent | undefined;
}

export interface User {
  ID: string;
  UUID: string;
  metadata: UserMetadata | undefined;
  content: UserContent | undefined;
}

export interface UserMetadata {
  name: string;
  dates: CommonDate | undefined;
}

export interface UserContent {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  projectRoles: projectRoleTypes[];
  scrumRoles: scrumRoleTypes[];
  password: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  listUserIdsAndUuiDs(request: Empty, metadata: Metadata, ...rest: any): Observable<ListUserIdUuid>;

  listUsers(request: Empty, metadata: Metadata, ...rest: any): Observable<ListUserResponse>;

  listUsersMetadata(request: Empty, metadata: Metadata, ...rest: any): Observable<ListUserMetadataResponse>;

  listUsersContent(request: Empty, metadata: Metadata, ...rest: any): Observable<ListUserContentResponse>;

  getUser(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Observable<User>;

  createUser(request: CreateUserRequest, metadata: Metadata, ...rest: any): Observable<User>;

  updateUser(request: UpdateUserRequest, metadata: Metadata, ...rest: any): Observable<User>;

  deleteUser(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Observable<User>;

  getUserById(request: GetUserByIdRequest, metadata: Metadata, ...rest: any): Observable<User>;

  getUserByName(request: GetUserByUsernameRequest, metadata: Metadata, ...rest: any): Observable<User>;

  getUserByEmail(request: GetUserByEmailRequest, metadata: Metadata, ...rest: any): Observable<User>;

  updateUserMetadata(
    request: UpdateUserMetadataRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<UserMetadataResponse>;

  updateUserContent(
    request: UpdateUserContentRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<UserContentResponse>;

  getUserMetadata(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Observable<UserMetadataResponse>;

  getUserContent(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Observable<UserContentResponse>;
}

export interface UserServiceController {
  listUserIdsAndUuiDs(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Promise<ListUserIdUuid> | Observable<ListUserIdUuid> | ListUserIdUuid;

  listUsers(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Promise<ListUserResponse> | Observable<ListUserResponse> | ListUserResponse;

  listUsersMetadata(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Promise<ListUserMetadataResponse> | Observable<ListUserMetadataResponse> | ListUserMetadataResponse;

  listUsersContent(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Promise<ListUserContentResponse> | Observable<ListUserContentResponse> | ListUserContentResponse;

  getUser(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  createUser(request: CreateUserRequest, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserRequest, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  deleteUser(request: GetUserByUuidRequest, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  getUserById(request: GetUserByIdRequest, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  getUserByName(
    request: GetUserByUsernameRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<User> | Observable<User> | User;

  getUserByEmail(
    request: GetUserByEmailRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<User> | Observable<User> | User;

  updateUserMetadata(
    request: UpdateUserMetadataRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UserMetadataResponse> | Observable<UserMetadataResponse> | UserMetadataResponse;

  updateUserContent(
    request: UpdateUserContentRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UserContentResponse> | Observable<UserContentResponse> | UserContentResponse;

  getUserMetadata(
    request: GetUserByUuidRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UserMetadataResponse> | Observable<UserMetadataResponse> | UserMetadataResponse;

  getUserContent(
    request: GetUserByUuidRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UserContentResponse> | Observable<UserContentResponse> | UserContentResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "listUserIdsAndUuiDs",
      "listUsers",
      "listUsersMetadata",
      "listUsersContent",
      "getUser",
      "createUser",
      "updateUser",
      "deleteUser",
      "getUserById",
      "getUserByName",
      "getUserByEmail",
      "updateUserMetadata",
      "updateUserContent",
      "getUserMetadata",
      "getUserContent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
