import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  @Input()
  chartOptions: any;
  @Input() height: string = '370px';
  @Input() width: string = '100%';
}
