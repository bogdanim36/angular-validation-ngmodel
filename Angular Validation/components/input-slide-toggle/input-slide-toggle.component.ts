import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';
import {MatSlideToggleChange, ThemePalette} from '@angular/material';


@Component({
  selector: 'input-slide-toggle',
  templateUrl: './input-slide-toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSlideToggleComponent),
      multi: true
    }
  ]
})
export class InputSlideToggleComponent extends InputBaseComponent {
  @Input() color: ThemePalette;
  @Output() blur = new EventEmitter<string>();
  @Input() value: boolean;

  updateChanges(event: MatSlideToggleChange) {
    if (event) {
      this.value = event.checked;
    }
    super.updateChanges();
  }

}
