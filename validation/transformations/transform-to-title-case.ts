import {FieldValidation} from '@app/synergy/validation/field-validation';

export class TransformToTitleCase extends FieldValidation {
  separators = [' ', '.', '-', '/'];

  constructor(separators: string[]) {
    super({isTransformation: true});
    if (!separators) {
      return;
    }
    if (!Array.isArray(separators)) {
      console.error('separators list:', separators, 'must be a string array');
    }
    this.separators = separators;
  }

  validate() {
    let reference = this.getReference(this.path, this.data);
    let value = this.getObjectInScope(this.path, this.data);
    if (value) {
      reference.source[reference.path] = this.titleCase(value);
    }
    return true;
  }

  titleCase(value: string) {
    let chars = value.toLowerCase().split('');
    let startWord = true;
    let newChars = chars.map(char => {
      if (startWord) {
        startWord = false;
        return char.toUpperCase();
      } else if (this.separators.indexOf(char) > -1) {
        startWord = true;
        return char;
      } else {
        return char;
      }
    });
    return newChars.join('');
  }

}
