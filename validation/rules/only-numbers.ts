import {OnlyRegex} from '@app/synergy/validation/rules/only-regex';

export class OnlyNumbers extends OnlyRegex {

  constructor() {
    super(/^\d+$/);
  }
}
