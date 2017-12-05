import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

 const tokenkey =  Object.keys(window.localStorage)
    .filter(item => item.startsWith('firebase:authUser'))[0];
    if (tokenkey) {
      return true;
    }else {
      this.route.navigate(['/sign-in']);
      return false;
    }
  }
}
