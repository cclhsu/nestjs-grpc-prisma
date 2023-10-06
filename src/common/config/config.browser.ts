// Path: src/common/config/config.browser.ts
// DESC: API configuration

// import dotenv from 'dotenv';
// dotenv.config();

const useHttps = process.env.HTTPS_ENABLED === 'true';

interface AppConfig {
  http: string; // Change the type to string
  host: string;
  port: number;
}

export const apiConfig: AppConfig = {
  host: process.env.UI_HOST || 'localhost',
  port: parseInt(process.env.UI_PORT || '3000', 10),
  http: useHttps ? 'https' : 'http', // Assign 'https' or 'http' based on useHttps
};

export const APP_BASE_URL = `${apiConfig.http}://${apiConfig.host}:${apiConfig.port}`;

interface ServiceAPIConfig {
  http: string; // Change the type to string
  host: string;
  port: number;
}

export const serviceApiConfig: ServiceAPIConfig = {
  host: process.env.SERVICE_HOST || 'localhost',
  port: parseInt(process.env.SERVICE_PORT || '3001', 10),
  http: useHttps ? 'https' : 'http', // Assign 'https' or 'http' based on useHttps
};

// API endpoints
export const API_BASE_URL = `${serviceApiConfig.http}://${serviceApiConfig.host}:${serviceApiConfig.port}`;
