import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // email: string = '';
  // password: string = '';
  currentTab: any;
  state: any;
  selectedTabIndex = 1;
  isDisabled: boolean = true;
  minPassLength = 8;

  isSpinnerLoading?: boolean;
  constructor(
    private auth: AuthService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // console.log(this.router.getCurrentNavigation().extras.['state'].currentIndex);
  }

  ngOnInit(): void {
    this.currentTab = localStorage.getItem('currentTab');
    console.log('current tab', this.currentTab);
    this.selectedTabIndex = history.state.currentIndex;
    this.auth.isLoading.subscribe((value) => {
      this.isSpinnerLoading = Boolean(value)
    })
    this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
      console.log(data); // do something with the data
    });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minPassLength),
  ]);
  signUpFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  register(signUpForm: any) {
    console.log('heyyy', signUpForm.email);
    // this.isSpinnerLoading = true;
    if (this.emailFormControl && this.passwordFormControl) {
      this.auth.register(signUpForm.email, signUpForm.password);
    }
  }
}
