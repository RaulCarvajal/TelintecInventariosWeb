import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EppService } from 'src/app/HttpServices/epp.service';
import { eppsol, epp_sol } from 'src/app/Interfaces/epp.interface';

@Component({
  selector: 'app-epp-solicitud',
  templateUrl: './epp-solicitud.component.html',
  styleUrls: ['./epp-solicitud.component.css']
})
export class EppSolicitudComponent implements OnInit {

  id:any;
  solicitud: epp_sol | undefined;
  eppsol:eppsol[] | undefined;
  hoy:string = "";

  constructor(
    private eps:EppService,
    private ar:ActivatedRoute,
    private dp:DatePipe
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.hoy = new Date().toISOString();
    this.getSolicitud(this.id);
    this.getEppAsignado(this.id);
  }

  getSolicitud(id:number){
    this.eps.getEppSolicitudAdmin(id).subscribe(
      res => this.solicitud = res
    )
  }
  getEppAsignado(id:number){
    this.eps.getEppAsignado(id).subscribe(
      res => this.eppsol = res
    )
  }

  donwloadPdf(){
    let dataPdf = {
      hoy : this.dp.transform(this.hoy),
      asignado : this.solicitud?.asignado,
      eppsol : this.eppsol
    }
    this.eps.getActaEpp(dataPdf);
  }
}
