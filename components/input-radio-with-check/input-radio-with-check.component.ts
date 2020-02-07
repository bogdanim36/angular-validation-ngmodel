import {AfterViewInit, Component, forwardRef, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatRadioGroup} from '@angular/material';
import {FieldValidations} from '@app/synergy/validation/field-validations';

import {InputRadioComponent} from '@app/synergy/components/input-radio/input-radio.component';

@Component({
  selector: 'input-radio-with-check',
  templateUrl: './input-radio-with-check.component.html',
  styleUrls: ['./input-radio-with-check.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioWithCheckComponent),
      multi: true
    },
    {provide: MatRadioGroup, useExisting: InputRadioWithCheckComponent}
  ]
})
export class InputRadioWithCheckComponent extends InputRadioComponent {

}
