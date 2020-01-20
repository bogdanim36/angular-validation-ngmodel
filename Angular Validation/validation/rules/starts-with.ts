import {FieldValidation} from '@app/synergy/validation/field-validation';
import {ValidationMessages} from '@app/synergy/misc/error/validation-messages';
import {TranslateService} from '@ngx-translate/core';

export class StartsWith extends FieldValidation {
  startsWith = '';

  constructor(startsWith, translate: TranslateService) {
    super({
      isError: true,
      message: translate ? (translate.instant(ValidationMessages.startsWith) + ' ' + startsWith) : (ValidationMessages.startsWith + startsWith)
    });
    this.startsWith = startsWith;
    if (!startsWith) {
      console.error('StartsWith validation must have declared startsWith string like this: new StartsWith(\'asdfsad\')');
    }
  }


  rule(value) {
    return value !== null && value !== undefined && typeof value === 'string' && value.startsWith(this.startsWith);
  }


}
