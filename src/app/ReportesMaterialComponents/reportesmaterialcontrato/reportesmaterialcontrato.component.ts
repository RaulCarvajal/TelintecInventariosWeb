import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { reporte_tabla } from 'src/app/Interfaces/reportematerial.interface';

@Component({
  selector: 'app-reportesmaterialcontrato',
  templateUrl: './reportesmaterialcontrato.component.html',
  styleUrls: ['./reportesmaterialcontrato.component.css']
})
export class ReportesmaterialcontratoComponent implements OnInit {

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

}
