import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { FolioPipe } from "../../Pipes/folio.pipe";
import { PosPipe } from "../../Pipes/pos.pipe";

@Component({
  selector: 'app-dialog-surtirsolicitud',
  templateUrl: './dialog-surtirsolicitud.component.html',
  styleUrls: ['./dialog-surtirsolicitud.component.css']
})
export class DialogSurtirsolicitudComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSurtirsolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data,
    private fp:FolioPipe,
    private dt:DatePipe,
    private pp:PosPipe,
    private sms:SolicitudesMaterialService
  ) { }

  total:boolean = true;
  cargando:boolean = false;

  ngOnInit(): void {
    this.total=this.data.partidas.length==this.data.partidas_totales?true:false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  surtir(){
    this.cargando = true;
    let pdfData = {
      tipo : this.total?'total':'parcial',
      solicitante : this.data.solicitud.usuario_solicitante,
      fecha_solicitud : this.dt.transform(this.data.solicitud.fecha_solicitud,'d/MM/yy, h:mm a'),
      fecha_critica : this.dt.transform(this.data.solicitud.fecha_critica,'d/MM/yy, h:mm a'),
      fecha_hoy : this.dt.transform(new Date().toISOString(),'d/MM/yy, h:mm a'),
      contrato : this.data.solicitud.contrato,
      ubicacion : this.data.solicitud.ubicacion,
      codigo : this.fp.transform(this.data.solicitud.id_solicitud),
      partidas : this.data.partidas
    }

    //this.sms.getEntregaMaterialPdf(pdfData);
  }

}

interface data{
  partidas : partida_solicitud[],
  partidas_totales : number,
  solicitud : solicitud_material
}