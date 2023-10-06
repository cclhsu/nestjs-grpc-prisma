import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../../stakeholders/user/factory/grpc/user.module';
// import { AuthController } from './auth.controller';
import { AuthService } from '../../auth.service';
import { JwtAuthStrategy } from '../../strategies/jwt-auth.strategy';
// import { authGrpcClientOptions } from 'src/grpc.options';
// import { ClientsModule } from '@nestjs/microservices';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'auth',
  //       ...authGrpcClientOptions,
  //     },
  //   ]),
  // ],
  imports: [
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
    UserModule, // Add the UsersModule or your user-related module
  ],
  // controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService, JwtModule, JwtAuthStrategy],
})
export class AuthModule {}
