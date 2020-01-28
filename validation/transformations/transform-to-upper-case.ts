import {FieldValidation} from '@app/synergy/validation/field-validation';

export class TransformToUpperCase extends FieldValidation {
  constructor() {
    super({isTransformation: true});
  }

  validate() {
    let reference = this.getReference(this.path, this.data);
    let value = this.getObjectInScope(this.path, this.data);
    if (value) {
      value = value.toUpperCase();
      reference.source[reference.path] = value;
    }
    return true;
  }
}
