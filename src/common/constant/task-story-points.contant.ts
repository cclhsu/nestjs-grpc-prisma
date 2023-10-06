// Path: src/common/constant/task-story-points.contant.ts
// DESC: general task story points calculation methods
'use strict';
enum STORY_POINTS_CALCULATION_METHOD_TYPES {
  STORY_POINTS_CALCULATION_METHOD_TYPES_UNSPECIFIED = 0,
  STORY_POINTS_CALCULATION_METHOD_TYPES_SUM = 'SUM',
  STORY_POINTS_CALCULATION_METHOD_TYPES_MAX = 'MAX',
  STORY_POINTS_CALCULATION_METHOD_TYPES_AVERAGE = 'AVERAGE',
  UNRECOGNIZED = -1,
}

// type STORY_POINTS_CALCULATION_METHOD_TYPE = keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES;
type STORY_POINTS_CALCULATION_METHOD_TYPE = keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES;

// Create an object with enum keys as keys and enum values as values
const STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(STORY_POINTS_CALCULATION_METHOD_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(STORY_POINTS_CALCULATION_METHOD_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(STORY_POINTS_CALCULATION_METHOD_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const STORY_POINTS_CALCULATION_METHOD_TYPES_ARRAY: STORY_POINTS_CALCULATION_METHOD_TYPES[] =
  Object.values(STORY_POINTS_CALCULATION_METHOD_TYPES).filter(
    (value) => typeof value === 'number',
  ) as STORY_POINTS_CALCULATION_METHOD_TYPES[];

const STORY_POINTS_CALCULATION_METHOD_TYPES_KEYS: (keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES)[] =
  Object.keys(STORY_POINTS_CALCULATION_METHOD_TYPES).filter((key) =>
    isNaN(Number(key)),
  ) as (keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES)[];

const DEFAULT_STORY_POINTS_CALCULATION_METHOD_TYPE: STORY_POINTS_CALCULATION_METHOD_TYPES =
  STORY_POINTS_CALCULATION_METHOD_TYPES.STORY_POINTS_CALCULATION_METHOD_TYPES_UNSPECIFIED;

function isValidStoryPointCalculationMethod(storyPointCalculationMethod: string): boolean {
  return STORY_POINTS_CALCULATION_METHOD_TYPES_ARRAY.includes(
    storyPointCalculationMethod as unknown as STORY_POINTS_CALCULATION_METHOD_TYPES,
  );
}

function isValidStoryPointCalculationMethods(storyPointCalculationMethods: string[]): boolean {
  return storyPointCalculationMethods.every((storyPointCalculationMethod) =>
    isValidStoryPointCalculationMethod(storyPointCalculationMethod),
  );
}

function convertStringToStoryPointCalculationMethod(
  input: string,
): STORY_POINTS_CALCULATION_METHOD_TYPES {
  const storyPointCalculationMethod: keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES =
    input.trim() as keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES;
  if (!STORY_POINTS_CALCULATION_METHOD_TYPES_KEYS.includes(storyPointCalculationMethod)) {
    throw new Error('Invalid task uncertainty: ' + input);
  }
  return STORY_POINTS_CALCULATION_METHOD_TYPES[storyPointCalculationMethod];
}

function convertStringToStoryPointCalculationMethods(
  input: string,
): STORY_POINTS_CALCULATION_METHOD_TYPES[] {
  const storyPointCalculationMethods: string[] = input
    .split(',')
    .map((uncertainty) => uncertainty.trim());
  const storyPointMethods: STORY_POINTS_CALCULATION_METHOD_TYPES[] =
    storyPointCalculationMethods.map((storyPointCalculationMethod: string) => {
      if (
        !STORY_POINTS_CALCULATION_METHOD_TYPES_KEYS.includes(
          storyPointCalculationMethod as keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES,
        )
      ) {
        throw new Error('Invalid task uncertainty: ' + storyPointCalculationMethod);
      }
      return STORY_POINTS_CALCULATION_METHOD_TYPES[
        storyPointCalculationMethod as keyof typeof STORY_POINTS_CALCULATION_METHOD_TYPES
      ];
    });
  return storyPointMethods;
}

export {
  STORY_POINTS_CALCULATION_METHOD_TYPES,
  STORY_POINTS_CALCULATION_METHOD_TYPE,
  STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_KEY_TO_VALUE,
  STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_VALUE_TO_KEY,
  STORY_POINTS_CALCULATION_METHOD_TYPES_ENUM_KEY_TO_KEY,
  STORY_POINTS_CALCULATION_METHOD_TYPES_ARRAY,
  STORY_POINTS_CALCULATION_METHOD_TYPES_KEYS,
  DEFAULT_STORY_POINTS_CALCULATION_METHOD_TYPE,
  isValidStoryPointCalculationMethod,
  isValidStoryPointCalculationMethods,
  convertStringToStoryPointCalculationMethod,
  convertStringToStoryPointCalculationMethods,
};

// ----------------------------------------------------------------------------
