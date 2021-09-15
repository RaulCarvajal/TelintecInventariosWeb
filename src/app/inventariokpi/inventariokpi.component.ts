import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { ContratosService } from '../HttpServices/contratos.service';
import { UsuarioService } from '../HttpServices/usuario.service';
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

  admin:boolean= false;
  jefe:boolean= false;
  lider:boolean= false;
  rol_name:string ='';
  nombre_usuario:string = '';
  constructor(
    private cs:ContratosService,
    private ts:Title,
    private us:UsuarioService
  ) { }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Home')
    this.getContratos();
    this.getRole();
  }

  getRole(){
    this.nombre_usuario = `${this.us.getUsuario().nombre} ${this.us.getUsuario().apellidos}`
    switch(this.us.getUsuario().rol){
      case 1:
        this.admin = true;
        this.rol_name ="Administrador"
        break;
      case 2:
        this.jefe = true;
        this.rol_name ="Almacenista"
        break;
      case 3:
        this.lider = true;
        this.rol_name ="Lider de proyecto o solicitante de material."
        break;
    }
  }
  getContratos(){
    this.cs.getContratos().subscribe(
      res => {
        this.contratos = res;
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
