// Path: src/stakeholders/user/user.module.ts
// DESC: This is the user module
'use strict';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import type { RedisClientOptions } from 'redis';
import { CsvModule } from '../../../../utils/csv/csv.module';
import { JsonModule } from '../../../../utils/json/json.module';
import { MarkdownModule } from '../../../../utils/markdown/markdown.module';
import { YamlModule } from '../../../../utils/yaml/yaml.module';
import { UserRepository } from '../../repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from '../../user.service';

@Module({
  imports: [
    JsonModule,
    CsvModule,
    YamlModule,
    MarkdownModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    // CacheModule.register(),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('REDIS_TTL') | 60,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
