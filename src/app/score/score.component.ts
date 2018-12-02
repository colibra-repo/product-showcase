import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() score: number;

  @ViewChild('scoreLevel') scoreLevel: ElementRef;
  level: string;

  constructor(public renderer: Renderer2, private translate: TranslateService) {

  }

  ngOnInit() {
    let colorCode = '';
    let levelLabel;
    if (this.score < 5) {
      levelLabel = 'enums.levels.low';
      colorCode = 'red';
    } else if (this.score < 7.5) {
      levelLabel = 'enums.levels.medium';
      colorCode = 'yellow';
    } else {
      levelLabel = 'enums.levels.high';
      
      colorCode = 'green';
    }
    this.translate.get(levelLabel).subscribe((label: string) => 
      this.level = label
    );
    this.renderer.addClass(this.scoreLevel.nativeElement, colorCode);
  }

}
