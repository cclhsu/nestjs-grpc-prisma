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
  CreateTeamRequestDTO,
  TeamContentResponseDTO,
  TeamIdUuidDTO,
  TeamMetadataResponseDTO,
  TeamResponseDTO,
  UpdateTeamContentRequestDTO,
  UpdateTeamMetadataRequestDTO,
  UpdateTeamRequestDTO,
} from '../../dto';
import { TeamService } from '../../team.service';

// interface TeamExternalInterface {
//   listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]>;
//   listTeams(): Promise<TeamResponseDTO[]>;
//   listTeamsWithMetadata(): Promise<TeamMetadataResponseDTO[]>;
//   listTeamsWithContent(): Promise<TeamContentResponseDTO[]>;
//   getTeam(uuid: string): Promise<TeamResponseDTO>;
//   createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamResponseDTO>;
//   updateTeam(uuid: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamResponseDTO>;
//   deleteTeam(uuid: string): Promise<TeamResponseDTO>;
//   getTeamByID(ID: string): Promise<TeamResponseDTO>;
//   getTeamByName(name: string): Promise<TeamResponseDTO>;
//   getTeamByEmail(email: string): Promise<TeamResponseDTO>;
//   updateTeamMetadata(
//     uuid: string,
//     updateTeamMetadataRequestDTO: UpdateTeamMetadataRequestDTO,
//   ): Promise<TeamMetadataResponseDTO>;
//   updateTeamContent(
//     uuid: string,
//     updateTeamContentRequestDTO: UpdateTeamContentRequestDTO,
//   ): Promise<TeamContentResponseDTO>;
//   getTeamMetadata(uuid: string): Promise<TeamMetadataResponseDTO>;
//   getTeamContent(uuid: string): Promise<TeamContentResponseDTO>;

//   sendTeamInvitation(uuid: string, email: string): Promise<void>;
//   getTeamProjects(uuid: string): Promise<any>;
//   getTeamTasks(uuid: string): Promise<any>;
// }

