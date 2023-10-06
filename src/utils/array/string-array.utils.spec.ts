import { convertStringToArray } from './string-array.utils';

describe('convertStringToArray', () => {
  it('should parse comma-separated values', () => {
    const input = 'item1,item2,item3';
    const result = convertStringToArray(input);
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });

  it('should parse JSON array', () => {
    const input = '["item1", "item2", "item3"]';
    const result = convertStringToArray(input);
    expect(result).toEqual(['item1', 'item2', 'item3']);
  });

  it('should return empty array for empty input', () => {
    const input = '';
    const result = convertStringToArray(input);
    expect(result).toEqual([]);
  });

  it('should return empty array for "n/a"', () => {
    const input = 'n/a';
    const result = convertStringToArray(input);
    expect(result).toEqual([]);
  });

  it('should throw an error for invalid JSON', () => {
    const input = '[invalid_json]';
    expect(() => convertStringToArray(input)).toThrowError('Error parsing JSON array');
  });
});
