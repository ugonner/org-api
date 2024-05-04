import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ArrayOfSecificStringsValidator' })
export class ArrayOfSecificStringsValidator
  implements ValidatorConstraintInterface
{
  validate(values: string[] = []): boolean {
    if (values.length) {
      return values.every((value) => value.startsWith('str-'));
    }
    return false;
  }
}
