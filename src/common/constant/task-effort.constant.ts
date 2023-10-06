// Path: src/common/constant/task-effort.constant.ts
// DESC: general task effort types
'use strict';

import { type } from "os";

enum TASK_EFFORT_TYPES {
  TASK_EFFORT_TYPES_UNSPECIFIED = 0,
  TASK_EFFORT_TYPES_XS = 1,
  TASK_EFFORT_TYPES_S = 2,
  TASK_EFFORT_TYPES_M = 3,
  TASK_EFFORT_TYPES_L = 5,
  TASK_EFFORT_TYPES_XL = 8,
  TASK_EFFORT_TYPES_I = 13,
  UNRECOGNIZED = -1,
}

// type TASK_EFFORT_TYPE = keyof typeof TASK_EFFORT_TYPES;
type TASK_EFFORT_TYPE = (typeof TASK_EFFORT_TYPES)[keyof typeof TASK_EFFORT_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_EFFORT_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_EFFORT_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_EFFORT_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_EFFORT_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_EFFORT_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_EFFORT_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_EFFORT_TYPE_ARRAY: TASK_EFFORT_TYPES[] = Object.values(TASK_EFFORT_TYPES).filter(
  (value) => typeof value === 'number',
) as TASK_EFFORT_TYPES[];

const TASK_EFFORT_TYPE_KEYS: (keyof typeof TASK_EFFORT_TYPES)[] = Object.keys(
  TASK_EFFORT_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_EFFORT_TYPES)[];

const DEFAULT_TASK_EFFORT_TYPE: TASK_EFFORT_TYPES = TASK_EFFORT_TYPES.TASK_EFFORT_TYPES_UNSPECIFIED;

function isValidTaskEffort(taskEffort: string): boolean {
  return TASK_EFFORT_TYPE_ARRAY.includes(taskEffort as unknown as TASK_EFFORT_TYPES);
}

function isValidTaskEfforts(taskEfforts: string[]): boolean {
  return taskEfforts.every((taskEffort) => isValidTaskEffort(taskEffort));
}

function convertStringToTaskEffort(input: string): TASK_EFFORT_TYPES {
  const effort: keyof typeof TASK_EFFORT_TYPES = input.trim() as keyof typeof TASK_EFFORT_TYPES;
  if (!TASK_EFFORT_TYPE_KEYS.includes(effort)) {
    throw new Error('Invalid task effort: ' + input);
  }
  return TASK_EFFORT_TYPES[effort];
}

function convertStringToTaskEfforts(input: string): TASK_EFFORT_TYPES[] {
  const effortNames: string[] = input.split(',').map((effort) => effort.trim());
  const efforts: TASK_EFFORT_TYPES[] = effortNames.map((effortName: string) => {
    if (!TASK_EFFORT_TYPE_KEYS.includes(effortName as keyof typeof TASK_EFFORT_TYPES)) {
      throw new Error('Invalid task effort: ' + effortName);
    }
    return TASK_EFFORT_TYPES[effortName as keyof typeof TASK_EFFORT_TYPES];
  });
  return efforts;
}

export {
  TASK_EFFORT_TYPES,
  TASK_EFFORT_TYPE,
  TASK_EFFORT_TYPES_ENUM_KEY_TO_VALUE,
  TASK_EFFORT_TYPES_ENUM_VALUE_TO_KEY,
  TASK_EFFORT_TYPES_ENUM_KEY_TO_KEY,
  TASK_EFFORT_TYPE_ARRAY,
  TASK_EFFORT_TYPE_KEYS,
  DEFAULT_TASK_EFFORT_TYPE,
  isValidTaskEffort,
  isValidTaskEfforts,
  convertStringToTaskEffort,
  convertStringToTaskEfforts,
};

// ----------------------------------------------------------------------------
