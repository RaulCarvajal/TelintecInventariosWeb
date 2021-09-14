import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { ContratosService } from 'src/app/HttpServices/contratos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { RemitosService } from 'src/app/HttpServices/remitos.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { contrato } from 'src/app/Interfaces/contratos.interface';
import { partida_remito } from 'src/app/Interfaces/partida.interface';
import { PosPipe } from 'src/app/Pipes/pos.pipe';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-dialog-remitosolicitud',
  templateUrl: './dialog-remitosolicitud.component.html',
  styleUrls: ['./dialog-remitosolicitud.component.css']
})
export class DialogRemitosolicitudComponent implements OnInit {

  partidas:partida_remito[]=[];
  subtotal:number = 0;
  iva:number = 0;
  contrato:contrato|undefined;
  divisa:string = 'MXN';
  guardando:boolean = false;
  formRemito!:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogRemitosolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data,
    private ps:PartidasService,
    private cs:ContratosService,
    private dp:DatePipe,
    private cp:CurrencyPipe,
    private pp:PosPipe,
    private cts:CatalogosService,
    private fb:FormBuilder,
    private rs:RemitosService,
    private sbs:SnackbarService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPartidasMaterial();
    this.getContrato(this.data.fk_id_contrato);
  }

  initForm(){
    this.formRemito = this.fb.group({
      remision : ['',[Validators.required,Validators.pattern(rgx.white_space)]],
      remito : ['',[Validators.required,Validators.pattern(rgx.white_space)]],
      numero_pedido : ['',[Validators.required,Validators.pattern(rgx.integersp)]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async getPartidasMaterial(){
    for await (let ids of this.data.partidas) {
      let res = await this.ps.getPartidasMaterialRemito(ids)
      this.subtotal+=<number>res.total;
      res.POS = this.pp.transform(res.POS)
      res.PU = <string>this.cp.transform(res.PU,this.divisa)
      res.total = <string>this.cp.transform(res.total,this.divisa)
      this.partidas.push(res)
    }
    this.getPartidasServicios();
  }

  async getPartidasServicios(){
    for await (let ids of this.data.servicios) {
      let res = await this.ps.getPartidasServicioRemito(ids)
      this.subtotal+=<number>res.total;
      res.POS = this.pp.transform(res.POS)
      res.PU = <string>this.cp.transform(res.PU,this.divisa)
      res.total = <string>this.cp.transform(res.total,this.divisa)
      this.partidas.push(res)
    }
    this.iva = 0.16*this.subtotal;
    this.partidas.sort((a,b)=> a.POS>b.POS?1:-1)
  }

  getContrato(idc:number){
    this.cs.getContrato(idc).subscribe(
      res =>{
        this.contrato = res
        this.getDivisa(this.contrato.fk_id_divisa)
      }
    )
  }
  getDivisa(idd:number){
    this.cts.divisa(idd).subscribe(
      res => this.divisa = res.divisa_iso
    )
  }
  save(){
    this.guardando=true;
    let data:any = {
      fecha : new Date().toISOString(),
      remision : this.formRemito.value.remision,
      remito : this.formRemito.value.remito,
      proyecto : this.contrato?.nompre_proyecto,
      descripcion : this.contrato?.descripcion,
      numero_contrato : this.contrato?.numero_contrato,
      numero_pedido : this.formRemito.value.numero_pedido,
      divisa : this.divisa,
      partidas : this.partidas,
      total : this.iva + this.subtotal,
      subtotal : this.subtotal,
      iva : this.iva,
      fk_id_contrato : this.data.fk_id_contrato,
      fk_id_solicitud : this.data.fk_id_solicitud
    }

    this.rs.save(data).subscribe(
      res => {
        if(res.err){
          this.sbs.alert('Ocurrio un error durante la tarea, intente más tarde!')
          window.location.reload();
          this.guardando = false;
        }else{
          this.sbs.alert(res.msg);
          data.fecha = this.dp.transform(data.fecha);
          data.total = this.cp.transform(data.total,this.divisa);
          data.subtotal = this.cp.transform(data.subtotal,this.divisa);
          data.iva = this.cp.transform(data.iva,this.divisa);
          this.rs.generRemitoPdf(data);
          this.onNoClick();
        }
      }, err =>{
        this.sbs.alert('Ocurrio un error durante la tarea, intente más tarde!')
        window.location.reload();
        this.guardando = false;
      }
    )
  }

}

interface data {
  partidas : number[],
  servicios : number[],
  fk_id_contrato : number,
  numero_pedido : number,
  fk_id_solicitud : number
}