import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/HttpServices/users.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { SingleUserService } from 'src/app/service/DataServices/singleUser.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  sortOptions = ['Name', 'Score', 'CreatedAt'];
  // , 'Department', 'Designation'
  sortType: string = 'name';
  title: string = 'usersPage';
  searchText: string = '';
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
    private http: HttpClient,
    private router: Router,
    private singleUserService: SingleUserService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }
  getSingleUser() {
    if (this.searchText == '') {
      this.loadUsers();
    } else {
      this.userService
        .getAUser(this.currentPage, this.searchText)
        .subscribe((data) => {
          this.users = data.users;
          this.pageCount = data.totalPages;
        });
    }
  }

  loadUsers() {
    this.userService
      .getUsers(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.users = data.users.map((user) => {
          return {
            ...user,
            createdAt: user.createdAt
              ? formatDate(user.createdAt, 'dd-MM-yyyy', 'en-US')
              : null,
            // Add more properties if necessary
          };
        });
        // console.log(this.users[1].userID);
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
      this.singleUserService.setUserData(event.data.userID);
      this.GoToSingleUserPage(event.data.userID);
    }
  }

  GoToSingleUserPage(userID: string): void {
    this.router.navigate([
      `community-management-dashboard/user-management/user-edit`,
    ]);
  }

  onSortSelectionChange(selectedValue: string) {
    this.sortType = selectedValue;
    this.loadUsers();
  }
  handleButtonClick() {
    window.alert('hi');
  }
}
