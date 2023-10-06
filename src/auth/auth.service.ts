import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from '../utils/jwt/jwt-service.utils';
import { CreateUserRequestDTO } from '../stakeholders/user/dto/create-user-request.dto';
import { UserDTO } from '../stakeholders/user/dto/user.dto';
import { UserService } from '../stakeholders/user/user.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegistrationResponseDTO } from './dto/registration-response.dto';

// interface AuthInternalInterface {
//   register(createUserRequestDTO: CreateUserRequestDTO): Promise<RegistrationResponseDTO>;
//   login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO>;
//   logout(uuid: string): Promise<void>;
//   getProfile(uuid: string): Promise<UserDTO>;
//   validateUser(uuid: string, password: string): Promise<UserDTO>;
//   validateUserByID(ID: string, password: string): Promise<UserDTO>;
//   validateUserByEmail(email: string, password: string): Promise<UserDTO>;
// }

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserRequestDTO: CreateUserRequestDTO): Promise<RegistrationResponseDTO> {
    const newUser = await this.userService.createUser(createUserRequestDTO);
    if (!newUser) {
      throw new Error('Error creating user');
    }

    const registrationResponseDTO: RegistrationResponseDTO = {
      UUID: newUser.UUID,
      ID: newUser.ID,
      email: newUser.content.email,
    };

    return registrationResponseDTO;
  }

  async login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.validateUserByID(loginRequestDTO.ID, loginRequestDTO.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const user = await this.validateUserByEmail(loginRequestDTO.email, loginRequestDTO.password);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    const token: string = await generateToken(
      user.ID,
      user.UUID,
      this.jwtService,
      this.configService,
    );
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const loginResponseDTO: LoginResponseDTO = {
      token,
    };

    return loginResponseDTO;
  }

  async logout(uuid: string): Promise<void> {
    const user = await this.userService.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return Promise.resolve();
  }

  async getProfile(uuid: string): Promise<UserDTO> {
    const user = await this.userService.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(uuid: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getUser(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && user.content.password === password) {
      return user;
    }

    // const isMatch = await bcrypt.compare(password, user.content.password);
    // if (isMatch) {
    //   return user;
    // }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUserByID(ID: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getUserByID(ID);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && user.content.password === password) {
      return user;
    }

    // const isMatch = await bcrypt.compare(password, user.content.password);
    // if (isMatch) {
    //   return user;
    // }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUserByEmail(email: string, password: string): Promise<UserDTO> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && user.content.password === password) {
      return user;
    }

    // const isMatch = await bcrypt.compare(password, user.content.password);
    // if (isMatch) {
    //   return user;
    // }

    throw new UnauthorizedException('Invalid credentials');
  }
}
