// Path: src/common/constant/project.constant.ts
// DESC: general project types
'use strict';

export const DEFAULT_SRC_ROOT_PATH = '.'; // ${HOME}/src
export const DEFAULT_PROJECT_SUITE_ROOT_PATH = '${HOME}/src';
export const DEFAULT_PROJECT_SUITE_NAME = 'project-suite';

// enum PROJECT_SUITE_TYPES {
//   PROJECT_SUITE_TYPES_UNSPECIFIED = 0,
//   PROJECT_SUITE_TYPES_SIMPLE = 1,
//   PROJECT_SUITE_TYPES_MINIMAL = 2,
//   PROJECT_SUITE_TYPES_FULL = 3,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_SUITE_TYPES {
  PROJECT_SUITE_TYPES_UNSPECIFIED = 0,
  PROJECT_SUITE_TYPES_SIMPLE = 'simple',
  PROJECT_SUITE_TYPES_MINIMAL = 'minimal',
  PROJECT_SUITE_TYPES_FULL = 'full',
  UNRECOGNIZED = -1,
}

// type PROJECT_SUITE_TYPE = keyof typeof PROJECT_SUITE_TYPES;
type PROJECT_SUITE_TYPE = (typeof PROJECT_SUITE_TYPES)[keyof typeof PROJECT_SUITE_TYPES];

const PROJECT_SUITE_TYPE_ARRAY: PROJECT_SUITE_TYPES[] = Object.values(PROJECT_SUITE_TYPES).filter(
  (value) => typeof value === 'number',
) as PROJECT_SUITE_TYPES[];

const PROJECT_SUITE_TYPE_KEYS: (keyof typeof PROJECT_SUITE_TYPES)[] = Object.keys(
  PROJECT_SUITE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_SUITE_TYPES)[];

const DEFAULT_PROJECT_SUITE_TYPE: PROJECT_SUITE_TYPES =
  PROJECT_SUITE_TYPES.PROJECT_SUITE_TYPES_UNSPECIFIED;

function isValidProjectSuiteType(projectSuiteType: string): boolean {
  return PROJECT_SUITE_TYPE_ARRAY.includes(projectSuiteType as unknown as PROJECT_SUITE_TYPES);
}

function isValidProjectSuiteTypes(projectSuiteTypes: string[]): boolean {
  return projectSuiteTypes.every((projectSuiteType) => isValidProjectSuiteType(projectSuiteType));
}

function convertStringToProjectSuite(input: string): PROJECT_SUITE_TYPES {
  const suite: keyof typeof PROJECT_SUITE_TYPES = input.trim() as keyof typeof PROJECT_SUITE_TYPES;
  if (!PROJECT_SUITE_TYPE_KEYS.includes(suite)) {
    throw new Error('Invalid project suite: ' + input);
  }
  return PROJECT_SUITE_TYPES[suite];
}

function convertStringToProjectSuites(input: string): PROJECT_SUITE_TYPES[] {
  const suiteNames: string[] = input.split(',').map((suite) => suite.trim());
  const suites: PROJECT_SUITE_TYPES[] = suiteNames.map((suiteName: string) => {
    if (!PROJECT_SUITE_TYPE_KEYS.includes(suiteName as keyof typeof PROJECT_SUITE_TYPES)) {
      throw new Error('Invalid project suite: ' + suiteName);
    }
    return PROJECT_SUITE_TYPES[suiteName as keyof typeof PROJECT_SUITE_TYPES];
  });
  return suites;
}

// ----------------------------------------------------------------------------

// enum PROJECT_FRAMEWORK_TYPES {
//   PROJECT_FRAMEWORK_TYPES_UNSPECIFIED = 0,
//   PROJECT_FRAMEWORK_TYPES_NEST = 1,
//   PROJECT_FRAMEWORK_TYPES_REACT = 2,
//   PROJECT_FRAMEWORK_TYPES_ELECTRON = 3,
//   PROJECT_FRAMEWORK_TYPES_NEXT = 4,
//   PROJECT_FRAMEWORK_TYPES_GIN = 5,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_FRAMEWORK_TYPES {
  PROJECT_FRAMEWORK_TYPES_UNSPECIFIED = 0,
  PROJECT_FRAMEWORK_TYPES_NEST = 'nest',
  PROJECT_FRAMEWORK_TYPES_REACT = 'react',
  PROJECT_FRAMEWORK_TYPES_ELECTRON = 'electron',
  PROJECT_FRAMEWORK_TYPES_NEXT = 'next',
  PROJECT_FRAMEWORK_TYPES_GIN = 'gin',
  UNRECOGNIZED = -1,
}

