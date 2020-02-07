import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class OnlyInteger extends FieldValidation {

  constructor(initial?: Partial<OnlyInteger>) {
    let source = initial || {};
    source = Object.assign({isError: true, message: ValidationMessages.onlyInteger}, source);
    super(source);
  }


  rule(value: any) {
    return this.isInteger(value);
  }

  isInteger(value: number): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return value === parseInt(value.toString(), 0);
  }
}
