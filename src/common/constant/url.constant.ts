// Path: src/common/constant/url.constant.ts
// DESC: general url types
'use strict';
// enum GENERAL_URL_TYPES {
//   GENERAL_URL_TYPES_UNSPECIFIED = 0,
//   GENERAL_URL_TYPES_WIKI = 1,
//   GENERAL_URL_TYPES_JIRA = 2,
//   GENERAL_URL_TYPES_CONFLUENCE = 3,
//   GENERAL_URL_TYPES_GITHUB = 4,
//   GENERAL_URL_TYPES_GITLAB = 5,
//   GENERAL_URL_TYPES_BITBUCKET = 6,
//   GENERAL_URL_TYPES_TRELLO = 7,
//   GENERAL_URL_TYPES_ASANA = 8,
//   GENERAL_URL_TYPES_NOTION = 9,
//   GENERAL_URL_TYPES_PRD = 10,
//   GENERAL_URL_TYPES_DESIGN = 11,
//   GENERAL_URL_TYPES_HLD = 12,
//   GENERAL_URL_TYPES_LLD = 13,
//   GENERAL_URL_TYPES_CODE = 14,
//   GENERAL_URL_TYPES_TEST = 15,
//   GENERAL_URL_TYPES_DEPLOY = 16,
//   GENERAL_URL_TYPES_RELEASE = 17,
//   GENERAL_URL_TYPES_MONITOR = 18,
//   GENERAL_URL_TYPES_OTHER = 19,
//   GENERAL_URL_TYPES_EXTERNAL = 20,
//   GENERAL_URL_TYPES_INTERNAL = 21,
//   GENERAL_URL_TYPES_EXAMPLE = 22,
//   UNRECOGNIZED = -1,
// }

// type GENERAL_URL_TYPE = keyof typeof GENERAL_URL_TYPES;
// type GENERAL_URL_TYPE = (typeof GENERAL_URL_TYPES)[keyof typeof GENERAL_URL_TYPES];

// // Create an object with enum keys as keys and enum values as values
// const GENERAL_URL_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
//   Object.entries(GENERAL_URL_TYPES).filter(([key]) => isNaN(Number(key))),
// );

// // Create an object with enum values as keys and enum keys as values
// const GENERAL_URL_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
//   Object.entries(GENERAL_URL_TYPES).filter(([key]) => !isNaN(Number(key))),
// );

// // Create an object with enum keys as keys and enum key as values
// const GENERAL_URL_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
//   Object.entries(GENERAL_URL_TYPES)
//     .filter(([key]) => isNaN(Number(key)))
//     .map(([key]) => [key, key]),
// );

// const GENERAL_URL_TYPE_ARRAY: GENERAL_URL_TYPES[] = Object.values(GENERAL_URL_TYPES).filter(
//   (value) => typeof value === 'number',
// ) as GENERAL_URL_TYPES[];

// const GENERAL_URL_TYPE_KEYS: (keyof typeof GENERAL_URL_TYPES)[] = Object.keys(
//   GENERAL_URL_TYPES,
// ).filter((key) => isNaN(Number(key))) as (keyof typeof GENERAL_URL_TYPES)[];

// const DEFAULT_GENERAL_URL: GENERAL_URL_TYPES = GENERAL_URL_TYPES.GENERAL_URL_TYPES_UNSPECIFIED;

// function convertStringToGENERAL_URL(input: string): GENERAL_URL_TYPES {
//   const URL: keyof typeof GENERAL_URL_TYPES = input.trim() as keyof typeof GENERAL_URL_TYPES;
//   if (!GENERAL_URL_TYPE_KEYS.includes(URL)) {
//     throw new Error('Invalid GENERAL URL: ' + input);
//   }
//   return GENERAL_URL_TYPES[URL];
// }

