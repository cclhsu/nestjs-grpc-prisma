import { Logger, NotFoundException } from '@nestjs/common';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { CommonDateEntity } from '../../../common/entity';
import {
  TeamIdUuidDTO,
  CreateTeamRequestDTO,
  UpdateTeamRequestDTO,
  TeamMetadataDTO,
  TeamContentDTO,
} from '../dto';
import { TeamEntity, TeamMetadataEntity, TeamContentEntity } from '../entity';
import { TeamRepositoryInterface } from './team-repository.interface';

export class MemoryTeamRepository implements TeamRepositoryInterface {
  private readonly logger = new Logger(MemoryTeamRepository.name);
  private teams: TeamEntity[] = [
    new TeamEntity(
      'ABC-123',
      '00000000-0000-0000-0000-000000000001',
      new TeamMetadataEntity(
        'ABC 123',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'john.doe',
        ),
      ),
      new TeamContentEntity(
        'abc.team@mail.com',
        [
          {
            ID: 'john.doe',
            UUID: '00000000-0000-0000-0000-000000000001',
          },
          {
            ID: 'jane.doe',
            UUID: '00000000-0000-0000-0000-000000000002',
          },
        ],
        {
          ID: 'john.doe',
          UUID: '00000000-0000-0000-0000-000000000001',
        },
        {
          ID: 'jane.doe',
          UUID: '00000000-0000-0000-0000-000000000002',
        },
      ),
    ),
    new TeamEntity(
      'XYZ-789',
      '00000000-0000-0000-0000-000000000002',
      new TeamMetadataEntity(
        'XYZ 789',
        new CommonDateEntity(
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          new Date('2021-01-01T00:00:00.000Z'),
          'jane.doe',
        ),
      ),
      new TeamContentEntity(
        'xyz.team@mail.com',
        [
          {
            ID: 'john.doe',
            UUID: '00000000-0000-0000-0000-000000000001',
          },
          {
            ID: 'jane.doe',
            UUID: '00000000-0000-0000-0000-000000000002',
          },
        ],
        {
          ID: 'john.doe',
          UUID: '00000000-0000-0000-0000-000000000001',
        },
        {
          ID: 'jane.doe',
          UUID: '00000000-0000-0000-0000-000000000002',
        },
      ),
    ),
  ];

  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    return this.teams.map((team) => ({
      ID: team.ID,
      UUID: team.UUID,
    }));
  }

  async listTeams(): Promise<TeamEntity[]> {
    return this.teams;
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const team: TeamEntity | undefined = this.teams.find((team) => team.UUID === UUID);
    if (!team) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    return team;
  }

  async createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity> {
    const newUUID: string = uuidV4();
    const newTeamMetadata: TeamMetadataEntity = plainToInstance(
      TeamMetadataEntity,
      createTeamRequestDTO.metadata,
    );
    const newTeamContent: TeamContentEntity = plainToInstance(
      TeamContentEntity,
      createTeamRequestDTO.content,
    );
    const newTeam: TeamEntity = new TeamEntity(
      createTeamRequestDTO.ID,
      newUUID,
      newTeamMetadata,
      newTeamContent,
    );
    this.teams.push(newTeam);
    return newTeam;
  }

  async updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity> {
    const teamIndex = this.teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...this.teams[teamIndex].metadata,
      ...instanceToPlain(updateTeamRequestDTO.metadata),
    };
    const updatedTeamContent: TeamContentEntity = {
      ...this.teams[teamIndex].content,
      ...updateTeamRequestDTO.content,
    };
    const updatedTeam = new TeamEntity(
      this.teams[teamIndex].ID,
      UUID,
      updatedTeamMetadata,
      updatedTeamContent,
    );
    this.teams[teamIndex] = updatedTeam;
    return updatedTeam;
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const teamIndex = this.teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const deletedTeam: TeamEntity = this.teams.splice(teamIndex, 1)[0];
    return deletedTeam;
  }

  async getTeamByID(ID: string): Promise<TeamEntity> {
    const team: TeamEntity | undefined = this.teams.find((team) => team.ID === ID);
    if (!team) {
      throw new NotFoundException(`Team ${ID} cannot be found`);
    }
    return team;
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const team: TeamEntity | undefined = this.teams.find((team) => team.metadata.name === name);
    if (!team) {
      throw new NotFoundException(`Team ${name} cannot be found`);
    }
    return team;
  }

  // Get a team by email
  async getTeamByEmail(email: string): Promise<TeamEntity> {
    this.logger.log(`Team Email: ${email}`);
    const team = this.teams.find((team) => team.content.email === email);
    if (!team) {
      throw new NotFoundException(`Team ${email} cannot be found`);
    }
    return team;
  }

  // Update a team metadata by UUID
  async updateTeamMetadata(
    uuid: string,
    updatedMetadata: TeamMetadataDTO,
  ): Promise<TeamMetadataDTO> {
    this.logger.log(`Team UUID: ${uuid} | Team Metadata: ${updatedMetadata}`);
    const teamIndex = this.teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...this.teams[teamIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedTeam = new TeamEntity(
      this.teams[teamIndex].ID,
      uuid,
      updatedTeamMetadata,
      this.teams[teamIndex].content,
    );
    this.teams[teamIndex] = updatedTeam;
    return updatedTeam.metadata;
  }

  // Update a team content by UUID
  async updateTeamContent(uuid: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid} | Team Content: ${updatedContent}`);
    const teamIndex = this.teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    const updatedTeamContent: TeamContentEntity = {
      ...this.teams[teamIndex].content,
      ...updatedContent,
    };
    this.teams[teamIndex].metadata.dates.updatedAt = new Date();
    const updatedTeam = new TeamEntity(
      this.teams[teamIndex].ID,
      uuid,
      this.teams[teamIndex].metadata,
      updatedTeamContent,
    );
    this.teams[teamIndex] = updatedTeam;
    return updatedTeam.content;
  }

  // Get a team metadata by UUID
  async getTeamMetadata(uuid: string): Promise<TeamMetadataDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const teamIndex = this.teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    return this.teams[teamIndex].metadata;
  }

  // Get a team content by UUID
  async getTeamContent(uuid: string): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const teamIndex = this.teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    return this.teams[teamIndex].content;
  }
}
