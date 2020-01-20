import {Injectable} from '@angular/core';
import {CollectionValidation} from '@app/synergy/validation/collection-validation';
import {environment} from '@env/environment';

@Injectable()
export class ValidationService {
  tabs: { [key: string]: CollectionValidation } = {};
  skipAllValidations = environment.skipAllValidations;
  showValidationOnInit = environment.showValidationOnInit;

  constructor() {
  }

  addToCollection(tabName, validator) {
    this.tabs[tabName].addItem(validator);
  }

  initialize() {
    if (this.showValidationOnInit) {
      setTimeout(() => this.validate());
    }
    return true;
  }

  clear() {
    for (let tabName in this.tabs) {
      this.tabs[tabName].clear();
    }
    this.tabs = {};
  }

  validate() {
    if (this.skipAllValidations) {
      console.log('all validations are skipped');
      return true;
    }
    // console.log('validation start');
    let valid = true;
    for (let tabName in this.tabs) {
      let tabValidation = this.tabs[tabName];
      let tabIsValid = tabValidation.validate();
      valid = valid && tabIsValid;
    }
    if (!valid) {
      console.error('validation finish', valid, this.tabs);
    } else {
      console.log('validation finish', true);
    }
    return valid;
  }

  addTab(tabName, validator) {
    if (this.tabs[tabName] !== undefined) {
      console.error('tab is already added in validation', tabName, validator, this.tabs[tabName]);
    } else {
      this.tabs[tabName] = validator;
      return validator;
    }
  }
}