// function convertStringToGENERAL_URLes(input: string): GENERAL_URL_TYPES[] {
//   const URLNames: string[] = input.split(',').map((URL) => URL.trim());
//   const URLes: GENERAL_URL_TYPES[] = URLNames.map((URLName: string) => {
//     if (!GENERAL_URL_TYPE_KEYS.includes(URLName as keyof typeof GENERAL_URL_TYPES)) {
//       throw new Error('Invalid GENERAL URL: ' + URLName);
//     }
//     return GENERAL_URL_TYPES[URLName as keyof typeof GENERAL_URL_TYPES];
//   });
//   return URLes;
// }

// export {
//   GENERAL_URL_TYPES,
//   GENERAL_URL_TYPE,
//   GENERAL_URL_TYPES_ENUM_KEY_TO_VALUE,
//   GENERAL_URL_TYPES_ENUM_VALUE_TO_KEY,
//   GENERAL_URL_TYPES_ENUM_KEY_TO_KEY,
//   GENERAL_URL_TYPE_ARRAY,
//   GENERAL_URL_TYPE_KEYS,
//   DEFAULT_GENERAL_URL,
//   convertStringToGENERAL_URL,
//   convertStringToGENERAL_URLes,
// };

// ----------------------------------------------------------------------------

export type GENERAL_URL_TYPES =
  | 'WIKI'
  | 'JIRA'
  | 'CONFLUENCE'
  | 'GITHUB'
  | 'GITLAB'
  | 'BITBUCKET'
  | 'TRELLO'
  | 'ASANA'
  | 'NOTION'
  | 'PRD'
  | 'DESIGN'
  | 'HLD'
  | 'LLD'
  | 'CODE'
  | 'TEST'
  | 'DEPLOY'
  | 'RELEASE'
  | 'MONITOR'
  | 'OTHER'
  | 'EXTERNAL'
  | 'INTERNAL'
  | 'EXAMPLE';
