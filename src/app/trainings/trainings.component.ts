import { Component, OnInit } from '@angular/core';

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
      status: 'Completed',
      completed: true
    },
    {
      title: 'Medical exam',
      description: 'Unlock Medical Tasks',
      language: 'English',
      status: '1/3',
      completed: false
    },
    {
      title: 'Increase HOR',
      description: 'Unlock Medical Tasks',
      language: 'German',
      status: '1/3',
      completed: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
