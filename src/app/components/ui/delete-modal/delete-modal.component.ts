import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  constructor(
    public bsmodalRef: BsModalRef,
    public modalService: BsModalService
  ) {}
  @Input() confirmFunction!: Function;
  @Input() declineFunction!: Function;

  confirm() {
    if (this.confirmFunction) {
      this.confirmFunction();
      this.bsmodalRef.hide();
    }
  }

  decline() {
    if (this.declineFunction) {
      this.declineFunction();
      this.bsmodalRef.hide();
    }
  }
}
