import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenHandler } from 'src/app/util/tokenHandler';
import { environment } from 'src/app/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from 'jwt-decode';
import { faL } from '@fortawesome/free-solid-svg-icons';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
export interface azureObj {
  Token: string;
  Provider: string;
  expiration: number;
  name: string;
  username: string;
}

export interface AzureReturn {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  apiurl: string = environment.apiUrl;
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  isLogged: boolean = false;
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  data: any;
  userValid: boolean = false;
  azureObj: azureObj = {
    Token: '',
    Provider: '',
    expiration: 0,
    name: '',
    username: '',
  };
  userId: number = 0;
  userName: string = '';
  userRole: string = '';
  azureRole: string = '';
  navigateFirst: boolean = true;

  constructor(
    private http: HttpClient,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private router: Router
  ) {}

  loginUser(model: { email: string; password: string }) {
    return this.http.post(this.apiurl + 'Login/login', model);
  }

  updateUserLoggedInStatus(loggedIn: boolean): void {
    this.isUserLoggedIn.next(loggedIn); // Emit new value
  }

  Logout() {
    console.log('logout');
    this.isLogged = false;
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.postLogoutRedirectUri,
    });
    sessionStorage.clear();
  }
  microsoftLogin(model: any) {
    return this.http.post(this.apiurl + 'Login/ExternalLogin', model);
  }
  logoutBackend(userID: string): Observable<any> {
    const url = this.apiurl + `Login/Logout?userId=${userID}`;
    return this.http.post(url, null);
  }
}
