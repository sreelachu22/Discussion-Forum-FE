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

  breadcrumbs = [
    { label: 'Home', route: '/home' },
    { label: 'Community', route: '/community' },
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
  //templeate variables
  user!: SingleUser;
  userRoleToggle: boolean = false;
  userRoles!: [{ roleID: number; roleName: string }];
  selectedRoleID!: number;

  //change user role
  editUserRole() {
    this.userRoleToggle = !this.userRoleToggle;
  }

  //save the canged user role
  saveChanges() {
    this.userRoleToggle = !this.userRoleToggle;

    this.useredit
      .changeUserRole(
        this.user.userID,
        this.selectedRoleID,
        '477D9E0A-6C59-49CF-B7C5-ED8A624FF2AE'
      )
      .subscribe({
        next: (response) => {
          console.log('API call successful:', response);

          // Reload user details after successful API call
          this.useredit.getSingleUser(this.user.userID).subscribe({
            next: (data: SingleUser) => {
              this.user = data;
              console.log('User details reloaded:', this.user);
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
  //ng init method loading current user details from url params
  ngOnInit() {
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    var userID: string = '';
    this.activatedroute.params.subscribe((params) => {
      this.singleUserService.userID$.subscribe((uid) => {
        userID = uid;
      });
      alert(userID);
      if (userID) {
        this.useredit.getSingleUser(userID).subscribe({
          next: (data: SingleUser) => {
            this.user = data;
            console.log(this.user);
          },
          error: (error: Error) => {
            console.log('Error', error);
          },
        });
      }

      this.useredit.getUserRoles().subscribe((data) => {
        this.userRoles = data;

        // Find the role that matches the user's roleName
        this.userRoles.forEach((role) => {
          if (role.roleName === this.user.roleName) {
            this.selectedRoleID = role.roleID;
            console.log('');
          } else {
            console.log('error matching role');
          }
        });
      });
    });
  }
}
