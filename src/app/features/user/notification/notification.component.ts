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
  userID : string | null = sessionStorage.getItem('userID');
  userId:string = this.userID || '';
  categoryID:number = 0;
  sortOrder:string = "desc";  

  categories:any[] = [];
  parentDropdownOptions: string[] = ['All'];
  sortOptions = ['Oldest', 'Latest'];

  pageNumber:number = 1;
  pageSize:number = 10;  
  currentPage: number =1;
  totalPages!: number;

  notificationCount!:number;

  constructor(private notificationService: NotificationService, private categoryService:CategoryService) { }

  
  ngOnInit(): void {
    this.getNotifications(this.userId,this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);    
  }


  getNotifications(userId:string,categoryID:number, sortOrder:string, pageNumber:number, pageSize:number) {
    this.notificationService.getNotifications(userId, categoryID, sortOrder, pageNumber, pageSize)
      .subscribe({
        next: (data: any) => {
          this.notifications = data.replies;          
          this.notificationCount = data.totalCount;    
          this.totalPages = Math.ceil(this.notificationCount/this.pageSize);                      
          this.getCategories();  
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
  }


  getCategories() {
    this.categoryService.getCategories(1)
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
    if (selectedValue === 'oldest') {
      this.sortOrder = 'asc';
    } else if (selectedValue === 'latest') {
      this.sortOrder = 'desc';
    }
    this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
  }

  // paginations logics
  nextPage() {
    if (this.pageNumber <= this.totalPages - 1) {
      this.pageNumber++;  
      this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);      
    }
  }


  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
    }
  }
}