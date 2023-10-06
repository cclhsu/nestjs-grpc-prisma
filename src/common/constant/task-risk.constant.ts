// Path: src/common/constant/task-risk.constant.ts
// DESC: general task risk types
'use strict';
enum TASK_RISK_TYPES {
  TASK_RISK_TYPES_UNSPECIFIED = 0,
  TASK_RISK_TYPES_LOW = 1,
  TASK_RISK_TYPES_MEDIUM = 2,
  TASK_RISK_TYPES_HIGH = 3,
  UNRECOGNIZED = -1,
}

// type TASK_RISK_TYPE = keyof typeof TASK_RISK_TYPES;
type TASK_RISK_TYPE = (typeof TASK_RISK_TYPES)[keyof typeof TASK_RISK_TYPES];

// Create an object with enum keys as keys and enum values as values
const TASK_RISK_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(TASK_RISK_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const TASK_RISK_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(TASK_RISK_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const TASK_RISK_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(TASK_RISK_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const TASK_RISK_TYPE_ARRAY: TASK_RISK_TYPES[] = Object.values(TASK_RISK_TYPES).filter(
  (value) => typeof value === 'number',
) as TASK_RISK_TYPES[];

const TASK_RISK_TYPE_KEYS: (keyof typeof TASK_RISK_TYPES)[] = Object.keys(TASK_RISK_TYPES).filter(
  (key) => isNaN(Number(key)),
) as (keyof typeof TASK_RISK_TYPES)[];

const DEFAULT_TASK_RISK_TYPE: TASK_RISK_TYPES = TASK_RISK_TYPES.TASK_RISK_TYPES_UNSPECIFIED;

function isValidTaskRisk(taskRisk: string): boolean {
  return TASK_RISK_TYPE_ARRAY.includes(taskRisk as unknown as TASK_RISK_TYPES);
}

function isValidTaskRisks(taskRisks: string[]): boolean {
  return taskRisks.every((taskRisk) => isValidTaskRisk(taskRisk));
}

function convertStringToTaskRisk(input: string): TASK_RISK_TYPES {
  const risk: keyof typeof TASK_RISK_TYPES = input.trim() as keyof typeof TASK_RISK_TYPES;
  if (!TASK_RISK_TYPE_KEYS.includes(risk)) {
    throw new Error('Invalid task risk: ' + input);
  }
  return TASK_RISK_TYPES[risk];
}

function convertStringToTaskRisks(input: string): TASK_RISK_TYPES[] {
  const riskNames: string[] = input.split(',').map((risk) => risk.trim());
  const risks: TASK_RISK_TYPES[] = riskNames.map((riskName: string) => {
    if (!TASK_RISK_TYPE_KEYS.includes(riskName as keyof typeof TASK_RISK_TYPES)) {
      throw new Error('Invalid task risk: ' + riskName);
    }
    return TASK_RISK_TYPES[riskName as keyof typeof TASK_RISK_TYPES];
  });
  return risks;
}

export {
  TASK_RISK_TYPES,
  TASK_RISK_TYPE,
  TASK_RISK_TYPES_ENUM_KEY_TO_VALUE,
  TASK_RISK_TYPES_ENUM_VALUE_TO_KEY,
  TASK_RISK_TYPES_ENUM_KEY_TO_KEY,
  TASK_RISK_TYPE_ARRAY,
  TASK_RISK_TYPE_KEYS,
  DEFAULT_TASK_RISK_TYPE,
  isValidTaskRisk,
  isValidTaskRisks,
  convertStringToTaskRisk,
  convertStringToTaskRisks,
};

// ----------------------------------------------------------------------------
