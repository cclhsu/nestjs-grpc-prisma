import { CACHE_MANAGER, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommonDateDTO } from '../../common/dto';
import { updateCommonDates } from '../../common/utils/common-date.utils';
import {
  validateDtoContent,
  validateDtoMetadata,
  validateDtoMetadataContent,
} from '../../utils/validation/validation.utils';
import {
  CreateTeamRequestDTO,
  TeamContentDTO,
  TeamContentResponseDTO,
  TeamDTO,
  TeamIdUuidDTO,
  TeamMetadataDTO,
  TeamMetadataResponseDTO,
  TeamResponseDTO,
  UpdateTeamContentRequestDTO,
  UpdateTeamMetadataRequestDTO,
  UpdateTeamRequestDTO,
} from './dto';
import { TeamEntity } from './entity';
import { TeamRepository } from './repository';
import { v4 as uuidV4 } from 'uuid';

// interface TeamInternalInterface {
//   listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]>;
//   listTeams(): Promise<TeamResponseDTO[]>;
//   getTeam(uuid: string): Promise<TeamResponseDTO>;
//   createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamResponseDTO>;
//   updateTeam(uuid: string, updateTeamRequestDTO: UpdateTeamRequestDTO): Promise<TeamResponseDTO>;
//   deleteTeam(uuid: string): Promise<TeamResponseDTO>;
//   getTeamByID(ID: string): Promise<TeamResponseDTO>;
//   getTeamByName(name: string): Promise<TeamResponseDTO>;
//   getTeamByEmail(email: string): Promise<TeamResponseDTO>;
//   listTeamsWithMetadata(): Promise<TeamMetadataResponseDTO[]>;
//   listTeamsWithContent(): Promise<TeamContentResponseDTO[]>;
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
//   isTeamExist(name: string, email: string, ID: string, UUID: string): Promise<boolean>;
//   isNoTeamsExist(): Promise<boolean>;
//   isExactlyOneTeamExist(): Promise<boolean>;
//   isAtLeastOneTeamExist(): Promise<boolean>;
//   validateTeamIdUuid(teamIdsAndUUIDs: TeamIdUuidDTO[]): Promise<boolean>;
//   validateTeamIdUuids(teamIdsAndUUIDs: TeamIdUuidDTO[]): Promise<boolean>;
// }

@Injectable()
export class TeamService {
  private readonly logger: Logger = new Logger(TeamService.name);
  private readonly isCacheEnabled: boolean;
  //   onModuleInit() {
  //     throw new NotImplementedException('Method not implemented.');
  //   }

