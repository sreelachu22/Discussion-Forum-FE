import { Component, Input, computed, signal } from '@angular/core';
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
import { NotificationService } from 'src/app/service/HttpServices/notification.service';
import { UserNotificationService } from 'src/app/service/DataServices/userNotification.service';

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
    private userNotificationService: UserNotificationService
  ) {}
  collapsed = signal(false); //signals which will pass the state with the parent component
  //Automatically update the sidenav width according to the collapsed state
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
  notificationCount!:number;

  faUser = faUser;

  showProfilePopup: boolean = false;
  @Input() userID: string | null = '';
  user!: SingleUser;

  ngOnInit() {
    this.userNotificationService.notificationCount$.subscribe((count) => {
      this.notificationCount = count;
    });
    this.userID = sessionStorage.getItem('userID');
    if (this.userID) {
      this.userService.getSingleUser(this.userID).subscribe({
        next: (data: SingleUser) => {
          this.user = data;                       
        },
        error: (error: Error) => {
          console.log('Error', error);
        },
      });
    }
  }

  toggleProfilePopup(): void {
    this.showProfilePopup = !this.showProfilePopup;
  }

  showNotifications() {
    this.router.navigateByUrl('/notifications');
  }

  // getNotificationCount(): void {
  //   this.notificationService.getNotificationCount(sessionStorage.getItem('userID')).subscribe(
  //     (count: number) => {
  //       this.notificationCount = count;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching notification count:', error);
  //     }
  //   );
  // }
}
