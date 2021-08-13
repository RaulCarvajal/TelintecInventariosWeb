import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name : 'pos'})
export class PosPipe implements PipeTransform{
    transform(value:any){
        return "0".repeat(3 - value.toString().length) + value.toString();
    }
}