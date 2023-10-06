import { Logger } from '@nestjs/common';
import { FieldValidator, defaultNameValidator, defaultUrlValidator } from './array.utils';
import { NameUrlDTO } from '../../common/dto';

const logger: Logger = new Logger('ArrayUtils');

export function convertStringToNameUrlArray(val: string): NameUrlDTO[] {
  if (val.trim() === '' || val.trim().toLowerCase() === 'n/a') {
    return [];
  }

  let nameUrlArray: NameUrlDTO[];

  try {
    if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
      nameUrlArray = JSON.parse(val);
      if (!Array.isArray(nameUrlArray)) {
        throw new Error('Input is not a valid JSON array');
      }
    } else {
      const nameUrlStrings = val.split(',');
      nameUrlArray = nameUrlStrings.map((nameUrlString) => {
        const [name, url] = nameUrlString.trim().split('/');
        return { name, url };
      });
    }
  } catch (error: any) {
    throw new Error('Error parsing nameUrl array: ' + error.message);
  }

  return nameUrlArray;
}

export function validateNameUrlArray(
  nameUrlArray: NameUrlDTO[],
  nameValidator: FieldValidator = defaultNameValidator,
  urlValidator: FieldValidator = defaultUrlValidator,
): void {
  if (!Array.isArray(nameUrlArray)) {
    throw new Error('Input is not an array');
  }

  const nameSet = new Set<string>();
  const urlSet = new Set<string>();

  nameUrlArray.forEach((nameUrl) => {
    if (
      typeof nameUrl !== 'object' ||
      !nameUrl.hasOwnProperty('name') ||
      !nameUrl.hasOwnProperty('url')
    ) {
      throw new Error('Input is not an array of nameUrl');
    }

    if (nameSet.has(nameUrl.name)) {
      throw new Error('Input array has duplicate NAMEs');
    }
    nameSet.add(nameUrl.name);

    if (urlSet.has(nameUrl.url)) {
      throw new Error('Input array has duplicate URLs');
    }
    urlSet.add(nameUrl.url);

    // Custom field validation checks
    if (!nameValidator.validate(nameUrl.name)) {
      throw new Error(nameValidator.errorMessage + ': ' + nameUrl.name);
    }

    if (!urlValidator.validate(nameUrl.url)) {
      throw new Error(urlValidator.errorMessage) + ': ' + nameUrl.url;
    }

    // Add more field validation checks as needed
  });

  // if (nameUrlArray.length === 0) {
  //   throw new Error('Input array is empty');
  // }

  // logger.log('validateNameUrlArray: ' + JSON.stringify(nameUrlArray, null, 2));
}

export function isValidNameUrlArray(nameUrlArray: NameUrlDTO[]): boolean {
  try {
    validateNameUrlArray(nameUrlArray);
    return true;
  } catch (error: any) {
    logger.debug(error);
    return false;
  }
}
