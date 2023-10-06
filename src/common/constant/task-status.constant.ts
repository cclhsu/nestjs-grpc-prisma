// Path: src/common/constant/task-status.constant.ts
// DESC: general task status types
'use strict';

enum TASK_STATUS_TYPES {
  TASK_STATUS_TYPES_UNSPECIFIED = 0,
  TASK_STATUS_TYPES_TODO = 1,
  TASK_STATUS_TYPES_IN_PROGRESS = 2,
  TASK_STATUS_TYPES_DONE = 3,
  UNRECOGNIZED = -1,
}

// type TASK_STATUS_TYPE = keyof typeof TASK_STATUS_TYPES;
type TASK_STATUS_TYPE = (typeof TASK_STATUS_TYPES)[keyof typeof TASK_STATUS_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_STATUS_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_STATUS_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_STATUS_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_STATUS_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_STATUS_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_STATUS_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_STATUS_TYPE_ARRAY: TASK_STATUS_TYPES[] = Object.values(TASK_STATUS_TYPES).filter(
  (value) => typeof value === 'number',
) as TASK_STATUS_TYPES[];

const TASK_STATUS_TYPE_KEYS: (keyof typeof TASK_STATUS_TYPES)[] = Object.keys(
  TASK_STATUS_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_STATUS_TYPES)[];

const DEFAULT_TASK_STATUS_TYPE: TASK_STATUS_TYPES = TASK_STATUS_TYPES.TASK_STATUS_TYPES_UNSPECIFIED;

function isValidTaskStatus(taskStatus: string): boolean {
  return TASK_STATUS_TYPE_ARRAY.includes(taskStatus as unknown as TASK_STATUS_TYPES);
}

function isValidTaskStatuses(taskStatuses: string[]): boolean {
  return taskStatuses.every((taskStatus) => isValidTaskStatus(taskStatus));
}

function convertStringToTaskStatus(input: string): TASK_STATUS_TYPES {
  const status: keyof typeof TASK_STATUS_TYPES = input.trim() as keyof typeof TASK_STATUS_TYPES;
  if (!TASK_STATUS_TYPE_KEYS.includes(status)) {
    throw new Error('Invalid task status: ' + input);
  }
  return TASK_STATUS_TYPES[status];
}

function convertStringToTaskStatuses(input: string): TASK_STATUS_TYPES[] {
  const statusNames: string[] = input.split(',').map((status) => status.trim());
  const statuses: TASK_STATUS_TYPES[] = statusNames.map((statusName: string) => {
    if (!TASK_STATUS_TYPE_KEYS.includes(statusName as keyof typeof TASK_STATUS_TYPES)) {
      throw new Error('Invalid task status: ' + statusName);
    }
    return TASK_STATUS_TYPES[statusName as keyof typeof TASK_STATUS_TYPES];
  });
  return statuses;
}

export {
  TASK_STATUS_TYPES,
  TASK_STATUS_TYPE,
  TASK_STATUS_TYPES_ENUM_KEY_TO_VALUE,
  TASK_STATUS_TYPES_ENUM_VALUE_TO_KEY,
  TASK_STATUS_TYPES_ENUM_KEY_TO_KEY,
  TASK_STATUS_TYPE_ARRAY,
  TASK_STATUS_TYPE_KEYS,
  DEFAULT_TASK_STATUS_TYPE,
  isValidTaskStatus,
  isValidTaskStatuses,
  convertStringToTaskStatus,
  convertStringToTaskStatuses,
};

// ----------------------------------------------------------------------------
