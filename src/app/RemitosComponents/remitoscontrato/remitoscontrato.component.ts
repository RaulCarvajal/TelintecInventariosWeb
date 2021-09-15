import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemitosService } from 'src/app/HttpServices/remitos.service';
import { remito } from 'src/app/Interfaces/remito.interface';

@Component({
  selector: 'app-remitoscontrato',
  templateUrl: './remitoscontrato.component.html',
  styleUrls: ['./remitoscontrato.component.css']
})
export class RemitoscontratoComponent implements OnInit {

  remitos:remito[] = [];
  idc!:number;

  cargando:boolean = true;

  constructor(
    private rs:RemitosService,
    private ar:ActivatedRoute,
    private rt:Router
  ) 
  {
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getRemitos();
  }

  getRemitos(){
    this.rs.getRemitos().subscribe(
      res => {
        this.remitos = res.filter( r => r.fk_id_contrato == this.idc )
        this.cargando = false;
      }
    )
  }

  gotoDetail(idr:number){
    this.rt.navigateByUrl(`/contrato/remito/${idr}`)
  }

}
