import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class FieldIsMandatory extends FieldValidation {
  constructor(initial?: Partial<FieldIsMandatory>) {
    let source = initial || {};
    Object.assign(source, {isError: true, message: ValidationMessages.mandatoryField});
    super(source);
  }

  rule(value) {
    return value !== null && value !== undefined && value !== '';
  }
}
