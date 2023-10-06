import { validateEnvironmentVariables, EnvironmentVariables } from './env.validation';

describe('validateEnvironmentVariables', () => {
  it('should validate a valid configuration', () => {
    const validConfig = new EnvironmentVariables();
    validConfig.JWT_SECRET = 'your-secret-key';
    validConfig.JWT_EXPIRES_IN = '1h';
    validConfig.SERVICE_HOST = 'localhost';
    validConfig.SERVICE_PORT = 3000;
    // Set other valid configuration properties

    const validatedConfig = validateEnvironmentVariables(validConfig);

    expect(validatedConfig).toEqual(validConfig); // Expect that the validatedConfig remains unchanged
  });

  it('should throw an error for invalid configuration', () => {
    const invalidConfig = new EnvironmentVariables();
    // Set some properties to invalid values

    expect(() => validateEnvironmentVariables(invalidConfig)).toThrow(Error);
  });
});
