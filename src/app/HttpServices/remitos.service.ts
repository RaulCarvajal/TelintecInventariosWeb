import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class RemitosService {

  constructor(
    private http:HttpClient
  ) { }

  generRemitoPdf(data:any){
    let dataToPdf = {
      template: { "shortid" : api.id_remito },
      data : data,
      options : { 'timeout': 60000 }
    }
    console.log(dataToPdf)
    var mediaType = 'application/pdf';
    this.http.post(`${api.reporter}`, dataToPdf, {'responseType' : 'blob'}).subscribe(
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
}
