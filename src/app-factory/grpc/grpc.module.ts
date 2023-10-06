// Path: src/app-factory/grpc/grpc.module.ts
// DESC: This is the main entry point for the grpc application.
'use strict';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TerminusModule } from '@nestjs/terminus';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from '../../auth/factory/grpc/auth.module';
import { HealthModule } from '../../health/factory/grpc/health.module';
import { HelloModule } from '../../hello/factory/grpc/hello.module';
import { TeamModule } from '../../stakeholders/team/factory/grpc/team.module';
import { UserModule } from '../../stakeholders/user/factory/grpc/user.module';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import { RequestLoggerMiddleware } from '../../utils/middleware/request-logger.middleware';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { grpcOptions } from './grpc.options';
// import { MetricsMiddleware } from 'src/utils/middleware/metrics.middleware';

// import { JwtAuthStrategy as AuthStrategy } from '../../auth/strategies/jwt-auth.strategy';
// import { LocalAuthStrategy as AuthStrategy } from '../../auth/strategies/local-auth.strategy';
// import { validate } from '../../validation/env.validation';

@Module({
  imports: [
    JsonModule,
    YamlModule,
    CsvModule,
    MarkdownModule,
    // ConfigModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
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
    TerminusModule,
    GrpcReflectionModule.register(grpcOptions),
    HelloModule,
    HealthModule,
    AuthModule,
    UserModule,
    TeamModule,
  ],
  controllers: [],
  providers: [
    /*AuthStrategy*/
  ],
})
export class MyGrpcModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    // consumer.apply(MetricsMiddleware).forRoutes({ path: 'metrics', method: RequestMethod.GET });
  }
}
