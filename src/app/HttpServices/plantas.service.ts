import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(
    private http:HttpClient
  ) { }

  getPlantas(){
    return this.http.get("https://localhost:44379/api/plantas");
  }

}
