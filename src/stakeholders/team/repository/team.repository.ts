import { Inject, Injectable, Logger, NotImplementedException } from '@nestjs/common';
import {
  DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
  DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
  DEFAULT_REPOSITORY_DEVICE_TYPE,
  DEFAULT_REPOSITORY_FILE_TYPE,
  DEFAULT_TEAM_FILE_PATH,
  DEFAULT_TEAM_PATH,
} from '../../../common/constant';
import {
  CreateTeamRequestDTO,
  TeamContentDTO,
  TeamIdUuidDTO,
  TeamMetadataDTO,
  UpdateTeamRequestDTO,
} from '../dto';
import { TeamEntity } from '../entity';
import { MemoryTeamRepository } from './memory-team.repository';
import { MultipleJsonFilesTeamRepository } from './multiple-json-files-team.repository';
import { SingleJsonFileTeamRepository } from './single-json-file-team.repository';
import { TeamRepositoryInterface } from './team-repository.interface';
import PrismaPostgresTeamRepository from './prisma-postgres-team.repository';

@Injectable()
export class TeamRepository {
  private readonly logger = new Logger(TeamRepository.name);
  private teamRepositoryInterface: TeamRepositoryInterface;

  private teams: TeamEntity[] = [];

  constructor(
    @Inject('ReadSingleFromJSON')
    private readonly readSingleFromJSON: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToJSON')
    private readonly writeSingleToJSON: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromYAML')
    private readonly readSingleFromYAML: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToYAML')
    private readonly writeSingleToYAML: <T>(filePath: string, data: T) => void,
    @Inject('ReadSingleFromCSV')
    private readonly readSingleFromCSV: <T>(filePath: string) => Promise<T>,
    @Inject('WriteSingleToCSV')
    private readonly writeSingleToCSV: <T>(filePath: string, data: T) => void,
    // @Inject('ReadSingleFromMarkdown')
    // private readonly readSingleFromMarkdown: <T>(filePath: string) => Promise<T>,
    // @Inject('WriteSingleToMarkdown')
    // private readonly writeSingleToMarkdown: <T>(filePath: string, data: T) => void,
    @Inject('ReadArrayFromJSON')
    private readonly readArrayFromJSON: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToJSON')
    private readonly writeArrayToJSON: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromYAML')
    private readonly readArrayFromYAML: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToYAML')
    private readonly writeArrayToYAML: <T>(filePath: string, data: T[]) => void,
    @Inject('ReadArrayFromCSV')
    private readonly readArrayFromCSV: <T>(filePath: string) => Promise<T[]>,
    @Inject('WriteArrayToCSV')
    private readonly writeArrayToCSV: <T>(filePath: string, data: T[]) => void, // @Inject('ReadArrayFromMarkdown') // private readonly readArrayFromMarkdown: <T>(filePath: string) => Promise<T[]>, // @Inject('WriteArrayToMarkdown') // private readonly writeArrayToMarkdown: <T>(filePath: string, data: T[]) => void,
  ) {
    this.teamRepositoryInterface = this.getRepositoryInterface();
  }

