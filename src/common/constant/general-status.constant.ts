// Path: src/common/constant/general-status.constant.ts
// DESC: general status types
'use strict';

enum GENERAL_STATUS_TYPES {
  GENERAL_STATUS_TYPES_UNSPECIFIED = 0,
  GENERAL_STATUS_TYPES_INACTIVE = 1,
  GENERAL_STATUS_TYPES_ACTIVE = 2,
  GENERAL_STATUS_TYPES_PLANNED = 3,
  GENERAL_STATUS_TYPES_TODO = 4,
  GENERAL_STATUS_TYPES_IN_PROGRESS = 5,
  GENERAL_STATUS_TYPES_DONE = 6,
  GENERAL_STATUS_TYPES_COMPLETED = 7,
  GENERAL_STATUS_TYPES_CANCELLED = 8,
  UNRECOGNIZED = -1,
}

// type GENERAL_STATUS_TYPE = keyof typeof GENERAL_STATUS_TYPES;
type GENERAL_STATUS_TYPE = (typeof GENERAL_STATUS_TYPES)[keyof typeof GENERAL_STATUS_TYPES];

// Create an object with enum keys as keys and enum values as values
const GENERAL_STATUS_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(GENERAL_STATUS_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const GENERAL_STATUS_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(GENERAL_STATUS_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const GENERAL_STATUS_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(GENERAL_STATUS_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const GENERAL_STATUS_TYPE_ARRAY: GENERAL_STATUS_TYPES[] = Object.values(
  GENERAL_STATUS_TYPES,
).filter((value) => typeof value === 'number') as GENERAL_STATUS_TYPES[];

const GENERAL_STATUS_TYPE_KEYS: (keyof typeof GENERAL_STATUS_TYPES)[] = Object.keys(
  GENERAL_STATUS_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof GENERAL_STATUS_TYPES)[];

const DEFAULT_GENERAL_STATUS_TYPE: GENERAL_STATUS_TYPES =
  GENERAL_STATUS_TYPES.GENERAL_STATUS_TYPES_UNSPECIFIED;

function isValidGeneralStatus(generalStatus: string): boolean {
  return GENERAL_STATUS_TYPE_ARRAY.includes(generalStatus as unknown as GENERAL_STATUS_TYPES);
}

function isValidGeneralStatuses(generalStatuses: string[]): boolean {
  return generalStatuses.every((generalStatus) => isValidGeneralStatus(generalStatus));
}

function convertStringToGeneralStatus(input: string): GENERAL_STATUS_TYPES {
  const status: keyof typeof GENERAL_STATUS_TYPES =
    input.trim() as keyof typeof GENERAL_STATUS_TYPES;
  if (!GENERAL_STATUS_TYPE_KEYS.includes(status)) {
    throw new Error('Invalid GENERAL status: ' + input);
  }
  return GENERAL_STATUS_TYPES[status];
}

function convertStringToGeneralStatuses(input: string): GENERAL_STATUS_TYPES[] {
  const statusNames: string[] = input.split(',').map((status) => status.trim());
  const statuses: GENERAL_STATUS_TYPES[] = statusNames.map((statusName: string) => {
    if (!GENERAL_STATUS_TYPE_KEYS.includes(statusName as keyof typeof GENERAL_STATUS_TYPES)) {
      throw new Error('Invalid general status: ' + statusName);
    }
    return GENERAL_STATUS_TYPES[statusName as keyof typeof GENERAL_STATUS_TYPES];
  });
  return statuses;
}

export {
  GENERAL_STATUS_TYPES,
  GENERAL_STATUS_TYPE,
  GENERAL_STATUS_TYPES_ENUM_KEY_TO_VALUE,
  GENERAL_STATUS_TYPES_ENUM_VALUE_TO_KEY,
  GENERAL_STATUS_TYPES_ENUM_KEY_TO_KEY,
  GENERAL_STATUS_TYPE_ARRAY,
  GENERAL_STATUS_TYPE_KEYS,
  DEFAULT_GENERAL_STATUS_TYPE,
  isValidGeneralStatus,
  isValidGeneralStatuses,
  convertStringToGeneralStatus,
  convertStringToGeneralStatuses,
};

// ----------------------------------------------------------------------------

// export type GENERAL_STATUS_TYPE =
//   | 'GENERAL_STATUS_TYPES_UNSPECIFIED'
//   | 'GENERAL_STATUS_TYPES_INACTIVE'
//   | 'GENERAL_STATUS_TYPES_ACTIVE'
//   | 'GENERAL_STATUS_TYPES_PLANNED'
//   | 'GENERAL_STATUS_TYPES_TODO'
//   | 'GENERAL_STATUS_TYPES_IN_PROGRESS'
//   | 'GENERAL_STATUS_TYPES_DONE'
//   | 'GENERAL_STATUS_TYPES_COMPLETED'
//   | 'GENERAL_STATUS_TYPES_CANCELLED'
//   | 'UNRECOGNIZED';
// export const GENERAL_STATUS_TYPE_KEYS: GENERAL_STATUS_TYPE[] = [
//   'GENERAL_STATUS_TYPES_UNSPECIFIED',
//   'GENERAL_STATUS_TYPES_INACTIVE',
//   'GENERAL_STATUS_TYPES_ACTIVE',
//   'GENERAL_STATUS_TYPES_PLANNED',
//   'GENERAL_STATUS_TYPES_TODO',
//   'GENERAL_STATUS_TYPES_IN_PROGRESS',
//   'GENERAL_STATUS_TYPES_DONE',
//   'GENERAL_STATUS_TYPES_COMPLETED',
//   'GENERAL_STATUS_TYPES_CANCELLED',
//   'UNRECOGNIZED',
// ];
// export const DEFAULT_GENERAL_STATUS = 'GENERAL_STATUS_TYPES_UNSPECIFIED';
// export enum GENERAL_STATUS_ENUM_KEY_TO_KEY {
//   GENERAL_STATUS_TYPES_UNSPECIFIED = 'GENERAL_STATUS_TYPES_UNSPECIFIED',
//   GENERAL_STATUS_TYPES_INACTIVE = 'GENERAL_STATUS_TYPES_INACTIVE',
//   GENERAL_STATUS_TYPES_ACTIVE = 'GENERAL_STATUS_TYPES_ACTIVE',
//   GENERAL_STATUS_TYPES_PLANNED = 'GENERAL_STATUS_TYPES_PLANNED',
//   GENERAL_STATUS_TYPES_TODO = 'GENERAL_STATUS_TYPES_TODO',
//   GENERAL_STATUS_TYPES_IN_PROGRESS = 'GENERAL_STATUS_TYPES_IN_PROGRESS',
//   GENERAL_STATUS_TYPES_DONE = 'GENERAL_STATUS_TYPES_DONE',
//   GENERAL_STATUS_TYPES_COMPLETED = 'GENERAL_STATUS_TYPES_COMPLETED',
//   GENERAL_STATUS_TYPES_CANCELLED = 'GENERAL_STATUS_TYPES_CANCELLED',
//   UNRECOGNIZED = 'UNRECOGNIZED',
// }
// export const GENERAL_STATUS_ENUM_KEY_TO_VALUE = {
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_UNSPECIFIED]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_UNSPECIFIED,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_INACTIVE]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_INACTIVE,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_ACTIVE]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_ACTIVE,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_PLANNED]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_PLANNED,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_TODO]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_TODO,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_IN_PROGRESS]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_IN_PROGRESS,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_DONE]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_DONE,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_COMPLETED]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_COMPLETED,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_CANCELLED]:
//     GENERAL_STATUS_ENUM_KEY_TO_KEY.GENERAL_STATUS_TYPES_CANCELLED,
//   [GENERAL_STATUS_ENUM_KEY_TO_KEY.UNRECOGNIZED]: GENERAL_STATUS_ENUM_KEY_TO_KEY.UNRECOGNIZED,
// };
// export function convertStringToGeneralStatus(input: string): GENERAL_STATUS_TYPE {
//   if (!GENERAL_STATUS_TYPE_KEYS.includes(input.trim().toUpperCase() as GENERAL_STATUS_TYPE)) {
//     throw new Error('Invalid general status: ' + input);
//   }
//   return input.trim().toUpperCase() as GENERAL_STATUS_TYPE;
// }

// export function convertStringToGeneralStatuses(input: string): GENERAL_STATUS_TYPE[] {
//   const statusNames: string[] = input.split(',').map((status) => status.trim().toUpperCase());
//   const statuses: GENERAL_STATUS_TYPE[] = statusNames.filter((statusName) =>
//     GENERAL_STATUS_TYPE_KEYS.includes(statusName as GENERAL_STATUS_TYPE),
//   ) as GENERAL_STATUS_TYPE[]; // Type assertion here
//   return statuses;
// }
