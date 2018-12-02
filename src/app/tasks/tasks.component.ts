import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  tasks$: Observable<any[]>;
  taskVotes: any;

  constructor(private db: DbService) {
    this.taskVotes = this.db.getVotes();
  }

  ngOnInit() {
    this.tasks$ = this.db.tasks$.pipe(switchMap((tasks: any[]) => {
      const activeTasks = tasks.filter(t => !this.taskVotes.hasOwnProperty(t.task_id));
      return of(activeTasks);
    }), takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
