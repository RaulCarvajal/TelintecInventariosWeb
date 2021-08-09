import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { divisa, marca, proveedor, um } from 'src/app/Interfaces/catalogos.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  id:any;
  cargando:boolean = true;
  contrato!:contrato;
  plantas:string = "";
  divisa:divisa | undefined;

  constructor(
    private ar:ActivatedRoute,
    private cs:ContratosService,
    private cps:ContratoplantaService,
    private ca:CatalogosService
  ) { 
    this.id = this.ar.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getContrato(this.id);
    this.getContratoPlantas(this.id);
  }

  getContrato(id:number){
    this.cs.getContrato(id).subscribe(
      res => {
        this.contrato = res;
        this.getDivisa(this.contrato.fk_id_divisa)
        this.cargando = false;
      },
      err => console.log(err)
    );
  }

  getDivisa(idd:number){
    this.ca.divisa(idd).subscribe(
      res => this.divisa = res,
      err => console.log(err)
    )
  }

  getContratoPlantas(id:number){
    this.cps.getContratoPlantasByContratoId(id).subscribe(
      res=> {this.plantas = res.map(function(elem){return elem.planta}).join(", ")},
      err=>console.log(err)
    )
  }
}
