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
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRouteGuard implements CanActivate {
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
      var role = decodedToken[environment.decodedRole];
      if (role == 'SuperAdmin' || role == 'CommunityHead' || role == 'User') {
        return true;
      }
    }
    this.router.navigateByUrl('/unauthorised');
    return false;
  }
}
