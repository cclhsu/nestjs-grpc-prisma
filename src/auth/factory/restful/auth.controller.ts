import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { CreateUserRequestDTO } from '../../../stakeholders/user/dto';
import { UserService } from '../../../stakeholders/user/user.service';
import {
  decodeToken,
  getTokenFromRequestAuthorization,
  validateToken,
} from '../../../utils/jwt/jwt-service.utils';
import { AuthService } from '../../auth.service';
import { Public } from '../../decorators/public.decorator';
import { LoginRequestDTO, LoginResponseDTO, RegistrationResponseDTO } from '../../dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

// interface AuthExternalInterface {
//   register(createUserRequestDTO: CreateUserRequestDTO): Promise<RegistrationResponseDTO>;
//   login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO>;
//   logout(uuid: string): Promise<void>;
//   getProfile(uuid: string): Promise<any>;
//   // forgotPassword(email: string): Promise<void>;
// }

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  // curl -s -X POST http://0.0.0.0:3001/auth/register -H "Content-Type: application/json" -d '{"ID": "john.doe", "metadata": {"name": "John Doe", "dates": {"createdAt": "2023-08-15T12:00:00Z","createdBy": "john.doe","updatedAt": "2023-08-15T12:00:00Z","updatedBy": "john.doe"}},"content": {"email": "e.g. john.doe@mail.com","phone": "e.g. 0912-345-678","firstName": "John","lastName": "Doe","projectRoles": ["I"],"scrumRoles": ["I"],"password": "P@ssw0rd!234"}}' | jq
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiProduces('application/json')
  @ApiBody({ type: CreateUserRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: RegistrationResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post('register')
  async register(
    @Body() createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<RegistrationResponseDTO> {
    return await this.authService.register(createUserRequestDTO);
  }

  // curl -s -X POST http://0.0.0.0:3001/auth/login -H "Content-Type: application/json" -d '{"ID": "john.doe", "password": "P@ssw0rd!234"}' | jq
  // curl -s -X POST http://0.0.0.0:3001/auth/login -H "Content-Type: application/json" -d '{"email": "john.doe@mail.com", "password": "P@ssw0rd!234"}' | jq
  @Public()
  @ApiOperation({ summary: 'Login a user' })
  @ApiProduces('application/json')
  @ApiBody({ type: LoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post('login')
  async login(@Body() loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    return await this.authService.login(loginRequestDTO);
  }

  // curl -s -X GET http://0.0.0.0:3001/auth/logout -H "Content-Type: application/json" -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Logout a user' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged out.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: ExpressRequest) {
    const token = getTokenFromRequestAuthorization(req);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const validate = validateToken(token, this.jwtService, this.configService);
    if (!validate) {
      throw new UnauthorizedException('Invalid token');
    }

    const decoded: any = decodeToken(token, this.jwtService, this.configService);
    const uuid = decoded.sub;

    await this.authService.logout(uuid);
  }

  // curl -s -X GET http://0.0.0.0:3001/auth/profile -H "Content-Type: application/json" -H "Authorization: Bearer <token>" | jq
  @ApiOperation({ summary: 'Get the profile of the logged in user' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'The profile of the logged in user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ExpressRequest) {
    const token = getTokenFromRequestAuthorization(req);
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const validate = validateToken(token, this.jwtService, this.configService);
    if (!validate) {
      throw new UnauthorizedException('Invalid token');
    }

    const decoded: any = decodeToken(token, this.jwtService, this.configService);
    const uuid = decoded.sub;

    return await this.authService.getProfile(uuid);
  }
}
