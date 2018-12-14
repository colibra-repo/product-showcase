import {Component, OnInit} from '@angular/core';
import {Notification, NotificationType} from '../profile-menu/profile-menu.component';
import {NotificationsService} from './notifications.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationTypes = NotificationType;
  notifications$: Observable<Notification[]>;
  hasUnread = false;

  constructor(private _router: Router, private notificationsService: NotificationsService) {
    this.notifications$ = this.notificationsService.getNotifications();
    this.notifications$.subscribe((notifications: Notification[]) => {
      this.hasUnread = notifications.reduce((res, notification) => {
        res = res || !notification.read;
        return res;
      }, false);
    });
  }

  ngOnInit() {
  }

  goToTask(notification: Notification) {
    this.notificationsService.setAsRead(notification.id);
    this._router.navigate(['/history', notification.taskId]);
  }

}
