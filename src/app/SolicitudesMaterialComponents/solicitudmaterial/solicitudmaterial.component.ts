import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { MatStepper } from '@angular/material/stepper';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAceptarsolicitudComponent } from "../../DialogComponents/dialog-aceptarsolicitud/dialog-aceptarsolicitud.component";
import { DialogSurtirsolicitudComponent } from "../../DialogComponents/dialog-surtirsolicitud/dialog-surtirsolicitud.component";
@Component({
  selector: 'app-solicitudmaterial',
  templateUrl: './solicitudmaterial.component.html',
  styleUrls: ['./solicitudmaterial.component.css']
})
export class SolicitudmaterialComponent implements OnInit {

  id:any;
  itsAdmin:boolean = false;
  itsAlmac:boolean = false;
  itsSolic:boolean = false;
  solicitud:solicitud_material | undefined;
  partidas:partida_solicitud[]=[];

  @ViewChild('stepper') stp!:MatStepper;
  constructor(
    private ar:ActivatedRoute,
    private us:UsuarioService,
    private sms:SolicitudesMaterialService,
    private sbs:SnackbarService,
    private dg: MatDialog
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
    this.getRole();
  }

  ngOnInit(): void {
    this.getSolicitud(this.id);
    this.getPartidas(this.id);
  }

  getRole(){
    this.itsAdmin = this.us.getUsuario().rol==1?true:false;
    this.itsAlmac = this.us.getUsuario().rol==2?true:false;
    this.itsSolic = this.us.getUsuario().rol==3?true:false;
  }

  getSolicitud(id:number){
    this.sms.getSolicitud(id).subscribe(
      res => {
        this.solicitud = res;
        setTimeout(() => {
          this.next(this.solicitud!.estatus)          
        }, 500);
        if(this.itsAdmin&&(!this.solicitud.visto)){
          this.sms.setVisto(id).subscribe(
            res => res
          );
        }
      },
      err => console.log(err)
    );
  }

  getPartidas(id:number){
    this.sms.getPartidasSolicitud(id).subscribe(
      res => this.partidas = res,
      err => console.log(err)
    );
  }

  next(ind:number){
    for (let i = 1; i < ind; i++) {
      this.stp.next();
    }
  }

  dialogAceptado(id:number){
    let msg = this.partidas.filter(p => p.cantidad_inventario<p.cantidad).length?' aunque no se cumplen con las existencias del material':' ';
    const dr = this.dg.open(DialogAceptarsolicitudComponent, {
      data: {
        msg: `¿Desea autorizar esta solicitud${msg}?`, 
        id: id
      }
    });

    dr.afterClosed().subscribe(result => {
      this.getSolicitud(this.id);
      this.getPartidas(this.id);
    });
  }

  dialogSurtir(){
    const dr = this.dg.open(DialogSurtirsolicitudComponent, {
      data: {
        partidas : this.partidas.filter( P => P.surtido==false && P.cantidad_inventario>P.cantidad), 
        partidas_totales : this.partidas.length,
        solicitud : this.solicitud
      }
    });

    dr.afterClosed().subscribe(result => {
      this.stp.reset();
      this.getSolicitud(this.id);
      this.getPartidas(this.id);
    });
  }


}
