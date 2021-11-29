import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/HttpServices/servicios.service';
import { servicio } from 'src/app/Interfaces/servicios.interface';
import { NuevoServicioComponent } from "./../nuevo-servicio/nuevo-servicio.component";
@Component({
  selector: 'app-servicios-contrato',
  templateUrl: './servicios-contrato.component.html',
  styleUrls: ['./servicios-contrato.component.css']
})
export class ServiciosContratoComponent implements OnInit {

  id:number;
  servicios:servicio[]=[];
  cargando:boolean = true;

  constructor(
    private ss:ServiciosService,
    private ar:ActivatedRoute,
    private dialog:MatDialog
  ) {
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getServicios(this.id);
  }

  getServicios(id:number){
    this.ss.getServiciosTabla(id).subscribe(
      res => {
        this.servicios = res
        this.cargando = false;
      },err => console.log(err)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NuevoServicioComponent, {
      width: '75%',
      data: {idc:this.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getServicios(this.id);
    })
  }


}
