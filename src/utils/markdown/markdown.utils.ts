// import { Logger } from '@nestjs/common';
import fs from 'fs';
import * as path from 'path';
import { createDirectory } from '../directory/directory.utils';

// const logger: Logger = new Logger('MarkdownUtils');

export async function readArrayFromMarkdown<T>(filePath: string): Promise<T[]> {
  try {
    const markdownData = await fs.promises.readFile(filePath, 'utf8');
    return parseMarkdownArray<T>(markdownData);
  } catch (error: any) {
    console.error('Error reading Markdown file:', error.message);
    return [];
  }
}

export async function writeArrayToMarkdown<T>(filePath: string, data: T[]): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const markdownData = serializeMarkdownArray<T>(data);
    await fs.promises.writeFile(filePath, markdownData, 'utf8');
    console.log('Markdown file written successfully.');
  } catch (error: any) {
    console.error('Error writing Markdown file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function readSingleFromMarkdown<T>(filePath: string): Promise<T> {
  try {
    const markdownData = await fs.promises.readFile(filePath, 'utf8');
    return parseMarkdownObject<T>(markdownData);
  } catch (error: any) {
    console.error('Error reading Markdown file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeSingleToMarkdown<T>(filePath: string, data: T): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const markdownData = serializeMarkdownObject<T>(data);
    await fs.promises.writeFile(filePath, markdownData, 'utf8');
    console.log('Markdown file written successfully.');
  } catch (error: any) {
    console.error('Error writing Markdown file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

// Helper function to parse Markdown array data
function parseMarkdownArray<T>(_markdownData: string): T[] {
  // Your implementation to parse the Markdown data into an array of objects goes here
  // For example, you can use regular expressions or a Markdown parser library to parse the data.
  // Return the parsed array of objects.
  throw new Error('Not implemented.');
}

// Helper function to serialize an array of objects to Markdown data
function serializeMarkdownArray<T>(_data: T[]): string {
  // Your implementation to serialize the array of objects to Markdown data goes here
  // For example, you can convert each object to a Markdown table row or list item.
  // Return the serialized Markdown data as a string.
  throw new Error('Not implemented.');
}

// Helper function to parse Markdown object data
function parseMarkdownObject<T>(_markdownData: string): T {
  // Your implementation to parse the Markdown data into an object goes here
  // For example, you can use regular expressions or a Markdown parser library to parse the data.
  // Return the parsed object.
  throw new Error('Not implemented.');
}

// Helper function to serialize an object to Markdown data
function serializeMarkdownObject<T>(_data: T): string {
  // Your implementation to serialize the object to Markdown data goes here
  // For example, you can convert the object properties to Markdown headers and content.
  // Return the serialized Markdown data as a string.
  throw new Error('Not implemented.');
}
