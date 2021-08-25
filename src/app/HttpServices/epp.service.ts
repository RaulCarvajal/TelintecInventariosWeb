import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { epp } from '../Interfaces/epp.interface';
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

}
