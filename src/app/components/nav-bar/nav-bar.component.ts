import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {
  faUsers,
  faHouseChimneyWindow,
  faPhone,
  faUser,
  faCat,
  faShieldDog,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../all-pets/child/notification/notification.component';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, AfterViewInit {
  faBell = faBell;
  faUser = faUser;
  faUsers = faUsers;
  faHouseChimneyWindow = faHouseChimneyWindow;
  faPhone = faPhone;
  faCat = faCat;
  faShieldDog = faShieldDog;
  faQuestion = faCircleQuestion;
  numberOfNotification: any;
  isUserLoggedIn: boolean = Boolean(
    localStorage.getItem('token') && localStorage.getItem('isEmailVerified')
  );
  // :TODO change the var name to something more readable
  opened = false;
  displayRoutes: boolean = false;
  constructor(
    private userauth: AuthService,
    private dialog: MatDialog,
    private database: DatabaseService
  ) { }

  email: any;
  ngAfterViewInit(): void { }
  ngOnInit(): void {
    this.database.fetchInterestedUsers()
    localStorage.setItem('notificationsSeen', 'false');
    this.database.getEmail();
    this.database.currentUserEmail.subscribe((value) => {
      console.log(value);
      this.email = value;
    });
    // this.database.checkForNotificationChange();
    this.database.notificationsChangeSubject.subscribe((value) => {
      console.log('whyyyyyy', value);
      this.numberOfNotification = String(value);
    });
    // subscribing to user logged in var to change the sign-in/ logout button at top right
    this.userauth.isLogged.subscribe((isLogged) => {
      console.log(isLogged);
      this.isUserLoggedIn = Boolean(isLogged);
    });

    // subscribing to notification change
  }

  openNotificationsDialog() {
    this.numberOfNotification = '';
    let dialogRef = this.dialog.open(NotificationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('what', localStorage.getItem('prevNotificationCount'));
      this.database.seenNotificationsCount.next(
        Number(localStorage.getItem('prevNotificationCount'))
      );
    });
  }
  toggleSideNav() {
    this.opened = !this.opened;
  }

  logout() {
    // localStorage.setItem('isNotificationSeen', 'false');
    localStorage.clear();
    localStorage.removeItem('uid');
    localStorage.removeItem('prevNotificationCount');
    this.userauth.logout();
  }
}
