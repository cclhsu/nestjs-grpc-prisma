import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { createDirectory } from '../directory/directory.utils';

const logger: Logger = new Logger('CsvUtils');

// Define a constraint for the generic type T to ensure it's an object
type ObjectMap<T> = { [key: string]: T };

export async function readArrayFromCSV<T>(filePath: string): Promise<T[]> {
  try {
    const entities: T[] = [];
    const csvData = fs.readFileSync(filePath, 'utf8');

    return new Promise((resolve, reject) => {
      const parser = csvParser();

      parser
        .on('data', (row: ObjectMap<any>) => {
          entities.push(row as T);
        })
        .on('end', () => {
          resolve(entities);
        })
        .on('error', (error: any) => {
          reject(error);
        });

      parser.write(csvData);
      parser.end();
    });
  } catch (error: any) {
    logger.error('Error reading CSV file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeArrayToCSV<T extends object>(
  filePath: string,
  data: T[],
): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((header) => ({
        id: header,
        title: header,
      })),
    });

    await csvWriter.writeRecords(data as ObjectMap<any>[]);
    logger.log('CSV file written successfully.');
  } catch (error: any) {
    logger.error('Error writing to CSV file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function readSingleFromCSV<T>(filePath: string): Promise<T> {
  try {
    const csvData = fs.readFileSync(filePath, 'utf8');
    return new Promise<T>((resolve, reject) => {
      const parser = csvParser();

      parser
        .on('data', (row: ObjectMap<any>) => {
          resolve(row as T);
        })
        .on('error', (error: any) => {
          reject(error);
        });

      parser.write(csvData);
      parser.end();
    });
  } catch (error: any) {
    logger.error('Error reading CSV file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeSingleToCSV<T extends object>(filePath: string, data: T): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data).map((header) => ({
        id: header,
        title: header,
      })),
    });

    await csvWriter.writeRecords([data] as ObjectMap<any>[]);
    logger.log('CSV file written successfully.');
  } catch (error: any) {
    logger.error('Error writing to CSV file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

// npm install fs js-yaml csv-parser csv-writer
// npm install --save-dev @types/fs @types/js-yaml @types/csv-parser @types/csv-writer
