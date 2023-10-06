import {
  convertStringToNameUrlArray,
  validateNameUrlArray,
  isValidNameUrlArray,
} from './name-url-array.utils';

describe('convertStringToNameUrlArray', () => {
  // it('should parse comma-separated values', () => {
  //   const input =
  //     'WIKI/https://abc.com,CONFLUENCE/https://xyz.com,link3/https://wiki.abc.com';
  //   const result = convertStringToNameUrlArray(input);
  //   expect(result).toEqual([
  //     { name: 'WIKI', url: 'https://abc.com' },
  //     { name: 'CONFLUENCE', url: 'https://xyz.com' },
  //     { name: 'link3', url: 'https://wiki.abc.com' },
  //   ]);
  // });

  it('should parse JSON array', () => {
    const input =
      '[{"name":"WIKI","url":"https://abc.com"},{"name":"CONFLUENCE","url":"https://xyz.com"}]';
    const result = convertStringToNameUrlArray(input);
    expect(result).toEqual([
      { name: 'WIKI', url: 'https://abc.com' },
      { name: 'CONFLUENCE', url: 'https://xyz.com' },
    ]);
  });

  it('should return empty array for empty input', () => {
    const input = '';
    const result = convertStringToNameUrlArray(input);
    expect(result).toEqual([]);
  });

  it('should return empty array for "n/a"', () => {
    const input = 'n/a';
    const result = convertStringToNameUrlArray(input);
    expect(result).toEqual([]);
  });

  it('should throw an error for invalid JSON', () => {
    const input = '[invalid_json]';
    expect(() => convertStringToNameUrlArray(input)).toThrowError('Error parsing nameUrl array');
  });
});

describe('validateNameUrlArray', () => {
  // it('should throw an error if input is not an array', () => {
  //   expect(() => {
  //     validateNameUrlArray('not an array');
  //   }).toThrowError('Input is not an array');
  // });

  // it('should throw an error if input array is empty', () => {
  //   expect(() => {
  //     validateNameUrlArray([]);
  //   }).toThrowError('Input array is empty');
  // });

  // it('should throw an error if input has duplicate IDs', () => {
  //   const nameUrlArray = [
  //     { name: 'WIKI', url: 'https://abc.com' },
  //     { name: 'WIKI', url: 'https://xyz.com' },
  //   ];

  //   expect(() => {
  //     validateNameUrlArray(nameUrlArray);
  //   }).toThrowError('Input array has duplicate IDs');
  // });

  it('should throw an error if input has duplicate URLs', () => {
    const nameUrlArray = [
      { name: 'WIKI', url: 'https://abc.com' },
      { name: 'CONFLUENCE', url: 'https://abc.com' },
    ];

    expect(() => {
      validateNameUrlArray(nameUrlArray);
    }).toThrowError('Input array has duplicate URLs');
  });

  it('should throw an error if input has invalid URLs', () => {
    const nameUrlArray = [
      { name: 'WIKI', url: 'invalid-url' },
      { name: 'CONFLUENCE', url: 'another-invalid-url' },
    ];

    expect(() => {
      validateNameUrlArray(nameUrlArray);
    }).toThrowError('Error: Input array has invalid URL format: invalid-url');
  });

  it('should pass validation for valid input array', () => {
    const nameUrlArray = [
      { name: 'WIKI', url: 'https://abc.com' },
      { name: 'CONFLUENCE', url: 'https://xyz.com' },
    ];

    expect(() => {
      validateNameUrlArray(nameUrlArray);
    }).not.toThrow();
  });
});

describe('isValidNameUrlArray', () => {
  it('should return true for valid input array', () => {
    const nameUrlArray = [
      { name: 'WIKI', url: 'https://abc.com' },
      { name: 'CONFLUENCE', url: 'https://xyz.com' },
    ];

    const result = isValidNameUrlArray(nameUrlArray);
    expect(result).toEqual(true);
  });

  it('should return false for invalid input array', () => {
    const nameUrlArray = [
      { name: 'WIKI', url: 'https://abc.com' },
      { name: 'WIKI', url: 'https://xyz.com' },
    ];

    const result = isValidNameUrlArray(nameUrlArray);
    expect(result).toEqual(false);
  });
});
