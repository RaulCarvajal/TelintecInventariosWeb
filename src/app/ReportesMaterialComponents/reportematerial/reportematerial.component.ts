import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { ServiciosService } from 'src/app/HttpServices/servicios.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { partida_reporte } from 'src/app/Interfaces/partida.interface';
import { reporte_text } from 'src/app/Interfaces/reportematerial.interface';
import { servicio_datatable } from 'src/app/Interfaces/servicios.interface';

@Component({
  selector: 'app-reportematerial',
  templateUrl: './reportematerial.component.html',
  styleUrls: ['./reportematerial.component.css']
})
export class ReportematerialComponent implements OnInit {
  idr!:number;
  reporte:reporte_text | undefined;
  partidas:partida_reporte[] = [];
  servicios:servicio_datatable[] = [];
  constructor(
    private ar : ActivatedRoute,
    private rs: ReportesService,
    private ps: PartidasService,
    private us:UsuarioService,
    private ss:ServiciosService
  ) { 
    this.idr = +this.ar.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.itsAdmin();
    this.getReporte(this.idr)
  }

  getReporte(idr:number){
    this.rs.getReporte(idr).subscribe(
      res => {
        this.reporte = res[0];
        console.log(this.reporte)
        this.getPartidas(this.reporte!.id_reporte);
        this.getServicios(this.reporte!.id_reporte);
      }
    );
  }

  getPartidas(id_reporte:number){
    this.ps.getPartidasPorIdReporte(id_reporte).subscribe(
      res => this.partidas = res
    );
  }

  getServicios(idr:number){
    this.ss.getServiciosPorIdReporte(idr).subscribe(
      res => this.servicios = res
    );
  }

  itsAdmin(){
    this.us.itsAdmin();
  }

}
