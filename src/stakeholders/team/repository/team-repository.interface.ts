import {
  TeamIdUuidDTO,
  CreateTeamRequestDTO,
  UpdateTeamRequestDTO,
  TeamMetadataDTO,
  TeamContentDTO,
} from '../dto';
import { TeamEntity } from '../entity';

export interface TeamRepositoryInterface {
  listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]>;
  listTeams(): Promise<TeamEntity[]>;
  getTeam(UUID: string): Promise<TeamEntity>;
  createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity>;
  updateTeam(UUID: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity>;
  deleteTeam(UUID: string): Promise<TeamEntity>;
  getTeamByID(ID: string): Promise<TeamEntity>;
  getTeamByName(name: string): Promise<TeamEntity>;
  getTeamByEmail(email: string): Promise<TeamEntity>;
  updateTeamMetadata(uuid: string, updatedMetadata: TeamMetadataDTO): Promise<TeamMetadataDTO>;
  updateTeamContent(uuid: string, updatedContent: TeamContentDTO): Promise<TeamContentDTO>;
  getTeamMetadata(uuid: string): Promise<TeamMetadataDTO>;
  getTeamContent(uuid: string): Promise<TeamContentDTO>;
  // searchTeams(query: string): Promise<TeamEntity[]>;
}

// export interface TeamRepositoryInterface {
//   listTeams(query?: TeamQuery): Promise<TeamEntity[]>;
//   getTeam(identifier: string, type: TeamIdentifierType): Promise<TeamEntity | null>;
//   createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamEntity>;
//   updateTeam(uuid: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamEntity | null>;
//   deleteTeam(uuid: string): Promise<boolean>;
//   updateTeamData(uuid: string, updatedData: TeamUpdateData): Promise<TeamEntity | null>;
// }

// interface TeamQuery {
//   name?: string;
//   teamname?: string;
//   email?: string;
// }

// type TeamIdentifierType = 'UUID' | 'ID' | 'name' | 'teamname' | 'email';

// interface TeamUpdateData {
//   metadata?: TeamMetadataDTO;
//   content?: TeamContentDTO;
// }
