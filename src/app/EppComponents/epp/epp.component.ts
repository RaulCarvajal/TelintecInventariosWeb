import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EppService } from 'src/app/HttpServices/epp.service';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { epp } from 'src/app/Interfaces/epp.interface';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';

@Component({
  selector: 'app-epp',
  templateUrl: './epp.component.html',
  styleUrls: ['./epp.component.css']
})
export class EppComponent implements AfterViewInit {

  partidas:partida_datatable[] = [];
  cargando:boolean = true;

  epp:epp[]=[];

  displayedColumns: string[] = ['id_epp', 'nombre', 'tipo', 'marca','cantidad'];
  dataSource!: MatTableDataSource<epp>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private ps:PartidasService,
    private rt:Router,
    private es:EppService
  ){
    
  }

  ngAfterViewInit():void {
    this.getEpp();
    this.paginator._intl.itemsPerPageLabel = "Artículos por página"
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoEpp(row:any){
    this.rt.navigateByUrl(`/inventario/epp/${row}`);
  }


  async getEpp(){
    let res = await this.es.getAll();
    this.epp = <epp[]>res;
    this.dataSource = new MatTableDataSource(this.epp);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}