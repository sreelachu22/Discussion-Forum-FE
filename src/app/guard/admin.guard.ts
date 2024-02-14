import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenHandler } from '../util/tokenHandler';
import { jwtDecode } from 'jwt-decode';
import { AccountsService } from '../service/HttpServices/account.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteGuard implements CanActivate {
  constructor(
    private tokenHandler: TokenHandler,
    private router: Router,
    private accountsService: AccountsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      var role = decodedToken[environment.decodedRole];
      if (role == 'SuperAdmin' || role == 'CommunityHead') {
        return true;
      }
    }
    this.router.navigateByUrl('/unauthorised');
    return false;
  }
}
