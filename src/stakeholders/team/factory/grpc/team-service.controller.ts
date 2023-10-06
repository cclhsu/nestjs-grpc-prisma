// Path: src/stakeholders/team/factory/grpc/team-service.controller.ts
// DESC: This is the main entry point for the grpc application.
'use strict';

import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { IdUuid } from 'generated/grpc/common/common.pb';
import {
  CreateTeamRequest,
  GetTeamByEmailRequest,
  GetTeamByIdRequest,
  GetTeamByNameRequest,
  GetTeamByUuidRequest,
  ListTeamIdUuid,
  ListTeamsContentResponse,
  ListTeamsMetadataResponse,
  ListTeamsResponse,
  Team,
  TeamContentResponse,
  TeamMetadataResponse,
  TeamServiceController as TeamServiceControllerInterface,
  UpdateTeamContentRequest,
  UpdateTeamMetadataRequest,
  UpdateTeamRequest,
} from 'generated/grpc/stakeholders/team/team.pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
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

// grpcurl -plaintext localhost:5000 list
// grpcurl -plaintext 0.0.0.0:5000 describe team.TeamService
// grpcurl -plaintext -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 describe team.TeamService
@Controller('team')
export class TeamServiceController implements TeamServiceControllerInterface {
  private logger: Logger = new Logger(TeamServiceController.name);
  constructor(private readonly teamService: TeamService) {}

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 team.TeamService/ListTeamIdsAndUUIDs
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/ListTeamIdsAndUUIDs
  @GrpcMethod('TeamService', 'ListTeamIdsAndUUIDs')
  async listTeamIdsAndUuiDs(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListTeamIdUuid> {
    try {
      const teamIdUuids: TeamIdUuidDTO[] = await this.teamService.listTeamIdsAndUUIDs();

      const teamIdUuidResponse: IdUuid[] = teamIdUuids.map(({ UUID, ID }) => ({
        UUID,
        ID,
      }));

      return { teamIdUuids: teamIdUuidResponse };
    } catch (error: any) {
      this.logger.error(error);
      return { teamIdUuids: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 team.TeamService/ListTeams
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/ListTeams
  @GrpcMethod('TeamService', 'ListTeams')
  async listTeams(_request: Empty, _metadata: Metadata, ..._rest: any): Promise<ListTeamsResponse> {
    try {
      const teamResponseDTOs: TeamResponseDTO[] = await this.teamService.listTeams();
      const teams: Team[] = teamResponseDTOs.map((teamEntity) => ({
        UUID: teamEntity.UUID,
        ID: teamEntity.ID,
        metadata: {
          ...teamEntity.metadata,
          dates: {
            ...teamEntity.metadata.dates,
            createdAt: teamEntity.metadata.dates.createdAt.toISOString(), // Convert Date to string
            updatedAt: teamEntity.metadata.dates.updatedAt.toISOString(), // Convert Date to string
            startedAt: teamEntity.metadata.dates.startedAt?.toISOString(), // Convert Date to string (if it's not undefined)
            startDate: teamEntity.metadata.dates.startDate?.toISOString(), // Convert Date to string (if it's not undefined)
            endDate: teamEntity.metadata.dates.endDate?.toISOString(), // Convert Date to string (if it's not undefined)
            completedAt: teamEntity.metadata.dates.completedAt?.toISOString(), // Convert Date to string (if it's not undefined)
          },
        },
        content: {
          ...teamEntity.content,
          productOwner: teamEntity.content.productOwner,
          scrumMaster: teamEntity.content.scrumMaster,
          members: teamEntity.content.members,
        },
      }));

      return { teams };
    } catch (error: any) {
      this.logger.error(error);
      return { teams: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 team.TeamService/ListTeamsMetadata
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/ListTeamsMetadata
  @GrpcMethod('TeamService', 'ListTeamsMetadata')
  async listTeamsMetadata(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListTeamsMetadataResponse> {
    try {
      const teamMetadataResponseDTOs: TeamMetadataResponseDTO[] =
        await this.teamService.listTeamsWithMetadata();

      const teamMetadataResponses: TeamMetadataResponse[] = teamMetadataResponseDTOs.map(
        (teamEntity) => ({
          UUID: teamEntity.UUID,
          ID: teamEntity.ID,
          metadata: {
            name: teamEntity.metadata.name,
            dates: {
              createdAt: teamEntity.metadata.dates.createdAt.toUTCString(),
              createdBy: teamEntity.metadata.dates.createdBy,
              updatedAt: teamEntity.metadata.dates.updatedAt.toISOString(),
              updatedBy: teamEntity.metadata.dates.updatedBy,
              startDate: teamEntity.metadata.dates.startDate?.toISOString(),
              endDate: teamEntity.metadata.dates.endDate?.toISOString(),
              startedAt: teamEntity.metadata.dates.startedAt?.toISOString(),
              startedBy: teamEntity.metadata.dates.startedBy,
              completedAt: teamEntity.metadata.dates.completedAt?.toISOString(),
              completedBy: teamEntity.metadata.dates.completedBy,
            },
          },
        }),
      );

      return { teamMetadataResponses };
    } catch (error: any) {
      this.logger.error(error);
      return { teamMetadataResponses: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 team.TeamService/ListTeamsContent
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/ListTeamsContent
  @GrpcMethod('TeamService', 'ListTeamsContent')
  async listTeamsContent(
    request: Empty,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<ListTeamsContentResponse> {
    try {
      const teamContentResponseDTOs: TeamContentResponseDTO[] =
        await this.teamService.listTeamsWithContent();

      const teamContentResponses: TeamContentResponse[] = teamContentResponseDTOs.map(
        (teamEntity) => ({
          UUID: teamEntity.UUID,
          ID: teamEntity.ID,
          content: {
            ...teamEntity.content,
          },
        }),
      );

      return { teamContentResponses };
    } catch (error: any) {
      this.logger.error(error);
      return { teamContentResponses: [] };
    }
  }

  // grpcurl -plaintext -d '{}' 0.0.0.0:5000 team.TeamService/GetTeam
  // grpcurl -plaintext -d '{}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeam
  @GrpcMethod('TeamService', 'GetTeam')
  async getTeam(request: GetTeamByUuidRequest, _metadata: Metadata, ..._rest: any): Promise<Team> {
    const { UUID } = request;
    const teamEntity: TeamResponseDTO = await this.teamService.getTeam(UUID);

    const { metadata, content } = teamEntity;

    const team: Team = {
      UUID: teamEntity.UUID,
      ID: teamEntity.ID,
      metadata: {
        name: metadata.name,
        dates: {
          createdAt: metadata.dates.createdAt.toISOString(),
          createdBy: metadata.dates.createdBy,
          updatedAt: metadata.dates.updatedAt.toISOString(),
          updatedBy: metadata.dates.updatedBy,
          startDate: metadata.dates.startDate?.toISOString(),
          endDate: metadata.dates.endDate?.toISOString(),
          startedAt: metadata.dates.startedAt?.toISOString(),
          startedBy: metadata.dates.startedBy,
          completedAt: metadata.dates.completedAt?.toISOString(),
          completedBy: metadata.dates.completedBy,
        },
      },
      content: {
        email: content.email,
        productOwner: content.productOwner,
        scrumMaster: content.scrumMaster,
        members: content.members,
      },
    };

    // if (!team) {
    //   throw new RpcException({
    //     code: grpc.status.NOT_FOUND,
    //     message: `Team with UUID: ${UUID} not found`,
    //   });
    // }

    return team;
  }

  // grpcurl -plaintext -d '{
  //   "ID": "xyz.team",
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "metadata": {
  //     "name": "XYZ Team",
  //     "dates": {
  //       "createdAt": "2021-08-28T00:00:00.000Z",
  //       "createdBy": "john.doe",
  //       "updatedAt": "2021-08-28T00:00:00.000Z",
  //       "updatedBy": "john.doe",
  //       "startDate": "2021-08-28T00:00:00.000Z",
  //       "endDate": "2021-08-28T00:00:00.000Z",
  //       "startedAt": "2021-08-28T00:00:00.000Z",
  //       "startedBy": "john.doe",
  //       "completedAt": "2021-08-28T00:00:00.000Z",
  //       "completedBy": "john.doe"
  //     }
  //   },
  //   "content": {
  //     "email": "xyz.team@mail.com",
  //     "productOwner": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
  //     "scrumMaster": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
  //     "members": [{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"}]
  //   }
  // }' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/CreateTeam
  @GrpcMethod('TeamService', 'CreateTeam')
  async createTeam(request: CreateTeamRequest, _metadata: Metadata, ..._rest: any): Promise<Team> {
    try {
      // Destructure request object
      const { UUID, ID, metadata, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !ID || !metadata || !content) {
        throw new Error('Invalid arguments');
      }

      // Create CreateTeamRequestDTO
      const createTeamRequestDTO: CreateTeamRequestDTO = new CreateTeamRequestDTO(
        ID,
        UUID,
        {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        },
        {
          ...content,
          productOwner: content.productOwner!,
          scrumMaster: content.scrumMaster!,
          members: content.members,
        },
      );

      // Call teamService to create team
      const teamResponseDTO: TeamResponseDTO =
        await this.teamService.createTeam(createTeamRequestDTO);

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error creating team',
      });
    }
  }

//   grpcurl -plaintext -d '{
//     "UUID": "00000000-0000-0000-0000-000000000000",
//     "metadata": {
//       "name": "XYZ Team",
//       "dates": {
//         "createdAt": "2021-08-28T00:00:00.000Z",
//         "createdBy": "john.doe",
//         "updatedAt": "2021-08-28T00:00:00.000Z",
//         "updatedBy": "john.doe",
//         "startDate": "2021-08-28T00:00:00.000Z",
//         "endDate": "2021-08-28T00:00:00.000Z",
//         "startedAt": "2021-08-28T00:00:00.000Z",
//         "startedBy": "john.doe",
//         "completedAt": "2021-08-28T00:00:00.000Z",
//         "completedBy": "john.doe"
//       }
//     },
//     "content": {
//       "email": "xyz.team@mail.com",
//       "productOwner": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
//       "scrumMaster": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
//       "members": [{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"}]
//     }
//   }' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/UpdateTeam
  @GrpcMethod('TeamService', 'UpdateTeam')
  async updateTeam(request: UpdateTeamRequest, _metadata: Metadata, ..._rest: any): Promise<Team> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, metadata, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !metadata || !content) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateTeamRequestDTO
      const updateTeamRequestDTO: UpdateTeamRequestDTO = new UpdateTeamRequestDTO(
        UUID,
        {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        },
        {
          ...content,
          productOwner: content.productOwner! as IdUuid,
          scrumMaster: content.scrumMaster! as IdUuid,
          members: content.members as IdUuid[],
        },
      );

      // Logging CreateTeamRequestDTO for debugging
      this.logger.log(JSON.stringify(updateTeamRequestDTO, null, 2));

      // Call teamService to update team
      const teamResponseDTO: TeamResponseDTO = await this.teamService.updateTeam(
        UUID,
        updateTeamRequestDTO,
      );

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
          productOwner: teamResponseDTO.content.productOwner,
          scrumMaster: teamResponseDTO.content.scrumMaster,
          members: teamResponseDTO.content.members,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating team',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 team.TeamService/DeleteTeam
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/DeleteTeam
  @GrpcMethod('TeamService', 'DeleteTeam')
  async deleteTeam(
    request: GetTeamByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<Team> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to delete team
      const teamResponseDTO: TeamResponseDTO = await this.teamService.deleteTeam(UUID);

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: teamResponseDTO.metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
          productOwner: teamResponseDTO.content.productOwner,
          scrumMaster: teamResponseDTO.content.scrumMaster,
          members: teamResponseDTO.content.members,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error deleting team',
      });
    }
  }

  // grpcurl -plaintext -d '{"ID": "xyz.team"}' 0.0.0.0:5000 team.TeamService/GetTeamById
  // grpcurl -plaintext -d '{"ID": "xyz.team"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeamById
  @GrpcMethod('TeamService', 'GetTeamById')
  async getTeamById(
    request: GetTeamByIdRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<Team> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { ID } = request;

      // Check for missing or invalid arguments
      if (!ID) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to get team
      const teamResponseDTO: TeamResponseDTO = await this.teamService.getTeamByID(ID);

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: teamResponseDTO.metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
          productOwner: teamResponseDTO.content.productOwner,
          scrumMaster: teamResponseDTO.content.scrumMaster,
          members: teamResponseDTO.content.members,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting team',
      });
    }
  }

  // grpcurl -plaintext -d '{"name": "xyz.team"}' 0.0.0.0:5000 team.TeamService/GetTeamByName
  // grpcurl -plaintext -d '{"name": "xyz.team"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeamByName
  @GrpcMethod('TeamService', 'GetTeamByName')
  async getTeamByName(
    request: GetTeamByNameRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<Team> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { name } = request;

      // Check for missing or invalid arguments
      if (!name) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to get team
      const teamResponseDTO: TeamResponseDTO = await this.teamService.getTeamByName(name);

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: teamResponseDTO.metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
          productOwner: teamResponseDTO.content.productOwner,
          scrumMaster: teamResponseDTO.content.scrumMaster,
          members: teamResponseDTO.content.members,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting team',
      });
    }
  }

  // grpcurl -plaintext -d '{"email": "xyz.team@mail.com"}' 0.0.0.0:5000 team.TeamService/GetTeamByEmail
  // grpcurl -plaintext -d '{"email": "xyz.team@mail.com"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeamByEmail
  @GrpcMethod('TeamService', 'GetTeamByEmail')
  async getTeamByEmail(
    request: GetTeamByEmailRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<Team> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { email } = request;

      // Check for missing or invalid arguments
      if (!email) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to get team
      const teamResponseDTO: TeamResponseDTO = await this.teamService.getTeamByEmail(email);

      // Create the Team object
      const team: Team = {
        ID: teamResponseDTO.ID,
        UUID: teamResponseDTO.UUID,
        metadata: {
          name: teamResponseDTO.metadata.name,
          dates: {
            ...teamResponseDTO.metadata.dates,
            createdAt: teamResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
        content: {
          ...teamResponseDTO.content,
          productOwner: teamResponseDTO.content.productOwner,
          scrumMaster: teamResponseDTO.content.scrumMaster,
          members: teamResponseDTO.content.members,
        },
      };

      return team;
    } catch (error) {
      // Handle errors, log them, and rethrow if needed
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting team',
      });
    }
  }

