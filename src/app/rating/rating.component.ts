import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  stars: string[];

  @Input() rating: number;
  @Input() max = 5;

  constructor() {
  }

  ngOnInit() {
    if (this.rating > this.max) {
      this.rating = this.max;
    }

    this.stars = Array(this.max).fill('/assets/images/ic_small_star.svg', 0, this.rating).fill('/assets/images/ic_small_star_empty.svg', this.rating, this.max);
  }

}
