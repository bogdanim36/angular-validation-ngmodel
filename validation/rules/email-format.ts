import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class EmailFormat extends FieldValidation {

  constructor() {
    super({isError: true, message: ValidationMessages.emailFormat});
  }


  rule(value: string) {
    if (value === null || value === undefined) {
      return false;
    }
    let atPosition = value.indexOf('@');
    let dotPosition = value.lastIndexOf('.');
    let spacePosition = value.indexOf(' ');
    return !(atPosition <= 0 || dotPosition === -1 || dotPosition < atPosition + 2 || value.length < dotPosition + 2 || spacePosition > -1);
  }
}
