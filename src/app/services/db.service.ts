import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private _tasks: any[] = [
    {
      'task_id': '1983',
      'insurance_type': 'Medical',
      'incident_desc': 'Broken arm',
      'incident_time': '2 hours ago',
      'decision_risk': 'Low',

      'task_stake': {
        'hor': {
          'positive': 2,
          'negative': -2
        },
        'tokens': 10,
        'stake': 32
      },
      'travel_profile': {
        'gender': 'Female',
        'risk_score': 'Medium',
        'type': ' Adventure'
      },
      'location': {
        'lat': -6.2658911,
        'lng': 39.5285832,
        'address': 'Paje, Zanzibar, Tanzania'
      },
      'hospital': {
        'name': 'Stone Town Hospital',
        'success_rate': '75% Above Average',
        'rating': 5
      },
      'bill_details': [
        {
          'name': 'Mouth',
          'price': '10 USD',
          'average': '12 USD',
          'comparison': 'Within range',
          'comparison_positive': true
        },
        {
          'name': 'Monthly Cases',
          'price': '32 USD',
          'average': '25 USD',
          'comparison': 'Above average',
          'comparison_positive': false
        },
        {
          'name': 'X-Ray',
          'price': '10 USD',
          'average': '8 USD',
          'comparison': 'Within range',
          'comparison_positive': true
        },
        {
          'name': 'Bill',
          'price': '52 USD',
          'average': '67 USD',
          'comparison': 'Within range',
          'comparison_positive': true
        }
      ],
      'additional_documents': [
        {'name': 'Doctor\'s perscription'},
        {'name': 'X-Ray'}
      ],
      'video_data': {
        'video_url': 'http://static.videogular.com/assets/videos/videogular.mp4',
        'thumbnail_url': '/assets/images/thumbnail.png',
        'cues': [
          {'second': 5, 'text': 'First key moment'},
          {'second': 10, 'text': 'Second key moment'},
          {'second': 20, 'text': 'Third key moment'},
          {'second': 50, 'text': 'Fourth key moment'},
          {'second': 60, 'text': 'Fifth key moment'}
        ]
      },
      'nearby_hospitals': [
        {
          'name': 'Makunduchi Hospital - Jambiani',
          'lng': 39.5533225,
          'lat': -6.4167666,
          'distance': '3km',
          'google_score': 3,
          'colibra_score': 3
        },
        {
          'name': 'Ali Amour Hospital - Stone Town',
          'lng': 39.2000556,
          'lat': -6.1766356,
          'distance': '9km',
          'google_score': 4,
          'colibra_score': 6.5
        },
        {
          'name': 'Stone Town Hospital - Stone Town',
          'lng': 39.1886372,
          'lat': -6.1625386,
          'distance': '9km',
          'google_score': 5,
          'colibra_score': 8,
          'selected': true
        }
      ],
      'placed_votes': [
        true,
        false,
        true
      ],
      'remaining_votes': [
        true,
        true,
        true
      ]
    }
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
