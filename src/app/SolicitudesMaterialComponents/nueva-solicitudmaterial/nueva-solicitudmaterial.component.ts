import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { area } from 'src/app/Interfaces/area.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';
import { reporte_partida } from 'src/app/Interfaces/reporte_partida.interface';
import { PosPipe } from 'src/app/Pipes/pos.pipe';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nueva-solicitudmaterial',
  templateUrl: './nueva-solicitudmaterial.component.html',
  styleUrls: ['./nueva-solicitudmaterial.component.css']
})
export class NuevaSolicitudmaterialComponent implements OnInit, AfterViewInit, OnDestroy {

  formNrp!:FormGroup;
  contratos:contrato[]|undefined;
  areas:area[]=[];
  guardando:boolean = false;

  
  partidas:partida_datatable[]=[];
  protected _onDestroy = new Subject<void>();
  public partidaFiltro: FormControl = new FormControl();
  public partidasFiltradas: ReplaySubject<partida_datatable[]> = new ReplaySubject<partida_datatable[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  
  constructor(
    private fb:FormBuilder,
    private uss:UsuarioService,
    private cs:ContratosService,
    private as:AreasService,
    private ps:PartidasService,
    private ppp:PosPipe,
    private sms:SolicitudesMaterialService,
    private sbs:SnackbarService,
    private rt:Router
  ) { }

  ngOnInit(): void {
    this.getContratos();
    this.initForm();
  }
  ngAfterViewInit() {
    this.setInitialValue();
    this.getPartidas();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  initForm(){
    this.formNrp = this.fb.group({
      fk_id_usuario_solicitante : [this.uss.getUsuario().id_usuario],
      fk_id_contrato : [],
      fk_id_area : [],
      ubicacion : [null,[Validators.required,Validators.maxLength(300),Validators.pattern(rgx.white_space)]],
      comentarios : [null,[Validators.required,Validators.maxLength(300),Validators.pattern(rgx.white_space)]],
      visto : [false],
      estatus : [1],
      fecha_solicitud : [new Date().toISOString()],
      fecha_critica : [null,[Validators.required]],
      partidas : this.fb.array([]),
      partida_seleccionada : []
    });
  }
  trySave(){
    this.guardando = true;
    let rp:reporte_partida[] = <reporte_partida[]>this.formNrp.value.partidas;
    this.formNrp.value.partidas = rp.filter( p => p.cantidad! > 0);
    console.log(this.formNrp.value);
    this.sms.generarSolicitud(this.formNrp.value).subscribe(
      res =>{
        this.guardando = false;
        if(!res.error){
          this.sbs.alert(res.msg)
          setTimeout(() => {
            this.rt.navigateByUrl('material/solicitud/'+res.id)            
          }, 500);
        }else{
          this.sbs.alert("Error, intenta más tarde. "+res.msg)
        }
      },err => {
        console.log(err)
      }
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
      res => this.areas = res,
      err => console.log(err)
    )
  }
  onSelectContrato(){
    let cont = this.formNrp.value.fk_id_contrato;
    this.getAreasPorContrato(cont);
  }
  async getPartidas(){
    let res = await this.ps.getPartidas();
    this.partidas = <partida_datatable[]>res;
    this.partidas = this.partidas;
    //this.formNrp.controls().setValue(this.partidas[10]);
    this.partidasFiltradas.next(this.partidas.slice());
    this.partidaFiltro.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
      () => {
        this.filterPartidas();
      }
    );
  }
  addPartida(){
    let partida:partida_datatable = this.partidas.find(p => p.id_partida === this.formNrp.value.partida_seleccionada)!;
    const cntrs = <FormArray>this.formNrp.controls['partidas'];
    cntrs.push(this.fb.group(
      {
        partida:[`${this.ppp.transform(partida.POS)} - ${partida.descripcion} - ${partida.unidad_medida}`,[]],
        fk_id_partida : [this.formNrp.value.partida_seleccionada,[Validators.required]],
        cantidad : [0,[Validators.required,Validators.pattern(rgx.integersp)]],
        surtido : [false]
      }
    ));
  }
  get partidasForm(){
    return this.formNrp.controls['partidas'] as FormArray;
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
}
