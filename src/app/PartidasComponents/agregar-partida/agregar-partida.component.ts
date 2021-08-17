import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { marca, proveedor, um } from 'src/app/Interfaces/catalogos.interface';
import { partida } from 'src/app/Interfaces/partida.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-agregar-partida',
  templateUrl: './agregar-partida.component.html',
  styleUrls: ['./agregar-partida.component.css']
})
export class AgregarPartidaComponent implements OnInit {

  marcas:marca[]=[];
  proveedores:proveedor[]=[];
  unidades:um[]=[];

  formPartida!:FormGroup;
  saving:boolean = false;
  partidas:partida[]=[];

  constructor(
    private cs:CatalogosService,
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private ps:PartidasService
  ) {
  }

  ngOnInit(): void {
    this.getMarcas();
    this.getProveedores();
    this.getUnidades();
    this.initForm();
  }

  initForm(){
    this.formPartida = this.fb.group({
      POS : ['',[Validators.required]],
      nombre : ['',[Validators.required,Validators.maxLength(100),Validators.pattern(rgx.white_space)]],
      descripcion : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      numero_parte : ['',[Validators.required,Validators.maxLength(10),Validators.pattern(rgx.white_space)]],
      precio_unitario : ['',[Validators.required]],
      precio_unitario_compra : ['',[Validators.required]],
      cantidad : ['',[Validators.required]],
      fk_id_proveedor : ['',[Validators.required]],
      fk_id_marca : ['',[Validators.required]],
      fk_id_unidad_medida : ['',[Validators.required]]
    })
  }

  trySave(){
    this.saving = true;
    this.ps.guardar(this.formPartida.value).subscribe(
      res => {
        this.partidas.push(this.formPartida.value)
        this.saving = false;
        this.formPartida.reset();
      },err => console.log(err)
    );
  }

  getMarcas(){
    this.cs.marcas().subscribe(
      res=>this.marcas = res,
      err => console.error(err)
    );
  }
  getProveedores(){
    this.cs.proveedores().subscribe(
      res=>this.proveedores = res,
      err => console.error(err)
    );
  }
  getUnidades(){
    this.cs.unidades().subscribe(
      res=>this.unidades = res,
      err => console.error(err)
    );
  }

  regresar(){
    window.history.back();
  }

}
