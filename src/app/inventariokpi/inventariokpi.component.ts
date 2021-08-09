import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-inventariokpi',
  templateUrl: './inventariokpi.component.html',
  styleUrls: ['./inventariokpi.component.css']
})
export class InventariokpiComponent implements OnInit {


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [5000, 8000, 2000, 1000, 500, 8500], label: 'Remitos' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
