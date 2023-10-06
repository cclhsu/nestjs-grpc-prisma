// Path: src/utils/metrics/metrics.provider.ts
// DESC: https://docs.nestjs.com/techniques/metrics
// npm install @willsoto/nestjs-prometheus prom-client # The general Prometheus metrics provider which will expose the endpoint /metrics
// npm install apollo-metrics apollo-tracing@0.15.0 # Provides Apollo GraphQL server plugins
// npm install --save-dev apollo-server-plugin-base # Contains the ApolloServerPlugin interface
'use strict';
// import { Injectable } from '@nestjs/common';
// import { Counter, register } from 'prom-client';

// @Injectable()
// export class PrometheusMetricsProvider {
//   private customMetric: Counter;

//   constructor() {
//     this.customMetric = new Counter({
//       name: 'custom_metric_total',
//       help: 'Custom metric to count something',
//     });
//     register.registerMetric(this.customMetric);
//   }

//   incrementCustomMetric() {
//     this.customMetric.inc();
//   }
// }

// export default PrometheusMetricsProvider;

export {};
