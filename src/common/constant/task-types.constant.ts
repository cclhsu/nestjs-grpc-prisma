// Path: src/common/constant/task-types.constant.ts
// DESC: general task types
'use strict';

import { type } from 'os';

enum TASK_TYPES {
  TASK_TYPES_UNSPECIFIED = 0,
  TASK_TYPES_EPIC = 1,
  TASK_TYPES_STORY = 2,
  TASK_TYPES_TASK = 3,
  TASK_TYPES_BUG = 4,
  TASK_TYPES_FEATURE = 5,
  TASK_TYPES_IMPROVEMENT = 6,
  TASK_TYPES_SUB_TASK = 7,
  UNRECOGNIZED = -1,
}

// type TASK_TYPE = keyof typeof TASK_TYPES;
type TASK_TYPE = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_TYPE_ARRAY: TASK_TYPES[] = Object.values(TASK_TYPES).filter(
  (value) => typeof value === 'number',
) as TASK_TYPES[];

const TASK_TYPE_KEYS: (keyof typeof TASK_TYPES)[] = Object.keys(TASK_TYPES).filter((key) =>
  isNaN(Number(key)),
) as (keyof typeof TASK_TYPES)[];

const DEFAULT_TASK_TYPE: TASK_TYPES = TASK_TYPES.TASK_TYPES_UNSPECIFIED;

function isValidTaskType(taskType: string): boolean {
  return TASK_TYPE_ARRAY.includes(taskType as unknown as TASK_TYPES);
}

function isValidTaskTypes(taskTypes: string[]): boolean {
  return taskTypes.every((taskType) => isValidTaskType(taskType));
}

function convertStringToTaskType(input: string): TASK_TYPES {
  const type: keyof typeof TASK_TYPES = input.trim() as keyof typeof TASK_TYPES;
  if (!TASK_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid task type: ' + input);
  }
  return TASK_TYPES[type];
}

function convertStringToTaskTypes(input: string): TASK_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const types: TASK_TYPES[] = typeNames.map((typeName: string) => {
    if (!TASK_TYPE_KEYS.includes(typeName as keyof typeof TASK_TYPES)) {
      throw new Error('Invalid task type: ' + typeName);
    }
    return TASK_TYPES[typeName as keyof typeof TASK_TYPES];
  });
  return types;
}

export {
  TASK_TYPES,
  TASK_TYPE,
  TASK_TYPES_ENUM_KEY_TO_VALUE,
  TASK_TYPES_ENUM_VALUE_TO_KEY,
  TASK_TYPES_ENUM_KEY_TO_KEY,
  TASK_TYPE_ARRAY,
  TASK_TYPE_KEYS,
  DEFAULT_TASK_TYPE,
  isValidTaskType,
  isValidTaskTypes,
  convertStringToTaskType,
  convertStringToTaskTypes,
};

// ----------------------------------------------------------------------------
