import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/HttpServices/category.service';
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

  categories:any[] = [];
  parentDropdownOptions: string[] = ['All'];
  sortOptions = ['Old to New', 'New to Old'];

  constructor(private notificationService: NotificationService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getNotifications(this.userId,this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);    
  }

  getNotifications(userId:string,categoryID:number, sortOrder:string, pageNumber:number, pageSize:number) {
    this.notificationService.getNotifications(userId, categoryID, sortOrder, pageNumber, pageSize)
      .subscribe((data: any[]) => {        
        this.notifications = data;   
        this.getCategories();      
      });
  }

  getCategories() {
    this.categoryService.getCategories(1) // Assuming 1 is the community ID, adjust accordingly
      .subscribe((data: any[]) => {
        this.categories = data;
        this.parentDropdownOptions = ['All', ...data.map(category => category.communityCategoryName)];
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
  handleOptionSelected(option: string) {
    console.log('Selected option:', option);
  
    if (option === 'All') {      
      this.categoryID = 0;
    } else {
      const selectedCategory = this.categories.find(category => category.communityCategoryName === option);
      if (selectedCategory) {        
        this.categoryID = selectedCategory.communityCategoryID;
      } else {
        console.error('Category not found:', option);
        return;
      }
    }    
    this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
  }
  onSortSelectionChange(selectedValue: string) {
    if (selectedValue === 'old to new') {
      this.sortOrder = 'asc';
    } else if (selectedValue === 'new to old') {
      this.sortOrder = 'desc';
    }
    this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
  }
}