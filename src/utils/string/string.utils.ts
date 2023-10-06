// import { Logger } from '@nestjs/common';

// const logger: Logger = new Logger('StringUtils');

export function addLeadingZeros(digits: number, value: number): string {
  return value.toString().padStart(digits, '0');
}

export function toCamelCase(value: string): string {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]+(\w)/g, (_, chr) => chr.toUpperCase());
}

export function toPascalCase(value: string): string {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]+(\w)/g, (_, chr) => chr.toUpperCase());
}

export function toKebabCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toSnakeCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function formatProjectName(value: string): string {
  return value
    .toLowerCase()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-');
}
