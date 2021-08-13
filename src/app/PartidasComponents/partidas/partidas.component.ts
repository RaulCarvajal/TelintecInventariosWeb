import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { MovimientosService } from 'src/app/HttpServices/movimientos.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { marca, proveedor, um } from 'src/app/Interfaces/catalogos.interface';
import { movimiento_partida } from 'src/app/Interfaces/movimientos.interface';
import { partida } from 'src/app/Interfaces/partida.interface';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent implements OnInit {

  id:number|undefined;
  partida!:partida;
  ldng:boolean = true;

  marca:marca|undefined;
  proveedor:proveedor|undefined;
  unidad:um|undefined;
  
  movimientos:movimiento_partida[] = [];

  constructor(
    private ar:ActivatedRoute,
    private ps:PartidasService,
    private cs:CatalogosService,
    private ms:MovimientosService
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getPartida(this.id!);
  }

  getPartida(id:number){
    this.ldng = true;
    this.ps.getPartida(id).subscribe(
      res=> {
        this.partida = res;
        this.getMarca(this.partida.fk_id_marca)
        this.getProveedor(this.partida.fk_id_proveedor)
        this.getUnidad(this.partida.fk_id_unidad_medida)
        this.getMovimientos(this.partida.id_partida)
        this.ldng = false;
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

  getMovimientos(id:number){
    this.ms.getMovimientosPorPartida(id).subscribe(
      res => this.movimientos = res
    );
  }

}
