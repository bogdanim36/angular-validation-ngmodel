import {OnlyRegex} from '@app/synergy/validation/rules/only-regex';

export class OnlyLetters extends OnlyRegex {

  constructor() {
    super(/^[A-Za-z]+$/);
  }
}
