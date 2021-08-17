import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { area } from 'src/app/Interfaces/area.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { contrato_planta_text } from 'src/app/Interfaces/contrato_planta.interface';
import { partida, partida_datatable } from 'src/app/Interfaces/partida.interface';
import { reporte_partida } from 'src/app/Interfaces/reporte_partida.interface';
import { rgx } from 'src/app/Validators/regex.validator';
import { takeUntil, take } from 'rxjs/operators';
import { PosPipe } from 'src/app/Pipes/pos.pipe';

@Component({
  selector: 'app-nuevo-reportematerial',
  templateUrl: './nuevo-reportematerial.component.html',
  styleUrls: ['./nuevo-reportematerial.component.css']
})
export class NuevoReportematerialComponent implements OnInit, AfterViewInit, OnDestroy {

  idc!:number;
  formPedido!:FormGroup;
  contratos:contrato[]|undefined;
  areas:area[]=[];
  contrato_plantas:contrato_planta_text[]=[];
  partidas:partida_datatable[]=[];
  iterabl:any[]=[0];
  guardando:boolean = false;
  selpid:number | undefined;

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
    private ppp:PosPipe
  ) { 
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getContratos();
    this.getAreasPorContrato(this.idc);
    this.getContratoPlantas(this.idc);
    this.getPartidas();
    this.initForm();
    this.getUltimoFolioPedido(this.idc);
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
      fk_id_contrato : [this.idc,[Validators.required]],
      numero_pedido : ['',[Validators.required,Validators.pattern(rgx.white_space)]],
      empresa : ['Ternium México',[Validators.required,Validators.maxLength(50),Validators.pattern(rgx.white_space)]],
      fk_id_planta : ['',[Validators.required]],
      fk_id_area : ['',[Validators.required]],
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
      partida_seleccionada : ['',[]]
    });
    this.formPedido.controls['fk_id_contrato'].disable();
  }

  trySave(){
    //this.guardando = true;
    this.formPedido.value.fecha = this.formPedido.value.fecha.toISOString();
    let rp:reporte_partida[] = <reporte_partida[]>this.formPedido.value.partidas;
    this.formPedido.value.partidas = rp.filter( p => p.cantidad! > 0);
    this.formPedido.value.fk_id_contrato = this.idc;

    console.log(this.formPedido.value)
    /*this.rs.guardar(this.formPedido.value).subscribe(
      res => {
        this.guardando = false;
        if(!res.error){
          window.history.back();
        }else{
          this.formPedido.reset();
        }
      },
      err => {
        console.log(err)
      }
    );*/
  }

  getContratos(){
    this.cs.getContratos().subscribe(
      res => this.contratos = res,
      err => console.log(err)
    );
  }

  getAreasPorContrato(idc:number){
    this.as.getAreasPorContrato(idc).subscribe(
      res => this.areas = res,
      err => console.log(err)
    )
  }

  getContratoPlantas(idc:number){
    this.cps.getContratoPlantasByContratoId(idc).subscribe(
      res => this.contrato_plantas = res,
      err => console.log(err)
    )
  }

  async getPartidas(){
    let res = await this.ps.getPartidas();
    this.partidas = <partida_datatable[]>res;
    this.partidas = this.partidas;
    //this.formPedido.controls().setValue(this.partidas[10]);
    this.partidasFiltradas.next(this.partidas.slice());
    this.partidaFiltro.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
      () => {
        this.filterPartidas();
      }
    );
  }

  addPartida(){
    let partida:partida_datatable = this.partidas.find(p => p.id_partida === this.formPedido.value.partida_seleccionada)!;
    const cntrs = <FormArray>this.formPedido.controls['partidas'];
    cntrs.push(this.fb.group(
      {
        partida:[`${this.ppp.transform(partida.POS)} - ${partida.descripcion} - ${partida.unidad_medida}`,[]],
        fk_id_partida : [this.formPedido.value.partida_seleccionada,[Validators.required]],
        cantidad : [0,[Validators.required]]
      }
    ));
  }

  get partidasForm(){
    return this.formPedido.controls['partidas'] as FormArray;
  }

  protected setInitialValue() {
    this.partidasFiltradas.pipe(take(1), takeUntil(this._onDestroy)).subscribe(
      () => {
        this.singleSelect.compareWith = (a: partida_datatable, b: partida_datatable) => a && b && a.id_partida === b.id_partida;
      }
    );
  }

  protected filterPartidas() {
    if (!this.partidas) {
      return;
    }
    let search = this.partidaFiltro.value;
    if (!search) {
      this.partidasFiltradas.next(this.partidas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.partidasFiltradas.next(
      this.partidas.filter(partida => partida.descripcion.toLowerCase().indexOf(search) > -1)
    );
  }

  getUltimoFolioPedido(id:number){
    this.rs.getUltimoFolioPedido(id).subscribe(
      res => {
        this.formPedido.patchValue({folio : res[0].folio+1,numero_pedido : res[0].numero_pedido+1})
      }
    );
  }
}

