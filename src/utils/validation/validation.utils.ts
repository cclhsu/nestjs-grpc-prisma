import { Logger } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

const logger = new Logger('ValidationService');

export async function validateDto<T extends object>(dto: T): Promise<string | null> {
  // logger.verbose(`Validating DTO: ${JSON.stringify(dto)}`);
  const errors: ValidationError[] = await validate(dto);

  if (errors.length > 0) {
    // If there are validation errors, concatenate the error messages into a single string.
    const errorMessage: string = errors
      .map((error) => Object.values(error.constraints ?? {}))
      .flat()
      .join(', ');

    // logger.verbose(`Validation error: ${errorMessage}`);
    return errorMessage;
  }
  // logger.verbose('No validation errors');
  return null; // No validation errors
}

export async function isDtoValid<T extends object>(dto: T): Promise<boolean> {
  const errors = await validate(dto);
  return errors.length === 0;
}

export async function validateDtoMetadataContent<T extends { metadata: any; content: any }>(
  dto: T,
): Promise<boolean> {
  logger.verbose(`Validating DTO: ${JSON.stringify(dto, null, 2)}`);
  try {
    const errors = await validate(dto);
    if (errors.length > 0) {
      logger.error(`Validation failed! ${errors.toString()}`);
      return false;
    }

    if (dto.metadata) {
      const metadataErrors = await validate(dto.metadata);
      if (metadataErrors.length > 0) {
        logger.error(`Validation metadata failed! ${metadataErrors.toString()}`);
        return false;
      }
    } else {
      logger.error('Metadata is missing');
      return false;
    }

    if (dto.content) {
      const contentErrors = await validate(dto.content);
      if (contentErrors.length > 0) {
        logger.error(`Validation content failed! ${contentErrors.toString()}`);
        return false;
      }
    } else {
      logger.error('Content is missing');
      return false;
    }

    logger.debug('Validation succeeded');
    return true;
  } catch (error: any) {
    logger.error(`Validation failed: ${error.toString()}`);
    return false;
  }
}

export async function validateDtoMetadata<T extends { metadata: any }>(dto: T): Promise<boolean> {
  logger.verbose(`Validating DTO: ${JSON.stringify(dto, null, 2)}`);
  try {
    const errors = await validate(dto);
    if (errors.length > 0) {
      logger.error(`Validation failed! ${errors.toString()}`);
      return false;
    }

    if (dto.metadata) {
      const metadataErrors = await validate(dto.metadata);
      if (metadataErrors.length > 0) {
        logger.error(`Validation metadata failed! ${metadataErrors.toString()}`);
        return false;
      }
    } else {
      logger.error('Metadata is missing');
      return false;
    }

    logger.debug('Validation succeeded');
    return true;
  } catch (error: any) {
    logger.error(`Validation failed: ${error.toString()}`);
    return false;
  }
}

export async function validateDtoContent<T extends { content: any }>(dto: T): Promise<boolean> {
  logger.verbose(`Validating DTO: ${JSON.stringify(dto, null, 2)}`);
  try {
    const errors = await validate(dto);
    if (errors.length > 0) {
      logger.error(`Validation failed! ${errors.toString()}`);
      return false;
    }

    if (dto.content) {
      const contentErrors = await validate(dto.content);
      if (contentErrors.length > 0) {
        logger.error(`Validation content failed! ${contentErrors.toString()}`);
        return false;
      }
    } else {
      logger.error('Content is missing');
      return false;
    }

    logger.debug('Validation succeeded');
    return true;
  } catch (error: any) {
    logger.error(`Validation failed: ${error.toString()}`);
    return false;
  }
}

// async function validateDTO<T>(
//   val: string,
//   dtoConstructor: new (value: string) => T,
//   validationMessage: ValidationMessage,
// ): Promise<boolean | string> {
//   const dto = new dtoConstructor(val);
//   const errorMessage = await validateDto(dto);
//   return errorMessage ?? true;
// }

// function isValid<T>(
//   value: string,
//   validationFunction: (val: string) => boolean,
// ): boolean {
//   return validationFunction(value);
// }

// function validate<T>(
//   val: string,
//   validationFunction: (val: string) => boolean,
//   validationMessage: ValidationMessage,
// ): boolean | string {
//   if (val.trim() !== '' && val.trim() !== 'n/a') {
//     if (isValid(val, validationFunction)) {
//       return true;
//     } else {
//       return validationMessage.errorMessage;
//     }
//   } else {
//     return validationMessage.requiredMessage;
//   }
// }
