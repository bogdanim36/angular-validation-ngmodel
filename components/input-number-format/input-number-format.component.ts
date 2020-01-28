import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
  forwardRef,
  Injector,
  ElementRef,
  DoCheck,
  HostBinding,
  HostListener
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, AbstractControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatFormFieldControl} from '@angular/material';
import {NumberConverter} from '@app/synergy/services/number.service';

@Component({
  selector: 'input-number-format',
  templateUrl: './input-number-format.component.html',
  styleUrls: ['./input-number-format.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputNumberFormatComponent), multi: true},
    {provide: MatFormFieldControl, useExisting: InputNumberFormatComponent},
    //{ provide: NG_VALIDATORS, useExisting: InputNumberFormatComponent, multi: true }
  ],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class InputNumberFormatComponent implements OnInit, OnDestroy, DoCheck, ControlValueAccessor, MatFormFieldControl<any> {
  //, Validator {
  @ViewChild('inputNo') inputNo;
  isActive: boolean = false;
  formatedNumber: string = '';
  inputNumber: string = '';
  numberValue: number;
  changed: boolean = false;
  // @ViewChild('divNo') divNo;
  // @ViewChild('inputNo') inputNo;
  @Output() blur = new EventEmitter();

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  //@Input() disabled = false;
  // @Output() valueChanged = new EventEmitter();
  // @Input('numberValue')
  // set in(val: number) {
  //   this.numberValue = val;
  //   this.formatedNumber = NumberConverter.convertNumberToString(val, this.formatedNumber);
  // }
  static nextId = 0;
  focused = false;
  ngControl: NgControl;
  @HostBinding() id = `input-number-format-${InputNumberFormatComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  public _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  public _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  public _disabled = false;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @HostBinding('tabindex') tabindex = 0;

  @HostListener('focus', ['$event'])
  focusHandler(event) {
    this.onFocus('focus');
  }

  stateChanges = new Subject<void>();
  controlType = 'inputnumberformant';
  errorState = false;

  constructor(public elRef: ElementRef, public injector: Injector, private fm: FocusMonitor) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  onContainerClick(event: MouseEvent) {
    // if ((event.target as Element).tagName.toLowerCase() != 'div') {
    //   this.container.nativeElement.querySelector('div').focus();
    // }
    // if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
    //   this.elRef.nativeElement.querySelector('input').focus();
    //   this.focused = true;
    // }
    // console.debug(event);
    // console.debug(this._disabled);
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this._disabled && !this.focused) {
      //console.log('onContainerClick focus on ' + (event.target as Element).tagName.toLowerCase());
      this.onFocus('focus');
      this.focused = true;
    }
  }

  // public get invalid(): boolean {
  //   let i:boolean = this.ngControl ? this.ngControl.invalid : false;
  //   console.debug('invalid='+i);
  //   return i;
  // }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }



  ngDoCheck(): void {
    if (this.ngControl) {
      //console.debug("this.ngControl.invalid = " + this.ngControl.invalid);

      // if (this.empty) {
      //   this.ngControl.control.setErrors({ "required": true });
      // }

      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  get empty() {
    const thisText = this.inputNumber.trim();
    let r: boolean = thisText ? false : true;
    //console.debug('empty = ' + r);
    return r;
  }

  //  _value: any;

  // get value(): any {
  //    return this._value;
  // }
  // set value(value) {
  //    this._value = value;
  //    this.editor.setContents(this._value);
  //    this.onChange(value);
  //    this.stateChanges.next();
  // }

  // Function to call when the numberValue changes.
  onChange = (numberValue: number) => {
  };
  // Function to call when the input is touched.
  onTouched = () => {
  };

  get value(): number {
    //this.numberValue = NumberConverter.convertStringToNumber(this.inputNumber);
    return this.numberValue;
  }

  // Allows Angular to update the model (numberValue).
  // Update the model and changes needed for the view here.
  writeValue(numberValue: number): void {
    // console.debug('writeValue');
    //this.formatedNumber = NumberConverter.convertNumberToString(numberValue, this.formatedNumber);
    if (numberValue != null) {
      //console.log(`MyValueAccessor.writeValue: ${numberValue}`);
      this.numberValue = numberValue;
      this.inputNumber = NumberConverter.convertNumberToString(this.numberValue);
      this.onChange(this.value);
    }
  }

  validate(ctrl: AbstractControl) {
    // If you have multiple validators, you'd probably
    // want to build the validation object from scratch
    if (this._disabled) {
      console.debug('validate disabled');
      return null;
    }
    console.debug('validate not disabled');
    return null; //this.inputNo.errors;
  }

  // Allows Angular to register a function to call when the model (numberValue) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (numberValue: number) => void): void {
    // console.debug('registerOnChange');
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onFocus(property: String) {
    // console.debug('onFocus _disabled=' + this._disabled);
    this.lostFocus('');
    if (this._disabled) {
      return;
    }
    this.inputNumber = NumberConverter.convertNumberToString(this.numberValue);
    this.isActive = true;
    this.focused = true;
    //this.inputNo.focus();
  }

  lostFocus(property: String) {
    // console.debug('lostFocus');
    this.isActive = false;
    this.numberValue = NumberConverter.convertStringToNumber(this.inputNumber);
    this.formatedNumber = NumberConverter.convertNumberToString(this.numberValue);
    this.writeValue(this.numberValue);
    this.blur.emit(this.numberValue);
  }

}
