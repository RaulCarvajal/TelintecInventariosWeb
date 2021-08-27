import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';

@Component({
  selector: 'app-solicitudesmaterial',
  templateUrl: './solicitudesmaterial.component.html',
  styleUrls: ['./solicitudesmaterial.component.css']
})
export class SolicitudesmaterialComponent implements OnInit {

  solicitante:boolean=false;

  constructor(
    private ts:Title,
    private us:UsuarioService
  ) { }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Solicitudes');
    this.itsSolicitante();
  }

  itsSolicitante(){
    if(this.us.getUsuario().rol == 3){
      this.solicitante = true;
    }
  }

}
