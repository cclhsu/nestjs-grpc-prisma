import { Logger, NotFoundException } from '@nestjs/common';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import {
  TeamIdUuidDTO,
  CreateTeamRequestDTO,
  UpdateTeamRequestDTO,
  TeamMetadataDTO,
  TeamContentDTO,
} from '../dto';
import { TeamEntity, TeamMetadataEntity, TeamContentEntity } from '../entity';
import { TeamRepositoryInterface } from './team-repository.interface';

export class SingleJsonFileTeamRepository implements TeamRepositoryInterface {
  private readonly logger = new Logger(SingleJsonFileTeamRepository.name);
  constructor(
    private readonly filePath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T[]>,
    private readonly writeToJSON: <T>(filePath: string, data: T[]) => void,
  ) {}

  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    return teams.map((team) => ({
      ID: team.ID,
      UUID: team.UUID,
    }));
  }

  async listTeams(): Promise<TeamEntity[]> {
    return this.readFromJSON<TeamEntity>(this.filePath);
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const team: TeamEntity | undefined = teams.find((team) => team.UUID === UUID);
    if (!team) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    return team;
  }

  async createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
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
    teams.push(newTeam);
    this.writeToJSON(this.filePath, teams);
    return newTeam;
  }

  async updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...teams[teamIndex].metadata,
      ...instanceToPlain(updateTeamRequestDTO.metadata),
    };
    const updatedTeamContent: TeamContentEntity = {
      ...teams[teamIndex].content,
      ...updateTeamRequestDTO.content,
    };
    const updatedTeam = new TeamEntity(
      teams[teamIndex].ID,
      UUID,
      updatedTeamMetadata,
      updatedTeamContent,
    );
    teams[teamIndex] = updatedTeam;
    this.writeToJSON(this.filePath, teams);
    return updatedTeam;
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === UUID);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
    const deletedTeam: TeamEntity = teams.splice(teamIndex, 1)[0];
    this.writeToJSON(this.filePath, teams);
    return deletedTeam;
  }

  async getTeamByID(ID: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const team: TeamEntity | undefined = teams.find((team) => team.ID === ID);
    if (!team) {
      throw new NotFoundException(`Team ${ID} cannot be found`);
    }
    return team;
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const team: TeamEntity | undefined = teams.find((team) => team.metadata.name === name);
    if (!team) {
      throw new NotFoundException(`Team ${name} cannot be found`);
    }
    return team;
  }

  // Get a team by email
  async getTeamByEmail(email: string): Promise<TeamEntity> {
    this.logger.log(`Team Email: ${email}`);
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const team = teams.find((team) => team.content.email === email);
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
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    const updatedTeamMetadata: TeamMetadataEntity = {
      ...teams[teamIndex].metadata,
      ...instanceToPlain(updatedMetadata),
    };
    const updatedTeam = new TeamEntity(
      teams[teamIndex].ID,
      uuid,
      updatedTeamMetadata,
      teams[teamIndex].content,
    );
    teams[teamIndex] = updatedTeam;
    this.writeToJSON(this.filePath, teams);
    return updatedTeam.metadata;
  }

  // Update a team content by UUID
  async updateTeamContent(uuid: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid} | Team Content: ${updatedContent}`);
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    const updatedTeamContent: TeamContentEntity = {
      ...teams[teamIndex].content,
      ...updatedContent,
    };
    teams[teamIndex].metadata.dates.updatedAt = new Date();
    const updatedTeam = new TeamEntity(
      teams[teamIndex].ID,
      uuid,
      teams[teamIndex].metadata,
      updatedTeamContent,
    );
    teams[teamIndex] = updatedTeam;
    this.writeToJSON(this.filePath, teams);
    return updatedTeam.content;
  }

  // Get a team metadata by UUID
  async getTeamMetadata(uuid: string): Promise<TeamMetadataDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    return teams[teamIndex].metadata;
  }

  // Get a team content by UUID
  async getTeamContent(uuid: string): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const teams: TeamEntity[] = await this.readFromJSON<TeamEntity>(this.filePath);
    const teamIndex = teams.findIndex((team) => team.UUID === uuid);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
    return teams[teamIndex].content;
  }
}
