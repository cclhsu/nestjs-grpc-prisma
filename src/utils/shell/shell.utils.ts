import { Logger } from '@nestjs/common';
import { spawnSync, SpawnSyncReturns } from 'child_process';

const logger: Logger = new Logger('ShellUtils');

export function executeBashCommands(commands: string[]): void {
  for (const command of commands) {
    logger.log(`Executing command: ${command}`);

    // Split the command into arguments
    const args: string[] = command.split(/\s+/);
    const cmd: string = args.shift() ?? '';

    // Execute the command with capturing output and error streams
    const result: SpawnSyncReturns<string> = spawnSync(cmd, args, {
      stdio: 'pipe', // Use 'pipe' to capture stdout and stderr separately
      shell: true,
      encoding: 'utf-8',
    });

    if (result.error) {
      logger.error(`Error executing command: ${command}`);
      logger.error(result.error.message);
      return;
    }

    // Log stdout and stderr
    if (result.stdout) {
      logger.log('stdout:', result.stdout);
    }

    if (result.stderr) {
      logger.error('stderr:', result.stderr);
    }

    if (result.status !== 0) {
      logger.error(`Command failed with code ${result.status}: ${command}`);
      return;
    }
  }

  logger.log('All commands executed successfully.');
}
