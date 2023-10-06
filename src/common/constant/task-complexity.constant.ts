// Path: src/common/constant/task-complexity.constant.ts
// DESC: general task complexity types
'use strict';

import { type } from 'os';

enum TASK_COMPLEXITY_TYPES {
  TASK_COMPLEXITY_TYPES_UNSPECIFIED = 0,
  TASK_COMPLEXITY_TYPES_XS = 1,
  TASK_COMPLEXITY_TYPES_S = 2,
  TASK_COMPLEXITY_TYPES_M = 3,
  TASK_COMPLEXITY_TYPES_L = 5,
  TASK_COMPLEXITY_TYPES_XL = 8,
  TASK_COMPLEXITY_TYPES_I = 13,
  UNRECOGNIZED = -1,
}

// type TASK_COMPLEXITY_TYPE = keyof typeof TASK_COMPLEXITY_TYPES;
type TASK_COMPLEXITY_TYPE = (typeof TASK_COMPLEXITY_TYPES)[keyof typeof TASK_COMPLEXITY_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_COMPLEXITY_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_COMPLEXITY_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_COMPLEXITY_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_COMPLEXITY_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_COMPLEXITY_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_COMPLEXITY_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_COMPLEXITY_TYPE_ARRAY: TASK_COMPLEXITY_TYPES[] = Object.values(
  TASK_COMPLEXITY_TYPES,
).filter((value) => typeof value === 'number') as TASK_COMPLEXITY_TYPES[];

const TASK_COMPLEXITY_TYPE_KEYS: (keyof typeof TASK_COMPLEXITY_TYPES)[] = Object.keys(
  TASK_COMPLEXITY_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_COMPLEXITY_TYPES)[];

const DEFAULT_TASK_COMPLEXITY_TYPE: TASK_COMPLEXITY_TYPES =
  TASK_COMPLEXITY_TYPES.TASK_COMPLEXITY_TYPES_UNSPECIFIED;

function isValidTaskComplexity(taskComplexity: string): boolean {
  return TASK_COMPLEXITY_TYPE_ARRAY.includes(taskComplexity as unknown as TASK_COMPLEXITY_TYPES);
}

function isValidTaskComplexities(taskComplexities: string[]): boolean {
  return taskComplexities.every((taskComplexity) => isValidTaskComplexity(taskComplexity));
}

function convertStringToTaskComplexity(input: string): TASK_COMPLEXITY_TYPES {
  const complexity: keyof typeof TASK_COMPLEXITY_TYPES =
    input.trim() as keyof typeof TASK_COMPLEXITY_TYPES;
  if (!TASK_COMPLEXITY_TYPE_KEYS.includes(complexity)) {
    throw new Error('Invalid task complexity: ' + input);
  }
  return TASK_COMPLEXITY_TYPES[complexity];
}

function convertStringToTaskComplexities(input: string): TASK_COMPLEXITY_TYPES[] {
  const complexityNames: string[] = input.split(',').map((complexity) => complexity.trim());
  const complexities: TASK_COMPLEXITY_TYPES[] = complexityNames.map((complexityName: string) => {
    if (!TASK_COMPLEXITY_TYPE_KEYS.includes(complexityName as keyof typeof TASK_COMPLEXITY_TYPES)) {
      throw new Error('Invalid task complexity: ' + complexityName);
    }
    return TASK_COMPLEXITY_TYPES[complexityName as keyof typeof TASK_COMPLEXITY_TYPES];
  });
  return complexities;
}

export {
  TASK_COMPLEXITY_TYPES,
  TASK_COMPLEXITY_TYPE,
  TASK_COMPLEXITY_TYPES_ENUM_KEY_TO_VALUE,
  TASK_COMPLEXITY_TYPES_ENUM_VALUE_TO_KEY,
  TASK_COMPLEXITY_TYPES_ENUM_KEY_TO_KEY,
  TASK_COMPLEXITY_TYPE_ARRAY,
  TASK_COMPLEXITY_TYPE_KEYS,
  DEFAULT_TASK_COMPLEXITY_TYPE,
  isValidTaskComplexity,
  isValidTaskComplexities,
  convertStringToTaskComplexity,
  convertStringToTaskComplexities,
};

// ----------------------------------------------------------------------------
