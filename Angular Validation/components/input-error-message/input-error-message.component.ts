import {Component, Input} from '@angular/core';
import {FieldValidations} from '@app/synergy/validation/field-validations';

@Component({
  selector: 'input-error-message',
  templateUrl: './input-error-message.component.html',
})
export class InputErrorMessageComponent {
  @Input() fieldValidations: FieldValidations;
}
