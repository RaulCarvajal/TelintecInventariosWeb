import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { partida_solicitud } from 'src/app/Interfaces/solicitud_material.interface';
import { DialogAceptarsolicitudComponent } from '../dialog-aceptarsolicitud/dialog-aceptarsolicitud.component';

@Component({
  selector: 'app-dialog-surtirsolicitud',
  templateUrl: './dialog-surtirsolicitud.component.html',
  styleUrls: ['./dialog-surtirsolicitud.component.css']
})
export class DialogSurtirsolicitudComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSurtirsolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data
  ) { }

  total:boolean = true;

  ngOnInit(): void {
    this.total=this.data.partidas.length==this.data.partidas_totales?true:false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  surtir(){
    this.data.partidas.map( p => p.cantidad*2)
  }

}

interface data{
  partidas : partida_solicitud[],
  partidas_totales : number
}