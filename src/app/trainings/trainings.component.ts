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
      title: 'pages.trainings.firstTraining.name',
      description: 'pages.trainings.firstTraining.effect',
      language: 'pages.trainings.firstTraining.language',
      status: 'general.completed',
      completed: true,
      type: 'luggage'
    },
    {
      title: 'pages.trainings.secondTraining.name',
      description: 'pages.trainings.secondTraining.effect',
      language: 'pages.trainings.secondTraining.language',
      status: '1/3',
      completed: false,
      type: 'medical'
    },
    {
      title: 'pages.trainings.thirdTraining.name',
      description: 'pages.trainings.thirdTraining.effect',
      language: 'pages.trainings.thirdTraining.language',
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
      this.translate.get(training.title).subscribe((label: string) => {
        training.title = label;
      })
      this.translate.get(training.description).subscribe((label: string) => {
        training.description = label;
      })
      this.translate.get(training.language).subscribe((label: string) => {
        training.language = label;
      })
    }
  }

}
