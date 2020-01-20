import {Component, EventEmitter, forwardRef, Output} from '@angular/core';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatepickerComponent),
      multi: true
    }
  ]
})
export class InputDatepickerComponent extends InputBaseComponent {
  @Output() blur = new EventEmitter<string>();

}
