import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css'],
})
export class SuccessPopupComponent {
  @Input()
  message!: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    // Automatically close the modal after 5 seconds
    setTimeout(() => {
      this.close();
    }, 2500);
  }
  close() {
    this.bsModalRef.hide();
  }
}
