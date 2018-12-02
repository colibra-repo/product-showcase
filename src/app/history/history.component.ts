import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  activeTasks$: Observable<any[]>;
  completedTasks$: Observable<any[]>;
  taskVotes: any;

  private totalVotes = 7;

  constructor(private db: DbService) {
    this.taskVotes = this.db.getVotes();
  }

  ngOnInit() {
    this.db.tasks$.pipe(switchMap((tasks: any[]) => {
      const voted = tasks.filter(t => this.taskVotes.hasOwnProperty(t.task_id));
      return of(voted);
    })).subscribe((tasks: any[]) => {
      const active = [];
      const completed = [];
      tasks.forEach(t => {
        t.placed_votes.length < this.totalVotes ? active.push(t) : completed.push(t);
        this.activeTasks$ = of(active);
        this.completedTasks$ = of(completed);
      });
    });
  }

}
