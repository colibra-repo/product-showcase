import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  trainings = [
    {
      title: 'Entry exam',
      description: 'Unlock Regular Tasks',
      language: 'English',
      status: 'general.completed',
      completed: true,
      type: 'luggage'
    },
    {
      title: 'Medical exam',
      description: 'Unlock Medical Tasks',
      language: 'English',
      status: '1/3',
      completed: false,
      type: 'medical'
    },
    {
      title: 'Increase HOR',
      description: 'Unlock Medical Tasks',
      language: 'German',
      status: '1/3',
      completed: false,
      type: 'colibra'
    }
  ];

  constructor(private translate: TranslateService ) { 
  }

  ngOnInit() {
    for (let training of this.trainings) {
      if (training.completed) {
        this.translate.get('general.completed').subscribe((label: string) => {
          training.status = label;
        })
      }
    }
  }

}
