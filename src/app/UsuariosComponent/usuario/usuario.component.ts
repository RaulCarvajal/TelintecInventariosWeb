import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { RolesService } from 'src/app/HttpServices/roles.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { UsuariosService } from 'src/app/HttpServices/usuarios.service';
import { usuario } from 'src/app/Interfaces/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  id:any;
  usuario:usuario|undefined;
  puesto:string|undefined;
  vp:boolean=false;
  self:boolean = false;

  constructor(
    private ar:ActivatedRoute,
    private us:UsuariosService,
    private cs:CatalogosService,
    private uss:UsuarioService,
    private rs:RolesService
  ) { 
    this.id = this.ar.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.iSelf(this.id)
    this.getUsuario(this.id)
  }

  getUsuario(id:number){
    this.us.getUsuario(id).subscribe(
      res => {
        this.usuario = res;
        this.getPuesto(this.usuario.fk_id_puesto)
      }
    );
  }

  getRole(role:number):string{
    return this.rs.getRol(role);
  }

  getPuesto(fk_id_puesto:number){
    this.cs.puesto(fk_id_puesto).subscribe(
      res => this.puesto = res.puesto
    )
  }

  update(){
    this.usuario!.estatus = !this.usuario?.estatus;
    this.us.update(this.usuario!).subscribe(
      res => {
        this.getUsuario(this.id)
      },
      err => console.log(err)
    )
  }

  vpToggle(){
    this.vp = !this.vp;
  }

  iSelf(id:number){
    if(this.uss.getUsuario().id_usuario == id){
      this.self = true;
    }
  }
}
