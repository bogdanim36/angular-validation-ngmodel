import {Component, EventEmitter, forwardRef, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextareaComponent),
      multi: true
    }
  ]
})
export class InputTextareaComponent extends InputBaseComponent {
  @Output() blur = new EventEmitter<string>();
}
