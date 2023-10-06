// Path: src/common/constant/document.constant.ts
// DESC: general document types
'use strict';

// const DEFAULT_DOCUMENT_FILE_PATH = '.';

// enum DOCUMENT_TEMPLATE_TYPES {
//   DOCUMENT_TEMPLATE_TYPES_UNSPECIFIED = 0,
//   DOCUMENT_TEMPLATE_TYPES_DEPLOYMENT_PLAN = 'deployment_plan',
//   DOCUMENT_TEMPLATE_TYPES_HLD = 'hld',
//   DOCUMENT_TEMPLATE_TYPES_NOTE = 'note',
//   DOCUMENT_TEMPLATE_TYPES_PRD = 'prd',
//   DOCUMENT_TEMPLATE_TYPES_RELEASE_NOTE = 'release_note',
//   DOCUMENT_TEMPLATE_TYPES_RELEASE_PLAN = 'release_plan',
//   DOCUMENT_TEMPLATE_TYPES_RFC = 'rfc',
//   DOCUMENT_TEMPLATE_TYPES_SDD = 'sdd',
//   DOCUMENT_TEMPLATE_TYPES_TEST_CASE = 'test_case',
//   DOCUMENT_TEMPLATE_TYPES_TEST_PLAN = 'test_plan',
//   DOCUMENT_TEMPLATE_TYPES_UML = 'uml',
//   UNRECOGNIZED = -1,
// }

// // type DOCUMENT_TEMPLATE_TYPE = keyof typeof DOCUMENT_TEMPLATE_TYPES;
// type DOCUMENT_TEMPLATE_TYPE = (typeof DOCUMENT_TEMPLATE_TYPES)[keyof typeof DOCUMENT_TEMPLATE_TYPES];

// const DOCUMENT_TEMPLATE_TYPE_ARRAY: DOCUMENT_TEMPLATE_TYPES[] = Object.values(
//   DOCUMENT_TEMPLATE_TYPES,
// ).filter((value) => typeof value === 'number') as DOCUMENT_TEMPLATE_TYPES[];

// const DOCUMENT_TEMPLATE_TYPE_KEYS: (keyof typeof DOCUMENT_TEMPLATE_TYPES)[] = Object.keys(
//   DOCUMENT_TEMPLATE_TYPES,
// ).filter((key) => isNaN(Number(key))) as (keyof typeof DOCUMENT_TEMPLATE_TYPES)[];

// const DEFAULT_DOCUMENT_TEMPLATE: DOCUMENT_TEMPLATE_TYPES =
//   DOCUMENT_TEMPLATE_TYPES.DOCUMENT_TEMPLATE_TYPES_UNSPECIFIED;

// function convertStringToDocumentTemplate(input: string): DOCUMENT_TEMPLATE_TYPES {
//   const template: keyof typeof DOCUMENT_TEMPLATE_TYPES =
//     input.trim() as keyof typeof DOCUMENT_TEMPLATE_TYPES;
//   if (!DOCUMENT_TEMPLATE_TYPE_KEYS.includes(template)) {
//     throw new Error('Invalid document template: ' + input);
//   }
//   return DOCUMENT_TEMPLATE_TYPES[template];
// }

// function convertStringToDocumentTemplates(input: string): DOCUMENT_TEMPLATE_TYPES[] {
//   const templateNames: string[] = input.split(',').map((template) => template.trim());
//   const templates: DOCUMENT_TEMPLATE_TYPES[] = templateNames.map((templateName: string) => {
//     if (
//       !DOCUMENT_TEMPLATE_TYPE_KEYS.includes(templateName as keyof typeof DOCUMENT_TEMPLATE_TYPES)
//     ) {
//       throw new Error('Invalid document template: ' + templateName);
//     }
//     return DOCUMENT_TEMPLATE_TYPES[templateName as keyof typeof DOCUMENT_TEMPLATE_TYPES];
//   });
//   return templates;
// }

// enum DOCUMENT_TEMPLATE_FILE_NAMES {
//   DOCUMENT_TEMPLATE_TYPES_DEPLOYMENT_PLAN = 'deployment_plan',
//   DOCUMENT_TEMPLATE_TYPES_HLD = 'hld',
//   DOCUMENT_TEMPLATE_TYPES_NOTE = 'note',
//   DOCUMENT_TEMPLATE_TYPES_PRD = 'prd',
//   DOCUMENT_TEMPLATE_TYPES_RELEASE_NOTE = 'release_note',
//   DOCUMENT_TEMPLATE_TYPES_RELEASE_PLAN = 'release_plan',
//   DOCUMENT_TEMPLATE_TYPES_RFC = 'rfc',
//   DOCUMENT_TEMPLATE_TYPES_SDD = 'sdd',
//   DOCUMENT_TEMPLATE_TYPES_TEST_CASE = 'test_case',
//   DOCUMENT_TEMPLATE_TYPES_TEST_PLAN = 'test_plan',
//   DOCUMENT_TEMPLATE_TYPES_UML = 'uml',
// }

