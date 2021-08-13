import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import { Label } from 'ng2-charts';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { reporte_tabla } from 'src/app/Interfaces/reportematerial.interface';

@Component({
  selector: 'app-reportesmaterial',
  templateUrl: './reportesmaterial.component.html',
  styleUrls: ['./reportesmaterial.component.css']
})
export class ReportesmaterialComponent implements OnInit {

  idc:number;
  reportes:reporte_tabla[] = [];
  cargando:boolean = true;

  constructor(
    private rt:Router,
    private ar:ActivatedRoute,
    private rs:ReportesService
  ){
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getReportes(this.idc);
  }

  getReportes(id:number){
    this.rs.getDataTableByContrato(id).subscribe(
      res => {
        this.reportes = res
        this.cargando = false;
      },
      err => console.log(err)
    );
  }

  gotoDetail(id:number){
    this.rt.navigateByUrl(`/contrato/reportematerial/${id}`)
  }



  /*
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [15, 5, 2, 1, 6, 3, 1], label: 'Reportes/Pedidos', backgroundColor : 'rgba(63,81,181,.7)',hoverBackgroundColor: 'rgba(63,81,181,1)'},
  ];
  */
}
