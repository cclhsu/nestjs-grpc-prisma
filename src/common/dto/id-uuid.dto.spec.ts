// Path: src/common/dto/id-uuid.dto.ts
// DESC: id-uuid dto
'use strict';
import { validateSync } from 'class-validator';
import { IdUuidDTO } from './id-uuid.dto';

describe('IdUuidStatusDTO', () => {
  it('should validate a valid DTO instance', () => {
    const dto = new IdUuidDTO('john.doe', '00000000-0000-0000-0000-000000000000');
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate invalid DTO instance', () => {
    const dto = new IdUuidDTO('john.doe', 'invalid-uuid');
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
