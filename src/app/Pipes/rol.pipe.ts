import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'rol'})
export class RolPipe implements PipeTransform{
    transform(role:any){
        if(role == 1){
            return 'Administrador'
          }else if(role == 2){
            return 'Jefe/Supervisor/Almacenista'
          }else{
            return 'Lider/Solicitante de material'
          }
    }
}