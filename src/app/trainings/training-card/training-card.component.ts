import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit {

  @Input() training: any;

  constructor() { }

  ngOnInit() {
  }

}
