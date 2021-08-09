import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inventario } from '../Interfaces/inventario.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  constructor(
    private http:HttpClient
  ) { }

  getInventarioPorContrato(id:number){
    return this.http.get<inventario>(`${api.url}inventario_por_contrato/${id}`);
  }

  getInventario(id:number){
    return this.http.get<inventario>(`${api.url}inventarios/${id}`);
  }

  guardar(data:inventario){
    return this.http.post<any>(`${api.url}inventarios`,data);
  }

  getInventarios(){
    return this.http.get<inventario[]>(`${api.url}inventarios`)
  }
}
