import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuesta } from '../Interfaces/respuesta.interface';
import { partida_solicitud, solicitud_material } from '../Interfaces/solicitud_material.interface';
import { rgx } from '../Validators/regex.validator';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesMaterialService {

  constructor(
    private http:HttpClient
  ) { }

  public generarSolicitud(data:any){
    return this.http.post<respuesta>(`${api.url}nuevasolicitud_material`,data);
  }
  public getSolicitudes(){
    return this.http.get<solicitud_material[]>(`${api.url}solicitudes`)
  }
  public getSolicitud(id:number){
    return this.http.get<solicitud_material>(`${api.url}solicitudes/${id}`)
  }
  public getPartidasSolicitud(id:number){
    return this.http.get<partida_solicitud[]>(`${api.url}partidas_solicitud/${id}`);
  }
  public setVisto(id:number){
    return this.http.put<respuesta>(`${api.url}visto_solicitud/${id}`,{});
  }
  public setAutorizado(id:number){
    return this.http.put<respuesta>(`${api.url}autorizar_solicitud/${id}`,{});
  }
}
