import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { ContratoplantaService } from 'src/app/HttpServices/contratoplanta.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { InventariosService } from 'src/app/HttpServices/inventarios.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { ReportesService } from 'src/app/HttpServices/reportes.service';
import { area } from 'src/app/Interfaces/area.interface';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { contrato_planta_text } from 'src/app/Interfaces/contrato_planta.interface';
import { partida } from 'src/app/Interfaces/partida.interface';
import { reporte_partida } from 'src/app/Interfaces/reporte_partida.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nuevo-reportematerial',
  templateUrl: './nuevo-reportematerial.component.html',
  styleUrls: ['./nuevo-reportematerial.component.css']
})
export class NuevoReportematerialComponent implements OnInit {

  idc!:number;
  formPedido!:FormGroup;
  contratos:contrato[]|undefined;
  areas:area[]=[];
  contrato_plantas:contrato_planta_text[]=[];
  partidas:partida[]=[];
  iterabl:any[]=[0];
  guardando:boolean = false;

  constructor(
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private cs:ContratosService,
    private as:AreasService,
    private cps:ContratoplantaService,
    private ps:PartidasService,
    private rs:ReportesService
  ) { 
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getContratos();
    this.getAreasPorContrato(this.idc);
    this.getContratoPlantas(this.idc);
    this.getPartidas(this.idc)
    this.initForm();
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
      partidas : this.fb.array([])
    });
    this.formPedido.controls['fk_id_contrato'].disable();
  }

  trySave(){
    this.guardando = true;
    this.formPedido.value.fecha = this.formPedido.value.fecha.toISOString();
    let rp:reporte_partida[] = <reporte_partida[]>this.formPedido.value.partidas;
    this.formPedido.value.partidas = rp.filter( p => p.cantidad! > 0);
    this.formPedido.value.fk_id_contrato = this.idc;
    this.rs.guardar(this.formPedido.value).subscribe(
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

  getContratoPlantas(idc:number){
    this.cps.getContratoPlantasByContratoId(idc).subscribe(
      res => this.contrato_plantas = res,
      err => console.log(err)
    )
  }

  getPartidas(idc:number){
      this.ps.getPartidasPorContrato(idc).subscribe(
        res => {
          this.partidas = res;
          this.partidas.forEach( p => {
            this.addPartida(p.id_partida)
          });
        },
        err => console.log(err)
      );
  }

  private addPartida(id_partida:number){
    const cntrs = <FormArray>this.formPedido.controls['partidas'];
    cntrs.push(this.fb.group(
      {
        fk_id_partida : [id_partida,[Validators.required]],
        cantidad : [0,[Validators.required]]
      }
    ));
  }

  get partidasForm(){
    return this.formPedido.controls['partidas'] as FormArray;
  }

}

