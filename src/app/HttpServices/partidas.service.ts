import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { partida, partida_reporte } from '../Interfaces/partida.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  constructor(
    private http:HttpClient
  ) { }

  getPartidasPorIdInventario(id:number){
    return this.http.get<partida[]>(`${api.url}partidas_por_inventario/${id}`)
  }

  getPartidasPorContrato(id:number){
    return this.http.get<partida[]>(`${api.url}partidas_por_contrato/${id}`)
  }

  guardar(partida:partida|any){
    return this.http.post<any>(`${api.url}partidas`,partida);
  }

  getPartida(id:number){
    return this.http.get<partida>(`${api.url}partidas/${id}`)
  }

  getPartidasPorIdReporte(id_partida:number){
    return this.http.get<partida_reporte[]>(`${api.url}partidas_reporte/${id_partida}`);
  }

}