  // Get all team IDs and UUIDs
  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.listTeamIdsAndUUIDs();
  }

  // Get all teams
  async listTeams(): Promise<TeamEntity[]> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.listTeams();
  }

  // Get a team by UUID
  async getTeam(UUID: string): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeam(UUID);
  }

  // Create a new team
  async createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.createTeam(createTeamRequestDTO);
  }

  // Update a team by UUID
  async updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.updateTeam(UUID, updateTeamRequestDTO);
  }

  // Delete a team by UUID
  async deleteTeam(UUID: string): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.deleteTeam(UUID);
  }

  // Get a team by ID
  async getTeamByID(ID: string): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeamByID(ID);
  }

  // Get a team by name
  async getTeamByName(name: string): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeamByName(name);
  }

  // Get a team by email
  async getTeamByEmail(email: string): Promise<TeamEntity> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeamByEmail(email);
  }

  // Update a team metadata by UUID
  async updateTeamMetadata(
    UUID: string,
    updatedMetadata: TeamMetadataDTO,
  ): Promise<TeamMetadataDTO> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.updateTeamMetadata(UUID, updatedMetadata);
  }

  // Update a team content by UUID
  async updateTeamContent(UUID: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.updateTeamContent(UUID, updatedContent);
  }

  // Get a team metadata by UUID
  async getTeamMetadata(UUID: string): Promise<TeamMetadataDTO> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeamMetadata(UUID);
  }

  // Get a team content by UUID
  async getTeamContent(UUID: string): Promise<TeamContentDTO> {
    const repository: TeamRepositoryInterface = this.getRepositoryInterface();
    return repository.getTeamContent(UUID);
  }

  private getRepositoryInterface(): TeamRepositoryInterface {
    if (DEFAULT_REPOSITORY_DEVICE_TYPE === 'file') {
      if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'json') {
        if (DEFAULT_REPOSITORY_FILE_TYPE === 'single') {
          return new SingleJsonFileTeamRepository(
            DEFAULT_TEAM_FILE_PATH,
            this.readArrayFromJSON,
            this.writeArrayToJSON,
          );
        } else if (DEFAULT_REPOSITORY_FILE_TYPE === 'multiple') {
          return new MultipleJsonFilesTeamRepository(
            DEFAULT_TEAM_PATH,
            this.readSingleFromJSON,
            this.writeSingleToJSON,
          );
        }
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'yaml') {
        // Implement YAML strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'csv') {
        // Implement CSV strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_FILE_REPOSITORY_DEVICE_TYPE === 'md') {
        // Implement MD strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration： ' + DEFAULT_FILE_REPOSITORY_DEVICE_TYPE,
        );
      }
    } else {
      if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'memory') {
        // Implement memory strategy...
        return new MemoryTeamRepository();
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'sqlite') {
        // Implement sqlite strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        );
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'mongodb') {
        // Implement mongo strategy...
        throw new NotImplementedException(
          'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        );
        // return new PrismaMongoDBTeamRepository();
      } else if (DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE === 'postgres') {
        // Implement postgres strategy...
        // throw new Error(
        //   'Unimplemented repository configuration: ' + DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
        // );
        return new PrismaPostgresTeamRepository();
      }
    }
    throw new Error(
      'Unsupported repository configuration: ' +
        DEFAULT_REPOSITORY_DEVICE_TYPE +
        ' ' +
        DEFAULT_FILE_REPOSITORY_DEVICE_TYPE +
        ' ' +
        DEFAULT_DATABASE_REPOSITORY_DEVICE_TYPE,
    );
  }

  private generateUUID(): string {
    return String(this.teams.length + 1);
    // return uuidv4();
  }

  async readTeamFromJSON(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromJSON<TeamEntity>(filePath);
  }

  async writeTeamToJSON(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToJSON<TeamEntity>(filePath, team);
  }

  async readTeamFromYAML(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromYAML<TeamEntity>(filePath);
  }

  async writeTeamToYAML(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToYAML<TeamEntity>(filePath, team);
  }

  async readTeamFromCSV(filePath: string): Promise<TeamEntity> {
    return this.readSingleFromCSV<TeamEntity>(filePath);
  }

  async writeTeamToCSV(filePath: string, team: TeamEntity): Promise<void> {
    this.writeSingleToCSV<TeamEntity>(filePath, team);
  }

  async readTeamsFromJSON(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromJSON<TeamEntity>(filePath);
  }

  async writeTeamsToJSON(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToJSON<TeamEntity>(filePath, teams);
  }

  async readTeamsFromYAML(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromYAML<TeamEntity>(filePath);
  }

  async writeTeamsToYAML(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToYAML<TeamEntity>(filePath, teams);
  }

  async readTeamsFromCSV(filePath: string): Promise<TeamEntity[]> {
    return this.readArrayFromCSV<TeamEntity>(filePath);
  }

  async writeTeamsToCSV(filePath: string, teams: TeamEntity[]): Promise<void> {
    this.writeArrayToCSV<TeamEntity>(filePath, teams);
  }

  // proetected isTeamEntity(obj: any): obj is TeamEntity {
  //   return obj && obj.metadata !== undefined && obj.content !== undefined;
  // }

  // proetected isTeamMetadataEntity(obj: any): obj is TeamMetadataEntity {
  //   return obj && obj.name !== undefined;
  // }

  // proetected isTeamContentEntity(obj: any): obj is TeamContentEntity {
  //   return obj && obj.members !== undefined;
  // }
}
