import { Component, Input, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html'
})
export class SpinnerComponent implements OnDestroy {
  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show();
  }
  
  ngOnDestroy(): void {
    // this.spinner.hide();
  }

  @Input()
  public showSpinner;

  get showSpinnerF() {
    return this.showSpinner;
  }
}