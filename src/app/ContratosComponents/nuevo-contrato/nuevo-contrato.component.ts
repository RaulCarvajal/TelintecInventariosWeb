import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PlantasService } from 'src/app/HttpServices/plantas.service';
import { divisa } from 'src/app/Interfaces/catalogos.interface';
import { contrato_planta } from 'src/app/Interfaces/contrato_planta.interface';
import { rgx } from "../../Validators/regex.validator";
import { contrato } from "./../../Interfaces/contratos.interface";
@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styleUrls: ['./nuevo-contrato.component.css']
})
export class NuevoContratoComponent implements OnInit {


  constructor(
    private fb:FormBuilder,
    private cs:ContratosService,
    private ps:PlantasService,
    private cps:ContratoplantaService,
    private sb:MatSnackBar,
    private ct:CatalogosService
  ) { 
    this.getPlantas();
    this.getDivisas();
  }

  ngOnInit(): void {
    this.initForm();
  }

  plantas:any[]=[];
  divisas:divisa[]=[];
  formContrato!: FormGroup;
  cargando:boolean = true;
 
  initForm(){
    this.formContrato = this.fb.group({
      nombre : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      nompre_proyecto : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      numero_contrato : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(rgx.white_space)]],
      descripcion : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      fecha_inicio : ['',[Validators.required]],
      fecha_final : ['',[Validators.required]],
      estatus : [true,[]],
      fk_id_planta : ['',[Validators.required]],
      monto_total : ['',[Validators.required]],
      monto_actual : ['',[Validators.required]],
      fk_id_divisa : ['',[Validators.required]]
    })
    this.formContrato.disable();
  }

  trySave(){
    this.saveContrato();
  }

  saveContrato(){
    this.cargando = true;
    this.formContrato.value.fecha_inicio = <Date>this.formContrato?.value.fecha_inicio.toISOString();
    this.formContrato.value.fecha_final = <Date>this.formContrato?.value.fecha_final.toISOString();
    let formdata:contrato = this.formContrato?.value;
    let plantas:number[] = formdata.fk_id_planta;
    formdata.fk_id_planta = null;
    this.cs.saveContrato(formdata).subscribe(
      res => {
        this.saveContratoPlantas(res.id_contrato,plantas)
        this.cargando = false;
        this.sb.open(`¡Contrato ${res.nombre} guardado!`,"Regresando",{duration:3000});
        window.history.back();
      },
      err => console.log(err)
    )
  }

  getPlantas(){
    this.ps.getPlantas().subscribe(
      res => {
        this.plantas =<any>res;
        this.cargando = false;
        this.formContrato.enable();
      },
      err => {
        console.log(err)
      } 
    );
  }

  getDivisas(){
    this.ct.divisas().subscribe(
      res => {
        this.divisas = res;
      },
      err => console.log(err)
    );
  }

  async saveContratoPlantas(id_contrato:number,plantas:number[]){
    for await (const id_planta of plantas) {
      let cpd = {fk_id_contrato : id_contrato, fk_id_planta : id_planta}
      await this.cps.saveContratoPlanta(<contrato_planta>cpd);
    }
  }

}
