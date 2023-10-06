// Path: src/services/api/api.config.ts
// DESC: API configuration
'use strict';

import { API_BASE_URL } from '../../common/config/config.browser';

// Helper function to construct the API URL
export function getApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

// Hello endpoints
export const HelloEndpoints = {
  getHelloJson: getApiUrl('/hello/json'),
  getHelloString: getApiUrl('/hello/string'),
};

// Auth endpoints
export const AuthEndpoints = {
  register: getApiUrl('/auth/register'),
  login: getApiUrl('/auth/login'),
  logout: getApiUrl('/auth/logout'),
  getProfile: getApiUrl('/auth/profile'),
  getTeamDetails: getApiUrl('/auth/team-details'),
  protected: getApiUrl('/auth/protected'),
  // refresh: getApiUrl('/auth/refresh'),
  // revoke: getApiUrl('/auth/revoke'),
  // forgotPassword: getApiUrl('/auth/forgot-password'),
};

// Users endpoints
export const UserEndpoints = {
  listIDsAndUUIDs: getApiUrl('/users/ids-and-uuids'),
  listUsers: getApiUrl('/users'),
  listUsersMetadata: getApiUrl('/users/metadata'),
  listUsersContent: getApiUrl('/users/content'),
  getUser: (UUID: string) => getApiUrl(`/users/${UUID}`),
  createUser: getApiUrl('/users'),
  updateUser: (UUID: string) => getApiUrl(`/users/${UUID}`),
  deleteUser: (UUID: string) => getApiUrl(`/users/${UUID}/delete`),
  getUserByID: (ID: string) => getApiUrl(`/user/${ID}`),
  getUserByName: (name: string) => getApiUrl(`/user/name/${name}`),
  getUserByEmail: (email: string) => getApiUrl(`/user/email/${email}`),
  updateUserMetadata: (UUID: string) => getApiUrl(`/users/${UUID}/metadata`),
  updateUserContent: (UUID: string) => getApiUrl(`/users/${UUID}/content`),
  getUserMetadata: (UUID: string) => getApiUrl(`/users/${UUID}/metadata`),
  getUserContent: (UUID: string) => getApiUrl(`/users/${UUID}/content`),
  // getUserSettings: (UUID: string) => getApiUrl(`/users/${UUID}/settings`),
  // updateUserSettings: (UUID: string) => getApiUrl(`/users/${UUID}/settings`),
  // Add other user-related endpoints here
};

// Teams endpoints
export const TeamEndpoints = {
  listIDsAndUUIDs: getApiUrl('/teams/ids-and-uuids'),
  listTeams: getApiUrl('/teams'),
  listTeamsMetadata: getApiUrl('/teams/metadata'),
  listTeamsContent: getApiUrl('/teams/content'),
  getTeam: (UUID: string) => getApiUrl(`/teams/${UUID}`),
  createTeam: getApiUrl('/teams'),
  updateTeam: (UUID: string) => getApiUrl(`/teams/${UUID}`),
  deleteTeam: (UUID: string) => getApiUrl(`/teams/${UUID}/delete`),
  getTeamByID: (ID: string) => getApiUrl(`/team/${ID}`),
  getTeamByName: (name: string) => getApiUrl(`/team/name/${name}`),
  getTeamByEmail: (email: string) => getApiUrl(`/team/email/${email}`),
  updateTeamMetadata: (UUID: string) => getApiUrl(`/teams/${UUID}/metadata`),
  updateTeamContent: (UUID: string) => getApiUrl(`/teams/${UUID}/content`),
  getTeamMetadata: (UUID: string) => getApiUrl(`/teams/${UUID}/metadata`),
  getTeamContent: (UUID: string) => getApiUrl(`/teams/${UUID}/content`),
  // getTeamSettings: (UUID: string) => getApiUrl(`/teams/${UUID}/settings`),
  // updateTeamSettings: (UUID: string) => getApiUrl(`/teams/${UUID}/settings`),
  // Add other team-related endpoints here
};

// Health endpoints
export const HealthEndpoints = {
  isALive: getApiUrl('/health/live'),
  isReady: getApiUrl('/health/ready'),
  isHealthy: getApiUrl('/health/healthy'),
};
