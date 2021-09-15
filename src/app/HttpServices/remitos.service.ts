import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { remito } from '../Interfaces/remito.interface';
import { api, reporter } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class RemitosService {

  constructor(
    private http:HttpClient
  ) { }

  generRemitoPdf(data:any){
    let dataToPdf = {
      template: { "shortid" : reporter.id_remito },
      data : data,
      options : { 'timeout': 60000 }
    }
    console.log(dataToPdf)
    var mediaType = 'application/pdf';
    this.http.post(`${reporter.url}`, dataToPdf, {'responseType' : 'blob','headers': { 'Authorization': 'Basic Z2VzdGlvbi5hY3Rpdm9zQHRlbGludGVjLmNvbS5teDpTZ2F0LjIwMjE=' }}).subscribe(
        (response) => {
            var blob = new Blob( [ <any>response ], { type: mediaType });
            saveAs(blob, `${data.remision}.pdf`);
            console.log(response);
        },
        e => { console.error(e) }
    );
  }

  save(data:any){
    return this.http.post<any>(`${api.url}/remito`,data);
  }

  getRemitoIdByIdSolicitud(ids:number){
    return this.http.get<number>(`${api.url}remito_ids/${ids}`)
  }
  
  getRemitos(){
    return this.http.get<remito[]>(`${api.url}remitos`)
  }

  getRemito(idr:number){
    return this.http.get<remito>(`${api.url}remitos/${idr}`)
  }

  getRemitoPartidas(idr:number){
    return this.http.get<any>(`${api.url}remito_partidas/${idr}`)
  }
}
