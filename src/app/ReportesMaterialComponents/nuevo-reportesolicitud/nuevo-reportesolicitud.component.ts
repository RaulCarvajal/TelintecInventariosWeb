import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { PlantasService } from 'src/app/HttpServices/plantas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { area } from 'src/app/Interfaces/area.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';
import { planta } from 'src/app/Interfaces/plantas.interface';
import { reporte_partida } from 'src/app/Interfaces/reporte_partida.interface';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { PosPipe } from 'src/app/Pipes/pos.pipe';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nuevo-reportesolicitud',
  templateUrl: './nuevo-reportesolicitud.component.html',
  styleUrls: ['./nuevo-reportesolicitud.component.css']
})
export class NuevoReportesolicitudComponent implements OnInit, OnDestroy {

  ids!:number;
  formPedido!:FormGroup;
  contratos:contrato[]|undefined;
  areas:area[]=[];
  contrato_plantas:planta[]=[];
  iterabl:any[]=[0];
  guardando:boolean = false;
  selpid:number | undefined;

  solicitud:solicitud_material | undefined;
  partidas:partida_solicitud[]=[];

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  public partidaFiltro: FormControl = new FormControl();
  public partidasFiltradas: ReplaySubject<partida_datatable[]> = new ReplaySubject<partida_datatable[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  constructor(
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private cs:ContratosService,
    private as:AreasService,
    private cps:ContratoplantaService,
    private ps:PartidasService,
    private rs:ReportesService,
    private ppp:PosPipe,
    private st:DomSanitizer,
    private pls:PlantasService,
    private sms:SolicitudesMaterialService,
  ) { 
    this.ids = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getContratos();
    this.getUltimoFolioPedido();
    this.initForm();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  initForm(){
    this.formPedido = this.fb.group({
      folio : ['',[Validators.required,Validators.pattern(rgx.white_space)]],
      fecha : [new Date(),[Validators.required]],
      fk_id_contrato : ['',[Validators.required]],
      numero_pedido : ['',[Validators.pattern(rgx.white_space)]],
      empresa : ['Ternium México',[Validators.required,Validators.maxLength(50),Validators.pattern(rgx.white_space)]],
      fk_id_planta : ['',[Validators.required]],
      fk_id_area : ['',[]],
      ubicacion : ['',[Validators.required,Validators.maxLength(100)]],
      nombre : ['',[Validators.maxLength(100),Validators.pattern(rgx.white_space)]],
      telefono : ['',[Validators.maxLength(15),Validators.pattern(rgx.phone)]],
      email : ['',[Validators.maxLength(100),Validators.email]],
      responsable_cc : ['',[Validators.required,Validators.maxLength(100),Validators.pattern(rgx.white_space)]],
      centro_costos : ['',[Validators.required,Validators.maxLength(50)]],
      actividad_finalizada : [false,[Validators.required]],
      fecha_inicio : ['',[Validators.required]],
      fecha_fin : ['',[Validators.required]],
      comentarios : ['',[Validators.pattern(rgx.white_space),Validators.maxLength(250)]],
      partidas : this.fb.array([])
    });
    this.getSolicitud(this.ids);
    this.getPartidasSol(this.ids);
  }
  trySave(){
    //this.guardando = true;
    console.log(this.formPedido.value)
    /*this.rs.guardar(this.formPedido.value).subscribe(
      res => {
        this.guardando = false;
        if(!res.error){
          window.history.back();
        }else{
          this.formPedido.reset();
        }
        console.log(res)
      },
      err => {
        console.log(err)
    })*/
  }

  getSolicitud(ids:number){
    this.sms.getSolicitud(ids).subscribe(
      res => {
        this.solicitud = res;
        this.formPedido.patchValue({
          fk_id_contrato : this.solicitud.fk_id_contrato,
          ubicacion : this.solicitud.ubicacion
        })
        this.onSelectContrato();
      },
      err => console.log(err)
    );
  }
  getPartidasSol(ids:number){
    this.sms.getPartidasSolicitud(ids).subscribe(
      res => {
        this.partidas = res
        this.partidas.forEach( p => this.addPartida(p));
      },
      err => console.log(err)
    );
  }
  getContratos(){
    this.cs.getContratos().subscribe(
      res => this.contratos = res,
      err => console.log(err)
    );
  }
  getAreasPorContrato(idc:number){
    this.as.getAreasPorContrato(idc).subscribe(
      res => {
        this.areas = res
        this.formPedido.patchValue({fk_id_area : this.solicitud!.fk_id_area});
        this.setPedido();
      },
      err => console.log(err)
    )
  }
  getContratoPlantas(idc:number){
    this.cps.getContratoPlantasByContratoId(idc).subscribe(
      res => this.contrato_plantas = res,
      err => console.log(err)
    )
  }
  getTodasPlantas(){
    this.pls.getPlantas().subscribe(
      res => this.contrato_plantas = res
    );
  }
  addPartida(partida:partida_solicitud){
    const cntrs = <FormArray>this.formPedido.controls['partidas'];
    cntrs.push(this.fb.group(
      {
        partida:[`${this.ppp.transform(partida.POS)} - ${partida.partida} - ${partida.unidad_medida}`,[]],
        fk_id_partida : [partida.fk_id_partida,[Validators.required]],
        cantidad : [partida.cantidad,[Validators.required]]
      }
    ));
  }
  get partidasForm(){
    return this.formPedido.controls['partidas'] as FormArray;
  }
  getUltimoFolioPedido(){
    this.rs.getUltimoFolioPedido().subscribe(
      res => {
        this.formPedido.patchValue({folio : res[0].folio+1})
      }
    );
  }
  setPedido(){
    let np = this.areas.find(area => area.id_area == this.formPedido.value.fk_id_area)?.numero_pedido;
    this.formPedido.patchValue({numero_pedido : np})
  }
  onSelectContrato(){
    let cont = this.formPedido.value.fk_id_contrato;
    this.getAreasPorContrato(cont);
    this.getContratoPlantas(cont); 
  }

}
