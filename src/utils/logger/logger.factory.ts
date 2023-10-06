// Path: src/utils/logger/logger.factory.ts
// DESC: logger factory
// // npm install winston nest-winston @types/winston @types/express-winston
'use strict';
// import { transports, format } from 'winston';
// import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';

// export function LoggerFactory(appName: string) {
//   let consoleFormat;

//   const DEBUG = process.env.DEBUG;
//   const USE_JSON_LOGGER = process.env.USE_JSON_LOGGER;

//   if (USE_JSON_LOGGER === 'true') {
//     consoleFormat = format.combine(format.ms(), format.timestamp(), format.json());
//   } else {
//     consoleFormat = format.combine(
//       format.timestamp(),
//       format.ms(),
//       nestWinstonModuleUtilities.format.nestLike(appName, {
//         colors: true,
//         prettyPrint: true,
//       }),
//     );
//   }

//   return WinstonModule.createLogger({
//     level: DEBUG ? 'debug' : 'info',
//     transports: [new transports.Console({ format: consoleFormat })],
//   });
// }

// export default LoggerFactory;

export {};
