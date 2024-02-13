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
  @Input() user!: SingleUser;

  getBadge(score: number): string {
    if (score >= 100) {
      return '../../../assets/images/gold_medal.png';
    } else if (score >= 50) {
      return '../../../assets/images/silver_medal.png';
    } else {
      return '../../../assets/images/bronze_medal.png';
    }
  }
}
