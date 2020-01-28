import {FieldIsMandatory} from '@app/synergy/validation/rules/field-is-mandatory';
import {StartsWith} from '@app/synergy/validation/rules/starts-with';
import {StringLengthEqualWith} from '@app/synergy/validation/rules/string-length-equal-with';
import {OnlyRegex} from '@app/synergy/validation/rules/only-regex';
import {OnlyNumbers} from '@app/synergy/validation/rules/only-numbers';
import {OnlyLetters} from '@app/synergy/validation/rules/only-letters';
import {EmailFormat} from '@app/synergy/validation/rules/email-format';
import {BackendValidation} from '@app/synergy/validation/rules/backend-validation';
import {FieldValidation} from '@app/synergy/validation/field-validation';

export class Validators {
  static mandatory = FieldIsMandatory;
  static startsWith = StartsWith;
  static stringLengthEqualWith = StringLengthEqualWith;
  static onlyRegex = OnlyRegex;
  static onlyNumbers = OnlyNumbers;
  static onlyLetters = OnlyLetters;
  static emailFormat = EmailFormat;
  static backend = BackendValidation;
  static custom = FieldValidation;
}
