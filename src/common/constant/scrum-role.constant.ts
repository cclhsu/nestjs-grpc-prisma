// Path: src/common/constant/scrum-role.constant.ts
// DESC: general scrum role types
'use strict';
// enum SCRUM_ROLE_TYPES {
//   SCRUM_ROLE_TYPES_UNSPECIFIED = 0,
//   SCRUM_ROLE_TYPES_PO = 1,
//   SCRUM_ROLE_TYPES_SM = 2,
//   SCRUM_ROLE_TYPES_MEMBER = 3,
//   SCRUM_ROLE_TYPES_O = 4,
//   UNRECOGNIZED = -1,
// }

enum SCRUM_ROLE_TYPES {
  SCRUM_ROLE_TYPES_UNSPECIFIED = 'SCRUM_ROLE_TYPES_UNSPECIFIED',
  SCRUM_ROLE_TYPES_PO = 'SCRUM_ROLE_TYPES_PO',
  SCRUM_ROLE_TYPES_SM = 'SCRUM_ROLE_TYPES_SM',
  SCRUM_ROLE_TYPES_MEMBER = 'SCRUM_ROLE_TYPES_MEMBER',
  SCRUM_ROLE_TYPES_O = 'SCRUM_ROLE_TYPES_O',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type SCRUM_ROLE_TYPE = keyof typeof SCRUM_ROLE_TYPES;
type SCRUM_ROLE_TYPE = (typeof SCRUM_ROLE_TYPES)[keyof typeof SCRUM_ROLE_TYPES];

// Create an object with enum keys as keys and enum values as values
const SCRUM_ROLE_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(SCRUM_ROLE_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
// const SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
//   Object.entries(SCRUM_ROLE_TYPES).filter(([key]) => !isNaN(Number(key))),
// );
const SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY = {
  0: 'SCRUM_ROLE_TYPES_UNSPECIFIED' as SCRUM_ROLE_TYPE,
  1: 'SCRUM_ROLE_TYPES_PO' as SCRUM_ROLE_TYPE,
  2: 'SCRUM_ROLE_TYPES_SM' as SCRUM_ROLE_TYPE,
  3: 'SCRUM_ROLE_TYPES_MEMBER' as SCRUM_ROLE_TYPE,
  4: 'SCRUM_ROLE_TYPES_O' as SCRUM_ROLE_TYPE,
  '-1': 'UNRECOGNIZED' as SCRUM_ROLE_TYPE,
};

// Create an object with enum keys as keys and enum key as values
const SCRUM_ROLE_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(SCRUM_ROLE_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const SCRUM_ROLE_TYPE_ARRAY: SCRUM_ROLE_TYPES[] = Object.values(SCRUM_ROLE_TYPES).filter(
  (value) => typeof value === 'number',
) as SCRUM_ROLE_TYPES[];

const SCRUM_ROLE_TYPE_KEYS: (keyof typeof SCRUM_ROLE_TYPES)[] = Object.keys(
  SCRUM_ROLE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof SCRUM_ROLE_TYPES)[];

const DEFAULT_SCRUM_ROLE_TYPE: SCRUM_ROLE_TYPES = SCRUM_ROLE_TYPES.SCRUM_ROLE_TYPES_UNSPECIFIED;

function isValidScrumRole(scrumRole: string): boolean {
  return SCRUM_ROLE_TYPE_ARRAY.includes(scrumRole as unknown as SCRUM_ROLE_TYPES);
}

function isValidScrumRoles(scrumRoles: string[]): boolean {
  return scrumRoles.every((scrumRole) => isValidScrumRole(scrumRole));
}

function convertStringToScrumRole(input: string): SCRUM_ROLE_TYPES {
  const role: keyof typeof SCRUM_ROLE_TYPES = input.trim() as keyof typeof SCRUM_ROLE_TYPES;
  if (!SCRUM_ROLE_TYPE_KEYS.includes(role)) {
    throw new Error('Invalid scrum role: ' + input);
  }
  return SCRUM_ROLE_TYPES[role];
}

function convertStringToScrumRoles(input: string): SCRUM_ROLE_TYPES[] {
  const roleNames: string[] = input.split(',').map((role) => role.trim());
  const roles: SCRUM_ROLE_TYPES[] = roleNames.map((roleName: string) => {
    if (!SCRUM_ROLE_TYPE_KEYS.includes(roleName as keyof typeof SCRUM_ROLE_TYPES)) {
      throw new Error('Invalid scrum role: ' + roleName);
    }
    return SCRUM_ROLE_TYPES[roleName as keyof typeof SCRUM_ROLE_TYPES];
  });
  return roles;
}

export {
  SCRUM_ROLE_TYPES,
  SCRUM_ROLE_TYPE,
  SCRUM_ROLE_TYPES_ENUM_KEY_TO_VALUE,
  SCRUM_ROLE_TYPES_ENUM_VALUE_TO_KEY,
  SCRUM_ROLE_TYPES_ENUM_KEY_TO_KEY,
  SCRUM_ROLE_TYPE_ARRAY,
  SCRUM_ROLE_TYPE_KEYS,
  DEFAULT_SCRUM_ROLE_TYPE,
  isValidScrumRole,
  isValidScrumRoles,
  convertStringToScrumRole,
  convertStringToScrumRoles,
};

// ----------------------------------------------------------------------------

// export type SCRUM_ROLE_TYPE =
//   | 'SCRUM_ROLE_TYPES_UNSPECIFIED'
//   | 'SCRUM_ROLE_TYPES_PO'
//   | 'SCRUM_ROLE_TYPES_SM'
//   | 'SCRUM_ROLE_TYPES_MEMBER'
//   | 'SCRUM_ROLE_TYPES_O'
//   | 'UNRECOGNIZED';
// export const SCRUM_ROLE_TYPE_KEYS: SCRUM_ROLE_TYPE[] = [
//   'SCRUM_ROLE_TYPES_UNSPECIFIED',
//   'SCRUM_ROLE_TYPES_PO',
//   'SCRUM_ROLE_TYPES_SM',
//   'SCRUM_ROLE_TYPES_MEMBER',
//   'SCRUM_ROLE_TYPES_O',
//   'UNRECOGNIZED',
// ];
// export const DEFAULT_SCRUM_ROLE: SCRUM_ROLE_TYPE = 'SCRUM_ROLE_TYPES_UNSPECIFIED';

// export enum SCRUM_ROLE_ENUM_KEY_TO_KEY {
//   SCRUM_ROLE_TYPES_UNSPECIFIED = 'Unspecified', // 0
//   SCRUM_ROLE_TYPES_PO = 'Product Owner', // 1
//   SCRUM_ROLE_TYPES_SM = 'Scrum Master', // 2
//   SCRUM_ROLE_TYPES_MEMBER = 'Member', // 3
//   SCRUM_ROLE_TYPES_O = 'Other', // 13
//   UNRECOGNIZED = 'UNRECOGNIZED', // -1
// }
// export const SCRUM_ROLE_ENUM_KEY_TO_VALUE = {
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.SCRUM_ROLE_TYPES_UNSPECIFIED]: 0,
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.SCRUM_ROLE_TYPES_PO]: 1,
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.SCRUM_ROLE_TYPES_SM]: 2,
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.SCRUM_ROLE_TYPES_MEMBER]: 3,
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.SCRUM_ROLE_TYPES_O]: 13,
//   [SCRUM_ROLE_ENUM_KEY_TO_KEY.UNRECOGNIZED]: -1,
// };

// export function isValidScrumRole(scrumRole: string): boolean {
//   return SCRUM_ROLE_TYPE_KEYS.includes(scrumRole as SCRUM_ROLE_TYPE);
// }

// export function isValidScrumRoles(scrumRoles: string[]): boolean {
//   return scrumRoles.every((scrumRole) => isValidScrumRole(scrumRole));
// }

// export function convertStringToScrumRole(input: string): SCRUM_ROLE_TYPE {
//   if (!SCRUM_ROLE_TYPE_KEYS.includes(input.trim().toUpperCase() as SCRUM_ROLE_TYPE)) {
//     throw new Error('Invalid scrum role: ' + input);
//   }
//   return input.trim().toUpperCase() as SCRUM_ROLE_TYPE;
// }

// export function convertStringToScrumRoles(input: string): SCRUM_ROLE_TYPE[] {
//   const roleNames: string[] = input.split(',').map((role) => role.trim().toUpperCase());
//   const roles: SCRUM_ROLE_TYPE[] = roleNames.filter((roleName) =>
//     SCRUM_ROLE_TYPE_KEYS.includes(roleName as SCRUM_ROLE_TYPE),
//   ) as SCRUM_ROLE_TYPE[]; // Type assertion here
//   return roles;
// }
