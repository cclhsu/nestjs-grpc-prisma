// Path: src/common/constant/task-priority.constant.ts
// DESC: general task priority types
'use strict';

import { type } from 'os';

enum TASK_PRIORITY_TYPES {
  TASK_PRIORITY_TYPES_UNSPECIFIED = 0,
  TASK_PRIORITY_TYPES_P0 = 1,
  TASK_PRIORITY_TYPES_P1 = 2,
  TASK_PRIORITY_TYPES_P2 = 3,
  TASK_PRIORITY_TYPES_P3 = 4,
  UNRECOGNIZED = -1,
}

// type TASK_PRIORITY_TYPE = keyof typeof TASK_PRIORITY_TYPES;
type TASK_PRIORITY_TYPE = (typeof TASK_PRIORITY_TYPES)[keyof typeof TASK_PRIORITY_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_PRIORITY_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_PRIORITY_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_PRIORITY_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_PRIORITY_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_PRIORITY_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_PRIORITY_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_PRIORITY_TYPE_ARRAY: TASK_PRIORITY_TYPES[] = Object.values(TASK_PRIORITY_TYPES).filter(
  (value) => typeof value === 'number',
) as TASK_PRIORITY_TYPES[];

const TASK_PRIORITY_TYPE_KEYS: (keyof typeof TASK_PRIORITY_TYPES)[] = Object.keys(
  TASK_PRIORITY_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_PRIORITY_TYPES)[];

const DEFAULT_TASK_PRIORITY_TYPE: TASK_PRIORITY_TYPES =
  TASK_PRIORITY_TYPES.TASK_PRIORITY_TYPES_UNSPECIFIED;

function isValidTaskPriority(taskPriority: string): boolean {
  return TASK_PRIORITY_TYPE_ARRAY.includes(taskPriority as unknown as TASK_PRIORITY_TYPES);
}

function isValidTaskPriorities(taskPriorities: string[]): boolean {
  return taskPriorities.every((taskPriority) => isValidTaskPriority(taskPriority));
}

function convertStringToTaskPriority(input: string): TASK_PRIORITY_TYPES {
  const priority: keyof typeof TASK_PRIORITY_TYPES =
    input.trim() as keyof typeof TASK_PRIORITY_TYPES;
  if (!TASK_PRIORITY_TYPE_KEYS.includes(priority)) {
    throw new Error('Invalid task priority: ' + input);
  }
  return TASK_PRIORITY_TYPES[priority];
}

function convertStringToTaskPriorities(input: string): TASK_PRIORITY_TYPES[] {
  const priorityNames: string[] = input.split(',').map((priority) => priority.trim());
  const priorities: TASK_PRIORITY_TYPES[] = priorityNames.map((priorityName: string) => {
    if (!TASK_PRIORITY_TYPE_KEYS.includes(priorityName as keyof typeof TASK_PRIORITY_TYPES)) {
      throw new Error('Invalid task priority: ' + priorityName);
    }
    return TASK_PRIORITY_TYPES[priorityName as keyof typeof TASK_PRIORITY_TYPES];
  });
  return priorities;
}

export {
  TASK_PRIORITY_TYPES,
  TASK_PRIORITY_TYPE,
  TASK_PRIORITY_TYPES_ENUM_KEY_TO_VALUE,
  TASK_PRIORITY_TYPES_ENUM_VALUE_TO_KEY,
  TASK_PRIORITY_TYPES_ENUM_KEY_TO_KEY,
  TASK_PRIORITY_TYPE_ARRAY,
  TASK_PRIORITY_TYPE_KEYS,
  DEFAULT_TASK_PRIORITY_TYPE,
  isValidTaskPriority,
  isValidTaskPriorities,
  convertStringToTaskPriority,
  convertStringToTaskPriorities,
};

// ----------------------------------------------------------------------------
