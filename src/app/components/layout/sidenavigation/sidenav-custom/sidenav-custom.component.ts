import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import { environment } from 'src/app/environments/environment';

export type MenuItem = {
  icon: string;
  label: string;
  routes: string;
};

@Component({
  selector: 'app-sidenav-custom',
  templateUrl: './sidenav-custom.component.html',
  styleUrls: ['./sidenav-custom.component.css'],
})
export class SidenavCustomComponent {
  sideNavCollapsed = signal(false);
  constructor(
    private router: Router,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private accountService: AccountsService
  ) {}
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      routes: 'home',
    },
    {
      icon: 'bolt',
      label: 'Latest',
      routes: '/latest',
    },
    {
      icon: 'announcement',
      label: 'Notices',
      routes: 'notices',
    },
    {
      icon: 'leaderboard',
      label: 'Leaderboard',
      routes: '/leaderboards',
    },
    {
      icon: 'flag',
      label: 'Guidelines',
      routes: '/guidelines',
    },
  ]);

  userId!: string | null;
  async handleLogOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        this.userId = sessionStorage.getItem('userID');
        // this.userId = 'A889A62C-CC6F-4362-927E-17207875BA25'
        if (this.userId) {
          try {
            this.accountService.logoutBackend(this.userId).subscribe(
              () => {
                this.authService.logoutRedirect({
                  postLogoutRedirectUri: environment.postLogoutRedirectUri,
                });
                this.tokenHandler.removeToken();
                sessionStorage.clear();
                this.router.navigateByUrl('/logout');
              },
              (error) => {
                console.error('Logout failed:', error);
              }
            );
          } catch (error) {
            console.error('An error occurred:', error);
          }
        } else {
          console.error('User ID not found in sessionStorage');
        }
      }
    });
  }
}
