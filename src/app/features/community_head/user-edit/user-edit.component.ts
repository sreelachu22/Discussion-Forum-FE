import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleUserService } from 'src/app/service/DataServices/singleUser.service';
import { LoaderService } from 'src/app/service/HttpServices/loader.service';
import { UserEditService } from 'src/app/service/HttpServices/user-edit.service';

//interface for user DTO
export interface SingleUser {
  userID: string;
  name: string;
  email: string;
  score: number;
  createdAt: Date;
  departmentName: string;
  designationName: string;
  roleName: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  constructor(
    private useredit: UserEditService,
    private activatedroute: ActivatedRoute,
    private singleUserService: SingleUserService,
    private loaderService: LoaderService
  ) {}
  breadcrumbs: { label: string; route: string; }[] = [];
  //templeate variables
  user!: SingleUser;
  userRoleToggle: boolean = false;
  userRoles!: [{ roleID: number; roleName: string }];
  selectedRoleID!: number;
  modifiedBy: any;
  communityName : string | null = '';
  
  //change user role
  editUserRole() {
    this.userRoleToggle = !this.userRoleToggle;
  }

  //save the changed user role
  saveChanges() {
    this.userRoleToggle = !this.userRoleToggle;
    this.useredit
      .changeUserRole(this.user.userID, this.selectedRoleID, this.modifiedBy)
      .subscribe({
        next: (response) => {
          // Reload user details after successful API call
          this.useredit.getSingleUser(this.user.userID).subscribe({
            next: (data: SingleUser) => {
              this.user = data;
            },
            error: (error: Error) => {
              console.error('Error reloading user details:', error);
            },
          });
        },
        error: (error) => {
          console.error('API call failed:', error);
        },
      });
  }

  isLoading: boolean = false;
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.communityName = sessionStorage.getItem('communityName');
    let userID: string;

    this.activatedroute.params.subscribe((params) => {
      this.singleUserService.userID$.subscribe((uid) => {
        userID = uid;

        if (userID) {
          this.useredit.getSingleUser(userID).subscribe({
            next: (data: SingleUser) => {
              this.user = data;
            },
            error: (error: Error) => {
              console.log('Error', error);
            },
            complete: () => {
              this.modifiedBy = sessionStorage.getItem('userID');

              this.useredit.getUserRoles().subscribe({
                next: (data) => {
                  this.userRoles = data;

                  // Find the role that matches the user's roleName
                  this.userRoles.forEach((role) => {
                    if (role.roleName === this.user.roleName) {
                      this.selectedRoleID = role.roleID;
                    }
                  });
                },
                error: (error) => {
                  console.error('Error fetching user roles:', error);
                },
              });
            },
          });
        }
      });
    });
    this.breadcrumbs = [
      { label: 'Home', route: '/home' },
      { label: this.communityName || '', route: '/community' },
      { label: 'Community Management', route: '/community-management-dashboard' },
      {
        label: 'User Management',
        route: '/community-management-dashboard/user-management',
      },
      {
        label: 'User Edit',
        route:
          '/community-management-dashboard/user-management/user-edit/:userID',
      },
    ];
  }
}