// type PROJECT_FRAMEWORK_TYPE = keyof typeof PROJECT_FRAMEWORK_TYPES;
type PROJECT_FRAMEWORK_TYPE = (typeof PROJECT_FRAMEWORK_TYPES)[keyof typeof PROJECT_FRAMEWORK_TYPES];

const PROJECT_FRAMEWORK_TYPE_ARRAY: PROJECT_FRAMEWORK_TYPES[] = Object.values(
  PROJECT_FRAMEWORK_TYPES,
).filter((value) => typeof value === 'number') as PROJECT_FRAMEWORK_TYPES[];

const PROJECT_FRAMEWORK_TYPE_KEYS: (keyof typeof PROJECT_FRAMEWORK_TYPES)[] = Object.keys(
  PROJECT_FRAMEWORK_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_FRAMEWORK_TYPES)[];

const DEFAULT_PROJECT_FRAMEWORK_TYPE: PROJECT_FRAMEWORK_TYPES =
  PROJECT_FRAMEWORK_TYPES.PROJECT_FRAMEWORK_TYPES_UNSPECIFIED;

function isValidProjectFramework(projectFramework: string): boolean {
  return PROJECT_FRAMEWORK_TYPE_ARRAY.includes(
    projectFramework as unknown as PROJECT_FRAMEWORK_TYPES,
  );
}

function isValidProjectFrameworks(projectFrameworks: string[]): boolean {
  return projectFrameworks.every((projectFramework) => isValidProjectFramework(projectFramework));
}

function convertStringToProjectFramework(input: string): PROJECT_FRAMEWORK_TYPES {
  const framework: keyof typeof PROJECT_FRAMEWORK_TYPES =
    input.trim() as keyof typeof PROJECT_FRAMEWORK_TYPES;
  if (!PROJECT_FRAMEWORK_TYPE_KEYS.includes(framework)) {
    throw new Error('Invalid project framework: ' + input);
  }
  return PROJECT_FRAMEWORK_TYPES[framework];
}

function convertStringToProjectFrameworks(input: string): PROJECT_FRAMEWORK_TYPES[] {
  const frameworkNames: string[] = input.split(',').map((framework) => framework.trim());
  const frameworks: PROJECT_FRAMEWORK_TYPES[] = frameworkNames.map((frameworkName: string) => {
    if (
      !PROJECT_FRAMEWORK_TYPE_KEYS.includes(frameworkName as keyof typeof PROJECT_FRAMEWORK_TYPES)
    ) {
      throw new Error('Invalid project framework: ' + frameworkName);
    }
    return PROJECT_FRAMEWORK_TYPES[frameworkName as keyof typeof PROJECT_FRAMEWORK_TYPES];
  });
  return frameworks;
}

// ----------------------------------------------------------------------------

// enum PROJECT_LANGUAGE_TYPES {
//   PROJECT_LANGUAGE_TYPES_UNSPECIFIED = 0,
//   PROJECT_LANGUAGE_TYPES_GO = 1,
//   PROJECT_LANGUAGE_TYPES_PYTHON3 = 2,
//   PROJECT_LANGUAGE_TYPES_RUST = 3,
//   PROJECT_LANGUAGE_TYPES_TYPESCRIPT = 4,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_LANGUAGE_TYPES {
  PROJECT_LANGUAGE_TYPES_UNSPECIFIED = 0,
  PROJECT_LANGUAGE_TYPES_GO = 'go',
  PROJECT_LANGUAGE_TYPES_PYTHON3 = 'python3',
  PROJECT_LANGUAGE_TYPES_RUST = 'rust',
  PROJECT_LANGUAGE_TYPES_TYPESCRIPT = 'typescript',
  UNRECOGNIZED = -1,
}

// type PROJECT_LANGUAGE_TYPE = keyof typeof PROJECT_LANGUAGE_TYPES;
type PROJECT_LANGUAGE_TYPE = (typeof PROJECT_LANGUAGE_TYPES)[keyof typeof PROJECT_LANGUAGE_TYPES];

