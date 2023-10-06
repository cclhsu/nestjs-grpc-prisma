// import { Logger } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
// import { IdUuidStatusDTO } from '../../common/dto/id-uuid-status.dto';

// const logger = new Logger('IsArrayOfIdUuidStatusDTO');

@ValidatorConstraint({ name: 'IsArrayOfIdUuidStatusDTO', async: false })
export class IsArrayOfIdUuidStatusDTO implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (
        typeof item !== 'object' ||
        // eslint-disable-next-line no-prototype-builtins
        !item.hasOwnProperty('ID') ||
        !item.hasOwnProperty('UUID') ||
        !item.hasOwnProperty('status')
      ) {
        return false;
      }

      if (typeof item.ID !== 'string' || typeof item.UUID !== 'string') {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be an array of IdUuidStatusDTO objects`;
  }
}
