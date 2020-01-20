import {AfterViewInit, Component, ElementRef, forwardRef, ViewChild, ViewEncapsulation, Input, TemplateRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatRadioGroup} from '@angular/material';
import {InputRadioComponent} from '@app/synergy/components/input-radio/input-radio.component';


@Component({
  selector: 'input-radio-toggle',
  templateUrl: './input-radio-toggle.component.html',
  styleUrls: ['./input-radio-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioToggleComponent),
      multi: true
    },
    {provide: MatRadioGroup, useExisting: InputRadioToggleComponent}
  ]
})
export class InputRadioToggleComponent extends InputRadioComponent implements AfterViewInit {
}
