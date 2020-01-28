import {TransformToTitleCase} from '@app/synergy/validation/transformations/transform-to-title-case';
import {TransformToLowerCase} from '@app/synergy/validation/transformations/transform-to-lower-case';
import {TransformToUpperCase} from '@app/synergy/validation/transformations/transform-to-upper-case';

export class Transformers {
  static titleCase = TransformToTitleCase;
  static lowerCase = TransformToLowerCase;
  static upperCase = TransformToUpperCase;
}
