import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() score: number;

  @ViewChild('scoreLevel') scoreLevel: ElementRef;
  level: string;

  constructor(public renderer: Renderer2) {

  }

  ngOnInit() {
    let colorCode = '';
    if (this.score < 5) {
      this.level = 'Low';
      colorCode = 'red';
    } else if (this.score < 7.5) {
      this.level = 'Medium';
      colorCode = 'yellow';
    } else {
      this.level = 'High';
      colorCode = 'green';
    }
    this.renderer.addClass(this.scoreLevel.nativeElement, colorCode);
  }

}
