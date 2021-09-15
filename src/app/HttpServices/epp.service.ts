import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { epp, eppsol, epps_res, epp_sol } from '../Interfaces/epp.interface';
import { api, reporter } from './config.consts';

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

  getActaEpp(data:any){
    let dataToPdf = {
      template: { "shortid" : reporter.id_entrega_epp },
      data : data,
      options : { 'timeout': 60000 },
      auth: {
        username: 'gestion.activos@telintec.com.mx',
        password: 'Sgat.2021'
      },
    }
    console.log(dataToPdf)
    var mediaType = 'application/pdf';
    this.http.post(`${reporter.url}`, dataToPdf, {'responseType' : 'blob','headers': { 'Authorization': 'Basic Z2VzdGlvbi5hY3Rpdm9zQHRlbGludGVjLmNvbS5teDpTZ2F0LjIwMjE=' }}).subscribe(
        (response) => {
            var blob = new Blob( [ <any>response ], { type: mediaType });
            saveAs(blob, `EntregaEpp_${data.asignado}.pdf`);
            console.log(response);
        },
        e => { console.error(e) }
    );
  }

}