const PROJECT_LANGUAGE_TYPE_ARRAY: PROJECT_LANGUAGE_TYPES[] = Object.values(
  PROJECT_LANGUAGE_TYPES,
).filter((value) => typeof value === 'number') as PROJECT_LANGUAGE_TYPES[];

const PROJECT_LANGUAGE_TYPE_KEYS: (keyof typeof PROJECT_LANGUAGE_TYPES)[] = Object.keys(
  PROJECT_LANGUAGE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_LANGUAGE_TYPES)[];

const DEFAULT_PROJECT_LANGUAGE_TYPE: PROJECT_LANGUAGE_TYPES =
  PROJECT_LANGUAGE_TYPES.PROJECT_LANGUAGE_TYPES_UNSPECIFIED;

function isValidProjectLanguage(projectLanguage: string): boolean {
  return PROJECT_LANGUAGE_TYPE_ARRAY.includes(projectLanguage as unknown as PROJECT_LANGUAGE_TYPES);
}

function isValidProjectLanguages(projectLanguages: string[]): boolean {
  return projectLanguages.every((projectLanguage) => isValidProjectLanguage(projectLanguage));
}

function convertStringToProjectLanguage(input: string): PROJECT_LANGUAGE_TYPES {
  const language: keyof typeof PROJECT_LANGUAGE_TYPES =
    input.trim() as keyof typeof PROJECT_LANGUAGE_TYPES;
  if (!PROJECT_LANGUAGE_TYPE_KEYS.includes(language)) {
    throw new Error('Invalid project language: ' + input);
  }
  return PROJECT_LANGUAGE_TYPES[language];
}

function convertStringToProjectLanguages(input: string): PROJECT_LANGUAGE_TYPES[] {
  const languageNames: string[] = input.split(',').map((language) => language.trim());
  const languages: PROJECT_LANGUAGE_TYPES[] = languageNames.map((languageName: string) => {
    if (!PROJECT_LANGUAGE_TYPE_KEYS.includes(languageName as keyof typeof PROJECT_LANGUAGE_TYPES)) {
      throw new Error('Invalid project language: ' + languageName);
    }
    return PROJECT_LANGUAGE_TYPES[languageName as keyof typeof PROJECT_LANGUAGE_TYPES];
  });
  return languages;
}

// ----------------------------------------------------------------------------

// enum PROJECT_TEMPLATE_TYPES {
//   PROJECT_TEMPLATE_TYPES_UNSPECIFIED = 0,
//   PROJECT_TEMPLATE_TYPES_BROWSER_EXTENSION = 1,
//   PROJECT_TEMPLATE_TYPES_CLI = 2,
//   PROJECT_TEMPLATE_TYPES_COMMON = 3,
//   PROJECT_TEMPLATE_TYPES_DESKTOP_APP = 4,
//   PROJECT_TEMPLATE_TYPES_DOCUMENT = 5,
//   PROJECT_TEMPLATE_TYPES_LIBRARY = 6,
//   PROJECT_TEMPLATE_TYPES_MOBILE_APP = 7,
//   PROJECT_TEMPLATE_TYPES_SERVICE = 8,
//   PROJECT_TEMPLATE_TYPES_VSCODE_EXTENSION = 9,
//   PROJECT_TEMPLATE_TYPES_WEB_APP = 10,
//   UNRECOGNIZED = -1,
// }

enum PROJECT_TEMPLATE_TYPES {
  PROJECT_TEMPLATE_TYPES_UNSPECIFIED = 0,
  PROJECT_TEMPLATE_TYPES_BROWSER_EXTENSION = 'browser-extension',
  PROJECT_TEMPLATE_TYPES_CLI = 'cli',
  PROJECT_TEMPLATE_TYPES_COMMON = 'common',
  PROJECT_TEMPLATE_TYPES_DESKTOP_APP = 'desktop-app',
  PROJECT_TEMPLATE_TYPES_DOCUMENT = 'document',
  PROJECT_TEMPLATE_TYPES_LIBRARY = 'library',
  PROJECT_TEMPLATE_TYPES_MOBILE_APP = 'mobile-app',
  PROJECT_TEMPLATE_TYPES_SERVICE = 'service',
  PROJECT_TEMPLATE_TYPES_VSCODE_EXTENSION = 'vscode-extension',
  PROJECT_TEMPLATE_TYPES_WEB_APP = 'web-app',
  UNRECOGNIZED = -1,
}

