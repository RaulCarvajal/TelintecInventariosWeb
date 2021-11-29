import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { partida, partida_datatable, partida_remito, partida_reporte } from '../Interfaces/partida.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  constructor(
    private http:HttpClient
  ) { }

  guardar(partida:partida|any){
    return this.http.post<any>(`${api.url}partidas`,partida);
  }

  getPartida(id:number){
    return this.http.get<partida>(`${api.url}partidas/${id}`)
  }

  async getPartidas(){
    return await this.http.get(`${api.url}partidas`).toPromise();
  }

  async getPartidasPorContratoDT(idc:number){
    return await this.http.get(`${api.url}partidas_contratoDT/${idc}`).toPromise();
  }

  getPartidasPorIdReporte(id_partida:number){
    return this.http.get<partida_reporte[]>(`${api.url}partidas_reporte/${id_partida}`);
  }

  async getPartidasMaterialRemito(ids:number){
    return await this.http.get<partida_remito>(`${api.url}material_remito/${ids}`).toPromise();
  }
  async getPartidasServicioRemito(ids:number){
    return await this.http.get<partida_remito>(`${api.url}servicio_remito/${ids}`).toPromise();
  }

  getPartidasPorContrato(idc:number){
    return this.http.get<any>(`${api.url}partidas_contrato/${idc}`);
  }

  savePartidaPorContrato(data:any){
    return this.http.post<any>(`${api.url}partidas_contrato`,data);
  }

  getPartidasSolicitudDevolucion(id:number){
    return this.http.get<any>(`${api.url}material_devolucion/${id}`);
  }

  async getEliminarSolicitudDevolucion(id:number){
    return await this.http.delete<any>(`${api.url}material_devolucion/${id}`).toPromise();
  }

  async getUpdateSolicitudDevolucion(id:number,data:any){
    return await this.http.put<any>(`${api.url}material_devolucion/${id}`,data).toPromise();
  }
}
