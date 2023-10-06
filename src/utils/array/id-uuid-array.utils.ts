import { Logger } from '@nestjs/common';
import { IdUuidDTO } from '../../common/dto';
import { VALID_UUID_REGEXP } from '../../common/constant';
import { FieldValidator, defaultIdValidator, defaultUuidValidator } from './array.utils';

const logger: Logger = new Logger('ArrayUtils');

export function convertStringToIdUuidArray(val: string): IdUuidDTO[] {
  if (val.trim() === '' || val.trim().toLowerCase() === 'n/a') {
    return [];
  }

  let idUuidArray: IdUuidDTO[];

  try {
    if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
      idUuidArray = JSON.parse(val);
      if (!Array.isArray(idUuidArray)) {
        throw new Error('Input is not a valid JSON array');
      }
    } else {
      const idUuidStrings = val.split(',');
      idUuidArray = idUuidStrings.map((idUuidString) => {
        const [ID, UUID] = idUuidString.trim().split('/');
        return { ID, UUID };
      });
    }
  } catch (error: any) {
    throw new Error('Error parsing idUuid array: ' + error.message);
  }

  return idUuidArray;
}

export function validateIdUuidArray(
  idUuidArray: IdUuidDTO[],
  idValidator: FieldValidator = defaultIdValidator,
  uuidValidator: FieldValidator = defaultUuidValidator,
): void {
  if (!Array.isArray(idUuidArray)) {
    throw new Error('Input is not an array');
  }

  const idSet = new Set<string>();
  const uuidSet = new Set<string>();

  idUuidArray.forEach((idUuid) => {
    if (
      typeof idUuid !== 'object' ||
      !idUuid.hasOwnProperty('ID') ||
      !idUuid.hasOwnProperty('UUID')
    ) {
      throw new Error('Input is not an array of idUuid');
    }

    if (idSet.has(idUuid.ID)) {
      throw new Error('Input array has duplicate IDs');
    }
    idSet.add(idUuid.ID);

    if (uuidSet.has(idUuid.UUID)) {
      throw new Error('Input array has duplicate UUIDs');
    }
    uuidSet.add(idUuid.UUID);

    if (!idUuid.UUID.match(VALID_UUID_REGEXP)) {
      throw new Error('Input array has invalid UUIDs');
    }

    // Custom field validation checks
    if (!idValidator.validate(idUuid.ID)) {
      throw new Error(idValidator.errorMessage);
    }

    if (!uuidValidator.validate(idUuid.UUID)) {
      throw new Error(uuidValidator.errorMessage);
    }

    // Add more field validation checks as needed
  });

  // if (idUuidArray.length === 0) {
  //   throw new Error('Input array is empty');
  // }

  // logger.log('validateIdUuidArray: ' + JSON.stringify(idUuidArray, null, 2));
}

export function isValidIdUuidArray(idUuidArray: IdUuidDTO[]): boolean {
  try {
    validateIdUuidArray(idUuidArray);
    return true;
  } catch (error: any) {
    logger.debug(error);
    return false;
  }
}
