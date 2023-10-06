/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CommonDate } from "./common.pb";
import { CreateUserRequest } from "./user.pb";

export const protobufPackage = "auth";

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
  lastName: string;
  firstName: string;
  projectRoles: string[];
  scrumRoles: string[];
  password: string;
}

export interface RegisterResponse {
  ID: string;
  UUID: string;
  email: string;
}

export interface LoginRequest {
  ID: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  ID: string;
  UUID: string;
  email: string;
  token: string;
}

export interface LogoutRequest {
  ID: string;
  UUID: string;
  email: string;
  token: string;
}

export interface LogoutResponse {
  ID: string;
  UUID: string;
  email: string;
}

export interface SecuredResponse {
  ID: string;
  UUID: string;
  email: string;
  token: string;
  securedData: string;
}

export interface GetUserProfileRequest {
  ID: string;
  UUID: string;
  email: string;
  token: string;
}

export interface GetUserProfileResponse {
  ID: string;
  UUID: string;
  email: string;
  token: string;
  securedData: string;
}

export interface GetProtectedDataRequest {
  ID: string;
  UUID: string;
  email: string;
  token: string;
}

export interface GetProtectedDataResponse {
  ID: string;
  UUID: string;
  email: string;
  token: string;
  securedData: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: CreateUserRequest, metadata: Metadata, ...rest: any): Observable<RegisterResponse>;

  login(request: LoginRequest, metadata: Metadata, ...rest: any): Observable<LoginResponse>;

  logout(request: LogoutRequest, metadata: Metadata, ...rest: any): Observable<LogoutResponse>;

  getProfile(request: GetUserProfileRequest, metadata: Metadata, ...rest: any): Observable<GetUserProfileResponse>;

  getProtectedData(request: GetProtectedDataRequest, metadata: Metadata, ...rest: any): Observable<SecuredResponse>;
}

export interface AuthServiceController {
  register(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(
    request: LoginRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logout(
    request: LogoutRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  getProfile(
    request: GetUserProfileRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetUserProfileResponse> | Observable<GetUserProfileResponse> | GetUserProfileResponse;

  getProtectedData(
    request: GetProtectedDataRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<SecuredResponse> | Observable<SecuredResponse> | SecuredResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "logout", "getProfile", "getProtectedData"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
