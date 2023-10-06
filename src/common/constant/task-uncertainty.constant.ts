// Path: src/common/constant/task-uncertainty.constant.ts
// DESC: general task uncertainty types
'use strict';

enum TASK_UNCERTAINTY_TYPES {
  TASK_UNCERTAINTY_TYPES_UNSPECIFIED = 0,
  TASK_UNCERTAINTY_TYPES_NONE = 1,
  TASK_UNCERTAINTY_TYPES_SOME = 2,
  TASK_UNCERTAINTY_TYPES_LOW = 3,
  TASK_UNCERTAINTY_TYPES_MODERATE = 5,
  TASK_UNCERTAINTY_TYPES_HIGH = 8,
  TASK_UNCERTAINTY_TYPES_EXTREME = 13,
  UNRECOGNIZED = -1,
}

// type TASK_UNCERTAINTY_TYPE = keyof typeof TASK_UNCERTAINTY_TYPES;
type TASK_UNCERTAINTY_TYPE = (typeof TASK_UNCERTAINTY_TYPES)[keyof typeof TASK_UNCERTAINTY_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_UNCERTAINTY_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_UNCERTAINTY_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_UNCERTAINTY_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_UNCERTAINTY_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_UNCERTAINTY_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_UNCERTAINTY_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_UNCERTAINTY_TYPE_ARRAY: TASK_UNCERTAINTY_TYPES[] = Object.values(
  TASK_UNCERTAINTY_TYPES,
).filter((value) => typeof value === 'number') as TASK_UNCERTAINTY_TYPES[];

const TASK_UNCERTAINTY_TYPE_KEYS: (keyof typeof TASK_UNCERTAINTY_TYPES)[] = Object.keys(
  TASK_UNCERTAINTY_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof TASK_UNCERTAINTY_TYPES)[];

const DEFAULT_TASK_UNCERTAINTY_TYPE: TASK_UNCERTAINTY_TYPES =
  TASK_UNCERTAINTY_TYPES.TASK_UNCERTAINTY_TYPES_UNSPECIFIED;

function isValidTaskUncertainty(taskUncertainty: string): boolean {
  return TASK_UNCERTAINTY_TYPE_ARRAY.includes(taskUncertainty as unknown as TASK_UNCERTAINTY_TYPES);
}

function isValidTaskUncertainties(taskUncertainties: string[]): boolean {
  return taskUncertainties.every((taskUncertainty) => isValidTaskUncertainty(taskUncertainty));
}

function convertStringToTaskUncertainty(input: string): TASK_UNCERTAINTY_TYPES {
  const uncertainty: keyof typeof TASK_UNCERTAINTY_TYPES =
    input.trim() as keyof typeof TASK_UNCERTAINTY_TYPES;
  if (!TASK_UNCERTAINTY_TYPE_KEYS.includes(uncertainty)) {
    throw new Error('Invalid task uncertainty: ' + input);
  }
  return TASK_UNCERTAINTY_TYPES[uncertainty];
}

function convertStringToTaskUncertainties(input: string): TASK_UNCERTAINTY_TYPES[] {
  const uncertaintyNames: string[] = input.split(',').map((uncertainty) => uncertainty.trim());
  const uncertainties: TASK_UNCERTAINTY_TYPES[] = uncertaintyNames.map(
    (uncertaintyName: string) => {
      if (
        !TASK_UNCERTAINTY_TYPE_KEYS.includes(uncertaintyName as keyof typeof TASK_UNCERTAINTY_TYPES)
      ) {
        throw new Error('Invalid task uncertainty: ' + uncertaintyName);
      }
      return TASK_UNCERTAINTY_TYPES[uncertaintyName as keyof typeof TASK_UNCERTAINTY_TYPES];
    },
  );
  return uncertainties;
}

export {
  TASK_UNCERTAINTY_TYPES,
  TASK_UNCERTAINTY_TYPE,
  TASK_UNCERTAINTY_TYPES_ENUM_KEY_TO_VALUE,
  TASK_UNCERTAINTY_TYPES_ENUM_VALUE_TO_KEY,
  TASK_UNCERTAINTY_TYPES_ENUM_KEY_TO_KEY,
  TASK_UNCERTAINTY_TYPE_ARRAY,
  TASK_UNCERTAINTY_TYPE_KEYS,
  DEFAULT_TASK_UNCERTAINTY_TYPE,
  isValidTaskUncertainty,
  isValidTaskUncertainties,
  convertStringToTaskUncertainty,
  convertStringToTaskUncertainties,
};

// ----------------------------------------------------------------------------