  constructor(
    private readonly teamRepository: TeamRepository,
    /* private readonly userService: UserService, */
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.isCacheEnabled = process.env.CACHE_ENABLED === 'true';
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('teamsIdsAndUUIDs')
  async listTeamIdsAndUUIDs(): Promise<TeamIdUuidDTO[]> {
    if (this.isCacheEnabled) {
      const cacheKey: string = 'teamsIdsAndUUIDs';
      const teams: TeamIdUuidDTO[] | undefined =
        await this.cacheManager.get<TeamIdUuidDTO[]>(cacheKey);

      if (teams) {
        return teams; // Return cached data if available
      }
    }

    // Fetch teams from the repository if not found in the cache or caching is disabled
    const teams: TeamIdUuidDTO[] = await this.teamRepository.listTeamIdsAndUUIDs();

    if (teams && teams.length > 0) {
      if (this.isCacheEnabled) {
        const cacheKey: string = 'teamsIdsAndUUIDs';
        await this.cacheManager.set(cacheKey, teams);
      }
    } else {
      throw new NotFoundException('Teams not found');
    }

    this.logger.log(`Teams: ${JSON.stringify(teams, null, 2)}`);
    return teams;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('teams')
  async listTeams(): Promise<TeamResponseDTO[]> {
    if (this.isCacheEnabled) {
      const cacheKey: string = 'teams';
      const teams: TeamEntity[] | undefined = await this.cacheManager.get<TeamEntity[]>(cacheKey);

      if (teams) {
        return this.convertToTeamResponseList(teams);
      }
    }

    // Fetch teams from the repository if not found in the cache or caching is disabled
    const teams: TeamEntity[] = await this.teamRepository.listTeams();

    if (teams && teams.length > 0) {
      if (this.isCacheEnabled) {
        const cacheKey: string = 'teams';
        await this.cacheManager.set(cacheKey, teams);
      }
    } else {
      throw new NotFoundException('Teams not found');
    }

    this.logger.log(`Teams: ${JSON.stringify(teams, null, 2)}`);
    return this.convertToTeamResponseList(teams);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeam(uuid: string): Promise<TeamResponseDTO> {
    const cacheKey: string = `team:${uuid}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeam(uuid);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async createTeam(createTeamRequestDTO: CreateTeamRequestDTO): Promise<TeamResponseDTO> {
    this.logger.verbose(`Team: ${JSON.stringify(createTeamRequestDTO, null, 2)}`);
    const {
      ID,
      UUID: requestUUID,
      metadata: { name, dates },
      content: { email, members, productOwner, scrumMaster },
    } = createTeamRequestDTO;

    let UUID = requestUUID;
    // check if UUID is empty string, undefined, null, and '00000000-0000-0000-0000-000000000000', generate a new UUID if so
    if (!UUID || UUID === '00000000-0000-0000-0000-000000000000') {
      UUID = uuidV4();
    }
    // Check if a team with the same name, email, ID, or UUID already exists
    if (await this.isTeamExist(name, email, ID, UUID)) {
      throw new ConflictException('Team with the same name, email, ID, or UUID already exists');
    }

    // Validate DTO metadata and content
    const validationError: boolean = await validateDtoMetadataContent(createTeamRequestDTO);
    if (!validationError) {
      throw new BadRequestException("Team's metadata or content is invalid");
    }

    // Create the team
    const team: TeamEntity = await this.teamRepository.createTeam({
      ID,
      UUID,
      metadata: { name, dates },
      content: { email, members, productOwner, scrumMaster },
    });

    // Set team cache if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `team:${team.UUID}`;
      await this.cacheManager.set(cacheKey, team);
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async updateTeam(
    uuid: string,
    updateTeamRequestDTO: UpdateTeamRequestDTO,
  ): Promise<TeamResponseDTO> {
    this.logger.verbose(`Team: ${JSON.stringify(updateTeamRequestDTO, null, 2)}`);
    // Check if team exists, and retrieve the team
    const team: TeamResponseDTO = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Update the dates values UpdatedAt and UpdatedBy
    const dates: CommonDateDTO = updateCommonDates(
      team.metadata.dates,
      updateTeamRequestDTO.metadata.dates,
    );
    updateTeamRequestDTO.metadata.dates = dates;

    // Validate DTO metadata and content
    const validationError: boolean = await validateDtoMetadataContent(updateTeamRequestDTO);
    if (!validationError) {
      throw new BadRequestException("Team's metadata or content is invalid");
    }

    // Update the team
    const updatedTeam: TeamResponseDTO = await this.teamRepository.updateTeam(
      uuid,
      updateTeamRequestDTO,
    );

    if (!updatedTeam) {
      throw new Error('Failed to update team');
    }

    // Clear the cache for the updated team if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `team:${uuid}`;
      await this.cacheManager.del(cacheKey);

      // Update the cache with the updated team
      await this.cacheManager.set(cacheKey, updatedTeam);
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeam, null, 2)}`);
    return this.convertToTeamResponse(updatedTeam);
  }

  async deleteTeam(uuid: string): Promise<TeamResponseDTO> {
    // Check if team exists
    const team: TeamDTO = await this.getTeam(uuid);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Delete the team
    const deleteTeam: TeamEntity = await this.teamRepository.deleteTeam(uuid);
    if (!deleteTeam) {
      throw new Error('Failed to delete team');
    }

    // Clear the cache for the deleted team if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `team:${uuid}`;
      await this.cacheManager.del(cacheKey);
    }

    this.logger.log(`Team: ${JSON.stringify(deleteTeam, null, 2)}`);
    return this.convertToTeamResponse(deleteTeam);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeamByID(ID: string): Promise<TeamResponseDTO> {
    const cacheKey: string = `team:${ID}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeamByID(ID);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeamByName(name: string): Promise<TeamResponseDTO> {
    const cacheKey: string = `team:${name}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeamByName(name);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeamByEmail(email: string): Promise<TeamResponseDTO> {
    const cacheKey: string = `team:${email}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeamByEmail(email);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return this.convertToTeamResponse(team);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('teams')
  async listTeamsWithMetadata(): Promise<TeamMetadataResponseDTO[]> {
    const cacheKey: string = 'teams';
    let teams: TeamEntity[] | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity[]>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!teams) {
      teams = await this.teamRepository.listTeams();

      if (teams && teams.length > 0) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, teams);
        }
      } else {
        throw new NotFoundException('Teams not found');
      }
    }

    this.logger.log(`Teams: ${JSON.stringify(teams, null, 2)}`);
    return teams.map((team) => this.convertToTeamMetadataResponse(team));
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('teams')
  async listTeamsWithContent(): Promise<TeamContentResponseDTO[]> {
    const cacheKey: string = 'teams';
    let teams: TeamEntity[] | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity[]>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!teams) {
      teams = await this.teamRepository.listTeams();

      if (teams && teams.length > 0) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, teams);
        }
      } else {
        throw new NotFoundException('Teams not found');
      }
    }

    this.logger.log(`Teams: ${JSON.stringify(teams, null, 2)}`);
    return teams.map((team) => this.convertToTeamContentResponse(team));
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async updateTeamMetadata(
    uuid: string,
    updateTeamMetadataRequestDTO: UpdateTeamMetadataRequestDTO,
  ): Promise<TeamMetadataResponseDTO> {
    // Check if team exists, and retrieve the team
    const team: TeamEntity | undefined = this.isCacheEnabled ? await this.getTeam(uuid) : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Validate DTO metadata
    const validationError: boolean = await validateDtoMetadata<UpdateTeamMetadataRequestDTO>(
      updateTeamMetadataRequestDTO,
    );
    if (!validationError) {
      throw new BadRequestException("Team's metadata is invalid");
    }

    // Update the dates values UpdatedAt and UpdatedBy
    const dates: CommonDateDTO = updateCommonDates(
      team.metadata.dates,
      updateTeamMetadataRequestDTO.metadata.dates,
    );
    updateTeamMetadataRequestDTO.metadata.dates = dates;

    // Update the team metadata
    const updatedTeamMetadata: TeamMetadataDTO = await this.teamRepository.updateTeamMetadata(
      uuid,
      updateTeamMetadataRequestDTO.metadata,
    );

    if (!updatedTeamMetadata) {
      throw new Error('Failed to update team');
    }

    // Update the cache with the updated team metadata
    if (this.isCacheEnabled) {
      team.metadata = updatedTeamMetadata;
      const cacheKey: string = `team:${uuid}`;
      await this.cacheManager.del(cacheKey);
      await this.cacheManager.set(cacheKey, team);
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeamMetadata, null, 2)}`);
    return new TeamMetadataResponseDTO(team.ID, uuid, updatedTeamMetadata);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async updateTeamContent(
    uuid: string,
    updateTeamContentRequestDTO: UpdateTeamContentRequestDTO,
  ): Promise<TeamContentResponseDTO> {
    // Check if team exists
    const team: TeamEntity | undefined = this.isCacheEnabled ? await this.getTeam(uuid) : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Validate DTO content
    const validationError: boolean = await validateDtoContent<UpdateTeamContentRequestDTO>(
      updateTeamContentRequestDTO,
    );
    if (!validationError) {
      throw new BadRequestException("Team's content is invalid");
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   team.metadata.dates,
    //   updateTeamContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateTeamContentRequestDTO.metadata.dates = dates;

    // Update the team content
    const updatedTeamContent: TeamContentDTO = await this.teamRepository.updateTeamContent(
      uuid,
      updateTeamContentRequestDTO.content,
    );

    if (!updatedTeamContent) {
      throw new Error('Failed to update team');
    }

    // Update the cache with the updated team content
    if (this.isCacheEnabled) {
      team.content = updatedTeamContent;
      const cacheKey: string = `team:${uuid}`;
      await this.cacheManager.del(cacheKey);
      await this.cacheManager.set(cacheKey, team);
    }

    this.logger.log(`Team: ${JSON.stringify(updatedTeamContent, null, 2)}`);
    return new TeamContentResponseDTO(team.ID, uuid, updatedTeamContent);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeamMetadata(uuid: string): Promise<TeamMetadataResponseDTO> {
    const cacheKey: string = `team:${uuid}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeam(uuid);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return new TeamMetadataResponseDTO(team.ID, uuid, team.metadata);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('team:`${uuid}`')
  async getTeamContent(uuid: string): Promise<TeamContentResponseDTO> {
    const cacheKey: string = `team:${uuid}`;
    let team: TeamEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<TeamEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!team) {
      team = await this.teamRepository.getTeam(uuid);

      if (team) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, team);
        }
      } else {
        throw new NotFoundException('Team not found');
      }
    }

    this.logger.log(`Team: ${JSON.stringify(team, null, 2)}`);
    return new TeamContentResponseDTO(team.ID, uuid, team.content);
  }

  // Other methods...
  async isTeamExist(name: string, email: string, ID: string, UUID: string): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkTeamExistence(name, email, ID, UUID);
    }

    const cacheKey: string = `teamExistence:${name}-${email}-${ID}-${UUID}`;
    let teamExists: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (teamExists === undefined) {
      teamExists = await this.checkTeamExistence(name, email, ID, UUID);
      await this.cacheManager.set(cacheKey, teamExists);
    }

    return teamExists;
  }

  private async checkTeamExistence(
    name: string,
    email: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const teamByName: TeamEntity | undefined = await this.teamRepository.getTeamByName(name);
      if (teamByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by name: ${name}`);
      }
    }

    try {
      const teamByEmail: TeamEntity | undefined = await this.teamRepository.getTeamByEmail(email);
      if (teamByEmail) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by email: ${email}`);
      }
    }

    try {
      const teamByID: TeamEntity | undefined = await this.teamRepository.getTeamByID(ID);
      if (teamByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by ID: ${ID}`);
      }
    }

    try {
      const teamByUUID: TeamEntity | undefined = await this.teamRepository.getTeam(UUID);
      if (teamByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`Team not found by UUID: ${UUID}`);
      }
    }