// type PROJECT_TEMPLATE_TYPE = keyof typeof PROJECT_TEMPLATE_TYPES;
type PROJECT_TEMPLATE_TYPE = (typeof PROJECT_TEMPLATE_TYPES)[keyof typeof PROJECT_TEMPLATE_TYPES];

const PROJECT_TEMPLATE_TYPE_ARRAY: PROJECT_TEMPLATE_TYPES[] = Object.values(
  PROJECT_TEMPLATE_TYPES,
).filter((value) => typeof value === 'number') as PROJECT_TEMPLATE_TYPES[];

const PROJECT_TEMPLATE_TYPE_KEYS: (keyof typeof PROJECT_TEMPLATE_TYPES)[] = Object.keys(
  PROJECT_TEMPLATE_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof PROJECT_TEMPLATE_TYPES)[];

const DEFAULT_PROJECT_TEMPLATE_TYPE: PROJECT_TEMPLATE_TYPES =
  PROJECT_TEMPLATE_TYPES.PROJECT_TEMPLATE_TYPES_UNSPECIFIED;

function isValidProjectTemplate(projectTemplate: string): boolean {
  return PROJECT_TEMPLATE_TYPE_ARRAY.includes(projectTemplate as unknown as PROJECT_TEMPLATE_TYPES);
}

function isValidProjectTemplates(projectTemplates: string[]): boolean {
  return projectTemplates.every((projectTemplate) => isValidProjectTemplate(projectTemplate));
}

function convertStringToProjectTemplate(input: string): PROJECT_TEMPLATE_TYPES {
  const template: keyof typeof PROJECT_TEMPLATE_TYPES =
    input.trim() as keyof typeof PROJECT_TEMPLATE_TYPES;
  if (!PROJECT_TEMPLATE_TYPE_KEYS.includes(template)) {
    throw new Error('Invalid project template: ' + input);
  }
  return PROJECT_TEMPLATE_TYPES[template];
}

function convertStringToProjectTemplates(input: string): PROJECT_TEMPLATE_TYPES[] {
  const templateNames: string[] = input.split(',').map((template) => template.trim());
  const templates: PROJECT_TEMPLATE_TYPES[] = templateNames.map((templateName: string) => {
    if (!PROJECT_TEMPLATE_TYPE_KEYS.includes(templateName as keyof typeof PROJECT_TEMPLATE_TYPES)) {
      throw new Error('Invalid project template: ' + templateName);
    }
    return PROJECT_TEMPLATE_TYPES[templateName as keyof typeof PROJECT_TEMPLATE_TYPES];
  });
  return templates;
}

export {
  PROJECT_SUITE_TYPES,
  PROJECT_SUITE_TYPE,
  PROJECT_SUITE_TYPE_ARRAY,
  PROJECT_SUITE_TYPE_KEYS,
  DEFAULT_PROJECT_SUITE_TYPE,
  isValidProjectSuiteType,
  isValidProjectSuiteTypes,
  convertStringToProjectSuite,
  convertStringToProjectSuites,
  PROJECT_FRAMEWORK_TYPES,
  PROJECT_FRAMEWORK_TYPE,
  PROJECT_FRAMEWORK_TYPE_ARRAY,
  PROJECT_FRAMEWORK_TYPE_KEYS,
  DEFAULT_PROJECT_FRAMEWORK_TYPE,
  isValidProjectFramework,
  isValidProjectFrameworks,
  convertStringToProjectFramework,
  convertStringToProjectFrameworks,
  PROJECT_LANGUAGE_TYPES,
  PROJECT_LANGUAGE_TYPE,
  PROJECT_LANGUAGE_TYPE_ARRAY,
  PROJECT_LANGUAGE_TYPE_KEYS,
  DEFAULT_PROJECT_LANGUAGE_TYPE,
  isValidProjectLanguage,
  isValidProjectLanguages,
  convertStringToProjectLanguage,
  convertStringToProjectLanguages,
  PROJECT_TEMPLATE_TYPES,
  PROJECT_TEMPLATE_TYPE,
  PROJECT_TEMPLATE_TYPE_ARRAY,
  PROJECT_TEMPLATE_TYPE_KEYS,
  DEFAULT_PROJECT_TEMPLATE_TYPE,
  isValidProjectTemplate,
  isValidProjectTemplates,
  convertStringToProjectTemplate,
  convertStringToProjectTemplates,
};

// ----------------------------------------------------------------------------
