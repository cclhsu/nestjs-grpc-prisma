import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { createDirectory } from '../directory/directory.utils';

const logger: Logger = new Logger('JsonUtils');

export async function readArrayFromJSON<T>(filePath: string): Promise<T[]> {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData) as T[];
  } catch (error: any) {
    logger.error('Error reading JSON file:', error.message);
    return [];
  }
}

export async function writeArrayToJSON<T>(filePath: string, data: T[]): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
  } catch (error: any) {
    logger.error('Error writing JSON file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function readSingleFromJSON<T>(filePath: string): Promise<T> {
  try {
    const jsonData = await fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData) as T;
  } catch (error: any) {
    logger.error('Error reading JSON file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeSingleToJSON<T>(filePath: string, data: T): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    logger.log('JSON file written successfully.');
  } catch (error: any) {
    logger.error('Error writing JSON file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
