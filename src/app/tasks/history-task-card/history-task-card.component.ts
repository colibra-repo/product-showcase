import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-task-card',
  templateUrl: './history-task-card.component.html',
  styleUrls: ['./history-task-card.component.scss']
})
export class HistoryTaskCardComponent implements OnInit {

  @Input() task: any;

  constructor() {
  }

  ngOnInit() {
  }

}
