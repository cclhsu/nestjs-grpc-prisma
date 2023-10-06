// Path: src/common/constant/project-status.constant.ts
// DESC: general project status types
'use strict';

// enum PROJECT_STATUS_TYPES {
//   PROJECT_STATUS_TYPES_UNSPECIFIED = 0,
//   PROJECT_STATUS_TYPES_PLANNED = 1,
//   PROJECT_STATUS_TYPES_IN_PROGRESS = 2,
//   PROJECT_STATUS_TYPES_COMPLETED = 3,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_STATUS_TYPES {
  PROJECT_STATUS_TYPES_UNSPECIFIED = 0,
  PROJECT_STATUS_TYPES_PLANNED = 'PROJECT_STATUS_TYPES_PLANNED',
  PROJECT_STATUS_TYPES_IN_PROGRESS = 'PROJECT_STATUS_TYPES_IN_PROGRESS',
  PROJECT_STATUS_TYPES_COMPLETED = 'PROJECT_STATUS_TYPES_COMPLETED',
  UNRECOGNIZED = -1,
}

// type PROJECT_STATUS_TYPE = keyof typeof PROJECT_STATUS_TYPES;
type PROJECT_STATUS_TYPE = (typeof PROJECT_STATUS_TYPES)[keyof typeof PROJECT_STATUS_TYPES];

// Create an object with enum keys as keys and enum values as values
const PROJECT_STATUS_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(PROJECT_STATUS_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const PROJECT_STATUS_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(PROJECT_STATUS_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const PROJECT_STATUS_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(PROJECT_STATUS_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const PROJECT_STATUS_TYPE_ARRAY: PROJECT_STATUS_TYPES[] = Object.values(
  PROJECT_STATUS_TYPES,
).filter((value) => typeof value === 'number') as PROJECT_STATUS_TYPES[];

const PROJECT_STATUS_TYPE_KEYS: (keyof typeof PROJECT_STATUS_TYPES)[] = Object.keys(
  PROJECT_STATUS_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_STATUS_TYPES)[];

const DEFAULT_PROJECT_STATUS_TYPE: PROJECT_STATUS_TYPES =
  PROJECT_STATUS_TYPES.PROJECT_STATUS_TYPES_UNSPECIFIED;

function isValidProjectStatus(projectStatus: string): boolean {
  return PROJECT_STATUS_TYPE_ARRAY.includes(projectStatus as unknown as PROJECT_STATUS_TYPES);
}

function isValidProjectStatuses(projectStatuses: string[]): boolean {
  return projectStatuses.every((projectStatus) => isValidProjectStatus(projectStatus));
}

function convertStringToProjectStatus(input: string): PROJECT_STATUS_TYPES {
  const status: keyof typeof PROJECT_STATUS_TYPES =
    input.trim() as keyof typeof PROJECT_STATUS_TYPES;
  if (!PROJECT_STATUS_TYPE_KEYS.includes(status)) {
    throw new Error('Invalid project status: ' + input);
  }
  return PROJECT_STATUS_TYPES[status];
}

function convertStringToProjectStatuses(input: string): PROJECT_STATUS_TYPES[] {
  const statusNames: string[] = input.split(',').map((status) => status.trim());
  const statuses: PROJECT_STATUS_TYPES[] = statusNames.map((statusName: string) => {
    if (!PROJECT_STATUS_TYPE_KEYS.includes(statusName as keyof typeof PROJECT_STATUS_TYPES)) {
      throw new Error('Invalid project status: ' + statusName);
    }
    return PROJECT_STATUS_TYPES[statusName as keyof typeof PROJECT_STATUS_TYPES];
  });
  return statuses;
}

export {
  PROJECT_STATUS_TYPES,
  PROJECT_STATUS_TYPE,
  PROJECT_STATUS_TYPES_ENUM_KEY_TO_VALUE,
  PROJECT_STATUS_TYPES_ENUM_VALUE_TO_KEY,
  PROJECT_STATUS_TYPES_ENUM_KEY_TO_KEY,
  PROJECT_STATUS_TYPE_ARRAY,
  PROJECT_STATUS_TYPE_KEYS,
  DEFAULT_PROJECT_STATUS_TYPE,
  isValidProjectStatus,
  isValidProjectStatuses,
  convertStringToProjectStatus,
  convertStringToProjectStatuses,
};

// ----------------------------------------------------------------------------

// export type PROJECT_STATUS_TYPE =
//   | 'PROJECT_STATUS_TYPES_UNSPECIFIED'
//   | 'PROJECT_STATUS_TYPES_PLANNED'
//   | 'PROJECT_STATUS_TYPES_IN_PROGRESS'
//   | 'PROJECT_STATUS_TYPES_COMPLETED'
//   | 'UNRECOGNIZED';
// export const PROJECT_STATUS_TYPE_KEYS = [
//   'PROJECT_STATUS_TYPES_UNSPECIFIED',
//   'PROJECT_STATUS_TYPES_PLANNED',
//   'PROJECT_STATUS_TYPES_IN_PROGRESS',
//   'PROJECT_STATUS_TYPES_COMPLETED',
//   'UNRECOGNIZED',
// ];
// export const DEFAULT_PROJECT_STATUS = 'PROJECT_STATUS_TYPES_UNSPECIFIED';
// export enum PROJECT_STATUS_ENUM_KEY_TO_KEY {
//   PROJECT_STATUS_TYPES_UNSPECIFIED = 'PROJECT_STATUS_TYPES_UNSPECIFIED',
//   PROJECT_STATUS_TYPES_PLANNED = 'PROJECT_STATUS_TYPES_PLANNED',
//   PROJECT_STATUS_TYPES_IN_PROGRESS = 'PROJECT_STATUS_TYPES_IN_PROGRESS',
//   PROJECT_STATUS_TYPES_COMPLETED = 'PROJECT_STATUS_TYPES_COMPLETED',
//   UNRECOGNIZED = 'UNRECOGNIZED',
// }
// export const ProjectSTATUS_ENUM_KEY_TO_VALUE = {
//   [PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_UNSPECIFIED]:
//     PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_UNSPECIFIED,
//   [PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_PLANNED]:
//     PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_PLANNED,
//   [PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_IN_PROGRESS]:
//     PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_IN_PROGRESS,
//   [PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_COMPLETED]:
//     PROJECT_STATUS_ENUM_KEY_TO_KEY.PROJECT_STATUS_TYPES_COMPLETED,
//   [PROJECT_STATUS_ENUM_KEY_TO_KEY.UNRECOGNIZED]: PROJECT_STATUS_ENUM_KEY_TO_KEY.UNRECOGNIZED,
// };

// export function convertStringToProjectStatus(input: string): PROJECT_STATUS_TYPE {
//   if (!PROJECT_STATUS_TYPE_KEYS.includes(input.trim().toUpperCase() as PROJECT_STATUS_TYPE)) {
//     throw new Error('Invalid project status: ' + input);
//   }
//   return input.trim().toUpperCase() as PROJECT_STATUS_TYPE;
// }

// export function convertStringToProjectStatuses(input: string): PROJECT_STATUS_TYPE[] {
//   const statusNames: string[] = input.split(',').map((status) => status.trim().toUpperCase());
//   const statuses: PROJECT_STATUS_TYPE[] = statusNames.filter((statusName) =>
//     PROJECT_STATUS_TYPE_KEYS.includes(statusName as PROJECT_STATUS_TYPE),
//   ) as PROJECT_STATUS_TYPE[]; // Type assertion here
//   return statuses;
// }
