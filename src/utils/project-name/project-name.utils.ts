import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

const logger = new Logger('ProjectNameUtils');

export function getProjectName(): string {
  try {
    // Get the path to the package.json file
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`package.json file not found at ${packageJsonPath}`);
    }

    // Read the package.json file
    const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8');
    const parsedPackageJson = JSON.parse(packageJsonData);

    // Return the project name from the package.json
    return parsedPackageJson.name;
  } catch (error: any) {
    logger.error('Error reading package.json:', error.message);
    throw error;
  }
}

/**
 * Returns the root path of the current project.
 *
 * @returns {string} The root path.
 * @throws {Error} If the project root directory cannot be found.
 */
export function getProjectRootPath(): string {
  try {
    let currentDir = process.cwd();
    let parentDir = path.dirname(currentDir);

    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
      if (currentDir === parentDir) {
        throw new Error('Project root directory not found');
      }
      currentDir = parentDir;
      parentDir = path.dirname(currentDir);
    }

    return currentDir;
  } catch (error: any) {
    throw new Error(`Error getting project root path: ${error.message}`);
  }
}
