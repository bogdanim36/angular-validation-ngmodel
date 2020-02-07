import {FieldValidation} from '@app/synergy/validation/field-validation';

export class BackendValidation extends FieldValidation {
  constructor(initial?: Partial<BackendValidation>) {
    super(initial || {});
    this.rule = initial.rule.bind(this);
  }
}
