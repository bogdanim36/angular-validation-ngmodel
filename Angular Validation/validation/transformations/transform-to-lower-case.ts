import {FieldValidation} from '@app/synergy/validation/field-validation';

export class TransformToLowerCase extends FieldValidation {
  constructor() {
    super({isError: false, message: ""});
  }

  validate() {
    let reference = this.getReference(this.path, this.data);
    let value = this.getObjectInScope(this.path, this.data);
    if (value) {
      value = value.toLowerCase();
      reference.source[reference.path] = value;
    }
    return true;
  }
}
