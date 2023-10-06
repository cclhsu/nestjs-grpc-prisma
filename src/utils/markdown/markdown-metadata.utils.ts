import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { createDirectory } from '../directory/directory.utils';

const logger: Logger = new Logger('MarkdownMetadataUtils');

export async function readMarkdownMetadata<T>(filePath: string): Promise<T> {
  try {
    const markdownData = fs.readFileSync(filePath, 'utf8');
    const metadata = extractMetadataFromMarkdown<T>(markdownData);
    return metadata;
  } catch (error: any) {
    logger.error('Error reading Markdown file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

export async function writeMarkdownMetadata<T>(
  filePath: string,
  metadata: T,
  content: string,
): Promise<void> {
  const fileDirectory = path.dirname(filePath);
  try {
    createDirectory(fileDirectory);
    const metadataString = toYAML(metadata);
    const markdownData = addMetadataToMarkdown(metadataString, content);
    fs.writeFileSync(filePath, markdownData, 'utf8');
    logger.log('Markdown file with metadata written successfully.');
  } catch (error: any) {
    logger.error('Error writing Markdown file:', error.message);
    throw error; // Optionally, you can rethrow the error to handle it elsewhere.
  }
}

function extractMetadataFromMarkdown<T>(markdownData: string): T {
  const metadataStart = markdownData.indexOf('---');
  const metadataEnd = markdownData.indexOf('---', metadataStart + 3);
  if (metadataStart !== -1 && metadataEnd !== -1) {
    const metadataString = markdownData.slice(metadataStart + 3, metadataEnd).trim();
    return fromYAML<T>(metadataString);
  } else {
    return {} as T;
  }
}

function addMetadataToMarkdown(metadata: string, content: string): string {
  return `---\n${metadata}\n---\n\n${content}`;
}

function toYAML<T>(data: T): string {
  return yaml.dump(data);
}

function fromYAML<T>(yamlString: string): T {
  return yaml.load(yamlString) as T;
}