// enum PROJECT_DOCUMENT_DIRECTORIES {
//   PROJECT_DOCUMENT_DIRECTORIES_AGILE_BOARD = 'agile-board',
//   PROJECT_DOCUMENT_DIRECTORIES_DESIGN_DOCUMENT = 'design-document',
//   PROJECT_DOCUMENT_DIRECTORIES_TEST_PLAN = 'test-plan',
//   PROJECT_DOCUMENT_DIRECTORIES_TEST_REPORT = 'test-report',
//   PROJECT_DOCUMENT_DIRECTORIES_RELEASE_PLAN = 'release-plan',
//   PROJECT_DOCUMENT_DIRECTORIES_RELEASE_NOTE = 'release-note',
//   PROJECT_DOCUMENT_DIRECTORIES_NOTE = 'note',
// }

// enum PROJECT_NOTE_FILES {
//   PROJECT_NOTE_FILES_ENVIRONMENT_SETUP = 'environment_setup',
//   PROJECT_NOTE_FILES_PROJECT_SETUP = 'project_setup',
//   PROJECT_NOTE_FILES_PROJECT_STRUCTURE = 'project_structure',
//   PROJECT_NOTE_FILES_PROJECT_CONFIGURATION = 'project_configuration',
//   PROJECT_NOTE_FILES_PROJECT_IMPLEMENTATION = 'project_implementation',
//   PROJECT_NOTE_FILES_PROJECT_TESTING = 'project_testing',
//   PROJECT_NOTE_FILES_PROJECT_DEPLOYMENT = 'project_deployment',
//   PROJECT_NOTE_FILES_PROJECT_DOCUMENTATION = 'project_documentation',
//   PROJECT_NOTE_FILES_PROJECT_MAINTENANCE = 'project_maintenance',
//   PROJECT_NOTE_FILES_PROJECT_MONITORING = 'project_monitoring',
//   PROJECT_NOTE_FILES_PROJECT_SECURITY = 'project_security',
//   PROJECT_NOTE_FILES_PROJECT_PERFORMANCE = 'project_performance',
// }

// export {
//   DEFAULT_DOCUMENT_FILE_PATH,
//   DOCUMENT_TEMPLATE_TYPES,
//   DOCUMENT_TEMPLATE_TYPE,
//   DOCUMENT_TEMPLATE_TYPE_ARRAY,
//   DOCUMENT_TEMPLATE_TYPE_KEYS,
//   DEFAULT_DOCUMENT_TEMPLATE,
//   convertStringToDocumentTemplate,
//   convertStringToDocumentTemplates,
//   DOCUMENT_TEMPLATE_FILE_NAMES,
//   PROJECT_DOCUMENT_DIRECTORIES,
//   PROJECT_NOTE_FILES,
// };

// ----------------------------------------------------------------------------

export const DEFAULT_DOCUMENT_FILE_PATH = '.';
export const DOCUMENT_TEMPLATE_TYPES = [
  // 'api',
  // 'architecture',
  // 'changelog',
  // 'code-of-conduct',
  // 'contributing',
  // 'deployment-plan',
  // 'high-level-design',
  // 'issue-template',
  // 'license',
  // 'low-level-design',
  // 'product-backlog',
  // 'product-design',
  // 'product-requirements',
  // 'pull-request-template',
  // 'readme',
  // 'release-notes',
  // 'release-plan',
  // 'roadmap',
  // 'security',
  // 'software-design',
  // 'software-requirements',
  // 'support',
  // 'todo',
  // 'test-plan',
  // 'test-report',
  // 'user-guide',
  // 'user-stories',
  // 'use-case',
  // 'unified-modelling-language',
  // 'versioning',
  // 'wiki',
  'deployment_plan',
  'hld',
  'note',
  'prd',
  'release_note',
  'release_plan',
  'rfc',
  'sdd',
  'test_case',
  'test_plan',
  'uml',
];

export const PROJECT_DOCUMENT_DIRECTORIES = [
  'agile-board',
  'design-document',
  'test-plan',
  'test-report',
  'release-plan',
  'release-note',
  'note',
];

export const PROJECT_NOTE_FILES = [
  // 'changelog',
  // 'code-of-conduct',
  // 'contributing',
  // 'issue-template',
  // 'license',
  // 'pull-request-template',
  // 'readme',
  // 'roadmap',
  // 'security',
  // 'support',
  // 'todo',
  // 'user-guide',
  // 'versioning',
  // 'wiki',
  'environment_setup',
  'project_setup',
  'project_structure',
  'project_configuration',
  'project_implementation',
  'project_testing',
  'project_deployment',
  'project_documentation',
  'project_maintenance',
  'project_monitoring',
  'project_security',
  'project_performance',
];
