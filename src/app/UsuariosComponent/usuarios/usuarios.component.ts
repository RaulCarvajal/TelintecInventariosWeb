import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RolesService } from 'src/app/HttpServices/roles.service';
import { UsuariosService } from '../../HttpServices/usuarios.service';
import { usuario } from '../../Interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:usuario[]=[];

  constructor(
    private us:UsuariosService,
    private rs:RolesService,
    private ts:Title
  ) { }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Usuarios')
    this.get();
  }

  get(){
    this.us.get().subscribe(
      res => this.usuarios = res,
      err => console.log(err)
    );
  }

  getRole(role:number):string{
    return this.rs.getRol(role);
  }

}
