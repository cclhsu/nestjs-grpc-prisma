import { resolveHomePath } from '../path/path.utils';
import {
  getConfigFilePath,
  getJsonConfigFilePath,
  getYamlConfigFilePath,
  getCsvConfigFilePath,
} from './config.utils';

describe('getConfigFilePath', () => {
  it('should return the correct config file path for JSON', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const extension = 'json';
    const result = getConfigFilePath(projectName, configName, extension);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.json');
  });

  it('should return the correct config file path for YAML', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const extension = 'yaml';
    const result = getConfigFilePath(projectName, configName, extension);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.yaml');
  });

  it('should return the correct config file path for CSV', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const extension = 'csv';
    const result = getConfigFilePath(projectName, configName, extension);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.csv');
  });
});

describe('getJsonConfigFilePath', () => {
  it('should return the correct JSON config file path', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const result = getJsonConfigFilePath(projectName, configName);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.json');
  });
});

describe('getYamlConfigFilePath', () => {
  it('should return the correct YAML config file path', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const result = getYamlConfigFilePath(projectName, configName);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.yaml');
  });
});

describe('getCsvConfigFilePath', () => {
  it('should return the correct CSV config file path', () => {
    const projectName = 'myProject';
    const configName = 'config';
    const result = getCsvConfigFilePath(projectName, configName);
    expect(result).toBe(resolveHomePath('${HOME}') + '/.config/myProject/config.csv');
  });
});
