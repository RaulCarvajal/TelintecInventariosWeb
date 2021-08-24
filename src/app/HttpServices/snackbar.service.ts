import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private sb: MatSnackBar
  ) { }

  alert(msg:string,time:number=5){
    this.sb.open(msg,'Ok!',{duration : time*1000})
  }
}
