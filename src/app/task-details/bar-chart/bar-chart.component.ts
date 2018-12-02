import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('bar') bar: ElementRef;

  @Input() percentage: number;
  @Input() color: string;

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._renderer.setStyle(this.bar.nativeElement, 'width', this.percentage + '%');
    this._renderer.setStyle(this.bar.nativeElement, 'background-color', this.color);
  }
}
