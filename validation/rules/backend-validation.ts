import {FieldValidation} from '@app/synergy/validation/field-validation';

export class BackendValidation extends FieldValidation {
  constructor(message, rule: () => boolean) {
    super({isError: true, message: message});
    this.rule = rule;
  }
}
