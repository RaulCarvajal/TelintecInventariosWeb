import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../HttpServices/catalogos.service';
import { UsuarioService } from '../HttpServices/usuario.service';
import { usuario } from '../Interfaces/usuario.interface';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.css']
})
export class MicuentaComponent implements OnInit {

  yo:usuario|undefined;
  puesto:string | undefined;
  constructor(
    private us:UsuarioService,
    private cs:CatalogosService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(){
    this.yo = this.us.getUsuario();
    this.getPuesto(this.yo.fk_id_puesto)
  }

  getPuesto(id:number){
    this.cs.puesto(id).subscribe(
      res => this.puesto = res.puesto
    );
  }

}
