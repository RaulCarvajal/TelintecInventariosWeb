import { Component, OnInit } from '@angular/core';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { contrato } from 'src/app/Interfaces/contratos.interface';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

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
        this.activos = this.contratos.filter( o => o.estatus == true).length;
        this.vencidos = this.contratos.length - this.activos;
        this.cargando = false;
      },
      err => console.log(err)
    );
  }



}