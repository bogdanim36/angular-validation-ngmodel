import {EventEmitter, Injectable} from '@angular/core';
import {CollectionValidation} from '@app/synergy/validation/collection-validation';
import {environment} from '@env/environment';
import {Subscription} from 'rxjs';

@Injectable()
export class ValidationService {
  tabs: { [key: string]: { validator: CollectionValidation, index: number } } = {};
  skipAllValidations = environment.skipAllValidations;
  showValidationOnInit = environment.showValidationOnInit;
  validStateEvent = new EventEmitter<boolean>();
  subscriptions: Subscription[] = [];
  dataValidity = true;

  constructor() {
  }

  addToCollection(tabName, validator: any) {
    this.tabs[tabName].validator.addItem(validator);
  }

  initialize() {
    if (this.showValidationOnInit) {
      setTimeout(() => this.validate());
    }
    return true;
  }

  validateWithTimeout() {
    setTimeout(() => this.validate());
  }

  clear() {
    for (let tabName in this.tabs) {
      this.tabs[tabName].validator.clear();
    }
    this.tabs = {};
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  validate() {
    if (this.skipAllValidations) {
      console.log('all validations are skipped');
      return true;
    }
    console.log('validation start');
    let valid = true;
    for (let tabName in this.tabs) {
      let tabValidation = this.tabs[tabName];
      let tabIsValid = tabValidation.validator.validate();
      valid = valid && tabIsValid;
    }
    this.dataValidity = valid;
    if (!valid) {
      console.warn('validation finish', valid, this.tabs);
    } else {
      console.log('validation finish', true);
    }
    this.validStateEvent.emit(valid);
    return this.dataValidity;
  }

  addTab(tabName, validator: any, index?: number) {
    if (this.tabs[tabName] !== undefined) {
      console.error('tab is already added in validation', tabName, validator, this.tabs[tabName]);
    } else {
      this.tabs[tabName] = {validator: validator, index: index};
      this.subscriptions.push(validator.eventEmitter.subscribe(response => {
        let validityState = true;
        Object.keys(this.tabs).forEach(tab => validityState = validityState && this.tabs[tab].validator.valid);
        if (!response) {
          console.warn('tab with error', tabName, this.tabs[tabName].validator);
        }
        this.dataValidity = validityState;
        this.validStateEvent.emit(validityState);
        // console.log('validityState', validityState);
      }));

      return validator;
    }
  }
}
