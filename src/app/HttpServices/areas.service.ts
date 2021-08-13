import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { area } from '../Interfaces/area.interface';
import { api } from './config.consts';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private http:HttpClient
  ) { }

  getAreasPorContrato(idc:number){
    return this.http.get<area[]>(`${api.url}areas_por_contrato/${idc}`);
  }

  guardarArea(data:any){
    return this.http.post<area>(`${api.url}areas`,data);
  }

}
