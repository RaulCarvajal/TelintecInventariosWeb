import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contrato_planta, contrato_planta_text } from '../Interfaces/contrato_planta.interface';
import { api } from "./config.consts";

@Injectable({
  providedIn: 'root'
})
export class ContratoplantaService {

  constructor(
    private http:HttpClient
  ) { }

  async saveContratoPlanta(data:contrato_planta){
    return await this.http.post<contrato_planta>(`${api.url}con_pla`,data).toPromise();
  }

  getContratoPlantasByContratoId(id_contrato:number){
    return this.http.get<contrato_planta_text[]>(`${api.url}con_pla/${id_contrato}`);
  }

}
