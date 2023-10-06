// import { Logger } from '@nestjs/common';
import { resolveHomePath } from '../path/path.utils';
import * as path from 'path';

// const logger: Logger = new Logger('ConfigUtils');

export function getConfigFilePath(
  projectName: string,
  configName: string,
  extension: string,
): string {
  const configFile: string = path.join(
    resolveHomePath('${HOME}'),
    '.config',
    projectName,
    configName + '.' + extension,
  );
  return configFile;
}

export function getJsonConfigFilePath(projectName: string, configName: string): string {
  return getConfigFilePath(projectName, configName, 'json');
}

export function getYamlConfigFilePath(projectName: string, configName: string): string {
  return getConfigFilePath(projectName, configName, 'yaml');
}

export function getCsvConfigFilePath(projectName: string, configName: string): string {
  return getConfigFilePath(projectName, configName, 'csv');
}
