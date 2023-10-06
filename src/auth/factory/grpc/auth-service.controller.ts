// import { Metadata } from '@grpc/grpc-js';
// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Request,
//   UnauthorizedException,
//   UseGuards,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';
// import { GrpcMethod } from '@nestjs/microservices';
// import {
//   ApiBearerAuth,
//   ApiBody,
//   ApiOperation,
//   ApiProduces,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { Observable } from 'rxjs';
// import { Request as ExpressRequest } from 'express';
// import { CreateUserRequestDTO } from '../stakeholders/user/dto';
// import { UserService } from '../stakeholders/user/user.service';
// import {
//   decodeToken,
//   getTokenFromRequestAuthorization,
//   validateToken,
// } from '../utils/jwt/jwt-service.utils';
// import { AuthService } from './auth.service';
// import { Public } from './decorators/public.decorator';
// import { LoginRequestDTO, LoginResponseDTO, RegistrationResponseDTO } from './dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import {
//   AuthServiceController,
//   GetUserProfileResponse,
//   LoginRequest,
//   LoginResponse,
//   LogoutResponse,
//   SecuredRequest,
//   SecuredResponse,
// } from './grpc/generated/auth.pb';

// // interface AuthExternalInterface {
// //   register(createUserRequestDTO: CreateUserRequestDTO): Promise<RegistrationResponseDTO>;
// //   login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO>;
// //   logout(uuid: string): Promise<void>;
// //   getProfile(uuid: string): Promise<any>;
// //   // forgotPassword(email: string): Promise<void>;
// // }

// @Controller('auth')
// @ApiTags('Authentication')
// export class JwtAuthController implements AuthServiceController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//     private readonly configService: ConfigService,
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector,
//   ) {}

//   hasRequiredPermission(token: string, requiredPermission: string): boolean {
//     // Decode the token and extract user permissions
//     // const decodedToken = this.authService.decodeToken(token);
//     // const userPermissions = decodedToken.permissions;
//     const userPermissions: string[] = ['read', 'write', 'delete'];

//     // Check if the user has the required permission
//     return userPermissions.includes(requiredPermission);
//   }

//   // grpcurl -plaintext -d '{"username": "john.doe", "password": "changeme"}' localhost:5000 auth.AuthService/Login
//   @GrpcMethod('AuthService', 'Login')
//   login(
//     request: LoginRequest,
//     metadata: Metadata,
//     ...rest: any
//   ): LoginResponse | Promise<LoginResponse> | Observable<LoginResponse> {
//     // throw new Error('Method not implemented.');
//     const ID: string,
//       email: string,
//       password: string = {
//         username: request.username,
//         password: request.password,
//       };
//     const tokenResponseDTO: Promise<TokenResponseDTO> = this.authService.login(
//       LoginRequestDTO.username,
//       LoginRequestDTO.password,
//     );
//     return tokenResponseDTO;
//   }

//   // grpcurl -plaintext -H "authorization: Bearer <JWT_TOKEN>" -plaintext localhost:5000 auth.AuthService/GetProtectedData
//   // @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @GrpcMethod('AuthService', 'GetProtectedData')
//   getProtectedData(
//     request: SecuredRequest,
//     metadata: Metadata,
//     ...rest: any
//   ): SecuredResponse | Promise<SecuredResponse> | Observable<SecuredResponse> {
//     console.log(metadata);
//     const token: string = metadata.get('authorization')[0] as string;
//     // const decodedToken = this.authService.decodeToken(token);

//     const requiredPermission = 'write';
//     if (!this.hasRequiredPermission(token, requiredPermission)) {
//       throw new UnauthorizedException('Insufficient permissions');
//     }

//     const securedResponse: SecuredResponse = {
//       success: true,
//       message: 'Protected route accessed successfully',
//       errorCode: 0,
//     };
//     return securedResponse;
//   }

//   // grpcurl -plaintext -d '{"token": "<YOUR_TOKEN>"}' localhost:5000 auth.AuthService/GetProfile
//   @GrpcMethod('AuthService', 'GetProfile')
//   getProfile(
//     request: SecuredRequest,
//     metadata: Metadata,
//     ...rest: any
//   ): GetUserProfileResponse | Promise<GetUserProfileResponse> | Observable<GetUserProfileResponse> {
//     throw new Error('Method not implemented.');

//     // const token = metadata.get('authorization')[0]; // Retrieve the JWT token from gRPC metadata

//     // // Verify and decode the JWT token
//     // const decodedToken = this.authService.verify(token); // Verify the signature and expiration

//     // // Perform authentication and authorization checks
//     // // Example: Check if the user has the required permissions
//     // if (!hasRequiredPermission(decodedToken)) {
//     //   throw new UnauthorizedException('Insufficient permissions');
//     // }

