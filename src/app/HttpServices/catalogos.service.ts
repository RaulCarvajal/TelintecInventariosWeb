import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { divisa, marca, proveedor, um } from '../Interfaces/catalogos.interface';
import { api } from "./config.consts";

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private http:HttpClient
  ) { }

    //Divisas
    divisas(){
      return this.http.get<divisa[]>(`${api.url}divisas`);
    }
    divisa(id:number){
      return this.http.get<divisa>(`${api.url}divisas/${id}`);
    }
    //Marcas
    marcas(){
      return this.http.get<marca[]>(`${api.url}marcas`);
    }
    marca(id:number){
      return this.http.get<marca>(`${api.url}marcas/${id}`);
    }
    //Proveedores
    proveedores(){
      return this.http.get<proveedor[]>(`${api.url}proveedores`);
    }
    proveedor(id:number){
      return this.http.get<proveedor>(`${api.url}proveedores/${id}`);
    }
    //Unidades
    unidades(){
      return this.http.get<um[]>(`${api.url}ums`);
    }
    unidad(id:number){
      return this.http.get<um>(`${api.url}ums/${id}`);
    }

    //Puestos
    puestos(){
      return this.http.get<any>(`${api.url}puestos`)
    }
    puesto(id:number){
      return this.http.get<any>(`${api.url}puestos/${id}`)
    }
}
