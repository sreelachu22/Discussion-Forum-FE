import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-invalid-popup',
  templateUrl: './invalid-popup.component.html',
  styleUrls: ['./invalid-popup.component.css'],
})
export class InvalidPopupComponent {
  @Input()
  message!: string;

  constructor(public bsModalRef: BsModalRef) {}

  close() {
    this.bsModalRef.hide();
  }
}
