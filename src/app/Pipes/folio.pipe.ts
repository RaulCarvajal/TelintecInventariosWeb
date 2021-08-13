import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'folio'})
export class FolioPipe implements PipeTransform{
    transform(value:any){
        return "0".repeat(4 - value.toString().length) + value.toString();
    }
}