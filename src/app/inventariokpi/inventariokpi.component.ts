import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ContratosService } from '../HttpServices/contratos.service';
import { contrato } from '../Interfaces/contratos.interface';

@Component({
  selector: 'app-inventariokpi',
  templateUrl: './inventariokpi.component.html',
  styleUrls: ['./inventariokpi.component.css']
})
export class InventariokpiComponent implements OnInit {

  hoy =  new Date().toISOString();
  cargando:boolean = true;
  contratos:contrato[] = [];
  activos:number = 0;
  vencidos:number = 0;

  constructor(
    private cs:ContratosService
  ) { }

  ngOnInit(): void {
    this.getContratos();
  }
  getContratos(){
    this.cs.getContratos().subscribe(
      res => {
        this.contratos = res;
        console.log(res)
        this.activos = this.contratos.filter( o => o.estatus == true).length;
        this.vencidos = this.contratos.length - this.activos;
        this.cargando = false;
        this.setChartValues();
      },
      err => console.log(err)
    );
  }

  setChartValues(){
    let i = 0;
    this.contratos.forEach( c => {
      this.ChartData[i] = [[(c.monto_total-c.monto_actual), c.monto_actual]]
      i++;
    })
  }


  //Charts 
  public lbls: Label[] = ['Gastado', 'Restante'];
  public ChartData: MultiDataSet[] = [[[100, 100]]];
  public dona: ChartType = 'doughnut';
  
}
