// Path: src/app-factory/app.facotry.ts
// DESC: This is the main entry point for the application. It is responsible for loading the correct app based on the RUN_AS environment variable.
'use strict';

export const APP_FACTORY_TYPES = ['cli', 'cron', 'graphql', 'grpc', 'job', 'restful', 'service'];

export async function getBootstrap(app: string) {
  if (!app) throw new Error('app not specified');

  if (!APP_FACTORY_TYPES.includes(app)) throw new Error(`app (${app}) not supported`);
  const path = `./${app}/${app}.main`;
  try {
    const bootstrapModule = await import(path);
    const bootstrap = bootstrapModule.default; // Assuming `bootstrap` exports a default function
    return bootstrap;
  } catch (err: any) {
    const error: any = new Error(`app (${app}) not found  - ${err.message}`);
    console.error(error.message);
    throw error;
  }
}

export default getBootstrap;
