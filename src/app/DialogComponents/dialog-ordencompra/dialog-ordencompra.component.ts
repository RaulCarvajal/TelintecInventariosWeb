import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';

@Component({
  selector: 'app-dialog-ordencompra',
  templateUrl: './dialog-ordencompra.component.html',
  styleUrls: ['./dialog-ordencompra.component.css']
})
export class DialogOrdencompraComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOrdencompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}


interface data{
  partidas : partida_solicitud[],
  partidas_totales : number,
  solicitud : solicitud_material
}