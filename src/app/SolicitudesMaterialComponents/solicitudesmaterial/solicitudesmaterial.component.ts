import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';

@Component({
  selector: 'app-solicitudesmaterial',
  templateUrl: './solicitudesmaterial.component.html',
  styleUrls: ['./solicitudesmaterial.component.css']
})
export class SolicitudesmaterialComponent implements OnInit {

  solicitante:boolean=false;
  solicitudes:solicitud_material[]=[];
  rol:number = 0;
  constructor(
    private ts:Title,
    private us:UsuarioService,
    private sm:SolicitudesMaterialService
  ) { 
    this.rol = this.us.getUsuario().rol;
  }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Solicitudes');
    this.getSolicitudes();
    this.itsSolicitante();
  }

  itsSolicitante(){
    if(this.rol == 3){
      this.solicitante = true;
    }
  }

  getSolicitudes(){
    this.sm.getSolicitudes().subscribe(
      res => {
        if(this.rol==1 || this.rol==2){
          this.solicitudes = res;
        }else{
          this.solicitudes = res.filter(e => e.fk_id_usuario_solicitante == this.us.getUsuario().id_usuario);
        }
      },
      err => console.log(err)
    );
  }

}
