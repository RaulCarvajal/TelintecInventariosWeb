import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { epp, eppsol, epps_res, epp_sol } from '../Interfaces/epp.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class EppService {

  constructor(
    private http:HttpClient
  ) { }

  async getAll(){
    return await this.http.get<epp[]>(`${api.url}allepp`).toPromise();
  }

  save(data:any){
    return this.http.post<epps_res>(`${api.url}savesolicitudepp`,data);
  }

  getEppSolicitudesAdmin(){
    return this.http.get<epp_sol[]>(`${api.url}solicitudeseppadmin`);
  }

  getEppSolicitudAdmin(id:number){
    return this.http.get<epp_sol>(`${api.url}solicitudeppadmin/${id}`);
  }

  getEppAsignado(id:number){
    return this.http.get<eppsol[]>(`${api.url}eppporsolicitud/${id}`);
  }

}
