import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';

@Component({
  selector: 'app-solicitudes-contrato',
  templateUrl: './solicitudes-contrato.component.html',
  styleUrls: ['./solicitudes-contrato.component.css']
})
export class SolicitudesContratoComponent implements OnInit {

  solicitante:boolean=false;
  solicitudes:solicitud_material[]=[];
  constructor(
    private ts:Title,
    private ar:ActivatedRoute,
    private sm:SolicitudesMaterialService
  ) { 
  }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Solicitudes');
    this.getSolicitudes();
  }

  getSolicitudes(){
    this.sm.getSolicitudes().subscribe(
      res => {
          this.solicitudes = res.filter(e => e.fk_id_contrato == +this.ar.snapshot.paramMap.get("id")!);
      },
      err => console.log(err)
    );
  }

}
