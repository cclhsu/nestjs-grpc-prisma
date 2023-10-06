import G from 'glob';
// Path: src/common/constant/git.constant.ts
// DESC: general git provider types
('use strict');
// enum GIT_PROVIDER_TYPES {
//   GIT_PROVIDER_TYPES_UNSPECIFIED = 0,
//   GIT_PROVIDER_TYPES_GITHUB = 1,
//   GIT_PROVIDER_TYPES_GITLAB = 2,
//   GIT_PROVIDER_TYPES_BITBUCKET = 3,
//   GIT_PROVIDER_TYPES_LOCAL = 4,
//   GIT_PROVIDER_TYPES_MYPROJECT = 5,
//   UNRECOGNIZED = -1,
// }

enum GIT_PROVIDER_TYPES {
  GIT_PROVIDER_TYPES_UNSPECIFIED = 'unspecified',
  GIT_PROVIDER_TYPES_GITHUB = 'github.com',
  GIT_PROVIDER_TYPES_GITLAB = 'gitlab.com',
  GIT_PROVIDER_TYPES_BITBUCKET = 'bitbucket.org',
  GIT_PROVIDER_TYPES_LOCAL = 'local',
  GIT_PROVIDER_TYPES_MYPROJECT = 'mypProject',
}

// type GIT_PROVIDER_TYPE = keyof typeof GIT_PROVIDER_TYPES;
type GIT_PROVIDER_TYPE = (typeof GIT_PROVIDER_TYPES)[keyof typeof GIT_PROVIDER_TYPES];

const GIT_PROVIDER_TYPE_ARRAY: GIT_PROVIDER_TYPES[] = Object.values(GIT_PROVIDER_TYPES).filter(
  (value) => typeof value === 'number',
) as GIT_PROVIDER_TYPES[];

const GIT_PROVIDER_TYPE_KEYS: (keyof typeof GIT_PROVIDER_TYPES)[] = Object.keys(
  GIT_PROVIDER_TYPES,
).filter((key) => isNaN(Number(key))) as (keyof typeof GIT_PROVIDER_TYPES)[];

const DEFAULT_GIT_PROVIDER_TYPE: GIT_PROVIDER_TYPES = GIT_PROVIDER_TYPES.GIT_PROVIDER_TYPES_UNSPECIFIED;

function convertStringToGitProvider(input: string): GIT_PROVIDER_TYPES {
  const provider: keyof typeof GIT_PROVIDER_TYPES = input.trim() as keyof typeof GIT_PROVIDER_TYPES;
  if (!GIT_PROVIDER_TYPE_KEYS.includes(provider)) {
    throw new Error('Invalid git provider: ' + input);
  }
  return GIT_PROVIDER_TYPES[provider];
}

function convertStringToGitProviders(input: string): GIT_PROVIDER_TYPES[] {
  const providerNames: string[] = input.split(',').map((provider) => provider.trim());
  const providers: GIT_PROVIDER_TYPES[] = providerNames.map((providerName: string) => {
    if (!GIT_PROVIDER_TYPE_KEYS.includes(providerName as keyof typeof GIT_PROVIDER_TYPES)) {
      throw new Error('Invalid git provider: ' + providerName);
    }
    return GIT_PROVIDER_TYPES[providerName as keyof typeof GIT_PROVIDER_TYPES];
  });
  return providers;
}

enum GIT_PROVIDER_URLS {
  GIT_PROVIDER_TYPES_GITHUB = 'https://github.com',
  GIT_PROVIDER_TYPES_GITLAB = 'https://gitlab.com',
  GIT_PROVIDER_TYPES_BITBUCKET = 'https://bitbucket.org',
  GIT_PROVIDER_TYPES_LOCAL = 'http://0.0.0.0:3001',
  GIT_PROVIDER_TYPES_MYPROJECT = 'http://0.0.0.0:3002',
}

enum GIT_PROVIDER_API_URLS {
  GIT_PROVIDER_TYPES_GITHUB = 'https://api.github.com',
  GIT_PROVIDER_TYPES_GITLAB = 'https://gitlab.com/api/v4',
  GIT_PROVIDER_TYPES_BITBUCKET = 'https://api.bitbucket.org/2.0',
  GIT_PROVIDER_TYPES_LOCAL = 'http://0.0.0.0:3001/api/v1',
  GIT_PROVIDER_TYPES_MYPROJECT = 'http://0.0.0.0:3002/api/v1',
}

