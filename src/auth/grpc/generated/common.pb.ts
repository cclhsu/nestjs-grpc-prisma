/* eslint-disable */

export const protobufPackage = "common";

export enum generalStatusTypes {
  GENERAL_STATUS_TYPES_UNSPECIFIED = 0,
  GENERAL_STATUS_TYPES_INACTIVE = 1,
  GENERAL_STATUS_TYPES_ACTIVE = 2,
  GENERAL_STATUS_TYPES_PLANNED = 3,
  GENERAL_STATUS_TYPES_TODO = 4,
  GENERAL_STATUS_TYPES_IN_PROGRESS = 5,
  GENERAL_STATUS_TYPES_DONE = 6,
  GENERAL_STATUS_TYPES_COMPLETED = 7,
  GENERAL_STATUS_TYPES_CANCELLED = 8,
  GENERAL_STATUS_TYPES_UNRECOGNIZED = -1,
  UNRECOGNIZED = -1,
}

export enum projectRoleTypes {
  PROJECT_ROLE_TYPES_UNSPECIFIED = 0,
  PROJECT_ROLE_TYPES_PM = 1,
  PROJECT_ROLE_TYPES_EM = 2,
  PROJECT_ROLE_TYPES_DEV = 3,
  PROJECT_ROLE_TYPES_QA = 4,
  PROJECT_ROLE_TYPES_BA = 5,
  PROJECT_ROLE_TYPES_UX = 6,
  PROJECT_ROLE_TYPES_O = 7,
  PROJECT_ROLE_TYPES_UNRECOGNIZED = -1,
  UNRECOGNIZED = -1,
}

export enum relationTypes {
  RELATION_TYPES_UNSPECIFIED = 0,
  RELATION_TYPES_PARENT = 1,
  RELATION_TYPES_SUBTASKS = 2,
  RELATION_TYPES_PREDECESSORS = 3,
  RELATION_TYPES_SUCCESSORS = 4,
  RELATION_TYPES_RELATES_TO = 5,
  RELATION_TYPES_BLOCKED_BY = 6,
  RELATION_TYPES_UNRECOGNIZED = -1,
  UNRECOGNIZED = -1,
}

export enum scrumRoleTypes {
  SCRUM_ROLE_TYPES_UNSPECIFIED = 0,
  SCRUM_ROLE_TYPES_PO = 1,
  SCRUM_ROLE_TYPES_SM = 2,
  SCRUM_ROLE_TYPES_MEMBER = 3,
  SCRUM_ROLE_TYPES_O = 4,
  SCRUM_ROLE_TYPES_UNRECOGNIZED = -1,
  UNRECOGNIZED = -1,
}

export interface Comment {
  ID: string;
  UUID: string;
  content: string;
  updatedBy: string;
  updatedAt: string;
}

export interface CommonDate {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  startedAt?: string | undefined;
  startedBy?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  completedAt?: string | undefined;
  completedBy?: string | undefined;
}

export interface Duration {
  ID: string;
  UUID: string;
  startDate: string;
  endDate: string;
}

export interface IdUuidStatus {
  ID: string;
  UUID: string;
  status: generalStatusTypes;
}

export interface IdUuid {
  ID: string;
  UUID: string;
}

export interface NameUrl {
  name: string;
  url: string;
}

export interface Pagination {
  skip: number;
  take: number;
}

export interface Relation {
  UUID: string;
  relationType: relationTypes;
  sourceUUID: string;
  targetUUID: string;
  createdAt: string;
  updatedAt: string;
}

export const COMMON_PACKAGE_NAME = "common";
