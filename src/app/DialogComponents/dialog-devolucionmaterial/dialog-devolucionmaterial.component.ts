import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';

@Component({
  selector: 'app-dialog-devolucionmaterial',
  templateUrl: './dialog-devolucionmaterial.component.html',
  styleUrls: ['./dialog-devolucionmaterial.component.css']
})
export class DialogDevolucionmaterialComponent implements OnInit {

  partidas:any[] = [];
  devolucion:any[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogDevolucionmaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ps:PartidasService,
    public sbs: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPartidas(this.data.id_solicitud)
  }


  getPartidas(ids:number){
    this.ps.getPartidasSolicitudDevolucion(ids).subscribe(
      res => {
        this.partidas = res
        this.partidas.forEach( P => {
          this.devolucion.push({
            id_solicitud : P.id_solicitud,
            id_partida : P.id_partida,
            cantidad : P.cantidad,
            devolucion : 0
          })
        });
      }
    )
  }

  async save(){
    for await (let d of this.devolucion) {
      if(d.devolucion!=0){
        if((d.cantidad-d.devolucion)<1){
          if((d.cantidad-d.devolucion)==0){
            let res = await this.ps.getEliminarSolicitudDevolucion(d.id_solicitud)
          }
        }else{
          let res = await this.ps.getUpdateSolicitudDevolucion(d.id_solicitud, d)
        }
      }
    }
    this.sbs.alert("Devolucion generada exitosamente");
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
