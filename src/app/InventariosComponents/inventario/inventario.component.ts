import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { InventariosService } from 'src/app/HttpServices/inventarios.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { inventario } from 'src/app/Interfaces/inventario.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  existe: boolean | undefined;
  origin: string | undefined;
  id: number | undefined;
  inventario: inventario | undefined;
  formInventario!:FormGroup;
  contrato:contrato | undefined;
  showForm:boolean = false;
  guardando:boolean = false;
  showData:boolean = false;
  partidas:any[] = [];
  searchString:string = ""; 
  
  constructor(
    private ar:ActivatedRoute,
    private is:InventariosService,
    private fb:FormBuilder,
    private cs:ContratosService,
    private ps:PartidasService,
    private rt:Router
  ) 
  {
    this.origin = this.ar.snapshot.paramMap.get("origin")!;
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.origin=='con'?this.getInventarioPorContrato(this.id!):this.getInventarioPorId(this.id!);
    this.showForm = false;
    this.guardando = false;
  }

  getInventarioPorId(id:number){
    this.is.getInventario(id).subscribe(
      res => {
        this.inventario = res;
        this.getContrato(this.inventario.fk_id_contrato);
      },
      err => {
      }
    );
  }

  getInventarioPorContrato(id:number){
    this.is.getInventarioPorContrato(id).subscribe(
      res =>{
        this.existe = res.id_inventario==0;
        this.getContrato(id);
        this.inventario = res;
      },
      err => console.log(err)
    );
  }

  getPartidas(id:number){
    this.ps.getPartidasPorIdInventario(id).subscribe(
      res => this.partidas = res,
      err => console.log(err)
    );
  }

  getContrato(id:number){
    this.cs.getContrato(id).subscribe(
      res => {
        this.contrato = res;
        this.showData = true;
        this.getPartidas(this.inventario!.id_inventario);
        this.initForm(res)
      },
      err => console.log(err)
    )
  }

  initForm(contrato:contrato){
    this.formInventario = this.fb.group({
      nombre : ["Inventario "+contrato.nombre,[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      descripcion_ubicacion : ["",[Validators.required,Validators.maxLength(200),Validators.pattern(rgx.white_space)]],
      fk_id_contrato : [contrato.id_contrato,[Validators.required]]
    });
    this.showForm = true;
  }

  trySave(){
    this.guardando = true;
    this.is.guardar(this.formInventario.value).subscribe(
      res => {
        this.guardando = false;
        this.ngOnInit();
      },
      err => {
        window.location.reload();
      }
    );
  }

  gotoPartida(id:number){
    this.rt.navigateByUrl(`inventario/partidas/${id}`);
  }

  search(){
    if(this.searchString){
      let regex = new RegExp(this.searchString.toLowerCase());
      this.partidas = this.partidas.filter( p => p.descripcion.toLowerCase().match(regex))
    }else{
      this.getPartidas(this.inventario!.id_inventario)
    }
  }

}
