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
  sortOptions = ['Old to New', 'New to Old'];

  pageNumber:number = 1;
  pageSize:number = 10;
  pages: number[] = [];  
  currentPage: number = 1;  
  totalPages: number = 10;
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
        this.updatePageNumbers();        
        this.getCategories();  
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
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

  // paginations logics
  updatePageNumbers() {
    const pagesToShow = Math.min(this.totalPages, 3);
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.getNotifications(this.userId, this.categoryID, this.sortOrder, this.pageNumber, this.pageSize);
    }
  }
}