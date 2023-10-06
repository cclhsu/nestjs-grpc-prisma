// Path: src/common/constant/action-types.constant.ts
// DESC: general action types
'use strict';
// enum ACTION_TYPES {
//   ACTION_TYPES_UNSPECIFIED = 0,
//   ACTION_TYPES_LIST = 1,
//   ACTION_TYPES_GET = 2,
//   ACTION_TYPES_CREATE = 3,
//   ACTION_TYPES_UPDATE = 4,
//   ACTION_TYPES_DELETE = 5,
//   ACTION_TYPES_INIT = 6,
//   ACTION_TYPES_REQUIRED = 7,
//   ACTION_TYPES_OPTIONAL = 8,
//   UNRECOGNIZED = -1,
// }

enum ACTION_TYPES {
  ACTION_TYPES_UNSPECIFIED = 'ACTION_TYPES_UNSPECIFIED',
  ACTION_TYPES_LIST = 'ACTION_TYPES_LIST',
  ACTION_TYPES_GET = 'ACTION_TYPES_GET',
  ACTION_TYPES_CREATE = 'ACTION_TYPES_CREATE',
  ACTION_TYPES_UPDATE = 'ACTION_TYPES_UPDATE',
  ACTION_TYPES_DELETE = 'ACTION_TYPES_DELETE',
  ACTION_TYPES_INIT = 'ACTION_TYPES_INIT',
  ACTION_TYPES_REQUIRED = 'ACTION_TYPES_REQUIRED',
  ACTION_TYPES_OPTIONAL = 'ACTION_TYPES_OPTIONAL',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type ACTION_TYPE = keyof typeof ACTION_TYPES;
type ACTION_TYPE = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

// Create an object with enum keys as keys and enum values as values
const ACTION_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(ACTION_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const ACTION_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(ACTION_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const ACTION_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(ACTION_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const ACTION_TYPE_ARRAY: ACTION_TYPES[] = Object.values(ACTION_TYPES).filter(
  (value) => typeof value === 'number',
) as ACTION_TYPES[];

const ACTION_TYPE_KEYS: (keyof typeof ACTION_TYPES)[] = Object.keys(ACTION_TYPES).filter((key) =>
  isNaN(Number(key)),
) as (keyof typeof ACTION_TYPES)[];

const DEFAULT_ACTION_TYPE: ACTION_TYPES = ACTION_TYPES.ACTION_TYPES_UNSPECIFIED;

function isValidActionType(actionType: string): boolean {
  return ACTION_TYPE_ARRAY.includes(actionType as unknown as ACTION_TYPES);
}

function isValidActionTypes(actionTypes: string[]): boolean {
  return actionTypes.every((actionType) => isValidActionType(actionType));
}

function convertStringToActionTypes(input: string): ACTION_TYPES {
  const type: keyof typeof ACTION_TYPES = input.trim() as keyof typeof ACTION_TYPES;
  if (!ACTION_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid action types: ' + input);
  }
  return ACTION_TYPES[type];
}

function convertStringToActionTypesArray(input: string): ACTION_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const actionTypes: ACTION_TYPES[] = typeNames.map((typeName: string) => {
    if (!ACTION_TYPE_KEYS.includes(typeName as keyof typeof ACTION_TYPES)) {
      throw new Error('Invalid action types: ' + typeName);
    }
    return ACTION_TYPES[typeName as keyof typeof ACTION_TYPES];
  });
  return actionTypes;
}

export {
  ACTION_TYPES,
  ACTION_TYPE,
  ACTION_TYPES_ENUM_KEY_TO_VALUE,
  ACTION_TYPES_ENUM_VALUE_TO_KEY,
  ACTION_TYPES_ENUM_KEY_TO_KEY,
  ACTION_TYPE_ARRAY,
  ACTION_TYPE_KEYS,
  DEFAULT_ACTION_TYPE,
  isValidActionType,
  isValidActionTypes,
  convertStringToActionTypes,
  convertStringToActionTypesArray,
};

// ----------------------------------------------------------------------------
