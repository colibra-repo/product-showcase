import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  activeTask = {
    time: new Date(),
    event: 'Lost luggage',
    voters: {
      current: 1,
      total: 7
    },
    country: 'GB',
    type: 'luggage',
    completed: false
  };

  completedTask = {
    time: new Date(),
    event: 'Lost luggage',
    voters: {
      current: 7,
      total: 7
    },
    reward: 100,
    horDelta: '+2',
    country: 'GB',
    type: 'luggage',
    completed: true
  };

  constructor() {
  }

  ngOnInit() {
  }

}
