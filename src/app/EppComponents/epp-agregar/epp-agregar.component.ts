import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EppService } from 'src/app/HttpServices/epp.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { UsuariosService } from 'src/app/HttpServices/usuarios.service';
import { epp } from 'src/app/Interfaces/epp.interface';
import { usuario } from 'src/app/Interfaces/usuario.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-epp-agregar',
  templateUrl: './epp-agregar.component.html',
  styleUrls: ['./epp-agregar.component.css']
})
export class EppAgregarComponent implements OnInit, AfterViewInit, OnDestroy{

  formAdd!:FormGroup;
  epp:epp[]=[];
  usuarios:usuario[]=[];
  saving:boolean=false;
  /**Filter */
  protected _onDestroy = new Subject<void>();
  public eppFiltro: FormControl = new FormControl();
  public eppsFiltradas: ReplaySubject<epp[]> = new ReplaySubject<epp[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  /**Filter */
  constructor(
    private fb:FormBuilder,
    private us:UsuarioService,
    private uss:UsuariosService,
    private eps:EppService,
    private sbs:SnackbarService,
    private rt:Router
  ) { }

  ngOnInit(): void {
    this.getEpp();
    this.getUsuarios();
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
    this.formAdd = this.fb.group({
      fk_id_usuario_solicitante : [this.us.getUsuario().id_usuario],
      asignado : ['',[Validators.required,Validators.maxLength(120),Validators.pattern(rgx.white_space)]],
      fecha_solicitud : [new Date().toISOString()],
      ubicacion : ['',[Validators.required,Validators.maxLength(200),Validators.pattern(rgx.white_space)]],
      comentarios : ['',[Validators.maxLength(300),Validators.pattern(rgx.white_space)]],
      epp : this.fb.array([]),
      epp_seleccionado : [],
      visto : [true],
      atendido : [true]
    });
  }
  addEpp(){
    let epp:epp = this.epp.find(epp => epp.id_epp === this.formAdd.value.epp_seleccionado)!;
    const cntrs = <FormArray>this.formAdd.controls['epp'];
    cntrs.push(this.fb.group(
      {
        nombre:[`${epp.nombre}`,[]],
        fk_id_epp : [this.formAdd.value.epp_seleccionado,[Validators.required]],
        cantidad : [0,[Validators.required]]
      }
    ));
  }
  get eppForm(){
    return this.formAdd.controls['epp'] as FormArray;
  }
  getUsuarios(){
    this.uss.get().subscribe(
      res => this.usuarios = res
    )
  }
  async getEpp(){
    let res = await this.eps.getAll();
    this.epp = <epp[]>res;
    this.epp = this.epp;
    this.eppsFiltradas.next(this.epp.slice());
    this.eppFiltro.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
      () => {
        this.filterEpps();
      }
    );
  }
  protected setInitialValue() {
    this.eppsFiltradas.pipe(take(1), takeUntil(this._onDestroy)).subscribe(
      () => {
        this.singleSelect.compareWith = (a: epp, b: epp) => a && b && a.id_epp === b.id_epp;
      }
    );
  }
  protected filterEpps() {
    if (!this.epp) {
      return;
    }
    let search = this.eppFiltro.value;
    if (!search) {
      this.eppsFiltradas.next(this.epp.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.eppsFiltradas.next(
      this.epp.filter(epp => epp.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  trySave(){
    this.saving = true;
    this.eps.save(this.formAdd.value).subscribe(
      res => {
        this.sbs.alert("Guardado correctamente!.",3);
        setTimeout(()=>{
          this.saving = false;
          this.rt.navigateByUrl(`inventario/epp/solicitud/${res.id}`);
        },2000)
      },
      err => {
        console.log(err);
        this.saving = false;
        this.sbs.alert("Ocurrio un error!.");
      }

    )
  }
}
