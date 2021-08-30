import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuesta } from '../Interfaces/respuesta.interface';
import { rgx } from '../Validators/regex.validator';
import { api } from './config.consts';

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
}