    return false;
  }

  async isNoTeamsExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkNoTeamsExist();
    }

    const cacheKey: string = 'noTeamsExist';
    let noTeamsExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (noTeamsExist === undefined) {
      noTeamsExist = await this.checkNoTeamsExist();
      await this.cacheManager.set(cacheKey, noTeamsExist);
    }

    return noTeamsExist;
  }

  private async checkNoTeamsExist(): Promise<boolean> {
    const teams: TeamEntity[] | undefined = await this.teamRepository.listTeams();
    return teams.length === 0;
  }

  async isExactlyOneTeamExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkExactlyOneTeamExist();
    }

    const cacheKey: string = 'exactlyOneTeamExist';
    let exactlyOneTeamExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (exactlyOneTeamExist === undefined) {
      exactlyOneTeamExist = await this.checkExactlyOneTeamExist();
      await this.cacheManager.set(cacheKey, exactlyOneTeamExist);
    }

    return exactlyOneTeamExist;
  }

  private async checkExactlyOneTeamExist(): Promise<boolean> {
    const teams: TeamEntity[] | undefined = await this.teamRepository.listTeams();
    return teams.length === 1;
  }

  async isAtLeastOneTeamExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkAtLeastOneTeamExist();
    }

    const cacheKey: string = 'atLeastOneTeamExist';
    let atLeastOneTeamExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (atLeastOneTeamExist === undefined) {
      atLeastOneTeamExist = await this.checkAtLeastOneTeamExist();
      await this.cacheManager.set(cacheKey, atLeastOneTeamExist);
    }

    return atLeastOneTeamExist;
  }

  private async checkAtLeastOneTeamExist(): Promise<boolean> {
    const teams: TeamEntity[] | undefined = await this.teamRepository.listTeams();
    return teams.length >= 1;
  }

  async validateTeamIdUuid(teamIdUuidDTO: TeamIdUuidDTO, byId: boolean = false): Promise<boolean> {
    const { ID, UUID } = teamIdUuidDTO;

    if (!ID && !UUID) {
      return false; // Validation failed: ID and UUID are both undefined
    }

    const cacheKey = byId ? `team:${ID}` : `team:${UUID}`;
    const team: TeamEntity | undefined = await this.cacheManager.get<TeamEntity>(cacheKey);

    if (team) {
      if ((byId && team.UUID !== UUID) || (!byId && team.ID !== ID)) {
        return false; // Validation failed: Team UUID or ID does not match
      }
      return true; // Validation passed
    }

    const teamResponse: TeamResponseDTO = byId
      ? await this.getTeamByID(ID)
      : await this.getTeam(UUID);

    if (!teamResponse) {
      return false; // Validation failed: Team not found
    }

    if ((byId && teamResponse.UUID !== UUID) || (!byId && teamResponse.ID !== ID)) {
      return false; // Validation failed: Team UUID or ID does not match
    }

    return true; // Validation passed
  }

  async validateTeamIdUuids(
    teamIdUuidDTOs: TeamIdUuidDTO[],
    byId: boolean = false,
  ): Promise<boolean> {
    const invalidIdsUuids: TeamIdUuidDTO[] = [];

    for (const teamIdUuidDTO of teamIdUuidDTOs) {
      const validationError = await this.validateTeamIdUuid(teamIdUuidDTO, byId);

      if (validationError !== true) {
        invalidIdsUuids.push(teamIdUuidDTO);
      }
    }

    if (invalidIdsUuids.length > 0) {
      const errorMessage = `Invalid Team IDs or UUIDs: ${JSON.stringify(invalidIdsUuids, null, 2)}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    return true;
  }

  convertToTeamResponse(team: TeamEntity): TeamResponseDTO {
    this.logger.verbose(`Converting Team: ${JSON.stringify(team, null, 2)}`);
    const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
      team.metadata.name,
      team.metadata.dates,
    );
    const teamContent: TeamContentDTO = new TeamContentDTO(
      team.content.email,
      team.content.members,
      team.content.productOwner,
      team.content.scrumMaster,
    );
    const teamResponse: TeamResponseDTO = new TeamResponseDTO(
      team.ID,
      team.UUID,
      teamMetadata,
      teamContent,
    );
    return teamResponse;
  }

  convertToTeamResponseList(teams: TeamEntity[]): TeamResponseDTO[] {
    this.logger.verbose(`Converting Teams: ${JSON.stringify(teams, null, 2)}`);
    const teamResponseList: TeamResponseDTO[] = teams.map((team) => {
      const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
        team.metadata.name,
        team.metadata.dates,
      );
      const teamContent: TeamContentDTO = new TeamContentDTO(
        team.content.email,
        team.content.members,
        team.content.productOwner,
        team.content.scrumMaster,
      );
      const teamResponse: TeamResponseDTO = new TeamResponseDTO(
        team.ID,
        team.UUID,
        teamMetadata,
        teamContent,
      );
      return teamResponse;
    });

    return teamResponseList;
  }

  private convertToTeamMetadataResponse(team: TeamEntity): TeamMetadataResponseDTO {
    const teamMetadata: TeamMetadataDTO = new TeamMetadataDTO(
      team.metadata.name,
      team.metadata.dates,
    );
    return new TeamMetadataResponseDTO(team.ID, team.UUID, teamMetadata);
  }

  private convertToTeamContentResponse(team: TeamEntity): TeamContentResponseDTO {
    const teamContent: TeamContentDTO = new TeamContentDTO(
      team.content.email,
      team.content.members,
      team.content.productOwner,
      team.content.scrumMaster,
    );
    return new TeamContentResponseDTO(team.ID, team.UUID, teamContent);
  }
}
