import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject, ReplaySubject } from 'rxjs';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';
import { takeUntil, take } from 'rxjs/operators';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-partidas-contrato',
  templateUrl: './add-partidas-contrato.component.html',
  styleUrls: ['./add-partidas-contrato.component.css']
})
export class AddPartidasContratoComponent implements OnInit, AfterViewInit, OnDestroy {

  formPartidaPos!:FormGroup;
  id:number;

  partidas:partida_datatable[]=[];
  protected _onDestroy = new Subject<void>();
  public partidaFiltro: FormControl = new FormControl();
  public partidasFiltradas: ReplaySubject<partida_datatable[]> = new ReplaySubject<partida_datatable[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;
  constructor(
    private fb:FormBuilder,
    private ps:PartidasService,
    private ar:ActivatedRoute,
    public dialogRef: MatDialogRef<AddPartidasContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: temp
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formPartidaPos = this.fb.group(
      {
        fk_id_contrato : [this.data.idc,[Validators.required]],
        fk_id_partida : ["",[Validators.required]],
        pos : ["",[Validators.required]]
      }
    );
  }

  ngAfterViewInit() {
    this.setInitialValue();
    this.getPartidas();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  trySave(){
    this.ps.savePartidaPorContrato(this.formPartidaPos.value).subscribe(
      res => {
        this.dialogRef.close();
      }, err => console.log(err)
    );
  }
}

interface temp {
  idc : number
}
