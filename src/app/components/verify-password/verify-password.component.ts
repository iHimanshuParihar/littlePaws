import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss'],
})
export class VerifyPasswordComponent implements OnInit {
  constructor(private authuser: AuthService) {}

  ngOnInit(): void {
    this.changeTab();
  }
  changeTab() {
    localStorage.setItem('currentTab', '1');
    this.authuser.isLoading.next(false);
  }
}
