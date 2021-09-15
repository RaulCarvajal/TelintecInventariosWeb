import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { RemitosService } from 'src/app/HttpServices/remitos.service';
import { remito } from 'src/app/Interfaces/remito.interface';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrls: ['./remito.component.css']
})
export class RemitoComponent implements OnInit {

  idr:number;
  remito:remito|undefined;
  partidas:any[]=[];
  constructor(
    private ar:ActivatedRoute,
    private rs:RemitosService
  ) 
  {
    this.idr = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getRemito(this.idr)
    this.getRemitoPartidas(this.idr)
  }

  getRemito(idr:number){
    this.rs.getRemito(idr).subscribe(
      res => this.remito = res
    );
  }

  getRemitoPartidas(idr:number){
    this.rs.getRemitoPartidas(idr).subscribe(
      res => this.partidas = res
    );
  }

}
