// Path: src/common/dto/id-uuid-status.dto.ts
// DESC: id-uuid-status dto
'use strict';
import { validateSync } from 'class-validator';
import { IdUuidStatusDTO } from './id-uuid-status.dto';

describe('IdUuidStatusDTO', () => {
  it('should validate a valid DTO instance', () => {
    const dto = new IdUuidStatusDTO('john.doe', '00000000-0000-0000-0000-000000000000', 'ACTIVE');
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  //   it('should validate invalid DTO instance', () => {
  //     const dto = new IdUuidStatusDTO(
  //       'john.doe',
  //       'invalid-uuid',
  //       'unknown-status' as GENERAL_STATUS_TYPE,
  //     );
  //     const errors = validateSync(dto);
  //     expect(errors.length).toBeGreaterThan(0);
  //   });
});
