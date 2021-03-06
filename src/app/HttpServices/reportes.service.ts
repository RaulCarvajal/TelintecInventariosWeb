import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reporte_tabla } from '../Interfaces/reportematerial.interface';
import { ultimofoliopedido } from '../Interfaces/reporte_partida.interface';
import { respuesta } from '../Interfaces/respuesta.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(
    private http:HttpClient
  ) { }

  guardar(data:any){
    return this.http.post<respuesta>(`${api.url}reporte_material`,data);
  }

  guardarReporteSolicitud(data:any){
    return this.http.post<respuesta>(`${api.url}reporte_solicitud`,data);
  }


  guardarEvidencia(data:any){
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<any>(`${api.url}evidencia`,data,{headers : headers});
  }

  getDataTable(){
    return this.http.get<reporte_tabla[]>(`${api.url}reporte_tabla`);
  }

  getDataTableByContrato(id:number){
    return this.http.get<reporte_tabla[]>(`${api.url}reportes_tabla_contrato/${id}`);
  }

  getReporte(idr:number){
    return this.http.get<any>(`${api.url}reporte/${idr}`);
  }

  getUltimoFolioPedido(){
    return this.http.get<ultimofoliopedido[]>(`${api.url}ultimofoliopedido/0`)
  }

  getReporteIdByIdSolicitud(ids:number){
    return this.http.get<number>(`${api.url}reporte_ids/${ids}`)
  }

}
