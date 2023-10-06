/* eslint-disable @typescript-eslint/no-inferrable-types */
// import { Logger } from '@nestjs/common';
import { createFileWithContent } from '../file/file.utils';
import * as path from 'path';

// const logger: Logger = new Logger('GitignoreUtils');

export async function createGitKeepFile(projectDirPath: string): Promise<void> {
  const gitkeepContent: string = '';
  const gitkeepPath = path.join(projectDirPath, '.gitkeep');
  await createFileWithContent(gitkeepPath, gitkeepContent);
}

export async function createGoGitignoreFile(projectDirPath: string): Promise<void> {
  const gitignoreContent: string = 'bin\ndist\n';
  await createFileWithContent(path.join(projectDirPath, '.gitignore'), gitignoreContent);
}

export async function createPython3GitignoreFile(projectDirPath: string): Promise<void> {
  const gitignoreContent: string = '__pycache__\n';
  await createFileWithContent(path.join(projectDirPath, '.gitignore'), gitignoreContent);
}

export async function createRustGitignoreFile(projectDirPath: string): Promise<void> {
  const gitignoreContent: string = 'target\n';
  await createFileWithContent(path.join(projectDirPath, '.gitignore'), gitignoreContent);
}

export async function createTypescriptGitignoreFile(projectDirPath: string): Promise<void> {
  const gitignoreContent: string = 'bin\ndist\nnode_modules\n';
  await createFileWithContent(path.join(projectDirPath, '.gitignore'), gitignoreContent);
}
