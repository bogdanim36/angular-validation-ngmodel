import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material";

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class ErrorMessageComponent {
    constructor(
      public snackBarRef: MatSnackBarRef<ErrorMessageComponent>,
      @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {}
  }