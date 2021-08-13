import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contrato } from '../Interfaces/contratos.interface';
import { api } from "./config.consts";
@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(
    private http:HttpClient
  ) { }

  getContratos(){
    return this.http.get<contrato[]>(`${api.url}contrato`);
  }

  saveContrato(data:any){
    return this.http.post<contrato>(`${api.url}contrato`,data);
  }

  getContrato(id:number){
    return this.http.get<contrato>(`${api.url}contrato/${id}`);
  }

  updateContrato(data:contrato){
    return this.http.put<contrato>(`${api.url}contrato/${data.id_contrato}`,data);
  }
}
