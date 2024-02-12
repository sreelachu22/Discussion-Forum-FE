import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/HttpServices/notification.service';

export interface Notification {
  childReplyID: number;
  childReplyContent: string;
  childReplyCreatedAt: string;
  childReplyUserName: string;
  parentReplyID:string | null;
  parentReplyUserName: string | null;
  parentReplyContent: string | null;
  categoryName: string;
  communityName: string;
  threadContent: string;
}
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  notifications!: Notification[];
  userId:string = "211526D8-AB57-4251-8D9B-B19C82BD6C72";
  categoryID:number = 0;
  sortOrder:string = "desc";
  pageNumber:number = 1;
  pageSize:number = 10;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications(this.userId,this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
  }

  getNotifications(userId:string,categoryID:number, sortOrder:string, pageNumber:number, pageSize:number) {
    this.notificationService.getNotifications(userId, categoryID, sortOrder, pageNumber, pageSize)
      .subscribe((data: any[]) => {
        this.notifications = data;         
      });
  }
  onMarkAsRead(replyId: number) {   
    this.notificationService.markAsRead(replyId).subscribe(
        () => {
          this.getNotifications(this.userId,this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);                
        },
        (error) => {            
            console.error('Error marking reply as read:', error);
        }
    );
}

    // 
  }