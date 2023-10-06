// Path: src/common/constant/task-dependency.constant.ts
// DESC: general task dependency types
'use strict';

import { type } from "os";

enum TASK_DEPENDENCY_TYPES {
  TASK_DEPENDENCY_TYPES_UNSPECIFIED = 0,
  TASK_DEPENDENCY_TYPES_NONE = 1,
  TASK_DEPENDENCY_TYPES_ALMOST_NONE = 2,
  TASK_DEPENDENCY_TYPES_SOME = 3,
  TASK_DEPENDENCY_TYPES_FEW = 5,
  TASK_DEPENDENCY_TYPES_MORE_THAN_A_FEW = 8,
  TASK_DEPENDENCY_TYPES_UNKNOWN = 13,
  UNRECOGNIZED = -1,
}

// type TASK_DEPENDENCY_TYPE = keyof typeof TASK_DEPENDENCY_TYPES;
type TASK_DEPENDENCY_TYPE = (typeof TASK_DEPENDENCY_TYPES)[keyof typeof TASK_DEPENDENCY_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_DEPENDENCY_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_DEPENDENCY_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_DEPENDENCY_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_DEPENDENCY_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_DEPENDENCY_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_DEPENDENCY_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_DEPENDENCY_TYPE_ARRAY: TASK_DEPENDENCY_TYPES[] = Object.values(
  TASK_DEPENDENCY_TYPES,
).filter((value) => typeof value === 'number') as TASK_DEPENDENCY_TYPES[];

const TASK_DEPENDENCY_TYPE_KEYS: (keyof typeof TASK_DEPENDENCY_TYPES)[] = Object.keys(
  TASK_DEPENDENCY_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_DEPENDENCY_TYPES)[];

const DEFAULT_TASK_DEPENDENCY_TYPE: TASK_DEPENDENCY_TYPES =
  TASK_DEPENDENCY_TYPES.TASK_DEPENDENCY_TYPES_UNSPECIFIED;

function isValidTaskDependency(taskDependency: string): boolean {
  return TASK_DEPENDENCY_TYPE_ARRAY.includes(taskDependency as unknown as TASK_DEPENDENCY_TYPES);
}

function isValidTaskDependencies(taskDependencies: string[]): boolean {
  return taskDependencies.every((taskDependency) => isValidTaskDependency(taskDependency));
}

function convertStringToTaskDependency(input: string): TASK_DEPENDENCY_TYPES {
  const dependency: keyof typeof TASK_DEPENDENCY_TYPES =
    input.trim() as keyof typeof TASK_DEPENDENCY_TYPES;
  if (!TASK_DEPENDENCY_TYPE_KEYS.includes(dependency)) {
    throw new Error('Invalid task dependency: ' + input);
  }
  return TASK_DEPENDENCY_TYPES[dependency];
}

function convertStringToTaskDependencies(input: string): TASK_DEPENDENCY_TYPES[] {
  const dependencyNames: string[] = input.split(',').map((dependency) => dependency.trim());
  const dependencies: TASK_DEPENDENCY_TYPES[] = dependencyNames.map((dependencyName: string) => {
    if (!TASK_DEPENDENCY_TYPE_KEYS.includes(dependencyName as keyof typeof TASK_DEPENDENCY_TYPES)) {
      throw new Error('Invalid task dependency: ' + dependencyName);
    }
    return TASK_DEPENDENCY_TYPES[dependencyName as keyof typeof TASK_DEPENDENCY_TYPES];
  });
  return dependencies;
}

export {
  TASK_DEPENDENCY_TYPES,
  TASK_DEPENDENCY_TYPE,
  TASK_DEPENDENCY_TYPES_ENUM_KEY_TO_VALUE,
  TASK_DEPENDENCY_TYPES_ENUM_VALUE_TO_KEY,
  TASK_DEPENDENCY_TYPES_ENUM_KEY_TO_KEY,
  TASK_DEPENDENCY_TYPE_ARRAY,
  TASK_DEPENDENCY_TYPE_KEYS,
  DEFAULT_TASK_DEPENDENCY_TYPE,
  isValidTaskDependency,
  isValidTaskDependencies,
  convertStringToTaskDependency,
  convertStringToTaskDependencies,
};

// ----------------------------------------------------------------------------
