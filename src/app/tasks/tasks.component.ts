import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  task = {
    time: new Date(),
    event: 'Lost luggage',
    voters: {
      current: 1,
      total: 7
    },
    country: 'GB',
    type: 'transport'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
