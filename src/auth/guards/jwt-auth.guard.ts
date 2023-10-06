import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { getTokenFromRequestAuthorization, verifyToken } from '../../utils/jwt/jwt-service.utils';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  logger: Logger = new Logger('jwt-auth.guard.ts');
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string | undefined = getTokenFromRequestAuthorization(request);
    this.logger.log(`${context.getHandler().name} token: ${token}`);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayload | undefined = await verifyToken(
        token,
        this.jwtService,
        this.configService,
      );
      if (!payload) {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
