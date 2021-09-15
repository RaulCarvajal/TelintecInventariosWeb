import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { MatStepper } from '@angular/material/stepper';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAceptarsolicitudComponent } from "../../DialogComponents/dialog-aceptarsolicitud/dialog-aceptarsolicitud.component";
import { DialogSurtirsolicitudComponent } from "../../DialogComponents/dialog-surtirsolicitud/dialog-surtirsolicitud.component";
import { DialogOrdencompraComponent } from "../../DialogComponents/dialog-ordencompra/dialog-ordencompra.component";
import { DialogRemitosolicitudComponent } from "../../DialogComponents/dialog-remitosolicitud/dialog-remitosolicitud.component";
import { ServiciosService } from 'src/app/HttpServices/servicios.service';
import { servicio_datatable } from 'src/app/Interfaces/servicios.interface';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { RemitosService } from 'src/app/HttpServices/remitos.service';

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
  servicios:servicio_datatable[]|undefined;
  reporte_id:number|undefined;
  remito_id:number|undefined;

  @ViewChild('stepper') stp!:MatStepper;
  constructor(
    private ar:ActivatedRoute,
    private us:UsuarioService,
    private sms:SolicitudesMaterialService,
    private rt:Router,
    private dg: MatDialog,
    private ss: ServiciosService,
    private rs:ReportesService,
    private rms:RemitosService
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
        if(this.solicitud.estatus==5){
          this.getServicios(this.solicitud.id_solicitud)
          this.getContratoId(this.solicitud.id_solicitud)
          this.getRemitoId(this.solicitud.id_solicitud)
        }
      },
      err => console.log(err)
    );
  }

  getPartidas(id:number){
    this.sms.getPartidasSolicitud(id).subscribe(
      res =>{ this.partidas = res},
      err => console.log(err)
    );
  }

  getServicios(ids:number){
    this.ss.getServiciosPorIdSolicitud(ids).subscribe(
      res => this.servicios = res
    );
  }

  getContratoId(ids:number){
    this.rs.getReporteIdByIdSolicitud(ids).subscribe(
      res => this.reporte_id = res
    );
  }

  getRemitoId(ids:number){
    this.rms.getRemitoIdByIdSolicitud(ids).subscribe(
      res => this.remito_id = res
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
        partidas : this.partidas.filter( P => P.surtido==false && P.cantidad_inventario>=P.cantidad), 
        partidas_totales : this.partidas.length,
        partidas_surtidas : this.partidas.filter( P => P.surtido==true).length,
        solicitud : this.solicitud
      }
    });

    dr.afterClosed().subscribe(result => {
      this.stp.reset();
      this.getSolicitud(this.id);
      this.getPartidas(this.id);
    });
  }

  dialogOrdenCompra(){
    const dr = this.dg.open(DialogOrdencompraComponent, {
      data: {
        partidas : this.partidas.filter( P => P.surtido==false && P.cantidad_inventario<P.cantidad).map( p => p.fk_id_partida), 
        partidas_totales : this.partidas.length,
        solicitud : this.solicitud
      }
    });

    dr.afterClosed().subscribe(result => {
      this.stp.reset();
    });
  }

  dialogRemito(){
    if(this.remito_id){
        this.rt.navigateByUrl(`/contrato/remito/${this.remito_id}`)
    }else{
      const dr = this.dg.open(DialogRemitosolicitudComponent, {
        data: {
          partidas : this.partidas.map( p => p.id_solicitud),
          servicios : this.servicios!.map( p => p.id_solicitud),
          fk_id_contrato : this.solicitud?.fk_id_contrato,
          fk_id_solicitud : this.solicitud?.id_solicitud,
        }
      });
      dr.afterClosed().subscribe(result => {
        this.stp.reset();
        this.getSolicitud(this.id);
        this.getPartidas(this.id);
      });
    }
  }

}
