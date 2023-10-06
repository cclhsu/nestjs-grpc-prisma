// Path: src/common/constant/relation.constant.ts
// DESC: general relation types
'use strict';
enum RELATION_TYPES {
  RELATION_TYPES_UNSPECIFIED = 0,
  RELATION_TYPES_PARENT = 1,
  RELATION_TYPES_SUBTASKS = 2,
  RELATION_TYPES_PREDECESSORS = 3,
  RELATION_TYPES_SUCCESSORS = 4,
  RELATION_TYPES_RELATES_TO = 5,
  RELATION_TYPES_BLOCKED_BY = 6,
  UNRECOGNIZED = -1,
}

// type RELATION_TYPE = keyof typeof RELATION_TYPES;
type RELATION_TYPE = (typeof RELATION_TYPES)[keyof typeof RELATION_TYPES];

// Create an object with enum keys as keys and enum values as values
const RELATION_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(RELATION_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const RELATION_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(RELATION_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const RELATION_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(RELATION_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const RELATION_TYPE_ARRAY: RELATION_TYPES[] = Object.values(RELATION_TYPES).filter(
  (value) => typeof value === 'number',
) as RELATION_TYPES[];

const RELATION_TYPE_KEYS: (keyof typeof RELATION_TYPES)[] = Object.keys(RELATION_TYPES).filter(
  (key) => isNaN(Number(key)),
) as (keyof typeof RELATION_TYPES)[];

const DEFAULT_RELATION_TYPE: RELATION_TYPES = RELATION_TYPES.RELATION_TYPES_UNSPECIFIED;

function isValidRelationship(relationship: string): boolean {
  return RELATION_TYPE_ARRAY.includes(relationship as unknown as RELATION_TYPES);
}

function isValidRelationships(relationships: string[]): boolean {
  return relationships.every((relationship) => isValidRelationship(relationship));
}

function convertStringToRelationship(input: string): RELATION_TYPES {
  const relationship: keyof typeof RELATION_TYPES = input.trim() as keyof typeof RELATION_TYPES;
  if (!RELATION_TYPE_KEYS.includes(relationship)) {
    throw new Error('Invalid relationship: ' + input);
  }
  return RELATION_TYPES[relationship];
}

function convertStringToRelationships(input: string): RELATION_TYPES[] {
  const relationshipNames: string[] = input.split(',').map((relationship) => relationship.trim());
  const relationships: RELATION_TYPES[] = relationshipNames.map((relationshipName: string) => {
    if (!RELATION_TYPE_KEYS.includes(relationshipName as keyof typeof RELATION_TYPES)) {
      throw new Error('Invalid relationship: ' + relationshipName);
    }
    return RELATION_TYPES[relationshipName as keyof typeof RELATION_TYPES];
  });
  return relationships;
}

export {
  RELATION_TYPES,
  RELATION_TYPE,
  RELATION_TYPES_ENUM_KEY_TO_VALUE,
  RELATION_TYPES_ENUM_VALUE_TO_KEY,
  RELATION_TYPES_ENUM_KEY_TO_KEY,
  RELATION_TYPE_ARRAY,
  RELATION_TYPE_KEYS,
  DEFAULT_RELATION_TYPE,
  isValidRelationship,
  isValidRelationships,
  convertStringToRelationship,
  convertStringToRelationships,
};

// ----------------------------------------------------------------------------
