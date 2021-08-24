import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuario } from '../Interfaces/usuario.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http:HttpClient
  ) { }

  get(){
    return this.http.get<usuario[]>(`${api.url}usuarios`);
  }

  save(data:any){
    return this.http.post<usuario>(`${api.url}usuarios`,data);
  }

  existe_email(email:string){
    let data = {email:email};
    return this.http.post<usuario>(`${api.url}existe_email`,data);
  }

  getUsuario(id:number){
    return this.http.get<usuario>(`${api.url}usuarios/${id}`);
  }

  update(data:usuario){
    return this.http.put<any>(`${api.url}usuarios/${data.id_usuario}`,data);
  }

}
