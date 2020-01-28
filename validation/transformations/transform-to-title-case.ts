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
      this.separators.forEach(separator => {
        value = this.titleCase(value, separator);
      });
      reference.source[reference.path] = value;
    }
    return true;
  }

  titleCase(value: string, separator: string) {
    let words = value.split(separator);
    let newWords = [];
    words.forEach(word => {
      word = word.trim();
      newWords.push(word.substr(0, 1).toUpperCase() + word.substring(1));
    });
    return newWords.join(separator);
  }
}
