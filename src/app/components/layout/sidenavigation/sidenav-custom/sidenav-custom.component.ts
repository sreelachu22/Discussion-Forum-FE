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
