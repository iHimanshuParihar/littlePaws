import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isSpinnerLoading?: boolean;
  constructor(private auth: AuthService) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  forgotPasswordGroup = new FormGroup({
    email: this.emailFormControl,
  });
  forgotPassword(forgotPasswordGroup: any) {
    this.auth.forgotPassword(forgotPasswordGroup.email);
  }
  ngOnInit(): void {
    this.auth.isLoading.subscribe((value) => {
      this.isSpinnerLoading = Boolean(value);
    });
  }
}
