// Path: src/utils/jwt/jwt.utils.ts
// DESC: JWT utilities
'use strict';

import { Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const logger: Logger = new Logger('jwt.utils.ts');

export async function generateToken(
  ID: string,
  userId: string,
  jwtService: JwtService,
  configService: ConfigService,
): Promise<string> {
  const payload: JwtPayload = {
    ID,
    // email: user.email,
    sub: userId,
  };
  const options: JwtSignOptions = {
    expiresIn: configService.get('JWT_EXPIRES_IN'),
  };
  const token: string = await jwtService.signAsync(payload, options);
  if (!token) {
    throw new UnauthorizedException('Invalid token');
  }
  return token;
}

export async function verifyToken(
  token: string,
  jwtService: JwtService,
  configService: ConfigService,
): Promise<JwtPayload | undefined> {
  try {
    const jwtVerifyOptions: JwtVerifyOptions = {
      secret: configService.get('JWT_SECRET'),
    };
    const payload: JwtPayload | undefined = await jwtService.verifyAsync<JwtPayload>(
      token,
      jwtVerifyOptions,
    );
    return payload;
  } catch (error: any) {
    // Handle verification error here, e.g., log it
    logger.error(`Error verifying token: ${error}`);
    return undefined;
  }
}

export function decodeToken(
  token: string,
  jwtService: JwtService,
  configService: ConfigService,
): JwtPayload | undefined {
  try {
    if (!token) {
      return undefined;
    }
    const secret: string | undefined = configService.get('JWT_SECRET');
    const jwtVerifyOptions: JwtVerifyOptions = {
      secret,
    };
    const decoded: JwtPayload = jwtService.verify<JwtPayload>(token, jwtVerifyOptions);
    return decoded;
  } catch (error: any) {
    // Handle verification error here, e.g., log it
    logger.error('Error decoding token: ', error);
    return undefined;
  }
}

// Token extraction functions...

export function getTokenFromHeaders(headers: any): string | undefined {
  const authorization = headers?.authorization;
  if (authorization) {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  return undefined;
}

export function getTokenFromQuery(query: any): string | undefined {
  return query?.token || undefined; // Provide a default value
}

export function getTokenFromCookies(cookies: any): string | undefined {
  return cookies?.token || undefined; // Provide a default value
}

export function getTokenFromRequestAuthorization(request: Request): string | undefined {
  const authorization = request?.headers?.authorization;
  if (authorization) {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  return undefined;
}

export function getTokenFromRequestQuery(request: Request): string | undefined {
  const token = request?.query?.token;
  return typeof token === 'string' ? token : undefined; // Cast to string or return undefined
}

export function getTokenFromRequestCookies(request: Request): string | undefined {
  return request?.cookies?.token || undefined; // Provide a default value
}

export function validateToken(
  token: string,
  jwtService: JwtService,
  configService: ConfigService,
): boolean {
  const decoded: JwtPayload | undefined = decodeToken(token, jwtService, configService);
  if (!decoded || !decoded.sub) {
    return false;
  }
  return true;
}

export default {
  generateToken,
  verifyToken,
  decodeToken,
  getTokenFromHeaders,
  getTokenFromQuery,
  getTokenFromCookies,
  getTokenFromRequestAuthorization,
  getTokenFromRequestQuery,
  getTokenFromRequestCookies,
  validateToken,
};
