import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../HttpServices/usuario.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title = 'Sistema de gestión de activos Telintec';
  isntloged:boolean = false;

  admin:boolean= false;
  jefe:boolean= false;
  lider:boolean= false;

  constructor(
    private us:UsuarioService,
    private rt:Router
  ) { }


  ngOnInit(): void {
    this.isntloged = !this.us.loged();
    this.redirect();
  }

  redirect(){
    if(this.isntloged){
      this.rt.navigateByUrl('/login')
    }else{
      switch(this.us.getUsuario().rol){
        case 1:
          this.admin = true;
          break;
        case 2:
          this.jefe = true;
          break;
        case 3:
          this.lider = true;
          break;
      }
    }
  }

  closeSession(){
    sessionStorage.clear();
    window.location.reload();
  }

}
