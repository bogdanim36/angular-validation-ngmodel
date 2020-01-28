import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class OnlyRegex extends FieldValidation {
  regExp: RegExp;

  constructor(regExp: RegExp) {
    super({isError: true, message: ValidationMessages.forbiddenCharacters});
    if (regExp !== undefined) {
      this.regExp = regExp;
    } else {
      console.error('You need to pass regex as parameter to constructor!');
    }
  }


  rule(source) {
    if (source) {
      return source.match(this.regExp);
    } else {
      return false;
    }
  }


}
