import { Logger } from '@nestjs/common';
import * as os from 'os';
import * as path from 'path';

const logger: Logger = new Logger('PathUtils');

/**
 * Resolves the ${HOME} placeholder in the given path.
 * @param filePath - The file path that may contain the ${HOME} placeholder.
 * @returns The resolved file path.
 */
export function resolveHomePath(filePath: string): string {
  if (typeof filePath === 'string' && filePath.includes('${HOME}')) {
    try {
      const homeDir: string = os.homedir();
      const resolvedPath: string = filePath.replace('${HOME}', homeDir);
      return path.normalize(resolvedPath);
    } catch (error: any) {
      logger.log(`Could not resolve \${HOME} in ${filePath}: ${error.message}`);
      return filePath;
    }
  } else {
    return filePath;
  }
}

/**
 * Resolves the ~ placeholder in the given path.
 * @param filePath - The file path that may start with the ~ placeholder.
 * @returns The resolved file path.
 */
export function resolveTildeInPath(filePath: string): string {
  if (typeof filePath === 'string' && filePath.startsWith('~')) {
    const resolvedPath: string = path.join(os.homedir(), filePath.slice(1));
    return path.normalize(resolvedPath);
  }
  return filePath;
}
