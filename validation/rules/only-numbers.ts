import {OnlyRegex} from '@app/synergy/validation/rules/only-regex';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class OnlyNumbers extends OnlyRegex {

  constructor(message: string) {
    super(/^\d+$/, message || ValidationMessages.onlyNumbers);
  }
}
