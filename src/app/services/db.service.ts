import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as first_case from '../fixtures/case_1983.json'
import * as second_case from '../fixtures/case_1984.json'
import * as third_case from '../fixtures/case_1985.json'
import * as fourth_case from '../fixtures/case_1986.json'


@Injectable({
  providedIn: 'root'
})
export class DbService {

  private _tasks: any[] = [
    first_case.default,
    second_case.default,
    third_case.default,
    fourth_case.default
  ];
  
  private tasksSubject: BehaviorSubject<any[]> = new BehaviorSubject(this._tasks);
  private _taskVotes = {};

  tasksMap = this._tasks.reduce((r, i) => {
    r[i.task_id] = i;
    return r;
  }, {});
  tasks$: Observable<any[]> = this.tasksSubject.asObservable();

  constructor() {
  }

  vote(taskId: string, vote: boolean) {
    this._taskVotes[taskId] = vote;
    this.tasksMap[taskId].placed_votes.push(vote);

    this.autoVote(taskId);
  }

  getVotes(): any {
    return this._taskVotes;
  }

  hasUserVote(taskId: string) {
    return this._taskVotes.hasOwnProperty(taskId);
  }

  autoVote(taskId) {
    setTimeout(() => {
      const task = this.tasksMap[taskId];
      if (task.remaining_votes.length) {
        task.placed_votes.push(task.remaining_votes.pop());
        this.autoVote(taskId);
      }
      if (!task.remaining_votes.length) {
        this._calculateTaskResults(task);
        this.tasksSubject.next(this._tasks);
      }
    }, 5 * 1000);
  }

  private _calculateTaskResults(task: any): void {
    const trueVotes = task.placed_votes.filter(vote => vote === true).length;
    const truePercentage = Math.round((trueVotes * 100.0) / 7.0);
    const falsePercentage = 100.0 - truePercentage;
    const correct = (trueVotes > 3) === this._taskVotes[task.task_id];
    if (correct) {
      task.result = {
        truePercentage: truePercentage,
        falsePercentage: falsePercentage,
        correct: correct,
        hor: task.task_stake.hor.positive,
        tokens: task.task_stake.tokens,
        total: task.task_stake.stake + task.task_stake.tokens
      };
    } else {
      task.result = {
        truePercentage: truePercentage,
        falsePercentage: falsePercentage,
        correct: correct,
        hor: task.task_stake.hor.negative,
        tokens: 0,
        total: -task.task_stake.stake
      };
    }
  }
}
