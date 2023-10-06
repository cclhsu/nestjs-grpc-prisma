// Path: src/common/constant/config.constant.ts
// DESC: general config types
'use strict';
const DEFAULT_CONFIG_NAME = 'default-project-options';

enum CONFIG_FILE_TYPES {
  CONFIG_FILE_TYPES_JSON = 'json',
  CONFIG_FILE_TYPES_YAML = 'yaml',
  CONFIG_FILE_TYPES_CSV = 'csv',
  CONFIG_FILE_TYPES_JS = 'js',
  CONFIG_FILE_TYPES_TS = 'ts',
}

// type CONFIG_FILE_TYPE = keyof typeof CONFIG_FILE_TYPES;
type CONFIG_FILE_TYPE = (typeof CONFIG_FILE_TYPES)[keyof typeof CONFIG_FILE_TYPES];

// Create an object with enum keys as keys and enum values as values
const CONFIG_FILE_TYPES_ENUM_KEY_TO_VALUE = Object.fromEntries(
  Object.entries(CONFIG_FILE_TYPES).filter(([key]) => isNaN(Number(key))),
);

// Create an object with enum values as keys and enum keys as values
const CONFIG_FILE_TYPES_ENUM_VALUE_TO_KEY = Object.fromEntries(
  Object.entries(CONFIG_FILE_TYPES).filter(([key]) => !isNaN(Number(key))),
);

// Create an object with enum keys as keys and enum key as values
const CONFIG_FILE_TYPES_ENUM_KEY_TO_KEY = Object.fromEntries(
  Object.entries(CONFIG_FILE_TYPES)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key]) => [key, key]),
);

const CONFIG_FILE_TYPE_ARRAY: CONFIG_FILE_TYPES[] = Object.values(CONFIG_FILE_TYPES).filter(
  (value) => typeof value === 'number',
) as CONFIG_FILE_TYPES[];

const CONFIG_FILE_TYPE_KEYS: (keyof typeof CONFIG_FILE_TYPES)[] = Object.keys(
  CONFIG_FILE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof CONFIG_FILE_TYPES)[];

const DEFAULT_CONFIG_FILE_TYPE: CONFIG_FILE_TYPES = CONFIG_FILE_TYPES.CONFIG_FILE_TYPES_JSON;

function isValidConfigFileType(configFileType: string): boolean {
  return CONFIG_FILE_TYPE_ARRAY.includes(configFileType as unknown as CONFIG_FILE_TYPES);
}

function isValidConfigFileTypes(configFileTypes: string[]): boolean {
  return configFileTypes.every((configFileType) => isValidConfigFileType(configFileType));
}

function convertStringToConfigFileTypes(input: string): CONFIG_FILE_TYPES {
  const type: keyof typeof CONFIG_FILE_TYPES = input.trim() as keyof typeof CONFIG_FILE_TYPES;
  if (!CONFIG_FILE_TYPE_KEYS.includes(type)) {
    throw new Error('Invalid configFile types: ' + input);
  }
  return CONFIG_FILE_TYPES[type];
}

function convertStringToConfigFileTypesArray(input: string): CONFIG_FILE_TYPES[] {
  const typeNames: string[] = input.split(',').map((type) => type.trim());
  const configFileTypes: CONFIG_FILE_TYPES[] = typeNames.map((typeName: string) => {
    if (!CONFIG_FILE_TYPE_KEYS.includes(typeName as keyof typeof CONFIG_FILE_TYPES)) {
      throw new Error('Invalid configFile types: ' + typeName);
    }
    return CONFIG_FILE_TYPES[typeName as keyof typeof CONFIG_FILE_TYPES];
  });
  return configFileTypes;
}

enum CONFIG_FILE_EXTENSIONS {
  CONFIG_FILE_EXTENSIONS_JSON = '.json',
  CONFIG_FILE_EXTENSIONS_YAML = '.yaml',
  CONFIG_FILE_EXTENSIONS_CSV = '.csv',
  CONFIG_FILE_EXTENSIONS_JS = '.js',
  CONFIG_FILE_EXTENSIONS_TS = '.ts',
}

export {
  DEFAULT_CONFIG_NAME,
  CONFIG_FILE_TYPES,
  CONFIG_FILE_TYPE,
  CONFIG_FILE_TYPES_ENUM_KEY_TO_VALUE,
  CONFIG_FILE_TYPES_ENUM_VALUE_TO_KEY,
  CONFIG_FILE_TYPES_ENUM_KEY_TO_KEY,
  CONFIG_FILE_TYPE_ARRAY,
  CONFIG_FILE_TYPE_KEYS,
  DEFAULT_CONFIG_FILE_TYPE,
  isValidConfigFileTypes,
  isValidConfigFileType,
  convertStringToConfigFileTypes,
  convertStringToConfigFileTypesArray,
  CONFIG_FILE_EXTENSIONS,
};
