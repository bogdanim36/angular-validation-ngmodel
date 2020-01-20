import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/misc/error/validation-messages';

export class FieldIsMandatory extends FieldValidation {
  constructor() {
    super({isError: true, message: ValidationMessages.mandatoryField});
  }

  rule(value) {
    return value !== null && value !== undefined && value !== '';
  }
}
