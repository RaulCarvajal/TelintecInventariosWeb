import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuesta } from '../Interfaces/respuesta.interface';
import { partida_solicitud, solicitud_material } from '../Interfaces/solicitud_material.interface';
import { rgx } from '../Validators/regex.validator';
import { api, reporter } from './config.consts';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesMaterialService {

  constructor(
    private http:HttpClient
  ) { }

  public generarSolicitud(data:any){
    return this.http.post<respuesta>(`${api.url}nuevasolicitud_material`,data);
  }
  public getSolicitudes(){
    return this.http.get<solicitud_material[]>(`${api.url}solicitudes`)
  }
  public getSolicitud(id:number){
    return this.http.get<solicitud_material>(`${api.url}solicitudes/${id}`)
  }
  public getPartidasSolicitud(id:number){
    return this.http.get<partida_solicitud[]>(`${api.url}partidas_solicitud/${id}`);
  }
  public setVisto(id:number){
    return this.http.put<respuesta>(`${api.url}visto_solicitud/${id}`,{});
  }
  public setAutorizado(id:number){
    return this.http.put<respuesta>(`${api.url}autorizar_solicitud/${id}`,{});
  }
  public setSurtir(data:any,id:number){
    return this.http.put<respuesta>(`${api.url}surtir_solicitud/${id}`,data);
  }
  public getEntregaMaterialPdf(data:any){
    let dataToPdf = {
      template: { "shortid" : reporter.id_entrega_material },
      data : data,
      options : { 'timeout': 60000 }
    }
    console.log(dataToPdf)
    var mediaType = 'application/pdf';
    this.http.post(`${reporter.url}`, dataToPdf,  {'responseType' : 'blob','headers': { 'Authorization': 'Basic Z2VzdGlvbi5hY3Rpdm9zQHRlbGludGVjLmNvbS5teDpTZ2F0LjIwMjE=' }}).subscribe(
        (response) => {
            var blob = new Blob( [ <any>response ], { type: mediaType });
            saveAs(blob, `EntregaMaterial(${data.tipo})_${data.codigo}.pdf`);
            console.log(response);
        },
        e => { console.error(e) }
    );
  }
}
