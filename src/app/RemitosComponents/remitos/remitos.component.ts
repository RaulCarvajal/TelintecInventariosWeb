import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RemitosService } from 'src/app/HttpServices/remitos.service';
import { remito } from 'src/app/Interfaces/remito.interface';

@Component({
  selector: 'app-remitos',
  templateUrl: './remitos.component.html',
  styleUrls: ['./remitos.component.css']
})
export class RemitosComponent implements OnInit {

  remitos:remito[] = [];

  cargando:boolean = true;

  constructor(
    private rs:RemitosService,
    private rt:Router
  ) {}

  ngOnInit(): void {
    this.getRemitos();
  }

  getRemitos(){
    this.rs.getRemitos().subscribe(
      res => {
        this.remitos = res
        this.cargando = false;
      }
    )
  }

  gotoDetail(idr:number){
    this.rt.navigateByUrl(`/contrato/remito/${idr}`)
  }

}
