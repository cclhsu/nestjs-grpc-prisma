/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Logger } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import axios from 'axios';

const logger: Logger = new Logger('FileUtils');

export async function downloadFile(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logger.error('Error downloading file:', error.response.status, error.response.statusText);
      } else {
        logger.error('Error downloading file:', error.message);
      }
    } else {
      logger.error('Error downloading file:', error.message);
    }
    throw error;
  }
}

export async function uploadFile(url: string, content: string): Promise<void> {
  try {
    const response = await axios.post(url, content);
    if (response.status === 200) {
      logger.log('File uploaded successfully.');
    } else {
      logger.error('Error uploading file. Unexpected status code:', response.status);
      throw new Error('File upload failed.');
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        logger.error('Error uploading file:', error.response.status, error.response.statusText);
      } else {
        logger.error('Error uploading file:', error.message);
      }
    } else {
      logger.error('Error uploading file:', error.message);
    }
    throw error;
  }
}

export async function copyFile(srcFilePath: string, destFilePath: string): Promise<void> {
  const resolvedSrcFilePath: string = path.resolve(srcFilePath);
  const resolvedDestFilePath: string = path.resolve(destFilePath);

  try {
    // Check if the source file exists
    const srcFileExists = await fs
      .access(resolvedSrcFilePath)
      .then(() => true)
      .catch(() => false);

    if (!srcFileExists) {
      logger.error(`Source file ${resolvedSrcFilePath} does not exist`);
      return;
    }

    // Check if the destination file exists
    const destFileExists = await fs
      .access(resolvedDestFilePath)
      .then(() => true)
      .catch(() => false);

    if (destFileExists) {
      logger.error(`Destination file ${resolvedDestFilePath} already exists`);
      return;
    }

    // Copy the file
    await fs.copyFile(resolvedSrcFilePath, resolvedDestFilePath);

    logger.log(`Copied file ${resolvedSrcFilePath} to ${resolvedDestFilePath}`);
  } catch (error: any) {
    logger.error('Error copying file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function createFileWithContent(filePath: string, fileContent: string): Promise<void> {
  try {
    // Check if the file already exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      // Create the file with the provided content
      await fs.writeFile(filePath, fileContent, 'utf-8');
      logger.log(`File Created file: ${filePath}`);
    } else {
      logger.warn(`File already exists: ${filePath}`);
    }
  } catch (error: any) {
    logger.error(`Error creating file: ${filePath}`, error);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function readContentFromFile(filePath: string): Promise<string> {
  try {
    // Check if the file exists
    await fs.promises.access(filePath);

    // Read the file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    return content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Error reading file content:', error.message);
      throw error;
    } else {
      // Handle other types of errors, if needed
      logger.error('Unknown error occurred:', error);
      throw error;
    }
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  const resolvedFilePath: string = path.resolve(filePath);

  try {
    // Check if the file exists
    const fileExists = await fs
      .access(resolvedFilePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      logger.error(`File ${resolvedFilePath} does not exist`);
      return;
    }

    // Delete the file
    await fs.unlink(resolvedFilePath);

    logger.log(`File ${resolvedFilePath} deleted successfully`);
  } catch (error: any) {
    logger.error('Error deleting file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function addFileExtension(filePath: string, fileExtension: string): Promise<string> {
  const resolvedFilePath: string = path.resolve(filePath);

  try {
    // Check if the file exists
    const fileExists = await fs
      .access(resolvedFilePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      logger.error(`File ${resolvedFilePath} does not exist`);
      return '';
    }

    // Add the file extension
    const newFilePath: string = `${resolvedFilePath}.${fileExtension}`;
    await fs.rename(resolvedFilePath, newFilePath);

    logger.log(`File extension added to ${resolvedFilePath}`);
    return newFilePath;
  } catch (error: any) {
    logger.error('Error adding file extension:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function removeFileExtension(
  filePath: string,
  fileExtension: string,
): Promise<string> {
  const resolvedFilePath: string = path.resolve(filePath);

  try {
    // Check if the file exists
    const fileExists = await fs
      .access(resolvedFilePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      logger.error(`File ${resolvedFilePath} does not exist`);
      return '';
    }

    // Remove the file extension
    const newFilePath: string = resolvedFilePath.replace(`.${fileExtension}`, '');
    await fs.rename(resolvedFilePath, newFilePath);

    logger.log(`File extension removed from ${resolvedFilePath}`);
    return newFilePath;
  } catch (error: any) {
    logger.error('Error removing file extension:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}
