// Path: src/app-factory/service/service.module.ts
// DESC: This is the main entry point for the service application.
'use strict';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TerminusModule } from '@nestjs/terminus';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from '../../auth/factory/restful/auth.module';
import { HealthModule } from '../../health/factory/restful/health.module';
import { HelloModule } from '../../hello/factory/restful/hello.module';
// import { CommentModule } from '../../project-management/comment/factory/restful/comment.module';
// import { IterationModule } from '../../project-management/iteration/factory/restful/iteration.module';
// import { MetricModule } from '../../project-management/metric/factory/restful/metric.module';
// import { ProjectModule } from '../../project-management/project/factory/restful/project.module';
// import { TaskModule } from '../../project-management/task/factory/restful/task.module';
import { TeamModule } from '../../stakeholders/team/factory/restful/team.module';
import { UserModule } from '../../stakeholders/user/factory/restful/user.module';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import { RequestLoggerMiddleware } from '../../utils/middleware/request-logger.middleware';
import { YamlModule } from '../../utils/yaml/yaml.module';
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
    HelloModule,
    HealthModule,
    AuthModule,
    UserModule,
    TeamModule,
    // ProjectModule,
    // IterationModule,
    // TaskModule,
    // MetricModule,
    // CommentModule,
  ],
  controllers: [],
  providers: [
    /*AuthStrategy*/
  ],
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    // consumer.apply(MetricsMiddleware).forRoutes({ path: 'metrics', method: RequestMethod.GET });
  }
}