@Controller('teams')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  // curl -s -X GET http://0.0.0.0:3001/teams/ids-and-uuids -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/ids-and-uuids -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all team ids and uuids' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team ids and uuids have been successfully listed.',
    type: [TeamIdUuidDTO],
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
  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    return await this.teamService.listTeamIdsAndUUIDs();
  }

  // curl -s -X GET http://0.0.0.0:3001/teams -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all teams' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The teams have been successfully listed.',
    type: [TeamResponseDTO],
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
  async listTeams(): Promise<TeamResponseDTO[]> {
    return await this.teamService.listTeams();
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/metadata -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/metadata -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all teams with metadata' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The teams with metadata have been successfully listed.',
    type: [TeamMetadataResponseDTO],
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
  async listTeamsWithMetadata(): Promise<TeamMetadataResponseDTO[]> {
    return this.teamService.listTeamsWithMetadata();
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/content -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'List all teams with content' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The teams with content have been successfully listed.',
    type: [TeamContentResponseDTO],
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
  async listTeamsWithContent(): Promise<TeamContentResponseDTO[]> {
    return this.teamService.listTeamsWithContent();
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully retrieved.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async getTeam(@Param('uuid') uuid: string): Promise<TeamResponseDTO> {
    return await this.teamService.getTeam(uuid);
  }

  // curl -s -X POST http://0.0.0.0:3001/teams -H 'Content-Type: application/json' -d '{ "ID": "ABC-123", "UUID": "00000000-0000-0000-0000-000000000000", "metadata": { "name": "ABC 123", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } }, "content": { "email": "abc.team@mail.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  // curl -s -X POST http://0.0.0.0:3001/teams -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{ "ID": "XYZ-789", "UUID": "00000000-0000-0000-0000-000000000000", "metadata": { "name": "XYZ 789", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } }, "content": { "email": "xyz.team@mail.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  @ApiOperation({ summary: 'Create a new team' })
  @ApiBody({ type: CreateTeamRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 201,
    description: 'The team has been successfully created.',
    type: TeamResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
  })
  @Post()
  async createTeam(@Body() createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamResponseDTO> {
    return await this.teamService.createTeam(createTeamRequestDTO);
  }

  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json' -d '{ "ID": "ABC-123", "metadata": { "name": "ABC 123", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } }, "content": { "email": "abc.team@example.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{ "ID": "XYZ-789", "metadata": { "name": "XYZ 789", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } }, "content": { "email": "xyz.team@example.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  @ApiOperation({ summary: 'Update a team by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiBody({ type: UpdateTeamRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully updated.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async updateTeam(
    @Param('uuid') uuid: string,
    @Body() updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamResponseDTO> {
    return await this.teamService.updateTeam(uuid, updateTeamRequestDTO);
  }

  // curl -s -X DELETE http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001 -H 'Content-Type: application/json'| jq
  // curl -s -X DELETE http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002 -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Delete a team by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully deleted.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async deleteTeam(@Param('uuid') uuid: string): Promise<TeamResponseDTO> {
    return await this.teamService.deleteTeam(uuid);
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/ID/john.doe -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/ID/john.doe -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiParam({
    name: 'ID',
    description: 'The team ID',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully retrieved.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async getTeamByID(@Param('ID') ID: string): Promise<TeamResponseDTO> {
    return this.teamService.getTeamByID(ID);
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/name/john.doe -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/name/john.doe -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team by name' })
  @ApiParam({
    name: 'name',
    description: 'The team name',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully retrieved.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async getTeamByName(@Param('name') name: string): Promise<TeamResponseDTO> {
    return this.teamService.getTeamByName(name);
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/email/john.doe@mail.com -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/email/john.doe@mail.com -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team by email' })
  @ApiParam({
    name: 'email',
    description: 'The team email',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully retrieved.',
    type: TeamResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team not found.',
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
  async getTeamByEmail(@Param('email') email: string): Promise<TeamResponseDTO> {
    return this.teamService.getTeamByEmail(email);
  }

  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001/metadata -H 'Content-Type: application/json' -d '{ "ID": "ABC-123", "metadata": { "name": "ABC 123", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } } }' | jq
  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002/metadata  -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{ "ID": "XYZ-789", "metadata": { "name": "XYZ 789", "dates": { "createdAt": "2021-01-01T00:00:00.000Z", "createdBy": "john.doe", "updatedAt": "2021-01-01T00:00:00.000Z", "updatedBy": "john.doe" } } }' | jq
  @ApiOperation({ summary: 'Update a team metadata by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiBody({ type: UpdateTeamMetadataRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team metadata has been successfully updated.',
    type: TeamMetadataResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team metadata not found.',
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
  async updateTeamMetadata(
    @Param('uuid') uuid: string,
    @Body() updateTeamMetadataRequestDTO: UpdateTeamMetadataRequestDTO,
  ): Promise<TeamMetadataResponseDTO> {
    return this.teamService.updateTeamMetadata(uuid, updateTeamMetadataRequestDTO);
  }

  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001/content -H 'Content-Type: application/json' -d '{ "ID": "ABC-123", "content": { "email": "abc.team@example.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  // curl -s -X PUT http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" -d '{ "ID": "XYZ-789", "content": { "email": "xyz.team@example.com", "members": [ { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" }, { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" } ], "productOwner": { "ID": "jane.doe", "UUID": "00000000-0000-0000-0000-000000000002" }, "scrumMaster": { "ID": "john.doe", "UUID": "00000000-0000-0000-0000-000000000001" } } }' | jq
  @ApiOperation({ summary: 'Update a team content by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiBody({ type: UpdateTeamContentRequestDTO })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team content has been successfully updated.',
    type: TeamContentResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team content not found.',
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
  async updateTeamContent(
    @Param('uuid') uuid: string,
    @Body() updateTeamContentRequestDTO: UpdateTeamContentRequestDTO,
  ): Promise<TeamContentResponseDTO> {
    return this.teamService.updateTeamContent(uuid, updateTeamContentRequestDTO);
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001/metadata -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002/metadata -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team metadata by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team metadata has been successfully retrieved.',
    type: TeamMetadataResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team metadata not found.',
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
  async getTeamMetadata(@Param('uuid') uuid: string): Promise<TeamMetadataResponseDTO> {
    return this.teamService.getTeamMetadata(uuid);
  }

  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000001/content -H 'Content-Type: application/json' | jq
  // curl -s -X GET http://0.0.0.0:3001/teams/00000000-0000-0000-0000-000000000002/content -H 'Content-Type: application/json' -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get a team content by uuid' })
  @ApiParam({
    name: 'uuid',
    description: 'The team uuid',
    type: String,
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The team content has been successfully retrieved.',
    type: TeamContentResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Team content not found.',
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
  async getTeamContent(@Param('uuid') uuid: string): Promise<TeamContentResponseDTO> {
    return this.teamService.getTeamContent(uuid);
  }
}
