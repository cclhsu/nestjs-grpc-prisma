// Path: src/health/health.service.ts
// DESC: health service
// URL: https://docs.nestjs.com/recipes/terminus
'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { HealthRequestDTO } from './dto/health-request.dto';
import { HealthResponseDTO, ServingStatus } from './dto/health-response.dto';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
// import { PrometheusMetricsProvider } from '../../../utils/metrics/metrics.provider';
// import ElasticsearchLoggerService from '../../../utils/logger/logger.service';

interface HealthInternalInterface {
  isALive(request: HealthRequestDTO): Promise<HealthResponseDTO>;
  isReady(request: HealthRequestDTO): Promise<HealthResponseDTO>;
  isHealthy(request: HealthRequestDTO): Promise<HealthResponseDTO>;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  // private readonly logger: ElasticsearchLoggerService,
  // private readonly PrometheusMetricsProvider: PrometheusMetricsProvider,

  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @HealthCheck()
  async isALive(_healthRequestDTO: HealthRequestDTO): Promise<HealthResponseDTO> {
    // return this.health.check([]);
    const healthResponse: HealthResponseDTO = {
      status: ServingStatus.SERVING,
      message: 'LIVE',
    };
    this.logger.log(healthResponse);
    // this.PrometheusMetricsProvider.incrementCustomMetric();
    return healthResponse;
  }

  @HealthCheck()
  async isReady(_healthRequestDTO: HealthRequestDTO): Promise<HealthResponseDTO> {
    // return this.healthCheckService.check([
    //   async () => this.checkDatabaseConnection(),
    //   async () => this.checkRedisConnection(),
    //   async () => this.checkKafkaConnection(),
    //   async () => this.checkDependenciesConnections(),
    // ]);
    try {
      const connectionChecks = [
        this.checkDatabaseConnection(),
        this.checkRedisConnection(),
        this.checkKafkaConnection(),
        this.checkDependenciesConnections(),
      ];

      const results = await Promise.all(connectionChecks);
      const allConnected = results.every((result) => result);

      if (allConnected) {
        const healthResponse: HealthResponseDTO = {
          status: ServingStatus.SERVING,
          message: 'READY',
        };
        this.logger.log(healthResponse);
        // this.PrometheusMetricsProvider.incrementCustomMetric();
        return healthResponse;
      } else {
        this.logger.error('Service is not healthy');
        const healthResponse: HealthResponseDTO = {
          status: ServingStatus.NOT_SERVING,
          message: 'NOT_READY',
        };
        this.logger.log(healthResponse);
        // this.PrometheusMetricsProvider.incrementCustomMetric();
        return healthResponse;
      }
    } catch (error) {
      this.logger.error('Health check failed', error);
      // this.PrometheusMetricsProvider.incrementCustomMetric();
      const healthResponse: HealthResponseDTO = {
        status: ServingStatus.NOT_SERVING,
        message: 'NOT_READY',
      };
      return healthResponse;
    }
  }

  @HealthCheck()
  async isHealthy(_healthRequestDTO: HealthRequestDTO): Promise<HealthResponseDTO> {
    // return this.healthCheckService.check([
    //   async () => this.checkDatabaseConnection(),
    //   async () => this.checkRedisConnection(),
    //   async () => this.checkKafkaConnection(),
    //   async () => this.checkDependenciesConnections(),
    // ]);
    try {
      const connectionChecks = [
        this.checkDatabaseConnection(),
        this.checkRedisConnection(),
        this.checkKafkaConnection(),
        this.checkDependenciesConnections(),
      ];

      const results = await Promise.all(connectionChecks);
      const allConnected = results.every((result) => result);

      if (allConnected) {
        const healthResponse: HealthResponseDTO = {
          status: ServingStatus.SERVING,
          message: 'HEALTHY',
        };
        this.logger.log(healthResponse);
        // this.PrometheusMetricsProvider.incrementCustomMetric();
        return healthResponse;
      } else {
        this.logger.error('Service is not healthy');
        const healthResponse: HealthResponseDTO = {
          status: ServingStatus.NOT_SERVING,
          message: 'UNHEALTHY',
        };
        this.logger.log(healthResponse);
        // this.PrometheusMetricsProvider.incrementCustomMetric();
        return healthResponse;
      }
    } catch (error) {
      this.logger.error('Health check failed', error);
      const healthResponse: HealthResponseDTO = {
        status: ServingStatus.NOT_SERVING,
        message: 'UNHEALTHY',
      };
      return healthResponse;
    }
  }

  private async checkDatabaseConnection() {
    // Perform database connection check logic here
    // Return a promise that resolves to true if the connection is successful, or false otherwise
    try {
      // Example: await yourDatabaseClient.ping()
      return true;
    } catch (error) {
      this.logger.error('Database connection check failed', error);
      return false;
    }
  }

  private async checkRedisConnection() {
    // Perform Redis connection check logic here
    // Return a promise that resolves to true if the connection is successful, or false otherwise
    try {
      // Example: await yourRedisClient.ping()
      return true;
    } catch (error) {
      this.logger.error('Redis connection check failed', error);
      return false;
    }
  }

  private async checkKafkaConnection() {
    // Perform Kafka connection check logic here
    // Return a promise that resolves to true if the connection is successful, or false otherwise
    try {
      // Example: await yourKafkaClient.ping()
      return true;
    } catch (error) {
      this.logger.error('Kafka connection check failed', error);
      return false;
    }
  }

  private async checkDependenciesConnections() {
    // Perform dependencies services connection check logic here
    // Return a promise that resolves to true if all dependencies are connected, or false otherwise
    try {
      // Example: await yourDependencyService.ping()
      return true;
    } catch (error) {
      this.logger.error('Dependencies connection check failed', error);
      return false;
    }
  }
}
