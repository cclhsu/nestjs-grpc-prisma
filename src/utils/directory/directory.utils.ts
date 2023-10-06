import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { addLeadingZeros, formatProjectName } from '../string/string.utils';
import {
  DEFAULT_SRC_ROOT_PATH,
  DEFAULT_GIT_PROVIDER_TYPE,
  PROJECT_DOCUMENT_DIRECTORIES,
} from '../../common/constant';
import { resolveHomePath } from '../path/path.utils';
import { createGitKeepFile } from '../git/gitignore.utils';

const logger: Logger = new Logger('DirectoryUtils');

export async function createDirectory(directoryPath: string): Promise<void> {
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
    logger.log(`Created directory: ${directoryPath}`);
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      logger.log(`Directory already exists at ${directoryPath}`);
    } else {
      throw error;
    }
  }
}

function validateProjectInputs(
  srcRootPath: string,
  gitProvider: string,
  projectName: string,
  projectType: string,
): void {
  if (!srcRootPath) {
    throw new Error('Source root path must be specified.');
  }
  if (!gitProvider) {
    throw new Error('Git provider must be specified.');
  }
  if (!projectName) {
    throw new Error('Project name must be specified.');
  }
  if (!projectType) {
    throw new Error('Project type must be specified.');
  }
}

export async function getProjectDirectoryPath(
  srcRootPath: string,
  gitProvider: string,
  projectName: string,
  projectType: string,
): Promise<string> {
  validateProjectInputs(srcRootPath, gitProvider, projectName, projectType);

  const formattedProjectName: string = formatProjectName(projectName);
  const formattedProjectTypeName: string = `${formattedProjectName}-${projectType}` as string;

  const projectDirPath: string = path.join(
    srcRootPath,
    gitProvider,
    formattedProjectName,
    formattedProjectTypeName,
  );
  const resolvedProjectDirPath: string = resolveHomePath(projectDirPath);

  return resolvedProjectDirPath;
}

export async function getOrCreateProjectDirectory(
  srcRootPath: string = DEFAULT_SRC_ROOT_PATH,
  gitProvider: string = DEFAULT_GIT_PROVIDER_TYPE,
  projectName: string,
  projectType: string,
): Promise<string> {
  logger.debug('>>> Getting or creating project directory');

  validateProjectInputs(srcRootPath, gitProvider, projectName, projectType);

  const projectDirPath = await getProjectDirectoryPath(
    srcRootPath,
    gitProvider,
    projectName,
    projectType,
  );

  await createDirectory(projectDirPath);
  return projectDirPath;
}

function validateDocumentationInputs(
  srcRootPath: string,
  gitProvider: string,
  projectName: string,
  projectType: string,
  incrementedProjectTypeKey: number,
): void {
  validateProjectInputs(srcRootPath, gitProvider, projectName, projectType);
  if (incrementedProjectTypeKey < 0) {
    throw new Error('Incremented project type key must be a positive number.');
  }
}

export async function getDocumentDirectoryPath(
  srcRootPath: string,
  gitProvider: string,
  projectName: string,
  projectType: string,
  incrementedProjectTypeKey: number,
): Promise<string> {
  validateDocumentationInputs(
    srcRootPath,
    gitProvider,
    projectName,
    projectType,
    incrementedProjectTypeKey,
  );

  const paddedIncrementedProjectTypeKey: string = addLeadingZeros(2, incrementedProjectTypeKey);
  const formattedProjectName: string = formatProjectName(projectName);
  // const formattedProjectTypeName: string = `${formattedProjectName}-${projectType}` as string;
  const formattedProjectDocTypeName: string = `${formattedProjectName}-document` as string;
  const docTypeName: string = `${paddedIncrementedProjectTypeKey}_${projectType}` as string;

  const projectDocPath: string = path.join(
    srcRootPath,
    gitProvider,
    formattedProjectName,
    formattedProjectDocTypeName,
    docTypeName,
  );
  const resolvedProjectDirPath: string = resolveHomePath(projectDocPath);

  return resolvedProjectDirPath;
}

export async function createDocumentationDirectory(
  srcRootPath: string = DEFAULT_SRC_ROOT_PATH,
  gitProvider: string = DEFAULT_GIT_PROVIDER_TYPE,
  projectName: string,
  projectType: string,
  incrementedProjectTypeKey: number,
): Promise<string> {
  logger.debug('>>> Creating documentation directory');

  validateDocumentationInputs(
    srcRootPath,
    gitProvider,
    projectName,
    projectType,
    incrementedProjectTypeKey,
  );

  const resolvedProjectDirPath: string = await getDocumentDirectoryPath(
    srcRootPath,
    gitProvider,
    projectName,
    projectType,
    incrementedProjectTypeKey,
  );

  await createDirectory(resolvedProjectDirPath);

  for (const subDir of PROJECT_DOCUMENT_DIRECTORIES) {
    const subDirPath: string = path.join(resolvedProjectDirPath, subDir);
    await createDirectory(subDirPath);
    await createGitKeepFile(subDirPath);
  }

  return resolvedProjectDirPath;
}
