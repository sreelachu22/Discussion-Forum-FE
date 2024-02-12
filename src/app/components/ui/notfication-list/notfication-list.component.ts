import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from 'src/app/features/user/notification/notification.component';
@Component({
  selector: 'app-notfication-list',
  templateUrl: './notfication-list.component.html',
  styleUrls: ['./notfication-list.component.css']
})
export class NotficationListComponent {
  @Input() notification!: Notification;
  @Output() markAsRead: EventEmitter<number> = new EventEmitter<number>();

  removeNotification(replyId: number) {
    this.markAsRead.emit(replyId);
  }
}
