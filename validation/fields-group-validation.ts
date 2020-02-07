import {FieldValidations} from '@app/synergy/validation/field-validations';
import {EventEmitter} from '@angular/core';
import {CollectionValidation} from '@app/synergy/validation/collection-validation';

export class FieldsGroupValidation {
  fields: { [key: string]: FieldValidations | any } = {};
  message ? = '';
  hasError = false;
  valid = true;
  id?: string;
  errors: { [key: string]: any | string };
  eventEmitter = new EventEmitter<boolean>();

  constructor(fields?: Partial<FieldValidations>[] | any) {
    if (fields) {
      fields.forEach(item => this.addField(item));
    }
  }

  clear() {
    this.valid = true;
    this.hasError = false;
    this.eventEmitter.next(this.valid);
    this.fields = {};
  }

  getContainerObject(path, source) {
    if (!source) {
      console.error('getContainerObject validation:', 'source not defined for path', path);
    }
    if (!path) {
      return source;
    }
    let pathPartsArray = path.split('.');
    if (pathPartsArray.length === 1) {
      return source[path];
    } else {
      return this.getContainerObject(path.substring(path.indexOf('.') + 1), source[pathPartsArray[0]]);
    }
  }

  addValidator(initial: { path: string, containerPath?: string, validation: FieldsGroupValidation | CollectionValidation }) {
    let container = this.getContainerObject(initial.containerPath, this.fields);
    container[initial.path] = initial.validation;
  }

  addField(initial: Partial<FieldValidations>, getValue?: Function) {
    let container = this.getContainerObject(initial.containerPath, this.fields);
    if (initial instanceof FieldValidations) {
      container[initial.path] = initial;
    } else {
      container[initial.path] = new FieldValidations(initial.path, initial.data, initial.validations, getValue);
    }
  }

  validateWithTimeout(data?) {
    setTimeout(() => this.validate(data));
  }

  validate(data?) {
    let oldValue = this.valid;
    this.valid = this.scanFields(this.fields, data);
    this.hasError = !this.valid;
    this.eventEmitter.emit(this.valid);
    // console.log('fieldsGroupValidation', this.id, this.valid);
    return this.valid;
  }

  scanFields(fields, data?) {
    let valid = true;
    this.errors = {};
    for (let fieldName in fields) {
      let field: any = fields[fieldName];
      if (data) {
        field.data = data;
      }
      if (field instanceof FieldValidations) {
        if (!field.validate()) {
          valid = false;
          this.errors[field.path] = field.message || 'mandatoryField';
        }
      } else if (field instanceof CollectionValidation || field instanceof FieldsGroupValidation) {
        if (!field.validate()) {
          valid = false;
          this.errors[fieldName + '_section'] = field.errors;
        }
      } else if (!this.scanFields(field, data)) {
        valid = false;
        this.errors[fieldName + '_section'] = field.message;
      }
    }
    return valid;
  }

}
