import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
 
@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html'
})
export class ModalComponent {
  title: string = 'Potwierdź operację';
  message: string = 'Czy jesteś pewien, że chcesz wykonać tę operację?';
  confirmAction: any;
  constructor(private bsModalRef: BsModalRef) {}
 
  confirm(): void {
    this.confirmAction();
    this.bsModalRef.hide();
  }
 
  decline(): void {
    this.bsModalRef.hide();
  }
}