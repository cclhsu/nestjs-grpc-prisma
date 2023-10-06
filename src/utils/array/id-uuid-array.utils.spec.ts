import {
  convertStringToIdUuidArray,
  validateIdUuidArray,
  isValidIdUuidArray,
} from './id-uuid-array.utils';

describe('convertStringToIdUuidArray', () => {
  it('should parse comma-separated values', () => {
    const input =
      'john.doe/00000000-0000-0000-0000-000000000001,jane.doe/00000000-0000-0000-0000-000000000002,id3/00000000-0000-0000-0000-000000000003';
    const result = convertStringToIdUuidArray(input);
    expect(result).toEqual([
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'jane.doe', UUID: '00000000-0000-0000-0000-000000000002' },
      { ID: 'id3', UUID: '00000000-0000-0000-0000-000000000003' },
    ]);
  });

  it('should parse JSON array', () => {
    const input =
      '[{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"},{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}]';
    const result = convertStringToIdUuidArray(input);
    expect(result).toEqual([
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'jane.doe', UUID: '00000000-0000-0000-0000-000000000002' },
    ]);
  });

  it('should return empty array for empty input', () => {
    const input = '';
    const result = convertStringToIdUuidArray(input);
    expect(result).toEqual([]);
  });

  it('should return empty array for "n/a"', () => {
    const input = 'n/a';
    const result = convertStringToIdUuidArray(input);
    expect(result).toEqual([]);
  });

  it('should throw an error for invalid JSON', () => {
    const input = '[invalid_json]';
    expect(() => convertStringToIdUuidArray(input)).toThrowError('Error parsing idUuid array');
  });
});

describe('validateIdUuidArray', () => {
  // it('should throw an error if input is not an array', () => {
  //   expect(() => {
  //     validateIdUuidArray('not an array');
  //   }).toThrowError('Input is not an array');
  // });

  // it('should throw an error if input array is empty', () => {
  //   expect(() => {
  //     validateIdUuidArray([]);
  //   }).toThrowError('Input array is empty');
  // });

  it('should throw an error if input has duplicate IDs', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000002' },
    ];

    expect(() => {
      validateIdUuidArray(idUuidArray);
    }).toThrowError('Input array has duplicate IDs');
  });

  it('should throw an error if input has duplicate UUIDs', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'jane.doe', UUID: '00000000-0000-0000-0000-000000000001' },
    ];

    expect(() => {
      validateIdUuidArray(idUuidArray);
    }).toThrowError('Input array has duplicate UUIDs');
  });

  it('should throw an error if input has invalid UUIDs', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: 'invalid-uuid' },
      { ID: 'jane.doe', UUID: 'another-invalid-uuid' },
    ];

    expect(() => {
      validateIdUuidArray(idUuidArray);
    }).toThrowError('Input array has invalid UUIDs');
  });

  it('should pass validation for valid input array', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'jane.doe', UUID: '00000000-0000-0000-0000-000000000002' },
    ];

    expect(() => {
      validateIdUuidArray(idUuidArray);
    }).not.toThrow();
  });
});

describe('isValidIdUuidArray', () => {
  it('should return true for valid input array', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'jane.doe', UUID: '00000000-0000-0000-0000-000000000002' },
    ];

    const result = isValidIdUuidArray(idUuidArray);
    expect(result).toEqual(true);
  });

  it('should return false for invalid input array', () => {
    const idUuidArray = [
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000001' },
      { ID: 'john.doe', UUID: '00000000-0000-0000-0000-000000000002' },
    ];

    const result = isValidIdUuidArray(idUuidArray);
    expect(result).toEqual(false);
  });
});