enum GIT_PROVIDER_BRANCHES_FOR_STAGE {
  GIT_PROVIDER_BRANCHES_FOR_STAGE_UNSPECIFIED = 'unspecified',
  GIT_PROVIDER_BRANCHES_FOR_STAGE_INIT = 'main',
  // GIT_PROVIDER_BRANCHES_FOR_MAIN = 'main',
  GIT_PROVIDER_BRANCHES_FOR_DEVELOP = 'develop',
  GIT_PROVIDER_BRANCHES_FOR_FEATURE = 'feature',
  GIT_PROVIDER_BRANCHES_FOR_RELEASE = 'release',
  GIT_PROVIDER_BRANCHES_FOR_HOTFIX = 'hotfix',
  GIT_PROVIDER_BRANCHES_FOR_BUGFIX = 'bugfix',
  GIT_PROVIDER_BRANCHES_FOR_SUPPORT = 'support',
  GIT_PROVIDER_BRANCHES_FOR_GO = 'go',
  GIT_PROVIDER_BRANCHES_FOR_PYTHON3 = 'python3',
  GIT_PROVIDER_BRANCHES_FOR_RUST = 'rust',
  GIT_PROVIDER_BRANCHES_FOR_TYPESCRIPT = 'typescript',
  UNRECOGNIZED = 'unrecognized',
}
const DEFAULT_INIT_BRANCH = GIT_PROVIDER_BRANCHES_FOR_STAGE.GIT_PROVIDER_BRANCHES_FOR_STAGE_INIT;
const DEFAULT_BRANCHES = [
  // DEFAULT_INIT_BRANCH,
  // DEFAULT_DEVELOP_BRANCH,
  // DEFAULT_FEATURE_BRANCH_PREFIX,
  // DEFAULT_RELEASE_BRANCH_PREFIX,
  // DEFAULT_HOTFIX_BRANCH_PREFIX,
  // DEFAULT_BUGFIX_BRANCH_PREFIX,
  // DEFAULT_SUPPORT_BRANCH_PREFIX,
  GIT_PROVIDER_BRANCHES_FOR_STAGE.GIT_PROVIDER_BRANCHES_FOR_GO,
  GIT_PROVIDER_BRANCHES_FOR_STAGE.GIT_PROVIDER_BRANCHES_FOR_PYTHON3,
  GIT_PROVIDER_BRANCHES_FOR_STAGE.GIT_PROVIDER_BRANCHES_FOR_RUST,
  GIT_PROVIDER_BRANCHES_FOR_STAGE.GIT_PROVIDER_BRANCHES_FOR_TYPESCRIPT,
];

enum GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION {
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_UNSPECIFIED = 'unspecified',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_INIT = '[PPP-XXXX] init: Initial commit',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_DEVELOP = '[PPP-XXXX] chore: Initial commit',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_FEATURE = '[PPP-XXXX] feat: ',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_RELEASE = '[PPP-XXXX] release: ',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_HOTFIX = '[PPP-XXXX] hotfix: ',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_BUGFIX = '[PPP-XXXX] bugfix: ',
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_SUPPORT = '[PPP-XXXX] support: ',
  UNRECOGNIZED = 'unrecognized',
}
const DEFAULT_INIT_COMMIT_MSG =
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION.GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION_INIT;

enum GIT_PROVIDER_BRANCH_PREFIXES {
  GIT_PROVIDER_TYPES_GO = 'go',
  GIT_PROVIDER_TYPES_PYTHON3 = 'python3',
  GIT_PROVIDER_TYPES_RUST = 'rust',
  GIT_PROVIDER_TYPES_TYPESCRIPT = 'typescript',
}

export {
  GIT_PROVIDER_TYPES,
  GIT_PROVIDER_TYPE,
  GIT_PROVIDER_TYPE_ARRAY,
  GIT_PROVIDER_TYPE_KEYS,
  DEFAULT_GIT_PROVIDER_TYPE,
  convertStringToGitProvider,
  convertStringToGitProviders,
  GIT_PROVIDER_URLS,
  GIT_PROVIDER_API_URLS,
  GIT_PROVIDER_BRANCHES_FOR_STAGE,
  DEFAULT_INIT_BRANCH,
  DEFAULT_BRANCHES,
  GIT_PROVIDER_COMMIT_MSGS_FOR_ACTION,
  DEFAULT_INIT_COMMIT_MSG,
  GIT_PROVIDER_BRANCH_PREFIXES,
};

