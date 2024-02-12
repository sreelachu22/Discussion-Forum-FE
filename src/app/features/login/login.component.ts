import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import { Router } from '@angular/router';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _destroy = new Subject<void>();
  isUserLoggedIn: boolean = false;
  model = {
    token: '',
    provider: '',
  };

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    private authService: MsalService,
    private accountsService: AccountsService,
    private router: Router,
    private tokenHandler: TokenHandler
  ) {
    const token = this.tokenHandler.getToken();
    if (token != null) {
      var role = this.tokenHandler.getRoleFromToken(token);
      if (role == 'SuperAdmin') {
        this.router.navigateByUrl('/admin-dashboard');
      } else if (role == 'CommunityHead') {
        this.router.navigateByUrl('/community-management-dashboard');
      } else if (role == 'User') {
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire(
          '401- Unauthorized',
          'You are not authorised to use the system',
          'error'
        );
      }
    }
  }

  async ngOnInit() {
    this.msalBroadCastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroy)
      )
      .subscribe((res) => {
        this.isUserLoggedIn =
          this.authService.instance.getAllAccounts().length > 0;

        if (this.isUserLoggedIn) {
          this.model.token =
            this.authService.instance.getAllAccounts()[0].idToken?.toString() ||
            '';
          this.model.provider = 'Microsoft';
          this.accountsService.microsoftLogin(this.model).subscribe({
            next: (res: any) => {
              localStorage.setItem('token', res.token);
              var role = this.tokenHandler.getRoleFromToken(res.token);
              if (role == 'SuperAdmin') {
                this.router.navigateByUrl('/admin-dashboard');
              } else if (role == 'CommunityHead') {
                this.router.navigateByUrl('/community-management-dashboard');
              } else if (role == 'User') {
                this.router.navigateByUrl('/home');
              } else {
                Swal.fire(
                  'Did you enter the correct credentials?',
                  res.errors[''][0],
                  'question'
                );
              }
            },
          });
        }
        this.accountsService.isUserLoggedIn.next(this.isUserLoggedIn);
      });

    this.login();
  }

  async login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }
}
