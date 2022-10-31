import { Injectable, OnInit } from '@angular/core';
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
export class SignInGuardService implements OnInit {
  isUserLoggedIn: any;
  token: any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isLogged.subscribe((value) => {
      console.log('some', value);
      this.isUserLoggedIn = Boolean(value);
    });
    this.token = localStorage.getItem('token');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('token', localStorage.getItem('token'));

    console.log('sign-in service ', this.isUserLoggedIn);

    if (
      Boolean(
        localStorage.getItem('token') && localStorage.getItem('isEmailVerified')
      )
    ) {
      this.router.navigate(['/home']); // or home
      return false;
    }
    return true;
  }
}
