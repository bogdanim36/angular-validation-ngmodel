import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';
import {TranslateService} from '@ngx-translate/core';

export class StringLengthEqualWith extends FieldValidation {
  stringLength = 0;

  constructor(stringLength, translate: TranslateService) {
    super({isError: true, message: translate.instant(ValidationMessages.stringLengthEqualWith) + ' ' + stringLength});
    this.stringLength = stringLength;
    if (!stringLength) {
      console.error('StringLengthEqualWith validation must have declared stringLength string like this: new StringLengthEqualWith(\'10\')');
    }
  }


  rule(value) {
    return value !== null && value !== undefined && typeof value === 'string' && (value.length === this.stringLength);
  }


}
