import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/HttpServices/users.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  sortOptions = ['Name', 'Score', 'Date'];  
  sortType: string = 'name';
  title: string = 'usersPage';  
  users: any[] = [];
  currentPage: number = 1;
  pageCount: number = 1;

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
    { label: 'Community Management', route: '/community-management-dashboard' },
    {
      label: 'User Management',
      route: '/community-management/user-management',
    },
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  getSingleUser(searchText:string) {
    if (searchText == '') {
      this.loadUsers();
    } else {
      this.userService
        .getAUser(this.currentPage, searchText)
        .subscribe((data) => {
          this.users = data.users;
          this.pageCount = data.totalPages;
        });
    }
  }

  loadUsers() {     
    if (this.sortType == "date"){
      this.sortType = "createdAt"
    }
    this.userService
      .getUsers(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.users = data.users.map(user => {
          return {
            ...user,
            createdAt: user.createdAt ? formatDate(user.createdAt, 'dd-MM-yyyy', 'en-US') : null            
          };
        });        
        this.pageCount = data.totalPages;
      });
  }

  nextPage() {
    if (this.currentPage <= this.pageCount - 1) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  onUserIconClick(event: { icon: string; data: any }): void {
    if (event.icon === 'edit') {
      this.GoToSingleUserPage(event.data.userID);
    }
  }

  GoToSingleUserPage(userID: string): void {
    this.router.navigate([
      `community-management-dashboard/user-management/user-edit/${userID}`,
    ]);
  }

  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadUsers();
  }
}
