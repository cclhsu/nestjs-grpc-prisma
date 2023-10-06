import { IsIn, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  SERVICE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  SERVICE_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  MONGO_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_DB: string;

  @IsString()
  @IsNotEmpty()
  MONGO_USER: string;

  @IsString()
  @IsNotEmpty()
  MONGO_PASS: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASS: string;

  @IsIn(['true', 'false'])
  DB_SYNC: 'true' | 'false';

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number;

  @IsString()
  @IsNotEmpty()
  REDIS_PASS: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_TTL: number;

  constructor(
    JWT_SECRET: string,
    JWT_EXPIRES_IN: string,
    SERVICE_HOST: string,
    SERVICE_PORT: number,
    MONGO_HOST: string,
    MONGO_PORT: number,
    MONGO_DB: string,
    MONGO_USER: string,
    MONGO_PASS: string,
    POSTGRES_HOST: string,
    POSTGRES_PORT: number,
    POSTGRES_DB: string,
    POSTGRES_USER: string,
    POSTGRES_PASS: string,
    DB_SYNC: 'true' | 'false',
    REDIS_HOST: string,
    REDIS_PORT: number,
    REDIS_PASS: string,
    REDIS_TTL: number,
  ) {
    this.JWT_SECRET = JWT_SECRET;
    this.JWT_EXPIRES_IN = JWT_EXPIRES_IN;
    this.SERVICE_HOST = SERVICE_HOST;
    this.SERVICE_PORT = SERVICE_PORT;
    this.MONGO_HOST = MONGO_HOST;
    this.MONGO_PORT = MONGO_PORT;
    this.MONGO_DB = MONGO_DB;
    this.MONGO_USER = MONGO_USER;
    this.MONGO_PASS = MONGO_PASS;
    this.POSTGRES_HOST = POSTGRES_HOST;
    this.POSTGRES_PORT = POSTGRES_PORT;
    this.POSTGRES_DB = POSTGRES_DB;
    this.POSTGRES_USER = POSTGRES_USER;
    this.POSTGRES_PASS = POSTGRES_PASS;
    this.DB_SYNC = DB_SYNC;
    this.REDIS_HOST = REDIS_HOST;
    this.REDIS_PORT = REDIS_PORT;
    this.REDIS_PASS = REDIS_PASS;
    this.REDIS_TTL = REDIS_TTL;
  }
}

export const validateEnvironmentVariables = (
  config: EnvironmentVariables,
): EnvironmentVariables => {
  const errors = validateSync(config, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
};
