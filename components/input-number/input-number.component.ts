import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent extends InputBaseComponent {
  @Input() min;
  @Input() max;
  @Input() step;
  @Input() thumbLabel;
  @Input() tickInterval;
  @Input() hasSlider;
  @Input() hasLimitText;
  @Output() blur = new EventEmitter<string>();
}
