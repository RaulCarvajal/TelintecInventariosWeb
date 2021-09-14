import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PlantasService } from 'src/app/HttpServices/plantas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { ServiciosService } from 'src/app/HttpServices/servicios.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { area } from 'src/app/Interfaces/area.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';
import { planta } from 'src/app/Interfaces/plantas.interface';
import { servicio } from 'src/app/Interfaces/servicios.interface';
import { partida_solicitud, solicitud_material } from 'src/app/Interfaces/solicitud_material.interface';
import { PosPipe } from 'src/app/Pipes/pos.pipe';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nuevo-reportesolicitud',
  templateUrl: './nuevo-reportesolicitud.component.html',
  styleUrls: ['./nuevo-reportesolicitud.component.css']
})
export class NuevoReportesolicitudComponent implements OnInit, AfterViewInit, OnDestroy {

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

  servicios:servicio[]=[];
   /** Subject that emits when the component has been destroyed. */
   protected _onDestroy = new Subject<void>();
   public servicioFiltro: FormControl = new FormControl();
   public serviciosFiltradas: ReplaySubject<servicio[]> = new ReplaySubject<servicio[]>(1);
   @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  constructor(
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private cs:ContratosService,
    private as:AreasService,
    private cps:ContratoplantaService,
    private rs:ReportesService,
    private ppp:PosPipe,
    private pls:PlantasService,
    private sms:SolicitudesMaterialService,
    private sbs:SnackbarService,
    private ss:ServiciosService
  ) { 
    this.ids = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getContratos();
    this.getUltimoFolioPedido();
    this.initForm();
  }

  ngAfterViewInit() {
    this.setInitialValue();
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
      partidas : this.fb.array([]),
      fk_id_solicitud : [this.ids],
      servicios : this.fb.array([]),
      servicio_seleccionado : []
    });
    this.getSolicitud(this.ids);
    this.getPartidasSol(this.ids);
    
    setTimeout(() => {
      this.formPedido.controls['fk_id_contrato'].disable()
      this.formPedido.controls['fk_id_area'].disable()
      this.formPedido.controls['numero_pedido'].disable()
      this.formPedido.controls['ubicacion'].disable()
      this.formPedido.controls['empresa'].disable()
      this.formPedido.controls['partidas'].disable()
    }, 1000);
    
  }
  trySave(){
    this.guardando = true;
    this.formPedido.value.fecha = <Date>this.formPedido.value.fecha.toISOString();
    this.formPedido.value.fk_id_contrato = this.solicitud?.fk_id_contrato;
    this.formPedido.value.fk_id_area = this.solicitud?.fk_id_area;
    this.formPedido.value.numero_pedido = this.areas.find( a => a.id_area == this.solicitud?.fk_id_area)?.numero_pedido;
    this.formPedido.value.ubicacion = this.solicitud?.ubicacion;
    this.formPedido.value.empresa = 'Ternium México';
    this.formPedido.value.partidas = this.partidas;
    console.log(this.formPedido.value)
    this.rs.guardarReporteSolicitud(this.formPedido.value).subscribe(
      res => {
        this.guardando = false;
        if(!res.error){
          this.sbs.alert(res.message)
          window.history.back();
        }else{
          this.sbs.alert(res.message)
          window.history.back();
        }
      },
      err => {
        console.log(err)
    })
  }

  async getServicios(idc:number){
    let res = await this.ss.getServicios(idc);
    this.servicios = <servicio[]>res;
    this.servicios = this.servicios;
    //this.formPedido.controls().setValue(this.servicios[10]);
    this.serviciosFiltradas.next(this.servicios.slice());
    this.servicioFiltro.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
      () => {
        this.filterServicios();
      }
    );
  }
  protected setInitialValue() {
    this.serviciosFiltradas.pipe(take(1), takeUntil(this._onDestroy)).subscribe(
      () => {
        this.singleSelect.compareWith = (a: servicio, b: servicio) => a && b && a.id_servicios === b.id_servicios;
      }
    );
  }
  protected filterServicios() {
    if (!this.partidas) {
      return;
    }
    let search = this.servicioFiltro.value;
    if (!search) {
      this.serviciosFiltradas.next(this.servicios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.serviciosFiltradas.next(
      this.servicios.filter(servicio => servicio.descripcion.toLowerCase().indexOf(search) > -1)
    );
  }

  addServicios(){
    let servicio:servicio = this.servicios.find(p => p.id_servicios === this.formPedido.value.servicio_seleccionado)!;
    const cntrs = <FormArray>this.formPedido.controls['servicios'];
    cntrs.push(this.fb.group(
      {
        servicio:[`${this.ppp.transform(servicio.POS)} - ${servicio.descripcion} - ${servicio.unidad_medida}`,[]],
        fk_id_servicio : [this.formPedido.value.servicio_seleccionado,[Validators.required]],
        cantidad : [0,[Validators.required]]
      }
    ));
  }
  get serviciosForm(){
    return this.formPedido.controls['servicios'] as FormArray;
  }
  getSolicitud(ids:number){
    this.sms.getSolicitud(ids).subscribe(
      res => {
        this.solicitud = res;
        this.formPedido.patchValue({
          fk_id_contrato : this.solicitud.fk_id_contrato,
          ubicacion : this.solicitud.ubicacion
        })
        this.getServicios(this.solicitud.fk_id_contrato);
        this.onSelectContrato();
      },
      err => console.log(err)
    );
  }
  getPartidasSol(ids:number){
    this.sms.getPartidasSolicitud(ids).subscribe(
      res => {
        this.partidas = res
        console.log(res)
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
    let np = this.areas.find(area => area.id_area == this.solicitud?.fk_id_area)?.numero_pedido;
    this.formPedido.patchValue({numero_pedido : np})
  }
  onSelectContrato(){
    let cont = this.solicitud!.fk_id_contrato;
    this.getAreasPorContrato(cont);
    this.getContratoPlantas(cont); 
  }

}
