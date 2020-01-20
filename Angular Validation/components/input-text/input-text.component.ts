import { Component, EventEmitter, forwardRef, Input,  Output} from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';


@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent extends InputBaseComponent {
  @Input() minlength: string;
  @Input() maxlength: string;
  @Output() blur = new EventEmitter<string>();

}