//     // // Process the request and return the response
//     // const userProfileResponse: GetUserProfileResponse = {
//     //   // Construct the response object based on your implementation
//     // };

//     // return userProfileResponse;
//   }

//   // grpcurl -plaintext -d '{"token":  "<YOUR_TOKEN>"} localhost:5000 auth.AuthService/Logout
//   @GrpcMethod('AuthService', 'Logout')
//   logout(
//     request: SecuredRequest,
//     metadata: Metadata,
//     ...rest: any
//   ): LogoutResponse | Promise<LogoutResponse> | Observable<LogoutResponse> {
//     // const token = metadata.get('authorization')[0]; // Retrieve the JWT token from gRPC metadata

//     // Revoke the JWT token (optional)
//     // You can implement token revocation logic here, such as adding the token to a blacklist or revoking it from the database.
//     // This step depends on your specific requirements and how you handle token revocation.

//     // Clear the token from the client-side (optional)
//     // You can clear the JWT token from the client-side by sending an HTTP-only cookie with an expired token or removing it from local storage/session storage.

//     const logoutResponse: LogoutResponse = {
//       message: 'Logout successful',
//       user: 'user',
//     };

//     return logoutResponse;
//   }

//   // curl -s -X POST http://0.0.0.0:3001/auth/register -H "Content-Type: application/json" -d '{"ID": "john.doe", "metadata": {"name": "John Doe", "dates": {"createdAt": "2023-08-15T12:00:00Z","createdBy": "john.doe","updatedAt": "2023-08-15T12:00:00Z","updatedBy": "john.doe"}},"content": {"email": "e.g. john.doe@mail.com","phone": "e.g. 0912-345-678","firstName": "John","lastName": "Doe","projectRoles": ["I"],"scrumRoles": ["I"],"password": "P@ssw0rd!234"}}' | jq
//   @Public()
//   @ApiOperation({ summary: 'Register a new user' })
//   @ApiProduces('application/json')
//   @ApiBody({ type: CreateUserRequestDTO })
//   @ApiResponse({
//     status: 201,
//     description: 'The user has been successfully registered.',
//     type: RegistrationResponseDTO,
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Bad Request',
//   })
//   @Post('register')
//   async register(
//     @Body() createUserRequestDTO: CreateUserRequestDTO,
//   ): Promise<RegistrationResponseDTO> {
//     return await this.authService.register(createUserRequestDTO);
//   }

//   // curl -s -X POST http://0.0.0.0:3001/auth/login -H "Content-Type: application/json" -d '{"ID": "john.doe", "password": "P@ssw0rd!234"}' | jq
//   // curl -s -X POST http://0.0.0.0:3001/auth/login -H "Content-Type: application/json" -d '{"email": "john.doe@mail.com", "password": "P@ssw0rd!234"}' | jq
//   @Public()
//   @ApiOperation({ summary: 'Login a user' })
//   @ApiProduces('application/json')
//   @ApiBody({ type: LoginRequestDTO })
//   @ApiResponse({
//     status: 200,
//     description: 'The user has been successfully logged in.',
//     type: LoginResponseDTO,
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Bad Request',
//   })
//   @Post('login')
//   async login(@Body() loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
//     return await this.authService.login(loginRequestDTO);
//   }

//   // curl -s -X GET http://0.0.0.0:3001/auth/logout -H "Content-Type: application/json" -H "Authorization: Bearer <token>" | jq
//   @ApiOperation({ summary: 'Logout a user' })
//   @ApiProduces('application/json')
//   @ApiResponse({
//     status: 200,
//     description: 'The user has been successfully logged out.',
//   })
//   @ApiResponse({
//     status: 401,
//     description: 'Unauthorized',
//   })
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @Get('logout')
//   async logout(@Request() req: ExpressRequest) {
//     const token = getTokenFromRequestAuthorization(req);
//     if (!token) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     const validate = validateToken(token, this.jwtService, this.configService);
//     if (!validate) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     const decoded: any = decodeToken(token, this.jwtService, this.configService);
//     const uuid = decoded.sub;

//     await this.authService.logout(uuid);
//   }

//   // curl -s -X GET http://0.0.0.0:3001/auth/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>" | jq
//   @ApiOperation({ summary: 'Get the profile of the logged in user' })
//   @ApiProduces('application/json')
//   @ApiResponse({
//     status: 200,
//     description: 'The profile of the logged in user.',
//   })
//   @ApiResponse({
//     status: 401,
//     description: 'Unauthorized',
//   })
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   async getProfile(@Request() req: ExpressRequest) {
//     const token = getTokenFromRequestAuthorization(req);
//     if (!token) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     const validate = validateToken(token, this.jwtService, this.configService);
//     if (!validate) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     const decoded: any = decodeToken(token, this.jwtService, this.configService);
//     const uuid = decoded.sub;

//     return await this.authService.getProfile(uuid);
//   }
// }

export {};
