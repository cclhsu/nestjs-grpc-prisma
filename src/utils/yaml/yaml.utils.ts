import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { createDirectory } from '../directory/directory.utils';

const logger: Logger = new Logger('YamlUtils');

export async function readArrayFromYAML<T>(filePath: string): Promise<T[]> {
  try {
    const yamlData = fs.readFileSync(filePath, 'utf8');
    const parsedData = yaml.load(yamlData);
    if (Array.isArray(parsedData)) {
      return parsedData as T[];
    } else {
      logger.error('Parsed YAML data is not an array:', parsedData);
      return [];
    }
  } catch (error: any) {
    logger.error('Error reading YAML file:', error.message);
    return [];
  }
}

export async function writeArrayToYAML<T>(filePath: string, data: T[]): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const yamlData = yaml.dump(data);
    fs.writeFileSync(filePath, yamlData, 'utf8');
  } catch (error: any) {
    logger.error('Error writing YAML file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function readSingleFromYAML<T>(filePath: string): Promise<T> {
  try {
    const yamlData = fs.readFileSync(filePath, 'utf8');
    return yaml.load(yamlData) as T;
  } catch (error: any) {
    logger.error('Error reading YAML file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeSingleToYAML<T>(filePath: string, data: T): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const yamlData = yaml.dump(data);
    fs.writeFileSync(filePath, yamlData, 'utf8');
    logger.log('YAML file written successfully.');
  } catch (error: any) {
    logger.error('Error writing YAML file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
