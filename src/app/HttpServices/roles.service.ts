import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor() { }

  getRol(role:number):string{
    if(role == 1){
      return 'Administrador'
    }else if(role == 2){
      return 'Jefe/Supervisor/Almacenista'
    }else{
      return 'Lider/Solicitante de material'
    }
  }
}
