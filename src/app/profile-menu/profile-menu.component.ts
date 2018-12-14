import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

export enum NotificationType {
  VOTE = 'Vote',
  INFO = 'Info'
}

export interface Notification {
  id?: string;
  taskId: string;
  read?: boolean;
  type: NotificationType;
  result?: boolean;
  subject: string;
  text: string;
  createdDate?: Date;
}
