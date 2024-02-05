import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserEditService } from 'src/app/service/HttpServices/user-edit.service';

//interface for user DTO
interface User {
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
    private activatedroute: ActivatedRoute
  ) {}

  breadcrumbs = [
    { label: 'Home', route: '/home_page' },
    { label: 'Community', route: '/community_page' },
    { label: 'Community Management', route: '/community_management_dashboard' },
    {
      label: 'User Management',
      route: '/community_management_dashboard/user-management',
    },
    {
      label: 'User Edit',
      route:
        '/community_management_dashboard/user-management/user-edit/:userID',
    },
  ];
  //templeate variables
  user!: User;
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
            next: (data: User) => {
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

  //ng init method loading current user details from url params
  ngOnInit() {
    this.activatedroute.params.subscribe((params) => {
      const userID = params['userID'];
      if (userID) {
        this.useredit.getSingleUser(userID).subscribe({
          next: (data: User) => {
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
