import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {

  @Input()
  message!: string;

  constructor(public bsModalRef: BsModalRef) { }

  close() {
    this.bsModalRef.hide();
  }

}
