import {AfterViewInit, Component, forwardRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatSelect} from '@angular/material';
import {InputBaseComponent} from '@app/synergy/components/input-base/input-base.component';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSelectComponent),
    multi: true
  }]
})
export class InputSelectComponent extends InputBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() hasSearch = false;
  @Input() multiSelect = false;
  @Input() disabled;
  @Input() fieldToSearch: string;
  @Input() options$: Subject<any[]>;
  @Input() options: any[];
  @Input() matOptionValueItemField: string;
  @Input() matOptionDisplayField: string;
  @ViewChild('singleSelectElement') singleSelectElement: MatSelect;
  @ViewChild('multiSelectElement') multiSelectElement: MatSelect;
  @Input('matOptionTpl') matOptionTpl: TemplateRef<any>;
  private _onDestroy = new Subject<void>();
  filterCtrl = new FormControl();
  filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


  ngOnInit() {
    super.ngOnInit();
    this.filterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filter();
      });
  }

  ngAfterViewInit() {
    if (this.options == null || this.options == undefined) return;
    if (!this.options) {
      this.options$
        .pipe(takeUntil(this._onDestroy))
        .subscribe(response => {
          this.options = response;
          // this.setInitialValue();
          this.filter();
        });
    }
  }

  // private setInitialValue() {
  //   this.filteredOptions
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelectElement.compareWith = (a: any, b: any) => a.id === (b ? b.id : null);
  //     });
  // }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  // modelHolderChangeValue() {
  //   if (this.fieldValidations) {
  //     setTimeout(() => this.fieldValidations.validate())     ;
  //   }
  //   this.modelHolderChange.emit(this.ngModel);
  //   this.ngModelChange.emit(this.ngModel);
  // }

  private filter() {
    if (!this.options) {
      return;
    }
    // get the search keyword
    let search = this.filterCtrl.value;
    if (!search) {
      this.filteredOptions.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOptions.next(
      this.options.filter(item => item[this.fieldToSearch].toLowerCase().indexOf(search) > -1)
    );

  }
}
