import {AfterViewInit, Component, forwardRef, Input, TemplateRef, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatRadioGroup} from '@angular/material';
import {FieldValidations} from '@app/synergy/validation/field-validations';


@Component({
  selector: 'input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    },
    {provide: MatRadioGroup, useExisting: InputRadioComponent}
  ]
})
export class InputRadioComponent extends MatRadioGroup implements AfterViewInit {

  @Input() fieldValidations: FieldValidations;
  @Input() disabled: any;
  @Input() radioCssClass: any;
  @Input() label: string;
  @Input('labelTpl') labelTpl: TemplateRef<any>;
  @Input('radioOptionsTpl') radioOptionsTpl: TemplateRef<any>;
  onInitExecuted = false;

  writeValue(value: string): void {
    this.value = value;
    this.updateChanges();
  }

  ngAfterViewInit(): void {
    this.onInitExecuted = true;
    if (this.fieldValidations && !this.disabled) {
      setTimeout(() => this.fieldValidations.validate());
    }
  }

  updateChanges() {
    if (this.disabled) {
      return;
    }
    this.change.emit(this.value);
    if (this.onInitExecuted && this.fieldValidations && !this.disabled) {
      this.fieldValidations.validate();
    }
  }

  checkDisabled(event) {
    this.change.emit(this.value);
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
