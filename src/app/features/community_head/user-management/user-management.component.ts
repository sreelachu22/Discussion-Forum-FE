import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/HttpServices/users.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { SingleUserService } from 'src/app/service/DataServices/singleUser.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';

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
  communityName : string | null = '';
  breadcrumbs: { label: string; route: string; }[] = [];
  

  constructor(
    private userService: UserService,
    private router: Router,
    private singleUserService: SingleUserService,
    private loaderService: LoaderService
  ) {}

  isLoading: boolean = false;
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.communityName = sessionStorage.getItem('communityName');
    this.loadUsers();
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: this.communityName || '', route: '/community' },
      { label: 'Community Management', route: '/community-management-dashboard' },
      {
        label: 'User Management',
        route: '/community-management/user-management',
      },
    ];
  }

  getSingleUser(searchText: string) {
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
    if (this.sortType == 'date') {
      this.sortType = 'createdAt';
    }
    this.userService
      .getUsers(this.currentPage, this.sortType)
      .subscribe((data) => {
        this.users = data.users.map((user) => {
          return {
            ...user,
            createdAt: user.createdAt
              ? formatDate(user.createdAt, 'dd-MM-yyyy', 'en-US')
              : null,
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
}
