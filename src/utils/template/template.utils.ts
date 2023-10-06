import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  DEFAULT_CMD_SH_TEMPLATE_FILE_PATH,
  DEFAULT_LICENSE_TEMPLATE_FILE_PATH,
  DEFAULT_MAKEFILE_TEMPLATE_FILE_PATH,
  DEFAULT_README_TEMPLATE_FILE_PATH,
} from '../../common/constant';
import { createDirectory } from '../directory/directory.utils';
import { addLeadingZeros } from '../string/string.utils';

const logger: Logger = new Logger('TemplateUtils');

type VariableValue = string | boolean | number;

export function convertObjectValuesToString(
  obj: Record<string, any>,
): Record<string, VariableValue> {
  const result: Record<string, VariableValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = String(value);
  }
  return result;
}

export function getTemplateRootPath(): string {
  logger.debug('>>> Getting template root path');
  try {
    const projectRootPath: string = process.cwd();
    const templatePathOptions: string[] = ['template', path.join('src', 'template')];

    for (const templatePathOption of templatePathOptions) {
      const templateRootPath: string = path.join(projectRootPath, templatePathOption);
      if (fs.existsSync(templateRootPath)) {
        return path.dirname(templateRootPath);
      }
    }

    throw new Error('Template root directory not found');
  } catch (error: any) {
    logger.error('Error getting template root path:', error.message);
    throw error;
  }
}

export async function copyTemplateFile(
  templateFilePath: string,
  newFilePath: string,
  variables: Record<string, string>,
): Promise<void> {
  logger.debug('>>> Copying template file');
  try {
    const resolvedProjectDirPath: string = path.resolve(newFilePath);

    // Check if the file directory exists
    if (fs.existsSync(resolvedProjectDirPath)) {
      console.error(`File directory ${resolvedProjectDirPath} already exists`);
      return;
    }

    // Create the file directory if it does not exist
    const fileDirectory = path.dirname(resolvedProjectDirPath);
    createDirectory(fileDirectory);

    // // Get the file name from the template file path
    // const fileName = path.basename(templateFilePath);
    // const destFileName = fileName.endsWith('.j2')
    //   ? fileName.slice(0, -3)
    //   : fileName;
    // const destFilePath = path.join(fileDirectory, destFileName);

    // Read the content of the source file
    let fileContent = await fs.readFile(templateFilePath, 'utf8');

    // Replace variables in the file content using Jinja-like placeholders
    for (const [variable, value] of Object.entries(variables)) {
      const placeholder = `{{ ${variable} }}`;
      fileContent = fileContent.replace(new RegExp(placeholder, 'g'), value);
    }

    // Write the modified content to the destination file
    await fs.writeFile(newFilePath, fileContent, 'utf8');

    logger.log(`Template file copied successfully to ${newFilePath}.`);
  } catch (error: any) {
    logger.error('Error copying template file:', error.message);
    throw error;
  }
}

// Function to copy template files from template_dir to project_dir
export async function copyTemplateFilesToProjectDir(
  templateDirPath: string,
  projectDirPath: string,
  variables: Record<string, string>,
): Promise<void> {
  logger.debug('>>> Copying template files');
  try {
    // Create the project directory
    const resolvedProjectDirPath: string = path.resolve(projectDirPath);

    // Check if the project directory exists
    if (fs.existsSync(resolvedProjectDirPath)) {
      console.error(`Project directory ${resolvedProjectDirPath} already exists`);
      return;
    }

    createDirectory(resolvedProjectDirPath);

    // Get all items (files and directories) in the template directory
    const itemsInTemplateDir = await fs.readdir(templateDirPath);

    // Perform the copy operation for each item
    for (const item of itemsInTemplateDir) {
      const srcItemPath = path.join(templateDirPath, item);
      const destItemName = item.endsWith('.j2') ? item.slice(0, -3) : item;
      const destItemPath = path.join(resolvedProjectDirPath, destItemName);

      // Check if the item is a file or a directory
      const itemStats = await fs.lstat(srcItemPath);
      if (itemStats.isFile()) {
        let fileContent = await fs.readFile(srcItemPath, 'utf8');

        // Replace variables in the file content using Jinja-like placeholders
        for (const [variable, value] of Object.entries(variables)) {
          const placeholder = `{{ ${variable} }}`;
          fileContent = fileContent.replace(new RegExp(placeholder, 'g'), value);
        }

        // Write the modified content to the destination file
        await fs.writeFile(destItemPath, fileContent, 'utf8');
      } else if (itemStats.isDirectory()) {
        await copyTemplateFilesToProjectDir(srcItemPath, destItemPath, variables);
      } else {
        logger.error(`Skipping ${srcItemPath} as it is not a file or directory`);
      }
    }

    logger.log(`Template files from ${templateDirPath} copied successfully to ${projectDirPath}.`);
  } catch (error: any) {
    logger.error('Error copying template files:', error.message);
    throw error;
  }
}

export async function createFilesFromTemplate(
  templateFilePath: string,
  projectDirPath: string,
  variables: Record<string, string>,
  filenames: string[],
): Promise<void> {
  logger.debug('>>> Creating files from template');
  try {
    // Create the project directory
    const resolvedProjectDirPath: string = path.resolve(projectDirPath);

    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      const incrementedKey = i + 1;
      const paddedincrementedKey: string = addLeadingZeros(2, incrementedKey);
      await copyTemplateFile(
        templateFilePath,
        path.join(resolvedProjectDirPath, paddedincrementedKey + '_' + filename + '.md'),
        variables,
      );
    }
  } catch (error: any) {
    logger.error('Error creating files from template:', error);
  }
}

export async function createCmdShFileFromTemplate(
  templateFilePath: string = path.join(getTemplateRootPath(), DEFAULT_CMD_SH_TEMPLATE_FILE_PATH),
  newFilePath: string,
  variables: Record<string, string>,
): Promise<void> {
  await copyTemplateFile(templateFilePath, newFilePath, variables);
}

export async function createLicenseFileFromTemplate(
  templateFilePath: string = path.join(getTemplateRootPath(), DEFAULT_LICENSE_TEMPLATE_FILE_PATH),
  newFilePath: string,
  variables: Record<string, string>,
): Promise<void> {
  await copyTemplateFile(templateFilePath, newFilePath, variables);
}

export async function createMakefileFromTemplate(
  templateFilePath: string = path.join(getTemplateRootPath(), DEFAULT_MAKEFILE_TEMPLATE_FILE_PATH),
  newFilePath: string,
  variables: Record<string, string>,
): Promise<void> {
  await copyTemplateFile(templateFilePath, newFilePath, variables);
}

export async function createReadmeFileFromTemplate(
  templateFilePath: string = path.join(getTemplateRootPath(), DEFAULT_README_TEMPLATE_FILE_PATH),
  newFilePath: string,
  variables: Record<string, string>,
): Promise<void> {
  await copyTemplateFile(templateFilePath, newFilePath, variables);
}

// npm install fs-extra
// npm install --save-dev @types/fs-extra
