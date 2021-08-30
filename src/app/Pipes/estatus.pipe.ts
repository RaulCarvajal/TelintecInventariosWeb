import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'estatus'})
export class EstatusPipe implements PipeTransform{
    transform(value:any){
        switch (value) {
            case 1:
                return 'Solicitado'
            case 2:
                return 'Aceptado'
            case 3:
                return 'Surtido parcial'
            case 4:
                return 'Surtido total'
            case 5:
                return 'Remisión/Reporte'
            default: 'No reconocido'
        }
        return '';
    }
}