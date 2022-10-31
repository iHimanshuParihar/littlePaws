import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  allNotifications: any;
  noNotificationMessage: string = 'No notifications';
  noNotification?: boolean;
  panelOpenState = false;
  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    // this.database.fetchInterestedUsers();
    this.allNotifications = false;
    this.database.allNotificationsSubject.subscribe((value) => {
      this.allNotifications = [];
      this.allNotifications = value;
      console.log('length', this.allNotifications.length);
      console.log('hmm', this.allNotifications);
      if (value.length < 1) {
        this.noNotification = true;
      } else {
        this.noNotification = false;
      }
    });
  }
}