export const GENERAL_URL_TYPE_KEYS = [
  'WIKI',
  'JIRA',
  'CONFLUENCE',
  'GITHUB',
  'GITLAB',
  'BITBUCKET',
  'TRELLO',
  'ASANA',
  'NOTION',
  'PRD',
  'DESIGN',
  'HLD',
  'LLD',
  'CODE',
  'TEST',
  'DEPLOY',
  'RELEASE',
  'MONITOR',
  'OTHER',
  'EXTERNAL',
  'INTERNAL',
  'EXAMPLE',
];
export const DEFAULT_GENERAL_URL = 'OTHER';
export enum GENERAL_URL_ENUM_KEY_TO_KEY {
  WIKI = 'WIKI',
  JIRA = 'JIRA',
  CONFLUENCE = 'CONFLUENCE',
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  BITBUCKET = 'BITBUCKET',
  TRELLO = 'TRELLO',
  ASANA = 'ASANA',
  NOTION = 'NOTION',
  PRD = 'PRD',
  DESIGN = 'DESIGN',
  HLD = 'HLD',
  LLD = 'LLD',
  CODE = 'CODE',
  TEST = 'TEST',
  DEPLOY = 'DEPLOY',
  RELEASE = 'RELEASE',
  MONITOR = 'MONITOR',
  OTHER = 'OTHER',
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  EXAMPLE = 'EXAMPLE',
}
export const GENERAL_URL_ENUM_KEY_TO_VALUE = {
  [GENERAL_URL_ENUM_KEY_TO_KEY.WIKI]: GENERAL_URL_ENUM_KEY_TO_KEY.WIKI,
  [GENERAL_URL_ENUM_KEY_TO_KEY.JIRA]: GENERAL_URL_ENUM_KEY_TO_KEY.JIRA,
  [GENERAL_URL_ENUM_KEY_TO_KEY.CONFLUENCE]: GENERAL_URL_ENUM_KEY_TO_KEY.CONFLUENCE,
  [GENERAL_URL_ENUM_KEY_TO_KEY.GITHUB]: GENERAL_URL_ENUM_KEY_TO_KEY.GITHUB,
  [GENERAL_URL_ENUM_KEY_TO_KEY.GITLAB]: GENERAL_URL_ENUM_KEY_TO_KEY.GITLAB,
  [GENERAL_URL_ENUM_KEY_TO_KEY.BITBUCKET]: GENERAL_URL_ENUM_KEY_TO_KEY.BITBUCKET,
  [GENERAL_URL_ENUM_KEY_TO_KEY.TRELLO]: GENERAL_URL_ENUM_KEY_TO_KEY.TRELLO,
  [GENERAL_URL_ENUM_KEY_TO_KEY.ASANA]: GENERAL_URL_ENUM_KEY_TO_KEY.ASANA,
  [GENERAL_URL_ENUM_KEY_TO_KEY.NOTION]: GENERAL_URL_ENUM_KEY_TO_KEY.NOTION,
  [GENERAL_URL_ENUM_KEY_TO_KEY.PRD]: GENERAL_URL_ENUM_KEY_TO_KEY.PRD,
  [GENERAL_URL_ENUM_KEY_TO_KEY.DESIGN]: GENERAL_URL_ENUM_KEY_TO_KEY.DESIGN,
  [GENERAL_URL_ENUM_KEY_TO_KEY.HLD]: GENERAL_URL_ENUM_KEY_TO_KEY.HLD,
  [GENERAL_URL_ENUM_KEY_TO_KEY.LLD]: GENERAL_URL_ENUM_KEY_TO_KEY.LLD,
  [GENERAL_URL_ENUM_KEY_TO_KEY.CODE]: GENERAL_URL_ENUM_KEY_TO_KEY.CODE,
  [GENERAL_URL_ENUM_KEY_TO_KEY.TEST]: GENERAL_URL_ENUM_KEY_TO_KEY.TEST,
  [GENERAL_URL_ENUM_KEY_TO_KEY.DEPLOY]: GENERAL_URL_ENUM_KEY_TO_KEY.DEPLOY,
  [GENERAL_URL_ENUM_KEY_TO_KEY.RELEASE]: GENERAL_URL_ENUM_KEY_TO_KEY.RELEASE,
  [GENERAL_URL_ENUM_KEY_TO_KEY.MONITOR]: GENERAL_URL_ENUM_KEY_TO_KEY.MONITOR,
  [GENERAL_URL_ENUM_KEY_TO_KEY.OTHER]: GENERAL_URL_ENUM_KEY_TO_KEY.OTHER,
  [GENERAL_URL_ENUM_KEY_TO_KEY.EXTERNAL]: GENERAL_URL_ENUM_KEY_TO_KEY.EXTERNAL,
  [GENERAL_URL_ENUM_KEY_TO_KEY.INTERNAL]: GENERAL_URL_ENUM_KEY_TO_KEY.INTERNAL,
  [GENERAL_URL_ENUM_KEY_TO_KEY.EXAMPLE]: GENERAL_URL_ENUM_KEY_TO_KEY.EXAMPLE,
};

export function convertStringToGENERAL_URL(input: string): GENERAL_URL_TYPES {
  if (!GENERAL_URL_TYPE_KEYS.includes(input.trim().toUpperCase() as GENERAL_URL_TYPES)) {
    throw new Error('Invalid GENERAL URL: ' + input);
  }
  return input.trim().toUpperCase() as GENERAL_URL_TYPES;
}

export function convertStringToGENERAL_URLes(input: string): GENERAL_URL_TYPES[] {
  const URLNames: string[] = input.split(',').map((URL) => URL.trim().toUpperCase());
  const URLes: GENERAL_URL_TYPES[] = URLNames.filter((URLName) =>
    GENERAL_URL_TYPE_KEYS.includes(URLName as GENERAL_URL_TYPES),
  ) as GENERAL_URL_TYPES[]; // Type assertion here
  return URLes;
}
