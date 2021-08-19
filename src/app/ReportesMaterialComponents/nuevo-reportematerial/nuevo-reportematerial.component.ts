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
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { PlantasService } from 'src/app/HttpServices/plantas.service';
import { planta } from 'src/app/Interfaces/plantas.interface';

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
  contrato_plantas:planta[]=[];
  partidas:partida_datatable[]=[];
  iterabl:any[]=[0];
  guardando:boolean = false;
  selpid:number | undefined;
  cc:boolean;

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
    private pls:PlantasService
  ) { 
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
    this.idc?this.cc=true:this.cc=false;
  }

  ngOnInit(): void {
    this.getContratos();
    if(this.cc){
      this.getAreasPorContrato(this.idc);
      this.getContratoPlantas(this.idc);
    }else{
      this.getTodasPlantas();
    }
    this.getUltimoFolioPedido();
    this.getPartidas();
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
      fk_id_contrato : [this.idc,[Validators.required]],
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
      partida_seleccionada : ['',[]]
    });
    if(this.cc){
      this.formPedido.controls['fk_id_contrato'].disable()
      this.formPedido.controls['numero_pedido'].disable()
    }else{
    }
    
  }
  trySave(){
    this.guardando = true;
    this.formPedido.value.fecha = this.formPedido.value.fecha.toISOString();
    let rp:reporte_partida[] = <reporte_partida[]>this.formPedido.value.partidas;
    this.formPedido.value.partidas = rp.filter( p => p.cantidad! > 0);
    if(this.cc){
      this.formPedido.value.fk_id_contrato = this.idc;
    }
    this.formPedido.value.numero_pedido = this.areas.find(area => area.id_area == this.formPedido.value.fk_id_area)?.numero_pedido
    console.log(this.formPedido.value)
    this.rs.guardar(this.formPedido.value).subscribe(
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
    })
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
  getTodasPlantas(){
    this.pls.getPlantas().subscribe(
      res => this.contrato_plantas = res
    );
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
    //this.formPedido.controls['fk_id_contrato'].disable()
    this.formPedido.controls['numero_pedido'].disable()
    let cont = this.formPedido.value.fk_id_contrato;
    this.getAreasPorContrato(cont);
    this.getContratoPlantas(cont); 
  }

  //Evidencias
  preview:any[] = [];
  FilesSelected:any[] = [];

  eventFile(event:any){
    let file = event.target.files[0];
    this.extraerBase64(file).then(
      img => {
        this.preview!.push(img)
      }
    );
    this.FilesSelected.push(file);
  }
  extraerBase64 = async ($event:any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      //const image = this.st.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base : reader.result
        });
      };
      reader.onerror = error => {
        reject({
          base : null
        })
      }
      return null
    }catch(e){
      return null;
    }
  });
  removeImg(index:number){
    this.preview.splice(index,1)
    console.log(index)
  }
  guardarEvidencia(){
    let fd = new FormData();
    //this.FilesSelected.forEach((f) => fd.append('certificates', f));
    fd.append('img',this.FilesSelected[0])
    this.rs.guardarEvidencia(fd).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }
}
