// Path: src/common/constant/regexp.constant.ts
// DESC: general regexp types
'use strict';

export const VALID_ID_REGEXP = [
  /^[a-z]+\.[a-z]+\d*$/,
  /^[a-z]+.[a-z]+\..*$/,
  /^[A-Z]{3}$/,
  /^[A-Z]{3}-\d{4}$/,
  /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? .*$/,
  /^[A-Z]{3}:\d{4}\/\d{2}\/\d{2}-\d{4}\/\d{2}\/\d{2}$/,
];

// export const VALID_UUID_REGEXP = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;
export const VALID_UUID_REGEXP =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const VALID_URL_REGEXP = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

export const VALID_EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export const VALID_PHONE_REGEXP = [/^\+?[0-9]{10,14}$/, /^\d{4}-\d{3}-\d{3}$/];

export const VALID_PASSWORD_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const VALID_DATE_REGEXP = [
  /^\d{4}\/\d{2}\/\d{2}$/,
  /^\d{2}\/\d{2}\/\d{4}$/,
  /^\d{4}-\d{2}-\d{2}$/,
  /^(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat) (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} (GMT|UTC)[+-]\d{4} \(.*\)$/,
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
  /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}, (0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/,
];

export const COMMIT_MSG_REGEXP =
  /^\[[A-Z]{3}-\d{4}\] (fix|feat|BREAKING CHANGE|chore|docs|style|refactor|perf|test): .+$/;

export const STORY_TITLE_REGEXP = /^[A-Z][A-Za-z]+(: [A-Z][a-z]+)? .*$/;

export const STORY_DESCRIPTION_REGEXP =
  /^As a .+, I want to .+( and .+)?, so that .+( and .+)?\.$/i;

export const ACCEPTANCE_CRITERION_REGEXP = /^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i;

export const DEFINITION_OF_DONE_REGEXP = /^Given .+, when .+( and .+)?, then .+( and .+)?\.$/i;
