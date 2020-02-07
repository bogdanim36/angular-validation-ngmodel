import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
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
export class InputNumberComponent extends InputBaseComponent implements OnInit {
  @Input() min;
  @Input() max;
  @Input() step;
  @Input() thumbLabel;
  @Input() tickInterval;
  @Input() hasSlider;
  @Input() hasLimitText;
  @Input() integer: boolean;
  @Output() blur = new EventEmitter<string>();
  pattern: string;

  ngOnInit(): void {
    super.ngOnInit();
    if (this.integer) {
      this.step = 1;
      this.min = 1;
    }
  }

  keyPressHandle(event) {
    if (this.integer) {
      let key = event.code;
      return !['Minus', 'Period'].includes(key);
    } else {
      return true;
    }

  }
}
