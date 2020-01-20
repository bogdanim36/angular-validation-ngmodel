import {FieldValidation} from '@app/synergy/validation/field-validation';

export class FieldValidations {
  hasError ? = false;
  hasWarning ? = false;
  message ? = '';
  path: string;
  data: any;
  value ?: any;
  validations ?: any[] = [];
  containerPath?: string;

  constructor(path: string, data: any, validations?: FieldValidation[] | any, getValue?: Function) {
    this.path = path;
    this.data = data;
    if (validations) {
      this.validations = validations;
    }
    if (getValue) {
      Object.defineProperty(this, 'value', {get: () => getValue.call(this)});
    } else {
      Object.defineProperty(this, 'value', {get: () => this.getObjectInScope(this.path, this.data)});
    }
  }


  addValidation(validation: Partial<FieldValidation>) {
    this.validations.push(new FieldValidation(validation));
  }

  validate(value?): boolean {
    this.hasError = false;
    this.hasWarning = false;
    this.validations.find((fn: FieldValidation | any) => {
      let fieldValidation = (fn instanceof FieldValidation) ? fn : new fn();
      fieldValidation.data = this.data;
      fieldValidation.path = this.path;
      // console.log('fieldValidation', this.path, fieldValidation);
      fieldValidation.validate(value === undefined ? this.value : value);
      // console.log('fieldValidation response', fieldValidation.valid);
      if (fieldValidation.valid) {
        return false;
      }
      if (fieldValidation.isError) {
        this.hasError = true;
      }
      if (fieldValidation.isWarning) {
        this.hasWarning = true;
      }
      this.message = fieldValidation.message;
      return true;
    });
    return !this.hasError;
  }

  getObjectInScope(path: string, scope: any) {
    if (typeof path !== 'string') {
      return scope[path];
    }
    const newObjectName = path.substring(path.indexOf('.') + 1);
    const isNestedObject = path.split('.').length > 1;
    if (isNestedObject) {
      return this.getObjectInScope(newObjectName, scope[path.split('.')[0]]);
    } else {
      if (!scope) {
        return null;
      } else {
        return scope[newObjectName];
      }
    }
  }

}
