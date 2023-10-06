import { Logger } from '@nestjs/common';
import { IdUuidStatusDTO } from '../../common/dto';
import { GENERAL_STATUS_TYPE, VALID_UUID_REGEXP } from '../../common/constant';
import {
  FieldValidator,
  defaultIdValidator,
  defaultUuidValidator,
  defaultStatusValidator,
} from './array.utils';

const logger: Logger = new Logger('ArrayUtils');

export function convertStringToIdUuidStatusArray(val: string): IdUuidStatusDTO[] {
  if (val.trim() === '' || val.trim().toLowerCase() === 'n/a') {
    return [];
  }

  let idUuidStatusArray: IdUuidStatusDTO[];

  try {
    if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
      idUuidStatusArray = JSON.parse(val);
      if (!Array.isArray(idUuidStatusArray)) {
        throw new Error('Input is not a valid JSON array');
      }
    } else {
      const idUuidStatusStrings = val.split(',');
      idUuidStatusArray = idUuidStatusStrings.map((idUuidStatusString) => {
        const [ID, UUID, status] = idUuidStatusString.trim().split('/');
        return { ID, UUID, status: status as unknown as GENERAL_STATUS_TYPE } as IdUuidStatusDTO;
      });
    }
  } catch (error: any) {
    throw new Error('Error parsing idUuidStatus array: ' + error.message);
  }

  return idUuidStatusArray;
}

export function validateIdUuidStatusArray(
  idUuidStatusArray: IdUuidStatusDTO[],
  idValidator: FieldValidator = defaultIdValidator,
  uuidValidator: FieldValidator = defaultUuidValidator,
  statusValidator: FieldValidator = defaultStatusValidator,
): void {
  if (!Array.isArray(idUuidStatusArray)) {
    throw new Error('Input is not an array');
  }

  const idSet = new Set<string>();
  const uuidSet = new Set<string>();
  // const statusSet = new Set<string>();

  idUuidStatusArray.forEach((idUuidStatus) => {
    if (
      typeof idUuidStatus !== 'object' ||
      !idUuidStatus.hasOwnProperty('ID') ||
      !idUuidStatus.hasOwnProperty('UUID') ||
      !idUuidStatus.hasOwnProperty('status')
    ) {
      throw new Error('Input is not an array of idUuidStatus');
    }

    if (idSet.has(idUuidStatus.ID)) {
      throw new Error('Input array has duplicate IDs');
    }
    idSet.add(idUuidStatus.ID);

    if (uuidSet.has(idUuidStatus.UUID)) {
      throw new Error('Input array has duplicate UUIDs');
    }
    uuidSet.add(idUuidStatus.UUID);

    // if (statusSet.has(idUuidStatus.status)) {
    //   throw new Error('Input array has duplicate STATUSs');
    // }
    // statusSet.add(idUuidStatus.status);

    if (!VALID_UUID_REGEXP.test(idUuidStatus.UUID)) {
      throw new Error('Input array has invalid UUIDs');
    }

    // Custom field validation checks
    if (!idValidator.validate(idUuidStatus.ID)) {
      throw new Error(idValidator.errorMessage);
    }

    if (!uuidValidator.validate(idUuidStatus.UUID)) {
      throw new Error(uuidValidator.errorMessage);
    }

    if (!statusValidator.validate(idUuidStatus.status.toString())) {
      throw new Error(statusValidator.errorMessage);
    }

    // Add more field validation checks as needed
  });

  // if (idUuidStatusArray.length === 0) {
  //   throw new Error('Input array is empty');
  // }

  // logger.log('validateIdUuidStatusArray: ' + JSON.stringify(idUuidArray, null, 2));
}

export function isValidIdUuidStatusArray(idUuidStatusArray: IdUuidStatusDTO[]): boolean {
  try {
    validateIdUuidStatusArray(idUuidStatusArray);
    return true;
  } catch (error: any) {
    logger.debug(error);
    return false;
  }
}
