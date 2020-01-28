import {FieldsGroupValidation} from '@app/synergy/validation/fields-group-validation';
import {EventEmitter} from '@angular/core';
import {environment} from '@env/environment';

export class CollectionValidation {
  validations: FieldsGroupValidation[] = [];
  valid = true;
  id: string;
  eventEmitter = new EventEmitter<boolean>();

  constructor() {
  }

  addItem(validator) {
    this.validations.push(validator);
  }

  clear() {
    this.validations.forEach(item => {
      item.clear();
    });
    this.valid = true;
    this.validations = [];
    this.eventEmitter.next(this.valid);
  }

  initialize() {
    if (environment.showValidationOnInit) {
      this.validate();
    }
  }
  validateWithTimeout() {
    setTimeout(() => this.validate());
  }
  validate() {
    let oldValue = this.valid;
    this.valid = true;
    this.validations.forEach(item => {
      let itemIsValid = item.validate();
      this.valid = this.valid && itemIsValid;
    });
    this.eventEmitter.emit(this.valid);
    // console.log('collection validation', this.id, this.valid, this.validations);
    return this.valid;
  }
}
