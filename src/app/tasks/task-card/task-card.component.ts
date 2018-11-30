import {Component, Input, OnInit} from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task: any;
  hasVoted = false;
  route : string;

  constructor(private db: DbService) {
  }

  ngOnInit() {
    if (this.task) {
      this.hasVoted = this.db.hasUserVote(this.task.task_id);
      this.route = this.hasVoted ? '/history/' : '/tasks/';
    }
    
  }

}
