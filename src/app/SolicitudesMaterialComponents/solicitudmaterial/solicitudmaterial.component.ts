import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-solicitudmaterial',
  templateUrl: './solicitudmaterial.component.html',
  styleUrls: ['./solicitudmaterial.component.css']
})
export class SolicitudmaterialComponent implements OnInit {

  id:any;
  itsAdmin:boolean = false;
  solicitud:solicitud_material | undefined;
  partidas:partida_solicitud[]=[];

  @ViewChild('stepper') stp!:MatStepper;
  constructor(
    private ar:ActivatedRoute,
    private us:UsuarioService,
    private sms:SolicitudesMaterialService
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
    this.getRole();
  }

  ngOnInit(): void {
    this.getSolicitud(this.id);
    this.getPartidas(this.id);
  }

  getRole(){
    this.itsAdmin = this.us.getUsuario().rol==1?true:false;
  }

  getSolicitud(id:number){
    this.sms.getSolicitud(id).subscribe(
      res => {
        this.solicitud = res;
        setTimeout(() => {
          this.next(this.solicitud!.estatus)          
        }, 500);
        if(this.itsAdmin&&(!this.solicitud.visto)){
          this.sms.setVisto(id).subscribe(
            res => res
          );
        }
      },
      err => console.log(err)
    );
  }

  getPartidas(id:number){
    this.sms.getPartidasSolicitud(id).subscribe(
      res => this.partidas = res,
      err => console.log(err)
    );
  }

  next(ind:number){
    for (let i = 1; i < ind; i++) {
      this.stp.next();
    }
  }

  setVisto(id:number){
    this
  }
}
