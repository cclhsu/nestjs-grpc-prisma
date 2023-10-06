import { IdUuidStatusDTO } from '../../common/dto';
import {
  convertStringToIdUuidStatusArray,
  validateIdUuidStatusArray,
  isValidIdUuidStatusArray,
} from './id-uuid-status-array.utils';

describe('convertStringToIdUuidStatusArray', () => {
  it('should parse comma-separated values', () => {
    const input =
      'john.doe/00000000-0000-0000-0000-000000000001/TODO,jane.doe/00000000-0000-0000-0000-000000000002/IN_PROGRESS,id3/00000000-0000-0000-0000-000000000003/DONE';
    const result = convertStringToIdUuidStatusArray(input);
    expect(result).toEqual([
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'IN_PROGRESS',
      },
      {
        ID: 'id3',
        UUID: '00000000-0000-0000-0000-000000000003',
        status: 'DONE',
      },
    ]);
  });

  it('should parse JSON array', () => {
    const input =
      '[{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001","status":"TODO"},{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002","status":"IN_PROGRESS"}]';
    const result = convertStringToIdUuidStatusArray(input);
    expect(result).toEqual([
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'IN_PROGRESS',
      },
    ]);
  });

  it('should return empty array for empty input', () => {
    const input = '';
    const result = convertStringToIdUuidStatusArray(input);
    expect(result).toEqual([]);
  });

  it('should return empty array for "n/a"', () => {
    const input = 'n/a';
    const result = convertStringToIdUuidStatusArray(input);
    expect(result).toEqual([]);
  });

  it('should throw an error for invalid JSON', () => {
    const input = '[invalid_json]';
    expect(() => convertStringToIdUuidStatusArray(input)).toThrowError(
      'Error parsing idUuidStatus array',
    );
  });
});

describe('validateIdUuidStatusArray', () => {
  // it('should throw an error if input is not an array', () => {
  //   expect(() => {
  //     validateIdUuidStatusArray('not an array');
  //   }).toThrowError('Input is not an array');
  // });

  // it('should throw an error if input array is empty', () => {
  //   expect(() => {
  //     validateIdUuidStatusArray([]);
  //   }).toThrowError('Input array is empty');
  // });

  it('should throw an error if input has duplicate IDs', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'TODO',
      },
    ];

    expect(() => {
      validateIdUuidStatusArray(idUuidStatusArray);
    }).toThrowError('Input array has duplicate IDs');
  });

  it('should throw an error if input has duplicate UUIDs', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
    ];

    expect(() => {
      validateIdUuidStatusArray(idUuidStatusArray);
    }).toThrowError('Input array has duplicate UUIDs');
  });

  it('should throw an error if input has invalid UUIDs', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: 'invalid-uuid',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: 'another-invalid-uuid',
        status: 'TODO',
      },
    ];

    expect(() => {
      validateIdUuidStatusArray(idUuidStatusArray);
    }).toThrowError('Input array has invalid UUIDs');
  });

  it('should pass validation for valid input array', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'TODO',
      },
    ];

    expect(() => {
      validateIdUuidStatusArray(idUuidStatusArray);
    }).not.toThrow();
  });
});

describe('isValidIdUuidStatusArray', () => {
  it('should return true for valid input array', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'jane.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'IN_PROGRESS',
      },
    ];

    const result = isValidIdUuidStatusArray(idUuidStatusArray);
    expect(result).toEqual(true);
  });

  it('should return false for invalid input array', () => {
    const idUuidStatusArray: IdUuidStatusDTO[] = [
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000001',
        status: 'TODO',
      },
      {
        ID: 'john.doe',
        UUID: '00000000-0000-0000-0000-000000000002',
        status: 'TODO',
      },
    ];

    const result = isValidIdUuidStatusArray(idUuidStatusArray);
    expect(result).toEqual(false);
  });
});
