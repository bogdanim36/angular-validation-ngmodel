# Multiple horizontal tabs component

 ## Component with multiple tabs
 main.component.ts 
    
    constructor( public validationService: ValidationService  ) {
    }
    
    ngOnDestroy() {
        this.validationService.clear(); // !!!!!!! Important |||||||||||
    }

    ngAfterViewInit(): void {
        this.validationService.validateWithTimeout(); // for show validation messages on page initialization
    }
    
    checkValidations(){
        return this.validationService.validate()
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
    
##Collections with vertical tabs component

component.ts

    export class PersonalDataTabComponent implements OnInit {
        validation: CollectionValidation;
        @Output() validationStateEvent = new EventEmitter<boolean>();
     
        constructor(private validationService: ValidationService) {
            super();
        }
    
        ngOnInit(): void {
            this.setValidations();
        }
    
        setValidations() {
            this.validation = new CollectionValidation();
            this.validation.id = 'personalData';
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

##Collection item component

component.ts

    export class PersonalDataItemComponent implements OnInit {
      validation: FieldsGroupValidation;
       @Output() validationStateEvent = new EventEmitter<boolean>();
    
      constructor(private validationService: ValidationService) {
      }
    
      ngOnInit() {
        this.setValidations();
      }
    
    
      setValidations() {
        this.validation = new FieldsGroupValidation();
        this.validation.id = 'personalDataItem';
        this.validation.addField({path: 'data.primaryPhone', data: this, validations: [Validators.mandatory]}); 
        this.validation.eventEmitter = this.validationStateEvent;
        this.validationService.addToCollection('personalData', this.validation);
      }
      
component.html

     <input-text [label]="'primaryPhone'|translate"
                 [(ngModel)]="data.primaryPhone"
                 [name]="'primaryPhone'"
                 [fieldValidations]="validation.fields['data.primaryPhone']"
                 (blur)="tabValidation.validate();afterPrimaryPhoneInput()" ></input-text>

##Component with iteration

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
        this.data.phonesList.forEach((item, index) => this.addPhoneValidation(index, item));
      }
    
      addPhoneValidation(index, data) {
        let validator = new FieldsGroupValidation([
          {path: 'type', data: data, validations: [Validators.mandatory]},
          {path: 'no', data: data, validations: [Validators.mandatory]},
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
          <button mat-button  (click)="addMobile() " >
            <mat-icon>add</mat-icon>
          </button>
        </div>
        <ng-template #selectTpl1 let-item="item">{{item|translate}}</ng-template>
        <div class="d-flex flex-row align-items-center w-100"
             *ngFor="let phone of data.phonesList; let idx=index;">
          <input-select class="mr-1" style="width: 120px;"
                                 [(ngModel)]="phone.type"
                                 [fieldValidations]="validation.fields.phonesList?.validations[idx]?.fields.type"
                                 [options]="phoneTypesList"
                                 matOptionValueItemField="item"
                                 (ngModelChange)="tabValidation.validate();"
                                 [matOptionTpl]="selectTpl1"></input-select>
          <input-text class="w-100 mr-1" [(ngModel)]="phone.no"
                                         (blur)="tabValidation.validate()"
                                         [fieldValidations]="validation.fields.phonesList?.validations[idx]?.fields.no"></input-text>
          <button mat-icon-button (click)="deleteMobile(idx)">
            <mat-icon>delete_outline</mat-icon>
          </button>
        </div>
      </div>
    </div>

##Modal implementation

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
          this.validation.validateWithTimeout();
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
        this.validation.addField({path: 'data.country', containerPath: this.addressName, data: this, validations: [Validators.mandatory]});
        if (this.isModal) {
          this.validation.eventEmitter = this.validationStateEvent;
        }
      }
    }

##Field Validations samples

    this.validation.addField({path: 'data.primaryPhone', data: this, validations: [Validators.mandatory]});

###In container (containerPath)
    
    this.validation.fields[this.addressName] = {};
    this.validation.addField({path: 'data.country', containerPath: this.addressName, data: this, validations: [Validators.mandatory]});

###Custom validation:

    this.validation.addField(new Validators.custom('productSelection',
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
        
###Backend Validation

    setValidations(){
        this.validation.addField({
            path: 'data.primaryPhone',
            data: this,
            validations: [Validators.mandatory,
              Validators.number,
              new Validators.startsWith('07', this.translate),
              new Validators.stringLengthEqualWith(10, this.translate),
              new Validators.backend({isError: true, message: 'Phone belongs to another client', rule: () => this.primaryPhoneBEValidate})]
          });
      }
      
    afterPrimaryPhoneInput() {
        if (!this.validation.fields['data.primaryPhone'].validate()) {
          return;
        }
        this.primaryPhoneBEValidate = false;
        this.collectDataService.checkPrimaryPhone(this.data).subscribe(response => {
          this.primaryPhoneBEValidate = response;
          this.tabValidation.validate();
        });
    }
    
###Validation Rule Condition
         
    this.validation.addField(new FieldValidations('data.citizenship',
      this,
      [new Validators.mandatory({
        ruleCondition: (data: CiData) => {
          return data.resident !== 'non-resident';
        }
      }), Transformers.upperCase],
      () => this.data));
  
###Using translation service for complex sentence      
      
      let minAndMaxValidation = new Validators.custom({
        isError: true,
        messageFn: (data: ProductData) => {
          if (!data.creditCard.selectedSubProduct) {
            return '';
          }
          if (data.creditCard.requestedAmount < data.creditCard.selectedSubProduct.minAmount) {
            return this.translate.instant('mustBeGreaterThan') + data.creditCard.selectedSubProduct.minAmount;
          } else if (data.creditCard.requestedAmount > data.creditCard.selectedSubProduct.maxAmount) {
            return this.translate.instant('mustBeLessThan') + data.creditCard.selectedSubProduct.maxAmount;
          }
        },
        ruleCondition(data: ProductData): boolean {
          return !data.creditCard.hide && data.creditCard.selected && !!data.creditCard.selectedSubProduct;
        },
        rule: (data: ProductData) => {
          return data.creditCard.requestedAmount >= data.creditCard.selectedSubProduct.minAmount &&
            data.creditCard.requestedAmount <= data.creditCard.selectedSubProduct.maxAmount;
        }
      });

      this.validation.addField(new FieldValidations('data.creditCard.selectedSubProduct.selectedPackageCode',
        this,
        [new Validators.custom({
          isError: true,
          message: ValidationMessages.mandatoryField,
          ruleCondition(data: ProductData): boolean {
            return !data.creditCard.hide && data.creditCard.selected && !!data.creditCard.selectedSubProduct;
          },
          rule: (data: ProductData) => {
            return !!data.creditCard.selectedSubProduct.selectedPackageCode;
          }
        })],
        () => this.data));
      this.validation.addField(new FieldValidations('data.creditCard.requestedAmount',
        this,
        [new Validators.mandatory({
          ruleCondition: (data: ProductData) => {
            return !data.creditCard.hide && data.creditCard.selected;
          },
          rule: (data: ProductData) => {
            return !!(data.creditCard.requestedAmount);
          }
        }), new Validators.integer({
          ruleCondition: (data: ProductData) => {
            return !data.creditCard.hide && data.creditCard.selected;
          },
          rule: function(data: ProductData) {
            return this.isInteger(data.creditCard.requestedAmount);
          },
        }), minAndMaxValidation],
        () => this.data));
###Warning message:

    this.data.agreementsUIData.agreements.forEach((agreement, i) => {
      let field = new FieldValidations('data.agreementsUIData.agreements.' + agreement.id,
        this,
        [Validators.mandatory],
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
