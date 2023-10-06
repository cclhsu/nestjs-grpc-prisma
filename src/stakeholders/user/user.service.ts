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
  CreateUserRequestDTO,
  UpdateUserContentRequestDTO,
  UpdateUserMetadataRequestDTO,
  UpdateUserRequestDTO,
  UserContentDTO,
  UserContentResponseDTO,
  UserIdUuidDTO,
  UserMetadataDTO,
  UserMetadataResponseDTO,
  UserResponseDTO,
} from './dto';
import { UserEntity } from './entity';
import { UserRepository } from './repository';
import { v4 as uuidV4 } from 'uuid';

// interface UserInternalInterface {
//   listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]>;
//   listUsers(): Promise<UserResponseDTO[]>;
//   getUser(uuid: string): Promise<UserResponseDTO>;
//   createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserResponseDTO>;
//   updateUser(uuid: string, updateUserRequestDTO: UpdateUserRequestDTO): Promise<UserResponseDTO>;
//   deleteUser(uuid: string): Promise<UserResponseDTO>;
//   getUserByID(ID: string): Promise<UserResponseDTO>;
//   getUserByName(name: string): Promise<UserResponseDTO>;
//   getUserByEmail(email: string): Promise<UserResponseDTO>;
//   listUsersWithMetadata(): Promise<UserMetadataResponseDTO[]>;
//   listUsersWithContent(): Promise<UserContentResponseDTO[]>;
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
//   isUserExist(name: string, email: string, ID: string, UUID: string): Promise<boolean>;
//   isNoUsersExist(): Promise<boolean>;
//   isExactlyOneUserExist(): Promise<boolean>;
//   isAtLeastOneUserExist(): Promise<boolean>;
//   validateUserIdUuid(userIdsAndUUIDs: UserIdUuidDTO[]): Promise<boolean>;
//   validateUserIdUuids(userIdsAndUUIDs: UserIdUuidDTO[]): Promise<boolean>;
// }

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  private readonly isCacheEnabled: boolean;
  //   onModuleInit() {
  //     throw new NotImplementedException('Method not implemented.');
  //   }

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.isCacheEnabled = process.env.CACHE_ENABLED === 'true';
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('usersIdsAndUUIDs')
  async listUserIdsAndUUIDs(): Promise<UserIdUuidDTO[]> {
    if (this.isCacheEnabled) {
      const cacheKey: string = 'usersIdsAndUUIDs';
      const users: UserIdUuidDTO[] | undefined =
        await this.cacheManager.get<UserIdUuidDTO[]>(cacheKey);

      if (users) {
        return users; // Return cached data if available
      }
    }

    // Fetch users from the repository if not found in the cache or caching is disabled
    const users: UserIdUuidDTO[] = await this.userRepository.listUserIdsAndUUIDs();

    if (users && users.length > 0) {
      if (this.isCacheEnabled) {
        const cacheKey: string = 'usersIdsAndUUIDs';
        await this.cacheManager.set(cacheKey, users);
      }
    } else {
      throw new NotFoundException('Users not found');
    }

    this.logger.log(`Users: ${JSON.stringify(users, null, 2)}`);
    return users;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('users')
  async listUsers(): Promise<UserResponseDTO[]> {
    if (this.isCacheEnabled) {
      const cacheKey: string = 'users';
      const users: UserEntity[] | undefined = await this.cacheManager.get<UserEntity[]>(cacheKey);

      if (users) {
        return this.convertToUserResponseList(users);
      }
    }

    // Fetch users from the repository if not found in the cache or caching is disabled
    const users = await this.userRepository.listUsers();

    if (users && users.length > 0) {
      if (this.isCacheEnabled) {
        const cacheKey: string = 'users';
        await this.cacheManager.set(cacheKey, users);
      }
    } else {
      throw new NotFoundException('Users not found');
    }

    this.logger.log(`Users: ${JSON.stringify(users, null, 2)}`);
    return this.convertToUserResponseList(users);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUser(uuid: string): Promise<UserResponseDTO> {
    const cacheKey: string = `user:${uuid}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUser(uuid);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async createUser(createUserRequestDTO: CreateUserRequestDTO): Promise<UserResponseDTO> {
    this.logger.verbose(`User: ${JSON.stringify(createUserRequestDTO, null, 2)}`);
    const {
      ID,
      UUID: requestUUID,
      metadata: { name, dates },
      content: { email, phone, lastName, firstName, projectRoles, scrumRoles, password },
    } = createUserRequestDTO;

    let UUID = requestUUID;
    // check if UUID is empty string, undefined, null, and '00000000-0000-0000-0000-000000000000', generate a new UUID if so
    if (!UUID || UUID === '00000000-0000-0000-0000-000000000000') {
      UUID = uuidV4();
    }
    // Check if a user with the same name, email, ID, or UUID already exists
    if (await this.isUserExist(name, email, ID, UUID)) {
      throw new ConflictException('User with the same name, email, ID, or UUID already exists');
    }

    // Validate DTO metadata and content
    const validationError: boolean = await validateDtoMetadataContent(createUserRequestDTO);
    if (!validationError) {
      throw new BadRequestException("User's metadata or content is invalid");
    }

    // Create the user
    const user: UserEntity = await this.userRepository.createUser({
      ID,
      UUID,
      metadata: {
        name,
        dates,
      },
      content: {
        email,
        phone,
        lastName,
        firstName,
        projectRoles,
        scrumRoles,
        password,
      },
    });

    // Set user cache if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `user:${user.UUID}`;
      await this.cacheManager.set(cacheKey, user);
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async updateUser(
    uuid: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    this.logger.verbose(`User: ${JSON.stringify(updateUserRequestDTO, null, 2)}`);
    // Check if user exists, and retrieve the user
    const user: UserResponseDTO = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the dates values UpdatedAt and UpdatedBy
    const dates: CommonDateDTO = updateCommonDates(
      user.metadata.dates,
      updateUserRequestDTO.metadata.dates,
    );
    updateUserRequestDTO.metadata.dates = dates;

    // Validate DTO metadata and content
    const validationError: boolean = await validateDtoMetadataContent(updateUserRequestDTO);
    if (!validationError) {
      throw new BadRequestException("User's metadata or content is invalid");
    }

    // Update the user
    const updatedUser: UserResponseDTO = await this.userRepository.updateUser(
      uuid,
      updateUserRequestDTO,
    );

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    // Clear the cache for the updated user if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `user:${uuid}`;
      await this.cacheManager.del(cacheKey);

      // Update the cache with the updated user
      await this.cacheManager.set(cacheKey, updatedUser);
    }

    this.logger.log(`User: ${JSON.stringify(updatedUser, null, 2)}`);
    return this.convertToUserResponse(updatedUser);
  }

  async deleteUser(uuid: string): Promise<UserResponseDTO> {
    // Check if user exists
    const user: UserResponseDTO = await this.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the user
    const deleteUser: UserEntity = await this.userRepository.deleteUser(uuid);
    if (!deleteUser) {
      throw new Error('Failed to delete user');
    }

    // Clear the cache for the deleted user if caching is enabled
    if (this.isCacheEnabled) {
      const cacheKey: string = `user:${uuid}`;
      await this.cacheManager.del(cacheKey);
    }

    this.logger.log(`User: ${JSON.stringify(deleteUser, null, 2)}`);
    return this.convertToUserResponse(deleteUser);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUserByID(ID: string): Promise<UserResponseDTO> {
    const cacheKey: string = `user:${ID}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUserByID(ID);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUserByName(name: string): Promise<UserResponseDTO> {
    const cacheKey: string = `user:${name}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUserByName(name);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUserByEmail(email: string): Promise<UserResponseDTO> {
    const cacheKey: string = `user:${email}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUserByEmail(email);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return this.convertToUserResponse(user);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('users')
  async listUsersWithMetadata(): Promise<UserMetadataResponseDTO[]> {
    const cacheKey: string = 'users';
    let users: UserEntity[] | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity[]>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!users) {
      users = await this.userRepository.listUsers();

      if (users && users.length > 0) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, users);
        }
      } else {
        throw new NotFoundException('Users not found');
      }
    }

    this.logger.log(`Users: ${JSON.stringify(users, null, 2)}`);
    return users.map((user) => this.convertToUserMetadataResponse(user));
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('users')
  async listUsersWithContent(): Promise<UserContentResponseDTO[]> {
    const cacheKey: string = 'users';
    let users: UserEntity[] | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity[]>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!users) {
      users = await this.userRepository.listUsers();

      if (users && users.length > 0) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, users);
        }
      } else {
        throw new NotFoundException('Users not found');
      }
    }

    this.logger.log(`Users: ${JSON.stringify(users, null, 2)}`);
    return users.map((user) => this.convertToUserContentResponse(user));
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async updateUserMetadata(
    uuid: string,
    updateUserMetadataRequestDTO: UpdateUserMetadataRequestDTO,
  ): Promise<UserMetadataResponseDTO> {
    // Check if user exists, and retrieve the user
    const user: UserEntity | undefined = this.isCacheEnabled ? await this.getUser(uuid) : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate DTO metadata and content
    const validationError: boolean = await validateDtoMetadata<UpdateUserMetadataRequestDTO>(
      updateUserMetadataRequestDTO,
    );
    if (!validationError) {
      throw new BadRequestException("User's metadata is invalid");
    }

    // Update the dates values UpdatedAt and UpdatedBy
    const dates: CommonDateDTO = updateCommonDates(
      user.metadata.dates,
      updateUserMetadataRequestDTO.metadata.dates,
    );
    updateUserMetadataRequestDTO.metadata.dates = dates;

    // Update the user metadata
    const updatedUserMetadata: UserMetadataDTO = await this.userRepository.updateUserMetadata(
      uuid,
      updateUserMetadataRequestDTO.metadata,
    );

    if (!updatedUserMetadata) {
      throw new Error('Failed to update user');
    }

    // Update the cache with the updated user metadata
    if (this.isCacheEnabled) {
      user.metadata = updatedUserMetadata;
      const cacheKey: string = `user:${uuid}`;
      await this.cacheManager.del(cacheKey);
      await this.cacheManager.set(cacheKey, user);
    }

    this.logger.log(`User: ${JSON.stringify(updatedUserMetadata, null, 2)}`);
    return new UserMetadataResponseDTO(user.ID, uuid, updatedUserMetadata);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async updateUserContent(
    uuid: string,
    updateUserContentRequestDTO: UpdateUserContentRequestDTO,
  ): Promise<UserContentResponseDTO> {
    // Check if user exists
    const user: UserEntity | undefined = this.isCacheEnabled ? await this.getUser(uuid) : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate DTO content
    const validationError: boolean = await validateDtoContent<UpdateUserContentRequestDTO>(
      updateUserContentRequestDTO,
    );
    if (!validationError) {
      throw new BadRequestException("User's content is invalid");
    }

    // // Update the dates values UpdatedAt and UpdatedBy
    // const dates: CommonDateDTO = updateCommonDates(
    //   user.metadata.dates,
    //   updateUserContentRequestDTO.metadata.dates,
    //   true,
    // );
    // updateUserContentRequestDTO.metadata.dates = dates;

    // Update the user content
    const updatedUserContent: UserContentDTO = await this.userRepository.updateUserContent(
      uuid,
      updateUserContentRequestDTO.content,
    );

    if (!updatedUserContent) {
      throw new Error('Failed to update user');
    }

    // Update the cache with the updated user content
    if (this.isCacheEnabled) {
      user.content = updatedUserContent;
      const cacheKey: string = `user:${uuid}`;
      await this.cacheManager.del(cacheKey);
      await this.cacheManager.set(cacheKey, user);
    }

    this.logger.log(`User: ${JSON.stringify(updatedUserContent, null, 2)}`);
    return new UserContentResponseDTO(user.ID, uuid, updatedUserContent);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUserMetadata(uuid: string): Promise<UserMetadataResponseDTO> {
    const cacheKey: string = `user:${uuid}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUser(uuid);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return new UserMetadataResponseDTO(user.ID, uuid, user.metadata);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey('user:`${uuid}`')
  async getUserContent(uuid: string): Promise<UserContentResponseDTO> {
    const cacheKey: string = `user:${uuid}`;
    let user: UserEntity | undefined = this.isCacheEnabled
      ? await this.cacheManager.get<UserEntity>(cacheKey)
      : undefined; // Initialize as undefined if caching is disabled

    if (!user) {
      user = await this.userRepository.getUser(uuid);

      if (user) {
        if (this.isCacheEnabled) {
          await this.cacheManager.set(cacheKey, user);
        }
      } else {
        throw new NotFoundException('User not found');
      }
    }

    this.logger.log(`User: ${JSON.stringify(user, null, 2)}`);
    return new UserContentResponseDTO(user.ID, uuid, user.content);
  }

  // Other methods...
  async isUserExist(name: string, email: string, ID: string, UUID: string): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkUserExistence(name, email, ID, UUID);
    }

    const cacheKey: string = `userExistence:${name}-${email}-${ID}-${UUID}`;
    let userExists: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (userExists === undefined) {
      userExists = await this.checkUserExistence(name, email, ID, UUID);
      await this.cacheManager.set(cacheKey, userExists);
    }

    return userExists;
  }

  private async checkUserExistence(
    name: string,
    email: string,
    ID: string,
    UUID: string,
  ): Promise<boolean> {
    try {
      const userByName: UserEntity | undefined = await this.userRepository.getUserByName(name);
      if (userByName) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by name: ${name}`);
      }
    }

    try {
      const userByEmail: UserEntity | undefined = await this.userRepository.getUserByEmail(email);
      if (userByEmail) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by email: ${email}`);
      }
    }

    try {
      const userByID: UserEntity | undefined = await this.userRepository.getUserByID(ID);
      if (userByID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by ID: ${ID}`);
      }
    }

    try {
      const userByUUID: UserEntity | undefined = await this.userRepository.getUser(UUID);
      if (userByUUID) {
        return true;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.verbose(`User not found by UUID: ${UUID}`);
      }
    }

    return false;
  }

  async isNoUsersExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkNoUsersExist();
    }

    const cacheKey: string = 'noUsersExist';
    let noUsersExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (noUsersExist === undefined) {
      noUsersExist = await this.checkNoUsersExist();
      await this.cacheManager.set(cacheKey, noUsersExist);
    }

    return noUsersExist;
  }

  private async checkNoUsersExist(): Promise<boolean> {
    const users: UserEntity[] | undefined = await this.userRepository.listUsers();
    return users.length === 0;
  }

  async isExactlyOneUserExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkExactlyOneUserExist();
    }

    const cacheKey: string = 'exactlyOneUserExist';
    let exactlyOneUserExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (exactlyOneUserExist === undefined) {
      exactlyOneUserExist = await this.checkExactlyOneUserExist();
      await this.cacheManager.set(cacheKey, exactlyOneUserExist);
    }

    return exactlyOneUserExist;
  }

  private async checkExactlyOneUserExist(): Promise<boolean> {
    const users: UserEntity[] | undefined = await this.userRepository.listUsers();
    return users.length === 1;
  }

  async isAtLeastOneUserExist(): Promise<boolean> {
    if (!this.isCacheEnabled) {
      return this.checkAtLeastOneUserExist();
    }

    const cacheKey: string = 'atLeastOneUserExist';
    let atLeastOneUserExist: boolean | undefined = await this.cacheManager.get<boolean>(cacheKey);

    if (atLeastOneUserExist === undefined) {
      atLeastOneUserExist = await this.checkAtLeastOneUserExist();
      await this.cacheManager.set(cacheKey, atLeastOneUserExist);
    }

    return atLeastOneUserExist;
  }

  private async checkAtLeastOneUserExist(): Promise<boolean> {
    const users: UserEntity[] | undefined = await this.userRepository.listUsers();
    return users.length >= 1;
  }

  async validateUserIdUuid(userIdUuidDTO: UserIdUuidDTO, byId: boolean = false): Promise<boolean> {
    const { ID, UUID } = userIdUuidDTO;

    if (!ID && !UUID) {
      return false; // Validation failed: ID and UUID are both undefined
    }

    const cacheKey = byId ? `user:${ID}` : `user:${UUID}`;
    const user: UserEntity | undefined = await this.cacheManager.get<UserEntity>(cacheKey);

    if (user) {
      if ((byId && user.UUID !== UUID) || (!byId && user.ID !== ID)) {
        return false; // Validation failed: User UUID or ID does not match
      }
      return true; // Validation passed
    }

    const userResponse: UserResponseDTO = byId
      ? await this.getUserByID(ID)
      : await this.getUser(UUID);

    if (!userResponse) {
      return false; // Validation failed: User not found
    }

    if ((byId && userResponse.UUID !== UUID) || (!byId && userResponse.ID !== ID)) {
      return false; // Validation failed: User UUID or ID does not match
    }

    return true; // Validation passed
  }

  async validateUserIdUuids(
    userIdUuidDTOs: UserIdUuidDTO[],
    byId: boolean = false,
  ): Promise<boolean> {
    const invalidIdsUuids: UserIdUuidDTO[] = [];

    for (const userIdUuidDTO of userIdUuidDTOs) {
      const validationError = await this.validateUserIdUuid(userIdUuidDTO, byId);

      if (validationError !== true) {
        invalidIdsUuids.push(userIdUuidDTO);
      }
    }

    if (invalidIdsUuids.length > 0) {
      const errorMessage: string = `Invalid User IDs or UUIDs: ${JSON.stringify(
        invalidIdsUuids,
        null,
        2,
      )}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    return true;
  }

  convertToUserResponse(user: UserEntity): UserResponseDTO {
    this.logger.verbose(`Converting user: ${JSON.stringify(user, null, 2)}`);
    const userMetadata: UserMetadataDTO = new UserMetadataDTO(
      user.metadata.name,
      user.metadata.dates,
    );
    const userContent: UserContentDTO = new UserContentDTO(
      user.content.email,
      user.content.phone,
      user.content.lastName,
      user.content.firstName,
      user.content.projectRoles,
      user.content.scrumRoles,
      user.content.password,
    );
    const userResponse: UserResponseDTO = new UserResponseDTO(
      user.ID,
      user.UUID,
      userMetadata,
      userContent,
    );
    return userResponse;
  }

  convertToUserResponseList(users: UserEntity[]): UserResponseDTO[] {
    this.logger.verbose(`Converting users: ${JSON.stringify(users, null, 2)}`);
    const userResponseList: UserResponseDTO[] = users.map((user) => {
      const userMetadata: UserMetadataDTO = new UserMetadataDTO(
        user.metadata.name,
        user.metadata.dates,
      );
      const userContent: UserContentDTO = new UserContentDTO(
        user.content.email,
        user.content.phone,
        user.content.lastName,
        user.content.firstName,
        user.content.projectRoles,
        user.content.scrumRoles,
        user.content.password,
      );
      const userResponse: UserResponseDTO = new UserResponseDTO(
        user.ID,
        user.UUID,
        userMetadata,
        userContent,
      );
      return userResponse;
    });

    return userResponseList;
  }

  private convertToUserMetadataResponse(user: UserEntity): UserMetadataResponseDTO {
    const userMetadata: UserMetadataDTO = new UserMetadataDTO(
      user.metadata.name,
      user.metadata.dates,
    );
    return new UserMetadataResponseDTO(user.ID, user.UUID, userMetadata);
  }

  private convertToUserContentResponse(user: UserEntity): UserContentResponseDTO {
    const userContent: UserContentDTO = new UserContentDTO(
      user.content.email,
      user.content.phone,
      user.content.lastName,
      user.content.firstName,
      user.content.projectRoles,
      user.content.scrumRoles,
      user.content.password,
    );
    return new UserContentResponseDTO(user.ID, user.UUID, userContent);
  }
}
