import {OnlyRegex} from '@app/synergy/validation/rules/only-regex';
import {ValidationMessages} from '@app/synergy/validation/validation-messages';

export class OnlyLetters extends OnlyRegex {

  constructor(message: string) {
    super(/^[A-Za-z]+$/, message || ValidationMessages.onlyLetters);
  }
}
