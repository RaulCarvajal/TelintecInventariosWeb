import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicio, servicio_datatable } from '../Interfaces/servicios.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http:HttpClient
  ) { }


  async getServicios(idc:number){
    return await this.http.get<servicio[]>(`${api.url}servicios/${idc}`).toPromise();
  }

  getServiciosPorIdSolicitud(ids:number){
    return this.http.get<servicio_datatable[]>(`${api.url}servicios_reporte/${ids}`)
  }

  getServiciosPorIdReporte(idr:number){
    return this.http.get<servicio_datatable[]>(`${api.url}servicios_byreporte/${idr}`)
  }

  getServiciosTabla(idc:number){
    return this.http.get<servicio[]>(`${api.url}servicios/${idc}`);
  }

  saveServicio(data:any){
    return this.http.post<any>(`${api.url}servicios`,data);
  }

}