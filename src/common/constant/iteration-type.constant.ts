// Path: src/common/constant/iteration-type.constant.ts
// DESC: general iteration types
'use strict';

enum ITERATION_TYPES {
  ITERATION_TYPES_UNSPECIFIED = 0,
  ITERATION_TYPES_SCRUM = 'SCRUM',
  ITERATION_TYPES_KANBAN = 'KANBAN',
  UNRECOGNIZED = -1,
}

// type ITERATION_TYPE = keyof typeof ITERATION_TYPES;
type ITERATION_TYPE = (typeof ITERATION_TYPES)[keyof typeof ITERATION_TYPES];

// Create an object with enum keys as keys and enum values as values
const ITERATION_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(ITERATION_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const ITERATION_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(ITERATION_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const ITERATION_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(ITERATION_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const ITERATION_TYPE_ARRAY: ITERATION_TYPES[] = Object.values(ITERATION_TYPES).filter(
  (value) => typeof value === 'number',
) as ITERATION_TYPES[];

const ITERATION_TYPE_KEYS: (keyof typeof ITERATION_TYPES)[] = Object.keys(ITERATION_TYPES).filter(
  (key) => isNaN(Number(key)),
) as (keyof typeof ITERATION_TYPES)[];

const DEFAULT_ITERATION_TYPE: ITERATION_TYPES = ITERATION_TYPES.ITERATION_TYPES_UNSPECIFIED;

function isValidIterationType(iterationType: string): boolean {
  return ITERATION_TYPE_ARRAY.includes(iterationType as unknown as ITERATION_TYPES);
}

function isValidIterationTypes(iterationTypes: string[]): boolean {
  return iterationTypes.every((iterationType) => isValidIterationType(iterationType));
}

function convertStringToIterationRole(input: string): ITERATION_TYPES {
  const role: keyof typeof ITERATION_TYPES = input.trim() as keyof typeof ITERATION_TYPES;
  if (!ITERATION_TYPE_KEYS.includes(role)) {
    throw new Error('Invalid iteration role: ' + input);
  }
  return ITERATION_TYPES[role];
}

function convertStringToIterationRoles(input: string): ITERATION_TYPES[] {
  const roleNames: string[] = input.split(',').map((role) => role.trim());
  const roles: ITERATION_TYPES[] = roleNames.map((roleName: string) => {
    if (!ITERATION_TYPE_KEYS.includes(roleName as keyof typeof ITERATION_TYPES)) {
      throw new Error('Invalid iteration role: ' + roleName);
    }
    return ITERATION_TYPES[roleName as keyof typeof ITERATION_TYPES];
  });
  return roles;
}

// ----------------------------------------------------------------------------

enum SCRUM_COLUMNS {
  SCRUM_COLUMNS_UNSPECIFIED = 0,
  SCRUM_COLUMNS_BACKLOG = 'BACKLOG',
  SCRUM_COLUMNS_TODO = 'TODO',
  SCRUM_COLUMNS_IN_PROGRESS = 'IN_PROGRESS',
  SCRUM_COLUMNS_DONE = 'DONE',
  SCRUM_COLUMNS_ARCHIVED = 'ARCHIVED',
  UNRECOGNIZED = -1,
}

// type SCRUM_COLUMN_TYPE = keyof typeof SCRUM_COLUMNS;
type SCRUM_COLUMN_TYPE = (typeof SCRUM_COLUMNS)[keyof typeof SCRUM_COLUMNS];

// Create an object with enum keys as keys and enum values as values
const SCRUM_COLUMNS_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(SCRUM_COLUMNS).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const SCRUM_COLUMNS_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(SCRUM_COLUMNS).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const SCRUM_COLUMNS_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(SCRUM_COLUMNS)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const SCRUM_COLUMN_ARRAY: SCRUM_COLUMNS[] = Object.values(SCRUM_COLUMNS).filter(
  (value) => typeof value === 'number',
) as SCRUM_COLUMNS[];

const SCRUM_COLUMN_KEYS: (keyof typeof SCRUM_COLUMNS)[] = Object.keys(SCRUM_COLUMNS).filter((key) =>
  isNaN(Number(key)),
) as (keyof typeof SCRUM_COLUMNS)[];

const DEFAULT_SCRUM_COLUMN_TYPE: SCRUM_COLUMNS = SCRUM_COLUMNS.SCRUM_COLUMNS_UNSPECIFIED;

function isValidScrumColumn(scrumColumn: string): boolean {
  return SCRUM_COLUMN_ARRAY.includes(scrumColumn as unknown as SCRUM_COLUMNS);
}

function isValidScrumColumns(scrumColumns: string[]): boolean {
  return scrumColumns.every((scrumColumn) => isValidScrumColumn(scrumColumn));
}

function convertStringToScrumColumns(input: string): SCRUM_COLUMNS {
  const role: keyof typeof SCRUM_COLUMNS = input.trim() as keyof typeof SCRUM_COLUMNS;
  if (!SCRUM_COLUMN_KEYS.includes(role)) {
    throw new Error('Invalid scrum column: ' + input);
  }
  return SCRUM_COLUMNS[role];
}

function convertStringToScrumColumnsArray(input: string): SCRUM_COLUMNS[] {
  const roleNames: string[] = input.split(',').map((role) => role.trim());
  const roles: SCRUM_COLUMNS[] = roleNames.map((roleName: string) => {
    if (!SCRUM_COLUMN_KEYS.includes(roleName as keyof typeof SCRUM_COLUMNS)) {
      throw new Error('Invalid scrum column: ' + roleName);
    }
    return SCRUM_COLUMNS[roleName as keyof typeof SCRUM_COLUMNS];
  });
  return roles;
}

// ----------------------------------------------------------------------------

enum KANBAN_COLUMNS {
  KANBAN_COLUMNS_UNSPECIFIED = 0,
  KANBAN_COLUMNS_BACKLOG = 'BACKLOG',
  KANBAN_COLUMNS_TODO = 'TODO',
  KANBAN_COLUMNS_IN_PROGRESS = 'IN_PROGRESS',
  KANBAN_COLUMNS_DONE = 'DONE',
  KANBAN_COLUMNS_ARCHIVED = 'ARCHIVED',
  UNRECOGNIZED = -1,
}

// type KANBAN_COLUMN_TYPE = keyof typeof KANBAN_COLUMNS;
type KANBAN_COLUMN_TYPE = (typeof KANBAN_COLUMNS)[keyof typeof KANBAN_COLUMNS];

// Create an object with enum keys as keys and enum values as values
const KANBAN_COLUMNS_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(KANBAN_COLUMNS).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const KANBAN_COLUMNS_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(KANBAN_COLUMNS).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const KANBAN_COLUMNS_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(KANBAN_COLUMNS)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const KANBAN_COLUMN_ARRAY: KANBAN_COLUMNS[] = Object.values(KANBAN_COLUMNS).filter(
  (value) => typeof value === 'number',
) as KANBAN_COLUMNS[];

const KANBAN_COLUMN_KEYS: (keyof typeof KANBAN_COLUMNS)[] = Object.keys(KANBAN_COLUMNS).filter(
  (key) => isNaN(Number(key)),
) as (keyof typeof KANBAN_COLUMNS)[];

const DEFAULT_KANBAN_COLUMN_TYPE: KANBAN_COLUMNS = KANBAN_COLUMNS.KANBAN_COLUMNS_UNSPECIFIED;

function isValidKanbanColumn(kanbanColumn: string): boolean {
  return KANBAN_COLUMN_ARRAY.includes(kanbanColumn as unknown as KANBAN_COLUMNS);
}

function isValidKanbanColumns(kanbanColumns: string[]): boolean {
  return kanbanColumns.every((kanbanColumn) => isValidKanbanColumn(kanbanColumn));
}

function convertStringToKanbanColumns(input: string): KANBAN_COLUMNS {
  const role: keyof typeof KANBAN_COLUMNS = input.trim() as keyof typeof KANBAN_COLUMNS;
  if (!KANBAN_COLUMN_KEYS.includes(role)) {
    throw new Error('Invalid kanban column: ' + input);
  }
  return KANBAN_COLUMNS[role];
}

function convertStringToKanbanColumnsArray(input: string): KANBAN_COLUMNS[] {
  const roleNames: string[] = input.split(',').map((role) => role.trim());
  const roles: KANBAN_COLUMNS[] = roleNames.map((roleName: string) => {
    if (!KANBAN_COLUMN_KEYS.includes(roleName as keyof typeof KANBAN_COLUMNS)) {
      throw new Error('Invalid kanban column: ' + roleName);
    }
    return KANBAN_COLUMNS[roleName as keyof typeof KANBAN_COLUMNS];
  });
  return roles;
}

const HIDDEN_COLUMNS: SCRUM_COLUMNS[] = [
  SCRUM_COLUMNS.SCRUM_COLUMNS_BACKLOG,
  SCRUM_COLUMNS.SCRUM_COLUMNS_ARCHIVED,
];
const DEFAULT_HIDDEN_COLUMN: SCRUM_COLUMNS = SCRUM_COLUMNS.SCRUM_COLUMNS_BACKLOG;

export {
  ITERATION_TYPES,
  ITERATION_TYPE,
  ITERATION_TYPES_ENUM_KEY_TO_VALUE,
  ITERATION_TYPES_ENUM_VALUE_TO_KEY,
  ITERATION_TYPES_ENUM_KEY_TO_KEY,
  ITERATION_TYPE_ARRAY,
  ITERATION_TYPE_KEYS,
  DEFAULT_ITERATION_TYPE,
  isValidIterationType,
  isValidIterationTypes,
  convertStringToIterationRole,
  convertStringToIterationRoles,
  SCRUM_COLUMNS,
  SCRUM_COLUMN_TYPE,
  SCRUM_COLUMNS_ENUM_KEY_TO_VALUE,
  SCRUM_COLUMNS_ENUM_VALUE_TO_KEY,
  SCRUM_COLUMNS_ENUM_KEY_TO_KEY,
  SCRUM_COLUMN_ARRAY,
  SCRUM_COLUMN_KEYS,
  DEFAULT_SCRUM_COLUMN_TYPE,
  isValidScrumColumn,
  isValidScrumColumns,
  convertStringToScrumColumns,
  convertStringToScrumColumnsArray,
  KANBAN_COLUMNS,
  KANBAN_COLUMN_TYPE,
  KANBAN_COLUMNS_ENUM_KEY_TO_VALUE,
  KANBAN_COLUMNS_ENUM_VALUE_TO_KEY,
  KANBAN_COLUMNS_ENUM_KEY_TO_KEY,
  KANBAN_COLUMN_ARRAY,
  KANBAN_COLUMN_KEYS,
  DEFAULT_KANBAN_COLUMN_TYPE,
  isValidKanbanColumn,
  isValidKanbanColumns,
  convertStringToKanbanColumns,
  convertStringToKanbanColumnsArray,
  HIDDEN_COLUMNS,
  DEFAULT_HIDDEN_COLUMN,
};

// ----------------------------------------------------------------------------

// export type ITERATION_TYPES = 'SCRUM' | 'KANBAN';
// export const ITERATION_TYPE_ARRAY = ['SCRUM', 'KANBAN'];
// export const DEFAULT_ITERATION_TYPE = 'SCRUM';
// export enum ITERATION_TYPE_ENUM_KEY_TO_KEY {
//   SCRUM = 'SCRUM',
//   KANBAN = 'KANBAN',
// }
// export const ITERATION_TYPE_ENUM_KEY_TO_VALUE = {
//   [ITERATION_TYPE_ENUM_KEY_TO_KEY.SCRUM]: ITERATION_TYPE_ENUM_KEY_TO_KEY.SCRUM,
//   [ITERATION_TYPE_ENUM_KEY_TO_KEY.KANBAN]: ITERATION_TYPE_ENUM_KEY_TO_KEY.KANBAN,
// };

// export function convertStringToIterationTypes(input: string): ITERATION_TYPES {
//   if (!ITERATION_TYPE_ARRAY.includes(input.trim().toUpperCase() as ITERATION_TYPES)) {
//     throw new Error('Invalid iteration types: ' + input);
//   }
//   return input.trim().toUpperCase() as ITERATION_TYPES;
// }

// export function convertStringToIterationIterationTypes(input: string): ITERATION_TYPES[] {
//   const typesNames: string[] = input.split(',').map((types) => types.trim().toUpperCase());
//   const iterationTypes: ITERATION_TYPES[] = typesNames.filter((typesName) =>
//     ITERATION_TYPE_ARRAY.includes(typesName as ITERATION_TYPES),
//   ) as ITERATION_TYPES[]; // Type assertion here
//   return iterationTypes;
// }

// export const HIDDEN_COLUMNS = ['BACKLOG', 'ARCHIVED'];
// export const DEFAULT_HIDDEN_COLUMN = 'BACKLOG';

// export const DEFAULT_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'].concat(HIDDEN_COLUMNS);
// export const DEFAULT_COLUMN = 'TODO';

// export const SCRUM_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'].concat(HIDDEN_COLUMNS);
// export const DEFAULT_SCRUM_COLUMN = 'TODO';

// export const KANBAN_COLUMNS = ['TODO', 'IN_PROGRESS', 'DONE'].concat(HIDDEN_COLUMNS);
// export const DEFAULT_KANBAN_COLUMN = 'TODO';
