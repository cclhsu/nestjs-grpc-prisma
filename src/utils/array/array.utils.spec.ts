import { isValidIDFormat, isValidUUIDFormat, isValidStatusFormat } from './array.utils';

describe('isValidIDFormat', () => {
  it('should return true for valid IDs', () => {
    expect(isValidIDFormat('john.doe')).toBe(true);
    // Add more test cases for valid IDs
  });

  it('should return false for invalid IDs', () => {
    expect(isValidIDFormat('invalid id')).toBe(false);
    // Add more test cases for invalid IDs
  });
});

describe('isValidUUIDFormat', () => {
  it('should return true for valid UUIDs', () => {
    expect(isValidUUIDFormat('00000000-0000-0000-0000-000000000001')).toBe(true);
    // Add more test cases for valid UUIDs
  });

  it('should return false for invalid UUIDs', () => {
    expect(isValidUUIDFormat('invalid uuid')).toBe(false);
    // Add more test cases for invalid UUIDs
  });
});

describe('isValidStatusFormat', () => {
  it('should return true for valid statuses', () => {
    expect(isValidStatusFormat('ACTIVE')).toBe(true);
    // Add more test cases for valid statuses
  });

  it('should return false for invalid statuses', () => {
    expect(isValidStatusFormat('invalid status')).toBe(false);
    // Add more test cases for invalid statuses
  });
});
