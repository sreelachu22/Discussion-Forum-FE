import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { Router } from '@angular/router';
import {
  AccountsService,
  AzureReturn,
  azureObj,
} from 'src/app/service/HttpServices/account.service';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Subject, filter, takeUntil } from 'rxjs';
interface MicrosoftTokenPayload extends JwtPayload {
  name: string;
}
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  model = {
    email: '',
    password: '',
  };
  model2 = {
    token: '',
    provider: '',
    name: '',
  };

  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();
  azureObj: azureObj = {
    Token: '',
    Provider: '',
    expiration: 0,
    name: '',
    username: '',
  };
  azureReturn: AzureReturn = {
    token: '',
  };
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    private accountsService: AccountsService,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private router: Router
  ) {
    // const token = this.tokenHandler.getToken();
    // if (token != null) {
    //   const role = this.tokenHandler.getRoleFromToken(token);
    //   if (role == 'SuperAdmin') {
    //     this.router.navigateByUrl('/admin-dashboard');
    //   } else if (role == 'CommunityHead') {
    //     this.router.navigateByUrl('/community-management-dashboard');
    //   } else if (role == 'User') {
    //     this.router.navigateByUrl('/home');
    //   } else {
    //     Swal.fire(
    //       '401- Unauthorized',
    //       'You are not authorised to use the system',
    //       'error'
    //     );
    //   }
    // }
  }

  ngOnInit() {
    this.msalBroadCastService.inProgress$
      .pipe(
        filter(
          (interactionStatus: InteractionStatus) =>
            interactionStatus == InteractionStatus.None
        ),
        takeUntil(this._destroy)
      )
      .subscribe((x) => {
        this.isUserLoggedIn =
          this.authService.instance.getAllAccounts().length > 0;
        console.log(this.authService.instance.getAllAccounts());
        const account = this.authService.instance.getAllAccounts();
        this.azureObj.name = account[0].name ?? '';

        this.accountsService.isUserLoggedIn.next(this.isUserLoggedIn);
      });
  }

  saveData() {
    this.accountsService.loginUser(this.model).subscribe({
      next: (res: any) => {
        this.accountsService.isLogged = true;
        sessionStorage.setItem('token', res.token);
        const decodedToken: any = jwtDecode(res.token);
        var role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        var userID =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ];
        sessionStorage.setItem('userID', userID);
        if (role == 'SuperAdmin') {
          this.router.navigateByUrl('/admin-dashboard');
        } else if (role == 'CommunityHead') {
          this.router.navigateByUrl('/community-management-dashboard');
        } else if (role == 'User') {
          this.router.navigateByUrl('/home');
        } else {
          if (
            res.errors &&
            res.errors.hasOwnProperty('') &&
            res.errors[''].length > 0
          ) {
            Swal.fire(
              'Did you enter the correct credentials?',
              res.errors[''][0],
              'question'
            );
          } else {
            Swal.fire('Unknown Error', 'An unknown error occurred.', 'error');
          }
        }
      },
      error: (err: any) => {
        console.error('Error during login:', err);
        Swal.fire('Error', 'An error occurred during login.', 'error');
      },
    });
  }

  handleMicrosoftLogin() {
    sessionStorage.removeItem('token');
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({
          ...this.msalGuardConfig.authRequest,
        } as RedirectRequest)
        .subscribe((authenticationResult) => {
          this.accountsService.isLogged = true;
          this.azureObj.Token = authenticationResult.idToken;
          this.azureObj.Provider = 'Microsoft';
          this.accountsService.isLogged = true;
          sessionStorage.setItem('AzureJwt', authenticationResult.idToken);
          if (!sessionStorage.getItem('token')) {
            this.accountsService.microsoftLogin(this.azureObj).subscribe({
              next: (res: any) => {
                this.accountsService.isLogged = true;
                this.accountsService.updateUserLoggedInStatus(
                  this.accountsService.isLogged
                );
                sessionStorage.setItem('token', res.token);
                const decodedToken: any = jwtDecode(res.token);
                var role =
                  decodedToken[
                    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                  ];
                var userID =
                  decodedToken[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                  ];
                sessionStorage.setItem('userID', userID);
                if (role == 'SuperAdmin') {
                  this.accountsService.isSuperAdmin = true;
                  this.accountsService.isAdmin = true;
                  this.router.navigateByUrl('/admin-dashboard');
                } else if (role == 'CommunityHead') {
                  this.accountsService.isAdmin = true;
                  this.router.navigateByUrl('/community-management-dashboard');
                } else if (role == 'User') {
                  this.router.navigateByUrl('/home');
                } else {
                  if (
                    res.errors &&
                    res.errors.hasOwnProperty('') &&
                    res.errors[''].length > 0
                  ) {
                    Swal.fire(
                      'Did you enter the correct credentials?',
                      res.errors[''][0],
                      'question'
                    );
                  } else {
                    Swal.fire(
                      'Unknown Error',
                      'An unknown error occurred.',
                      'error'
                    );
                  }
                }
              },
            });
          } else {
            this.authService.loginPopup().subscribe((response) => {
              console.log('Authentication Result:', response);
              const accessToken = response.accessToken;
            });
          }
        });
    } else {
      this.authService.loginPopup().subscribe((response) => {
        console.log('Authentication Result:', response);
        const accessToken = response.accessToken;
      });
    }
  }

  getNameFromMicrosoftToken(token: string): string {
    try {
      const decodedToken: MicrosoftTokenPayload = jwtDecode(token);
      return decodedToken.name;
    } catch (error) {
      console.error('Error decoding Microsoft token:', error);
      return 'Unknown';
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }
}
