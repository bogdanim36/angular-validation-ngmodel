# angular-validation-ngmodel
A library for for show validation error messages on input with ngModel. Can be integrated with backend error messages too.


# Multiple horizontal tabs component

 main.component.ts
    
    constructor( protected validationService: ValidationService  ) {
    }
    
    ngOnDestroy() {
        this.validationService.clear(); // !!!!!!! Important |||||||||||
    }

    ngAfterViewInit(): void {
        this.validationService.initialize(); // for show validation messages on page initialization
    }
    
main.component.html


    <mat-tab>
        <ng-template mat-tab-label>
          <div class="align-items-center" [class.error-mark]="!offerData.valid">
            {{'offers' | translate}}
          </div>
        </ng-template>
        <offer-data-tab (validationStateEvent)="offerData.valid = $event"
                        ></offer-data-tab>
    </mat-tab>`
    
#Collections with vertical tabs component

component.ts

    export class PersonalDataTabComponent extends CreditCardsBaseTab<PersonalData> implements OnInit {
        validation: CollectionValidation;
    
        constructor(private validationService: ValidationService) {
            super();
        }
    
        ngOnInit(): void {
            this.setValidations();
        }
    
        setValidations() {
            this.validation = new CollectionValidation();
            this.validation.eventEmitter = this.validationStateEvent;
            this.validationService.addTab('personalData', this.validation);
        }
    }
    
component.html

    <mat-tab-group >
      <mat-tab *ngFor="let clientData of data.clients;let i=index">
        <ng-template mat-tab-label>
          <div >
            <mat-icon [class.error-mark]="!clientData.valid">{{clientData.getIcon()}}</mat-icon>
            {{clientData.ciData.getFirstLettersOfName()}}
          </div>
        </ng-template>
        <personal-data-item   (validationStateEvent)="clientData.valid = $event" >
        </personal-data-item>
      </mat-tab>
    </mat-tab-group>

#Collection item component

component.ts

    export class PersonalDataItemComponent extends CreditCardsBaseTab<ClientData> implements OnInit {
      validation: FieldsGroupValidation;
    
      constructor(private validationService: ValidationService) {
      }
    
      ngOnInit() {
        this.setValidations();
      }
    
    
      setValidations() {
        this.validation = new FieldsGroupValidation();
        this.validation.id = 'personalDataForm';
        if (!this.isHistory) {
          this.validation.addField({path: 'data.primaryPhone', data: this, validations: [FieldIsMandatory]});
        }
    
        this.validation.eventEmitter = this.validationStateEvent;
        this.validationService.addToCollection('personalData', this.validation);
      }
      
component.html

     <input-text [validation]="validation.fields['data.primaryPhone']" ></input-text>

#Component with iteration

component.ts

    export class ContactDataComponent extends CreditCardsBaseTab<ClientData> implements OnInit {
      @Input() validation: FieldsGroupValidation;
      phoneTypesList: string[] = ['mobile', 'landline', 'work'];
    
      constructor(private validationService: ValidationService) {
      }
    
      ngOnInit() {
        if (!this.isHistory) {
          this.setValidations();
        }
      }
    
      setValidations() {
        this.validation.fields.phonesList = new CollectionValidation();
        if (!this.isHistory) {
          this.data.phonesList.forEach((item, index) => this.addPhoneValidation(index, item));
        }
    
    
      }
    
      addPhoneValidation(index, data) {
        let validator = new FieldsGroupValidation([
          {path: 'type', data: data, validations: [FieldIsMandatory]},
          {path: 'no', data: data, validations: [FieldIsMandatory]},
        ]);
        validator.id = 'phonesList';
        this.validation.fields.phonesList.addItem(validator);
      }
    
      addMobile() {
        if (!this.data.phonesList) {
          this.data.phonesList = [];
        }
        let data = new Phone();
        this.addPhoneValidation(this.data.phonesList.length, data);
        this.data.phonesList.push(data);
        this.validation.fields.phonesList.initialize();
      }
    
      deleteMobile(index) {
        this.data.phonesList.splice(index, 1);
        this.validation.fields.phonesList.clear();
        this.data.phonesList.forEach((data, i) => this.addPhoneValidation(i, data));
        this.validation.fields.phonesList.validate();
      }
    }

component.html

    <div class="w-100 mt-3">
      <div class="d-flex flex-column">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div class="form-subchapter"><span>{{'Other additional contact phones' | translate}}</span></div>
          <button mat-button type="button" class="btn-app" (click)="addMobile() " *ngIf="!isHistory">
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <ng-template #selectTpl1 let-item="item">{{item|translate}}</ng-template>
        <div class="d-flex flex-row align-items-center w-100"
             *ngFor="let phone of data.phonesList; let idx=index;">
          <input-select class="mr-1" style="width: 120px;"
                                 [validation]="validation.fields.phonesList?.validations[idx]?.fields.type"
                                 [matOptionTpl]="selectTpl1"></input-select>
          <input-text class="w-100 mr-1"
                               [(modelHolder)]="phone.no"
                               [validation]="validation.fields.phonesList?.validations[idx]?.fields.no"
                               [disabled]="isHistory || !phone.type"></input-text>
          <button mat-icon-button
                  type="button"
                  (click)="deleteMobile(idx)"
                  [disabled]="data.phonesList.length===1"
                  *ngIf="!isHistory">
            <mat-icon>delete_outline</mat-icon>
          </button>
        </div>
      </div>
    </div>

#Modal implementation

component.ts

    export class LocationAddressComponent extends CreditCardsBaseTab<LocationAddress> implements OnInit, AfterViewInit {
      @Input() addressName: string;
      @Input() validation: FieldsGroupValidation;
      @Input() isModal = false;
      
      constructor() {
      }
    
      ngOnInit() {
        this.setValidations();
      }
    
      ngAfterViewInit(): void {
        if (this.isModal) {
          setTimeout(() => this.validation.validate());
        }
      }
    
      fieldValidate(path) {
        return this.isModal ? this.validation.validate() : this.validation.fields[this.addressName][path].validate();
      }
    
      getValidationField(path) {
        return this.validation.fields[this.addressName][path];
      }
    
      setValidations() {
        this.validation.fields[this.addressName] = {};
        if (!this.isHistory) {
          this.validation.addField({path: 'data.country', containerPath: this.addressName, data: this, validations: [FieldIsMandatory]});
        }
        if (this.isModal) {
          this.validation.eventEmitter = this.validationStateEvent;
        }
      }
    }

#Field Validations samples

    this.validation.addField({path: 'data.primaryPhone', data: this, validations: [FieldIsMandatory]});

In container (containerPath)
    
    this.validation.fields[this.addressName] = {};
    this.validation.addField({path: 'data.country', containerPath: this.addressName, data: this, validations: [FieldIsMandatory]});

Custom validation:

    this.validation.addField(new FieldValidations('productSelection',
        this,
        [new FieldValidation({
          isError: true,
          message: 'chooseProduct',
          rule: (data: ProductData) => {
            return (data.eWallet.selected || data.debitCard.selected || data.creditCard.selected || data.insurance.selected);
          }
        })],
        () => this.data));
    this.validation.addField(new FieldValidations('data.creditCard.requestedAmount',
        this,
        [new FieldValidation({
          isError: true,
          message: ValidationMessages.mandatoryField,
          rule: (data: ProductData) => {
            if (data.creditCard.hide || !data.creditCard.selected) {
              return true;
            }
            return !!(data.creditCard.requestedAmount);
          }
        })],
        () => this.data));
        
Warning message:

    this.data.agreementsUIData.agreements.forEach((agreement, i) => {
      let field = new FieldValidations('data.agreementsUIData.agreements.' + agreement.id,
        this,
        [FieldIsMandatory],
        () => this.data.agreementsUIData.agreements.find(item => item.id === agreement.id).value);
      if (agreement.isMandatoryYes) {
        field.addValidation({
          isError: true,
          message: agreement.errorMessage,
          rule: (value) => {
            return value === true;
          }
        });
      }
      if (agreement.warningMessageIfNo) {
        field.addValidation({
          isWarning: true,
          message: agreement.warningMessageIfNo,
          rule: (value) => {
            return value === true;
          }
        });
      }
      this.validation.addField(field);
    });
