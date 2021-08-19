import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { planta } from '../Interfaces/plantas.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(
    private http:HttpClient
  ) { }

  getPlantas(){
    return this.http.get<planta[]>("https://localhost:44379/api/plantas");
  }

}
