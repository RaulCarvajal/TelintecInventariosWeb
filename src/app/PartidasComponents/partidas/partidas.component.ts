import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { partida_datatable } from 'src/app/Interfaces/partida.interface';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent implements AfterViewInit   {

  partidas:partida_datatable[] = [];
  cargando:boolean = true;

  displayedColumns: string[] = [ 'nombre', 'descripcion', 'numero_parte', 'marca','cantidad'];
  dataSource!: MatTableDataSource<partida_datatable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private ps:PartidasService,
    private rt:Router
  ){}

  async getPartidas(){
    let res = await this.ps.getPartidas();
    this.partidas = <partida_datatable[]>res;
    this.dataSource = new MatTableDataSource(this.partidas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit():void {
    this.getPartidas();
    this.paginator._intl.itemsPerPageLabel = "Partidas por página"
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

  gotoPartida(row:any){
    this.rt.navigateByUrl(`/inventario/partida/${row}`);
  }

}
