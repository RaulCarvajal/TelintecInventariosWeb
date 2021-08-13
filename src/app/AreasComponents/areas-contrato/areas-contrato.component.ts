import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { area } from 'src/app/Interfaces/area.interface';

@Component({
  selector: 'app-areas-contrato',
  templateUrl: './areas-contrato.component.html',
  styleUrls: ['./areas-contrato.component.css']
})
export class AreasContratoComponent implements OnInit {

  idc:number = 0;
  areas:area[]=[];

  constructor(
    private as:AreasService,
    private ar:ActivatedRoute
  ) { 
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getAreasContrato(this.idc);
  }

  getAreasContrato(idc:number){
    this.as.getAreasPorContrato(idc).subscribe(
      res => {this.areas = res; console.log(res)}
    );
  }

}
