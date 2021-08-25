import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../Interfaces/usuario.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http:HttpClient,
    private rt:Router
  ) { }
  
  login(data:any){
    return this.http.post<usuario>(`${api.url}login`,data)
  }

  saveSession(usuario:usuario){
    window.sessionStorage.setItem('usuario',JSON.stringify(usuario));
  }

  loged():boolean{
    return window.sessionStorage.getItem('usuario')?true:false;
  }

  getUsuario():usuario{
    return <usuario>JSON.parse(sessionStorage.getItem('usuario')!);
  }

  itsAdmin(){
    if(this.getUsuario().rol!=1){
      this.rt.navigateByUrl('/error403')
    }
  }
}
