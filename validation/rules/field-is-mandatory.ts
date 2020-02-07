import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class FieldIsMandatory extends FieldValidation {
  constructor(initial?: Partial<FieldIsMandatory>) {
    let source = initial || {};
    source = Object.assign({isError: true, message: ValidationMessages.mandatoryField}, source);
    super(source);
  }

  rule(value) {
    return value !== null && value !== undefined && value !== '';
  }
}
