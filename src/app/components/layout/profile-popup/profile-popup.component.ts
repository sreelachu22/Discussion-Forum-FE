import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SingleUser } from 'src/app/features/community_head/user-edit/user-edit.component';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css'],
})
export class ProfilePopupComponent {
  constructor(public modalRef: BsModalRef) {}
  @Input() handleLogOut!: Function;
  @Input() user!: SingleUser;

  logout(): void {
    this.handleLogOut();
    this.modalRef.hide();
  }

  getBadge(score: number): string {
    if (score >= 100) {
      return '../../../assets/images/gold_medal.png';
    } else if (score >= 50) {
      return '../../../assets/images/silver_medal.png';
    } else {
      return '../../../assets/images/bronze_medal.png';
    }
  }

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   // Check if the modal is currently visible and if the click event originated within the modal
  //   if (!this.isClickWithinModal(event)) {
  //     // If clicked outside the modal, hide the modal
  //     this.modalRef.hide();
  //   }
  // }

  // private isClickWithinModal(event: MouseEvent): boolean | null {
  //   // Get a reference to the modal container element
  //   const modalElement = document.querySelector('.modal-content');
  //   // Check if the clicked element is inside the modal container element
  //   return modalElement && modalElement.contains(event.target as Node);
  // }
}
