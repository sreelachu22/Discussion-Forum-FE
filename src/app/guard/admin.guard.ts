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

@Injectable({
  providedIn: 'root',
})
export class AdminRouteGuard implements CanActivate {
  constructor(private tokenHandler: TokenHandler, private router: Router) {}

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
      var role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      // console.log('role : ' + role);
      // var mainroute = state.url.split('/');
      // if (role.toLowerCase() == mainroute[1]) {
      //   return true;
      // }
      if (role == 'SuperAdmin' || role == 'CommunityHead') {
        return true;
      }
    }
    this.router.navigateByUrl('/unauthorised');
    return false;
  }
}
