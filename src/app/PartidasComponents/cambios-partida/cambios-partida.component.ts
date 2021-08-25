import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { MovimientosService } from 'src/app/HttpServices/movimientos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { UsuarioService } from 'src/app/HttpServices/usuario.service';
import { marca, proveedor, um } from 'src/app/Interfaces/catalogos.interface';
import { partida } from 'src/app/Interfaces/partida.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-cambios-partida',
  templateUrl: './cambios-partida.component.html',
  styleUrls: ['./cambios-partida.component.css']
})
export class CambiosPartidaComponent implements OnInit {

  id:any;
  partida:partida|undefined;
  marca:marca|undefined;
  proveedor:proveedor|undefined;
  unidad:um|undefined;

  formMov!:FormGroup;

  saving:boolean = false;

  constructor(
    private ar:ActivatedRoute,
    private ps:PartidasService,
    private cs:CatalogosService,
    private ms:MovimientosService,
    private fb:FormBuilder,
    private uss:UsuarioService,
    private sbs:SnackbarService
  ) {
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getPartida(this.id);
    this.initForm(this.id);
  }

  getPartida(id:number){
    this.ps.getPartida(id).subscribe(
      res=> {
        this.partida = res;
        this.getMarca(this.partida.fk_id_marca)
        this.getProveedor(this.partida.fk_id_proveedor)
        this.getUnidad(this.partida.fk_id_unidad_medida)
      },err => console.log(err)
    );
  }

  getMarca(id:number){
    this.cs.marca(id).subscribe(
      res => this.marca = res
    );
  }

  getProveedor(id:number){
    this.cs.proveedor(id).subscribe(
      res => this.proveedor = res
    );
  }

  getUnidad(id:number){
    this.cs.unidad(id).subscribe(
      res => this.unidad = res
    );
  }

  initForm(id:number){
    this.formMov = this.fb.group({
      cantidad:['',[Validators.required,Validators.pattern(rgx.integersp)]],
      io:["1",[Validators.required]],
      comentario:['',[Validators.required,Validators.maxLength(300),Validators.pattern(rgx.white_space)]],
      fk_id_usuario:[this.uss.getUsuario().id_usuario,[Validators.required]],
      fk_id_partida:[id]
    });
  }

  trySave(){
    this.saving = true;
    let movimiento = this.formMov.value;
    movimiento.cantidad = movimiento.cantidad * movimiento.io;
    this.ms.save(movimiento).subscribe(
      res =>{
        this.sbs.alert('El movimiento fue registrado, y la partida actualizada.');
        setTimeout(() => {
          window.history.back();
        }, 2000);
      },
      err => console.log(err)
    );
  }

}
