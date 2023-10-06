// Path: src/common/constant/project-role.constant.ts
// DESC: general project role types
// ('use strict');
// enum PROJECT_ROLE_TYPES {
//   PROJECT_ROLE_TYPES_UNSPECIFIED = 0,
//   PROJECT_ROLE_TYPES_PM = 1,
//   PROJECT_ROLE_TYPES_EM = 2,
//   PROJECT_ROLE_TYPES_DEV = 3,
//   PROJECT_ROLE_TYPES_QA = 4,
//   PROJECT_ROLE_TYPES_BA = 5,
//   PROJECT_ROLE_TYPES_UX = 6,
//   PROJECT_ROLE_TYPES_O = 7,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_ROLE_TYPES {
  PROJECT_ROLE_TYPES_UNSPECIFIED = 'PROJECT_ROLE_TYPES_UNSPECIFIED',
  PROJECT_ROLE_TYPES_PM = 'PROJECT_ROLE_TYPES_PM',
  PROJECT_ROLE_TYPES_EM = 'PROJECT_ROLE_TYPES_EM',
  PROJECT_ROLE_TYPES_DEV = 'PROJECT_ROLE_TYPES_DEV',
  PROJECT_ROLE_TYPES_QA = 'PROJECT_ROLE_TYPES_QA',
  PROJECT_ROLE_TYPES_BA = 'PROJECT_ROLE_TYPES_BA',
  PROJECT_ROLE_TYPES_UX = 'PROJECT_ROLE_TYPES_UX',
  PROJECT_ROLE_TYPES_O = 'PROJECT_ROLE_TYPES_O',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

// type PROJECT_ROLE_TYPE = keyof typeof PROJECT_ROLE_TYPES;
type PROJECT_ROLE_TYPE = (typeof PROJECT_ROLE_TYPES)[keyof typeof PROJECT_ROLE_TYPES];

