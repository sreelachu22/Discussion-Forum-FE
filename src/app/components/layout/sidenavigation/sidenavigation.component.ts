import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SingleUser } from 'src/app/features/community_head/user-edit/user-edit.component';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import { UserEditService } from 'src/app/service/HttpServices/user-edit.service';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';
import { ProfilePopupComponent } from '../profile-popup/profile-popup.component';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.css'],
})
export class SidenavigationComponent {
  constructor(
    private router: Router,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private accountService: AccountsService,
    private userService: UserEditService,
    private modalService: BsModalService
  ) {}
  collapsed = signal(false); //signals which will pass the state with the parent component
  //Automatically update the sidenav width according to the collapsed state
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  faUser = faUser;

  showProfilePopup: boolean = false;
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  departmentName: string = 'IT';
  designationName: string = 'Software Engineer';
  userID: string | null = '';
  user!: SingleUser;

  ngOnInit() {
    this.userID = sessionStorage.getItem('userID');
    if (this.userID) {
      this.userService.getSingleUser(this.userID).subscribe({
        next: (data: SingleUser) => {
          this.user = data;
          console.log(this.user);
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
    }
  }

  modalRef?: BsModalRef;

  toggleProfilePopup(): void {
    this.showProfilePopup = !this.showProfilePopup;
    if (this.showProfilePopup) {
      const initialState = {
        user: this.user,
      };
      this.modalRef = this.modalService.show(ProfilePopupComponent, {
        initialState,
        ignoreBackdropClick: false,
        class: 'modal-dialog modal-dialog-right',
      });
    } else {
      this.modalRef?.hide();
    }
  }

  handleLogOut() {
    Swal.fire({
      title: 'Are you sure?',

      text: 'Do you want to log out?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Logout',

      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.authService.logoutRedirect({
          postLogoutRedirectUri: 'http://localhost:4200',
        });
        this.tokenHandler.removeToken();
        this.accountService.isLogged = false;
        this.accountService.updateUserLoggedInStatus(
          this.accountService.isLogged
        );
        sessionStorage.clear();
        this.router.navigateByUrl('/logout');
      }
    });
  }
}
