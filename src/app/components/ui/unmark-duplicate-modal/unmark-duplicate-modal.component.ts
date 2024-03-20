import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-unmark-duplicate-modal',
  templateUrl: './unmark-duplicate-modal.component.html',
  styleUrls: ['./unmark-duplicate-modal.component.css'],
})
export class UnmarkDuplicateModalComponent {
  constructor(private modalRef: BsModalRef) {}
  originalThreadLink: string = '';
  @Output() threadEditedAsDuplicate: EventEmitter<number> =
    new EventEmitter<number>();

  editThreadAsDuplicate() {
    // Extract thread ID from the link
    const threadId = this.extractThreadId(this.originalThreadLink);
    console.log(threadId);
    // Emit the event with the thread ID
    this.threadEditedAsDuplicate.emit(threadId);
    this.modalRef.hide();
  }

  unmarkThreadAsDuplicate() {
    this.threadEditedAsDuplicate.emit(0);
    this.modalRef.hide();
  }

  extractThreadId(link: string): number {
    // Extract thread ID from link (assuming it's always in the format "localhost:4200/post-replies/?threadId=57")
    const regex = /threadID=(\d+)/;
    const match = link.match(regex);
    if (match && match[1]) {
      return +match[1]; // Convert to number
    }
    return 0; // Return 0 if no match found
  }

  closeModal() {
    this.modalRef.hide();
  }
}
