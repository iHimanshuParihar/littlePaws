import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardService {
  isUserLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged.subscribe((value) => { this.isUserLoggedIn = Boolean(value) });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (this.isUserLoggedIn) {
      return true
    }
    this.router.navigate(['/sign-up'])
    return false;
  }
}
