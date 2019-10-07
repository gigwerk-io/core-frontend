import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../utils/services/notification.service';
import {Notification} from '../../utils/interfaces/notification/notification';
import {Router} from '@angular/router';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: Notification[];
  clickType = 'unread';
  notificationClass = '';
  readable = true;
  constructor(private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {

  }

  getNewNotifications() {
    this.notificationService.getNewNotifications().subscribe(res => {
      this.notifications = res.notifications;
    });
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(res => {
      this.notifications = res.notifications;
    });
  }

  segmentChanged(event) {
    this.clickType = event.target.value;
    switch (event.target.value) {
      case 'unread':
        this.notificationClass = '';
        this.getNewNotifications();
        break;
      case 'all':
        this.notificationClass = 'read';
        this.readable = false;
        this.getAllNotifications();
        break;
      default:
        this.getNewNotifications();
    }
  }

  markRead(id, index) {
    this.notifications.splice(index, 1);
    this.notificationService.markNotificationAsRead(id).subscribe();
  }

  view(index, notification: Notification) {
    this.markRead(notification.id, index);
    setTimeout(() => {
      this.router.navigate([notification.action.page, notification.action.params]);
    }, 100);
  }
}
