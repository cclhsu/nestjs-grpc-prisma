// Path: src/main.ts
// DESC: This is the main entry point for the application. It is responsible for loading the correct app based on the RUN_AS environment variable.
'use strict';
import { getBootstrap } from './app-factory/app.facotry';
import dotenv from 'dotenv';

class Main {
  async run(): Promise<void> {
    dotenv.config();
    const app: string = process.env.RUN_AS || 'service';
    console.log(`Running app: ${app} in env: ${process.env.NODE_ENV}`);
    const bootstrap = await getBootstrap(app);
    await bootstrap();
  }
}

const main = new Main();

if (require.main === module) {
  main.run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