// Create an object with enum keys as keys and enum values as values
const PROJECT_ROLE_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(PROJECT_ROLE_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
// const PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
//   Object.entries(PROJECT_ROLE_TYPES).filter(([key]) => !isNaN(Number(key))),
// );
const PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY = {
  0: 'PROJECT_ROLE_TYPES_UNSPECIFIED' as PROJECT_ROLE_TYPE,
  1: 'PROJECT_ROLE_TYPES_PM' as PROJECT_ROLE_TYPE,
  2: 'PROJECT_ROLE_TYPES_EM' as PROJECT_ROLE_TYPE,
  3: 'PROJECT_ROLE_TYPES_DEV' as PROJECT_ROLE_TYPE,
  4: 'PROJECT_ROLE_TYPES_QA' as PROJECT_ROLE_TYPE,
  5: 'PROJECT_ROLE_TYPES_BA' as PROJECT_ROLE_TYPE,
  6: 'PROJECT_ROLE_TYPES_UX' as PROJECT_ROLE_TYPE,
  7: 'PROJECT_ROLE_TYPES_O' as PROJECT_ROLE_TYPE,
  '-1': 'UNRECOGNIZED' as PROJECT_ROLE_TYPE,
};

// Create an object with enum keys as keys and enum key as values
const PROJECT_ROLE_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(PROJECT_ROLE_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const PROJECT_ROLE_TYPES_ARRAY: PROJECT_ROLE_TYPES[] = Object.values(PROJECT_ROLE_TYPES).filter(
  (value) => typeof value === 'number',
) as PROJECT_ROLE_TYPES[];

const PROJECT_ROLE_TYPE_KEYS: (keyof typeof PROJECT_ROLE_TYPES)[] = Object.keys(
  PROJECT_ROLE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_ROLE_TYPES)[];

const DEFAULT_PROJECT_ROLE_TYPE: PROJECT_ROLE_TYPES =
  PROJECT_ROLE_TYPES.PROJECT_ROLE_TYPES_UNSPECIFIED;

function isValidProjectRole(projectRole: string): boolean {
  return PROJECT_ROLE_TYPES_ARRAY.includes(projectRole as unknown as PROJECT_ROLE_TYPES);
}

function isValidProjectRoles(projectRoles: string[]): boolean {
  return projectRoles.every((projectRole) => isValidProjectRole(projectRole));
}

function convertStringToProjectRole(input: string): PROJECT_ROLE_TYPES {
  const role: keyof typeof PROJECT_ROLE_TYPES = input.trim() as keyof typeof PROJECT_ROLE_TYPES;
  if (!PROJECT_ROLE_TYPE_KEYS.includes(role)) {
    throw new Error('Invalid project role: ' + input);
  }
  return PROJECT_ROLE_TYPES[role];
}

function convertStringToProjectRoles(input: string): PROJECT_ROLE_TYPES[] {
  const roleNames: string[] = input.split(',').map((role) => role.trim());
  const roles: PROJECT_ROLE_TYPES[] = roleNames.map((roleName: string) => {
    if (!PROJECT_ROLE_TYPE_KEYS.includes(roleName as keyof typeof PROJECT_ROLE_TYPES)) {
      throw new Error('Invalid project role: ' + roleName);
    }
    return PROJECT_ROLE_TYPES[roleName as keyof typeof PROJECT_ROLE_TYPES];
  });
  return roles;
}

export {
  PROJECT_ROLE_TYPES,
  PROJECT_ROLE_TYPE,
  PROJECT_ROLE_TYPES_ENUM_KEY_TO_VALUE,
  PROJECT_ROLE_TYPES_ENUM_VALUE_TO_KEY,
  PROJECT_ROLE_TYPES_ENUM_KEY_TO_KEY,
  PROJECT_ROLE_TYPES_ARRAY,
  PROJECT_ROLE_TYPE_KEYS,
  DEFAULT_PROJECT_ROLE_TYPE,
  isValidProjectRole,
  isValidProjectRoles,
  convertStringToProjectRole,
  convertStringToProjectRoles,
};

// ----------------------------------------------------------------------------

// export type PROJECT_ROLE_TYPE =
//   | 'PROJECT_ROLE_TYPES_UNSPECIFIED'
//   | 'PROJECT_ROLE_TYPES_PM'
//   | 'PROJECT_ROLE_TYPES_EM'
//   | 'PROJECT_ROLE_TYPES_DEV'
//   | 'PROJECT_ROLE_TYPES_QA'
//   | 'PROJECT_ROLE_TYPES_BA'
//   | 'PROJECT_ROLE_TYPES_UX'
//   | 'PROJECT_ROLE_TYPES_O'
//   | 'UNRECOGNIZED';
// export const PROJECT_ROLE_TYPES_ARRAY: PROJECT_ROLE_TYPE[] = [
//   'PROJECT_ROLE_TYPES_UNSPECIFIED',
//   'PROJECT_ROLE_TYPES_PM',
//   'PROJECT_ROLE_TYPES_EM',
//   'PROJECT_ROLE_TYPES_DEV',
//   'PROJECT_ROLE_TYPES_QA',
//   'PROJECT_ROLE_TYPES_BA',
//   'PROJECT_ROLE_TYPES_UX',
//   'PROJECT_ROLE_TYPES_O',
//   'UNRECOGNIZED',
// ];
// export const DEFAULT_PROJECT_ROLE: PROJECT_ROLE_TYPE = 'PROJECT_ROLE_TYPES_UNSPECIFIED';
// export enum PROJECT_ROLE_ENUM_KEY_TO_KEY {
//   PROJECT_ROLE_TYPES_UNSPECIFIED = 'Unspecified', // 0
//   PROJECT_ROLE_TYPES_PM = 'Project Manager', // 1
//   PROJECT_ROLE_TYPES_EM = 'Engagement Manager', // 2
//   PROJECT_ROLE_TYPES_DEV = 'Developer', // 3
//   PROJECT_ROLE_TYPES_QA = 'Quality Assurance', // 5
//   PROJECT_ROLE_TYPES_BA = 'Business Analyst', // 8
//   PROJECT_ROLE_TYPES_UX = 'User Experience', // 13
//   PROJECT_ROLE_TYPES_O = 'Other', // 13
// }

// export const PROJECT_ROLE_ENUM_KEY_TO_VALUE = {
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_UNSPECIFIED]: 0,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_PM]: 1,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_EM]: 2,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_DEV]: 3,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_QA]: 5,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_BA]: 8,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_UX]: 13,
//   [PROJECT_ROLE_ENUM_KEY_TO_KEY.PROJECT_ROLE_TYPES_O]: 13,
// };

// export function isValidProjectRole(projectRole: string): boolean {
//   return PROJECT_ROLE_TYPES_ARRAY.includes(projectRole as PROJECT_ROLE_TYPE);
// }

// export function isValidProjectRoles(projectRoles: string[]): boolean {
//   return projectRoles.every((projectRole) => isValidProjectRole(projectRole));
// }

// export function convertStringToProjectRole(input: string): PROJECT_ROLE_TYPE {
//   if (!PROJECT_ROLE_TYPES_ARRAY.includes(input.trim().toUpperCase() as PROJECT_ROLE_TYPE)) {
//     throw new Error('Invalid project role: ' + input);
//   }
//   return input.trim().toUpperCase() as PROJECT_ROLE_TYPE;
// }

// export function convertStringToProjectRoles(input: string): PROJECT_ROLE_TYPE[] {
//   const roleNames: string[] = input.split(',').map((role) => role.trim().toUpperCase());
//   const roles: PROJECT_ROLE_TYPE[] = roleNames.filter((roleName) =>
//     PROJECT_ROLE_TYPES_ARRAY.includes(roleName as PROJECT_ROLE_TYPE),
//   ) as PROJECT_ROLE_TYPE[]; // Type assertion here
//   return roles;
// }
