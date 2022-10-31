import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class VerifyEmailGuardService {
  isUserLoggedIn: boolean = Boolean(localStorage.getItem('token') && localStorage.getItem('isEmailVerified'));
  constructor(private userauth: AuthService, private router: Router) {
    this.userauth.isLogged.subscribe((value) => { this.isUserLoggedIn = Boolean(value) })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (!this.isUserLoggedIn) {
      return true
    }
    return false;
  }
}
