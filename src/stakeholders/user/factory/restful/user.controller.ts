import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
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

// interface UserExternalInterface {
//   listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]>;
//   listUsers(): Promise<UserResponseDTO[]>;
//   listUsersWithMetadata(): Promise<UserMetadataResponseDTO[]>;
//   listUsersWithContent(): Promise<UserContentResponseDTO[]>;
//   getUser(uuid: string): Promise<UserResponseDTO>;
//   createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserResponseDTO>;
//   updateUser(uuid: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserResponseDTO>;
//   deleteUser(uuid: string): Promise<UserResponseDTO>;
//   getUserByID(ID: string): Promise<UserResponseDTO>;
//   getUserByName(name: string): Promise<UserResponseDTO>;
//   getUserByEmail(email: string): Promise<UserResponseDTO>;
//   updateUserMetadata(
//     uuid: string,
//     updateUserMetadataRequestDTO: UpdateUserMetadataRequestDTO,
//   ): Promise<UserMetadataResponseDTO>;
//   updateUserContent(
//     uuid: string,
//     updateUserContentRequestDTO: UpdateUserContentRequestDTO,
//   ): Promise<UserContentResponseDTO>;
//   getUserMetadata(uuid: string): Promise<UserMetadataResponseDTO>;
//   getUserContent(uuid: string): Promise<UserContentResponseDTO>;
// }

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // curl -s -X GET http://0.0.0.0:3001/users/ids-and-uuids -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/ids-and-uuids -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all user ids and uuids' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user ids and uuids have been successfully listed.',
    type: [UserIdUuidDTO],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('ids-and-uuids')
  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    return await this.userService.listUserIdsAndUUIDs();
  }

  // curl -s -X GET http://0.0.0.0:3001/users -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all users' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully listed.',
    type: [UserResponseDTO],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get()
  async listUsers(): Promise<UserResponseDTO[]> {
    return await this.userService.listUsers();
  }

  // curl -s -X GET http://0.0.0.0:3001/users/metadata -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/metadata -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all users with metadata' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The users with metadata have been successfully listed.',
    type: [UserMetadataResponseDTO],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('metadata')
  async listUsersWithMetadata(): Promise<UserMetadataResponseDTO[]> {
    return this.userService.listUsersWithMetadata();
  }

  // curl -s -X GET http://0.0.0.0:3001/users/content -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all users with content' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The users with content have been successfully listed.',
    type: [UserContentResponseDTO],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('content')
  async listUsersWithContent(): Promise<UserContentResponseDTO[]> {
    return this.userService.listUsersWithContent();
  }

  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  async getUser(@Param('uuid') uuid: string): Promise<UserResponseDTO> {
    return await this.userService.getUser(uuid);
  }

  // curl -s -X POST http://0.0.0.0:3001/users -H 'Content-Type: application/json' -d  '{"ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000000", "metadata": {"name": "John Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe"}}, "content": {"email": "john.doe@mail.com", "phone": "0912345678", "lastName": "Doe", "firstName": "John", "password": "P@ssw0rd!234" }}' | jq
  // curl -s -X POST http://0.0.0.0:3001/users -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{"ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000000", "metadata": {"name": "Jane Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "jane.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "jane.doe"}}, "content": {"email": "jane.doe@mail.com", "phone": "0987654321", "lastName": "Doe", "firstName": "Jane", "password": "P@ssw0rd!234" }}' | jq
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @Post()
  async createUser(@Body() createUserRequestDTO: CreateUserRequestDTO): Promise<UserResponseDTO> {
    return await this.userService.createUser(createUserRequestDTO);
  }

  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json' -d '{"ID": "john.doe", "metadata": {"name": "John Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe"}}, "content": {"email": "john.doe@example.com", "password": "P@ssw0rd!234"}}' | jq
  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{"ID": "jane.doe", "metadata": {"name": "Jane Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "jane.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "jane.doe"}}, "content": {"email": "jane.doe@example.com", "password": "P@ssw0rd!234"}}' | jq
  @ApiOperation({ summary: 'Update a user by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiBody({ type: UpdateUserRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put(':uuid')
  async updateUser(
    @Param('uuid') uuid: string,
    @Body() updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    return await this.userService.updateUser(uuid, updateUserRequestDTO);
  }

  // curl -s -X DELETE http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json'| jq
  // curl -s -X DELETE http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Delete a user by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async deleteUser(@Param('uuid') uuid: string): Promise<UserResponseDTO> {
    return await this.userService.deleteUser(uuid);
  }

  // curl -s -X GET http://0.0.0.0:3001/users/ID/john.doe -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/ID/john.doe -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'ID',
    description: 'The user ID',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('ID/:ID')
  async getUserByID(@Param('ID') ID: string): Promise<UserResponseDTO> {
    return this.userService.getUserByID(ID);
  }

  // curl -s -X GET http://0.0.0.0:3001/users/name/John%20Doe -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/name/John%20Doe -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user by name' })
  @ApiParam({
    name: 'name',
    description: 'The user name',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  async getUserByName(@Param('name') name: string): Promise<UserResponseDTO> {
    return this.userService.getUserByName(name);
  }

  // curl -s -X GET http://0.0.0.0:3001/users/email/john.doe@mail.com -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/email/john.doe@mail.com -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiParam({
    name: 'email',
    description: 'The user email',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserResponseDTO> {
    return this.userService.getUserByEmail(email);
  }

  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001/metadata -H 'Content-Type: application/json' -d '{"ID": "john.doe", "metadata": {"name": "John Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe"}}}' | jq
  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002/metadata -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{"ID": "jane.doe", "metadata": {"name": "Jane Doe", "dates": {"createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "jane.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "jane.doe"}}}' | jq
  @ApiOperation({ summary: 'Update a user metadata by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiBody({ type: UpdateUserMetadataRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user metadata has been successfully updated.',
    type: UserMetadataResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User metadata not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put(':uuid/metadata')
  async updateUserMetadata(
    @Param('uuid') uuid: string,
    @Body() updateUserMetadataRequestDTO: UpdateUserMetadataRequestDTO,
  ): Promise<UserMetadataResponseDTO> {
    return this.userService.updateUserMetadata(uuid, updateUserMetadataRequestDTO);
  }

  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001/content -H 'Content-Type: application/json' -d '{"ID": "john.doe", "content": {"email": "john.doe@example.com", "phone": "0912345678", "password": "P@ssw0rd!234"}}' | jq
  // curl -s -X PUT http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{"ID": "jane.doe", "content": {"email": "jane.doe@example.com", "phone": "0987654321", "password": "P@ssw0rd!234"}}' | jq
  @ApiOperation({ summary: 'Update a user content by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiBody({ type: UpdateUserContentRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user content has been successfully updated.',
    type: UserContentResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User content not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put(':uuid/content')
  async updateUserContent(
    @Param('uuid') uuid: string,
    @Body() updateUserContentRequestDTO: UpdateUserContentRequestDTO,
  ): Promise<UserContentResponseDTO> {
    return this.userService.updateUserContent(uuid, updateUserContentRequestDTO);
  }

  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001/metadata -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002/metadata -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user metadata by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user metadata has been successfully retrieved.',
    type: UserMetadataResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User metadata not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get(':uuid/metadata')
  async getUserMetadata(@Param('uuid') uuid: string): Promise<UserMetadataResponseDTO> {
    return this.userService.getUserMetadata(uuid);
  }

  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000001/content -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/users/00000000-0000-0000-0000-000000000002/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a user content by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The user uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user content has been successfully retrieved.',
    type: UserContentResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User content not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get(':uuid/content')
  async getUserContent(@Param('uuid') uuid: string): Promise<UserContentResponseDTO> {
    return this.userService.getUserContent(uuid);
  }
}
