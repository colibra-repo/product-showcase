import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notification, NotificationType} from '../profile-menu/profile-menu.component';
import * as uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _notificationSubject: BehaviorSubject<Notification[]> = new BehaviorSubject(
    [
      // {
      //   taskId: '1984',
      //   read: false,
      //   type: NotificationType.VOTE,
      //   result: true,
      //   subject: 'Claim #1984',
      //   text: 'has been approved. You voted correctly.',
      //   createdDate: new Date()
      // },
      // {
      //   taskId: '1984',
      //   read: true,
      //   type: NotificationType.VOTE,
      //   result: false,
      //   subject: 'Claim #1984',
      //   text: 'has been declined. You voted incorrectly.',
      //   createdDate: new Date()
      // },
      {
        id: '99736793-9be9-485e-9653-3e0d31b7da38',
        taskId: '1984',
        read: true,
        type: NotificationType.INFO,
        subject: 'Client of claim #1984',
        text: 'has been paid by reimbursement.',
        createdDate: new Date()
      },
      {
        id: '98ad8bd0-37b1-48b3-9848-e774980a3c9d',
        taskId: '1984',
        read: true,
        type: NotificationType.INFO,
        subject: 'Client of claim #1984',
        text: 'has been assisted in paying the hospital.',
        createdDate: new Date()
      },
    ]);

  constructor() {
  }

  getNotifications(): Observable<Notification[]> {
    return this._notificationSubject.asObservable();
  }

  addNotification(notification: Notification): void {
    notification.id = uuid();
    notification.read = false;
    notification.createdDate = new Date();

    const notifications = this._notificationSubject.getValue();
    notifications.push(notification);
    notifications.sort((n1, n2) => n2.createdDate.getTime() - n1.createdDate.getTime());
    this._notificationSubject.next(notifications);
  }

  setAsRead(id: string) {
    const notifications = this._notificationSubject.getValue();
    notifications.find(notification => notification.id === id).read = true;
    this._notificationSubject.next(notifications);
  }
}
