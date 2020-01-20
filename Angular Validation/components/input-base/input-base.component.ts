import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FieldValidations} from '@app/synergy/validation/field-validations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'input-base',
  templateUrl: './input-base.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputBaseComponent),
    multi: true
  }]
})
export class InputBaseComponent implements ControlValueAccessor, OnInit {
  @Input() fieldValidations: FieldValidations;
  @Input() type: string;
  @Input() label: string;
  @Input() name: string;
  @Input() value: any;
  @Input() disabled = false;
  @Input() inputCssClass: string;
  @Output() blur = new EventEmitter<string>();
  onInitExecuted = false;

  writeValue(value: string): void {
    this.value = value;
    this.updateChanges();
  }

  onChange: (_: any) => void = (_: any) => {
  };

  onTouched: () => void = () => {
  };

  onBlur() {
    this.blur.next();
  }

  ngOnInit(): void {
    this.onInitExecuted = true;
    if (this.fieldValidations && !this.disabled) {
      this.fieldValidations.validate();
    }
  }

  updateChanges(event?: any) {
    this.onChange(this.value);
    if (this.onInitExecuted && this.fieldValidations && !this.disabled) {
      this.fieldValidations.validate();
    }
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
