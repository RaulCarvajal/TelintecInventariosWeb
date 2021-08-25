import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { movimiento, movimiento_partida } from '../Interfaces/movimientos.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(
    private http:HttpClient
  ) { }

  getMovimientosPorPartida(id:number){
    return this.http.get<movimiento_partida[]>(`${api.url}movimientos_por_partida/${id}`);
  }

  save(data:any){
    return this.http.post<any>(`${api.url}movimientos`,data)
  }

  get(id:number){
    return this.http.get<movimiento>(`${api.url}movimientos/${id}`)
  }

}
