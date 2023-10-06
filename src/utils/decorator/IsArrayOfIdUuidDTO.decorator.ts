// import { Logger } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
// import { IdUuidDTO } from '../../common/dto/id-uuid.dto';

// const logger = new Logger('IsArrayOfIdUuidDTO');

@ValidatorConstraint({ name: 'IsArrayOfIdUuidDTO', async: false })
export class IsArrayOfIdUuidDTO implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      // eslint-disable-next-line no-prototype-builtins
      if (typeof item !== 'object' || !item.hasOwnProperty('ID') || !item.hasOwnProperty('UUID')) {
        return false;
      }

      if (typeof item.ID !== 'string' || typeof item.UUID !== 'string') {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be an array of IdUuidDTO objects`;
  }
}
