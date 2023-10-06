import { Logger, NotFoundException } from '@nestjs/common';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { existsSync } from 'fs';
import { glob } from 'glob';
import { DEFAULT_FILE_REPOSITORY_EXTENSION } from '../../../common/constant';
import { deleteFile } from '../../../utils/file/file.utils';
import {
  TeamIdUuidDTO,
  CreateTeamRequestDTO,
  UpdateTeamRequestDTO,
  TeamMetadataDTO,
  TeamContentDTO,
} from '../dto';
import { TeamEntity, TeamMetadataEntity, TeamContentEntity } from '../entity';
import { TeamRepositoryInterface } from './team-repository.interface';

export class MultipleJsonFilesTeamRepository implements TeamRepositoryInterface {
  private readonly logger = new Logger(MultipleJsonFilesTeamRepository.name);
  constructor(
    private readonly dirPath: string,
    private readonly readFromJSON: <T>(filePath: string) => Promise<T>,
    private readonly writeToJSON: <T>(filePath: string, data: T) => void,
  ) {}

  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    const teams: TeamEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
        if (team) {
          teams.push(team);
        }
      }
    }
    return teams.map((team) => ({
      ID: team.ID,
      UUID: team.UUID,
    }));
  }

  async listTeams(): Promise<TeamEntity[]> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    const teams: TeamEntity[] = [];
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
        if (team) {
          teams.push(team);
        }
      }
    }
    return teams;
  }

  async getTeam(UUID: string): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      return this.readFromJSON<TeamEntity>(filePath);
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
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
    const filePath = `${this.dirPath}/${newUUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    this.writeToJSON(filePath, newTeam);
    return newTeam;
  }

  async updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${UUID} cannot be found`);
      }
      const updatedTeamMetadata: TeamMetadataEntity = {
        ...team.metadata,
        ...instanceToPlain(updateTeamRequestDTO.metadata),
      };
      const updatedTeamContent: TeamContentEntity = {
        ...team.content,
        ...updateTeamRequestDTO.content,
      };
      const updatedTeam = new TeamEntity(team.ID, UUID, updatedTeamMetadata, updatedTeamContent);
      this.writeToJSON(filePath, updatedTeam);
      return updatedTeam;
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
  }

  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const filePath = `${this.dirPath}/${UUID}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    this.logger.debug(filePath);
    if (existsSync(filePath)) {
      const deletedTeam: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!deletedTeam) {
        throw new NotFoundException(`Team ${UUID} cannot be found`);
      }
      await deleteFile(filePath);
      return deletedTeam;
    } else {
      throw new NotFoundException(`Team ${UUID} cannot be found`);
    }
  }

  async getTeamByID(ID: string): Promise<TeamEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team = await this.readFromJSON<TeamEntity>(filePath);
        if (team.ID === ID) {
          return team;
        }
      }
    }
    throw new NotFoundException(`Team ${ID} cannot be found`);
  }

  async getTeamByName(name: string): Promise<TeamEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
        if (team.metadata.name === name) {
          return team;
        }
      }
    }
    throw new NotFoundException(`Team ${name} cannot be found`);
  }

  // Get a team by email
  async getTeamByEmail(email: string): Promise<TeamEntity> {
    const filesPath: string[] = glob.sync(`${this.dirPath}/*.${DEFAULT_FILE_REPOSITORY_EXTENSION}`);
    for (const filePath of filesPath) {
      if (existsSync(filePath)) {
        const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
        if (team.content.email === email) {
          return team;
        }
      }
    }
    throw new NotFoundException(`Team ${email} cannot be found`);
  }

  // Update a team metadata by UUID
  async updateTeamMetadata(
    uuid: string,
    updatedMetadata: TeamMetadataDTO,
  ): Promise<TeamMetadataDTO> {
    this.logger.log(`Team UUID: ${uuid} | Team Metadata: ${updatedMetadata}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${uuid} cannot be found`);
      }
      const updatedTeamMetadata: TeamMetadataEntity = {
        ...team.metadata,
        ...instanceToPlain(updatedMetadata),
      };
      const updatedTeam = new TeamEntity(team.ID, uuid, updatedTeamMetadata, team.content);
      this.writeToJSON(filePath, updatedTeam);
      return updatedTeam.metadata;
    } else {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
  }

  // Update a team content by UUID
  async updateTeamContent(uuid: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid} | Team Content: ${updatedContent}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${uuid} cannot be found`);
      }
      const updatedTeamContent: TeamContentEntity = {
        ...team.content,
        ...updatedContent,
      };
      team.metadata.dates.updatedAt = new Date();
      const updatedTeam = new TeamEntity(team.ID, uuid, team.metadata, updatedTeamContent);
      this.writeToJSON(filePath, updatedTeam);
      return updatedTeam.content;
    } else {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
  }

  // Get a team metadata by UUID
  async getTeamMetadata(uuid: string): Promise<TeamMetadataDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${uuid} cannot be found`);
      }
      return team.metadata;
    } else {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
  }

  // Get a team content by UUID
  async getTeamContent(uuid: string): Promise<TeamContentDTO> {
    this.logger.log(`Team UUID: ${uuid}`);
    const filePath = `${this.dirPath}/${uuid}.${DEFAULT_FILE_REPOSITORY_EXTENSION}`;
    if (existsSync(filePath)) {
      const team: TeamEntity = await this.readFromJSON<TeamEntity>(filePath);
      if (!team) {
        throw new NotFoundException(`Team ${uuid} cannot be found`);
      }
      return team.content;
    } else {
      throw new NotFoundException(`Team ${uuid} cannot be found`);
    }
  }
}
