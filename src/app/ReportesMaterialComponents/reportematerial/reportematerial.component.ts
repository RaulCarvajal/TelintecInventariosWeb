import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { partida_reporte } from 'src/app/Interfaces/partida.interface';
import { reporte_text } from 'src/app/Interfaces/reportematerial.interface';

@Component({
  selector: 'app-reportematerial',
  templateUrl: './reportematerial.component.html',
  styleUrls: ['./reportematerial.component.css']
})
export class ReportematerialComponent implements OnInit {
  idr!:number;
  reporte:reporte_text | undefined;
  partidas:partida_reporte[] = [];
  constructor(
    private ar : ActivatedRoute,
    private rs: ReportesService,
    private ps: PartidasService
  ) { 
    this.idr = +this.ar.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getReporte(this.idr)
  }

  getReporte(idr:number){
    this.rs.getReporte(idr).subscribe(
      res => {
        this.reporte = res[0];
        this.getPartidas(this.reporte!.id_reporte);
      }
    );
  }

  getPartidas(id_reporte:number){
    this.ps.getPartidasPorIdReporte(id_reporte).subscribe(
      res => this.partidas = res
    );
  }

}