// ----------------------------------------------------------------------------

// 'use strict';
// export type GIT_PROVIDER_TYPES =
//   | 'github.com'
//   | 'gitlab.com'
//   | 'bitbucket.org'
//   | 'local'
//   | 'mypProject';
// export const GIT_PROVIDER_TYPE_ARRAY = [
//   'github.com',
//   'gitlab.com',
//   'bitbucket.org',
//   'local',
//   'mypProject',
// ];
// export const DEFAULT_GIT_PROVIDER = 'local'; // 'github.com' | 'myProject' | 'local'
// export enum GIT_PROVIDER_ENUM_KEY_TO_KEY {
//   GITHUB = 'GitHub',
//   GITLAB = 'GitLab',
//   BITBUCKET = 'Bitbucket',
//   LOCAL = 'Local',
//   MYPROJECT = 'MyProject',
// }
// export const GIT_PROVIDER_ENUM_KEY_TO_VALUE = {
//   [GIT_PROVIDER_ENUM_KEY_TO_KEY.GITHUB]: 'github.com',
//   [GIT_PROVIDER_ENUM_KEY_TO_KEY.GITLAB]: 'gitlab.com',
//   [GIT_PROVIDER_ENUM_KEY_TO_KEY.BITBUCKET]: 'bitbucket.org',
//   [GIT_PROVIDER_ENUM_KEY_TO_KEY.LOCAL]: 'local',
//   [GIT_PROVIDER_ENUM_KEY_TO_KEY.MYPROJECT]: 'mypProject',
// };

// export const GIT_PROVIDER_URLS = {
//   'github.com': 'https://github.com',
//   'gitlab.com': 'https://gitlab.com',
//   'bitbucket.com': 'https://bitbucket.org',
//   mypProject: 'http://0.0.0.0:3001',
//   local: 'http://0.0.0.0:3001',
// };
// export const DEFAULT_GIT_PROVIDER_URL = GIT_PROVIDER_URLS[DEFAULT_GIT_PROVIDER];

// export const GIT_PROVIDER_API_URLS = {
//   'github.com': 'https://api.github.com',
//   'gitlab.com': 'https://gitlab.com/api/v4',
//   'bitbucket.org': 'https://api.bitbucket.org/2.0',
//   mypProject: 'http://0.0.0.0:3001/api/v1',
//   local: 'http://0.0.0.0:3001/api/v1',
// };
// export const DEFAULT_GIT_PROVIDER_API_URL = GIT_PROVIDER_API_URLS[DEFAULT_GIT_PROVIDER];

// export const DEFAULT_INIT_BRANCH = 'main';
// export const DEFAULT_INIT_COMMIT_MSG = '[PPP-XXXX] chore: Initial commit';
// export const DEFAULT_DEVELOP_BRANCH = 'develop';
// export const DEFAULT_FEATURE_BRANCH_PREFIX = 'feature';
// export const DEFAULT_RELEASE_BRANCH_PREFIX = 'release';
// export const DEFAULT_HOTFIX_BRANCH_PREFIX = 'hotfix';
// export const DEFAULT_BUGFIX_BRANCH_PREFIX = 'bugfix';
// export const DEFAULT_SUPPORT_BRANCH_PREFIX = 'support';
// export const DEFAULT_GO_BRANCH = 'go';
// export const DEFAULT_PYTHON3_BRANCH = 'python3';
// export const DEFAULT_RUST_BRANCH = 'rust';
// export const DEFAULT_TYPESCRIPT_BRANCH = 'typescript';
// export const DEFAULT_BRANCHES = [
//   // DEFAULT_INIT_BRANCH,
//   // DEFAULT_DEVELOP_BRANCH,
//   // DEFAULT_FEATURE_BRANCH_PREFIX,
//   // DEFAULT_RELEASE_BRANCH_PREFIX,
//   // DEFAULT_HOTFIX_BRANCH_PREFIX,
//   // DEFAULT_BUGFIX_BRANCH_PREFIX,
//   // DEFAULT_SUPPORT_BRANCH_PREFIX,
//   DEFAULT_GO_BRANCH,
//   DEFAULT_PYTHON3_BRANCH,
//   DEFAULT_RUST_BRANCH,
//   DEFAULT_TYPESCRIPT_BRANCH,
// ];