  // grpcurl -plaintext -d '{
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "metadata": {
  //     "name": "XYZ Team",
  //     "dates": {
  //       "createdAt": "2021-08-28T00:00:00.000Z",
  //       "createdBy": "john.doe",
  //       "updatedAt": "2021-08-28T00:00:00.000Z",
  //       "updatedBy": "john.doe",
  //       "startDate": "2021-08-28T00:00:00.000Z",
  //       "endDate": "2021-08-28T00:00:00.000Z",
  //       "startedAt": "2021-08-28T00:00:00.000Z",
  //       "startedBy": "john.doe",
  //       "completedAt": "2021-08-28T00:00:00.000Z",
  //       "completedBy": "john.doe"
  //     }
  //   }
  // }' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/UpdateTeamMetadata
  @GrpcMethod('TeamService', 'UpdateTeamMetadata')
  async updateTeamMetadata(
    request: UpdateTeamMetadataRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<TeamMetadataResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, metadata } = request;

      // Check for missing or invalid arguments
      if (!UUID || !metadata) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateTeamMetadataRequestDTO
      const updateTeamMetadataRequestDTO: UpdateTeamMetadataRequestDTO =
        new UpdateTeamMetadataRequestDTO(UUID, {
          name: metadata.name,
          dates: {
            createdAt: new Date(metadata.dates!.createdAt),
            createdBy: metadata.dates!.createdBy,
            updatedAt: new Date(metadata.dates!.updatedAt),
            updatedBy: metadata.dates!.updatedBy,
            startDate: metadata.dates!.startDate ? new Date(metadata.dates!.startDate) : undefined,
            endDate: metadata.dates!.endDate ? new Date(metadata.dates!.endDate) : undefined,
            startedAt: metadata.dates!.startedAt ? new Date(metadata.dates!.startedAt) : undefined,
            startedBy: metadata.dates!.startedBy,
            completedAt: metadata.dates!.completedAt
              ? new Date(metadata.dates!.completedAt)
              : undefined,
            completedBy: metadata.dates!.completedBy,
          },
        });

      // Logging UpdateTeamMetadataRequestDTO for debugging
      this.logger.log(JSON.stringify(updateTeamMetadataRequestDTO, null, 2));

      // Call teamService to update team
      const teamMetadataResponseDTO: TeamMetadataResponseDTO =
        await this.teamService.updateTeamMetadata(UUID, updateTeamMetadataRequestDTO);

      // Create the Team object
      const teamMetadataResponse: TeamMetadataResponse = {
        UUID: teamMetadataResponseDTO.UUID,
        ID: teamMetadataResponseDTO.ID,
        metadata: {
          name: teamMetadataResponseDTO.metadata.name,
          dates: {
            ...teamMetadataResponseDTO.metadata.dates,
            createdAt: teamMetadataResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamMetadataResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamMetadataResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamMetadataResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamMetadataResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamMetadataResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
      };

      return teamMetadataResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating team metadata',
      });
    }
  }

  // grpcurl -plaintext -d '{
  //   "UUID": "00000000-0000-0000-0000-000000000000",
  //   "content": {
  //     "email": "xyz.team@mail.com",
  //     "productOwner": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
  //     "scrumMaster": {"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"},
  //     "members": [{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000000"}]
  //   }
  // }' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/UpdateTeamContent
  @GrpcMethod('TeamService', 'UpdateTeamContent')
  async updateTeamContent(
    request: UpdateTeamContentRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<TeamContentResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Logging request for debugging
      this.logger.log(JSON.stringify(request, null, 2));

      // Destructure request object
      const { UUID, content } = request;

      // Check for missing or invalid arguments
      if (!UUID || !content) {
        throw new Error('Invalid arguments');
      }

      // Create UpdateTeamContentRequestDTO
      const updateTeamContentRequestDTO: UpdateTeamContentRequestDTO =
        new UpdateTeamContentRequestDTO(UUID, {
          ...content,
          productOwner: content.productOwner!,
          scrumMaster: content.scrumMaster!,
          members: content.members,
        });

      // Logging UpdateTeamContentRequestDTO for debugging
      this.logger.log(JSON.stringify(updateTeamContentRequestDTO, null, 2));

      // Call teamService to update team
      const teamContentResponseDTO: TeamContentResponseDTO =
        await this.teamService.updateTeamContent(UUID, updateTeamContentRequestDTO);

      // Create the Team object
      const teamContentResponse: TeamContentResponse = {
        UUID: teamContentResponseDTO.UUID,
        ID: teamContentResponseDTO.ID,
        content: {
          ...teamContentResponseDTO.content,
          productOwner: teamContentResponseDTO.content.productOwner,
          scrumMaster: teamContentResponseDTO.content.scrumMaster,
          members: teamContentResponseDTO.content.members,
        },
      };

      return teamContentResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error updating team content',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 team.TeamService/GetTeamMetadata
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeamMetadata
  @GrpcMethod('TeamService', 'GetTeamMetadata')
  async getTeamMetadata(
    request: GetTeamByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<TeamMetadataResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to get team
      const teamMetadataResponseDTO: TeamMetadataResponseDTO =
        await this.teamService.getTeamMetadata(UUID);

      // Create the Team object
      const teamMetadataResponse: TeamMetadataResponse = {
        UUID: teamMetadataResponseDTO.UUID,
        ID: teamMetadataResponseDTO.ID,
        metadata: {
          name: teamMetadataResponseDTO.metadata.name,
          dates: {
            ...teamMetadataResponseDTO.metadata.dates,
            createdAt: teamMetadataResponseDTO.metadata.dates.createdAt.toISOString(),
            updatedAt: teamMetadataResponseDTO.metadata.dates.updatedAt.toISOString(),
            startDate: teamMetadataResponseDTO.metadata.dates.startDate?.toISOString(),
            endDate: teamMetadataResponseDTO.metadata.dates.endDate?.toISOString(),
            startedAt: teamMetadataResponseDTO.metadata.dates.startedAt?.toISOString(),
            completedAt: teamMetadataResponseDTO.metadata.dates.completedAt?.toISOString(),
          },
        },
      };

      return teamMetadataResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting team metadata',
      });
    }
  }

  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' 0.0.0.0:5000 team.TeamService/GetTeamContent
  // grpcurl -plaintext -d '{"UUID": "00000000-0000-0000-0000-000000000000"}' -proto api/grpc/proto/team.proto -import-path api/grpc/proto 0.0.0.0:5000 team.TeamService/GetTeamContent
  @GrpcMethod('TeamService', 'GetTeamContent')
  async getTeamContent(
    request: GetTeamByUuidRequest,
    _metadata: Metadata,
    ..._rest: any
  ): Promise<TeamContentResponse> {
    // throw new Error('Method not implemented.');
    try {
      // Destructure request object
      const { UUID } = request;

      // Check for missing or invalid arguments
      if (!UUID) {
        throw new Error('Invalid arguments');
      }

      // Call teamService to get team
      const teamContentResponseDTO: TeamContentResponseDTO =
        await this.teamService.getTeamContent(UUID);

      // Create the Team object
      const teamContentResponse: TeamContentResponse = {
        UUID: teamContentResponseDTO.UUID,
        ID: teamContentResponseDTO.ID,
        content: {
          ...teamContentResponseDTO.content,
          productOwner: teamContentResponseDTO.content.productOwner,
          scrumMaster: teamContentResponseDTO.content.scrumMaster,
          members: teamContentResponseDTO.content.members,
        },
      };

      return teamContentResponse;
    } catch (
      error // Handle errors, log them, and rethrow if needed
    ) {
      this.logger.error(error);
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Error getting team content',
      });
    }
  }
}

export default TeamServiceController;

export {};
