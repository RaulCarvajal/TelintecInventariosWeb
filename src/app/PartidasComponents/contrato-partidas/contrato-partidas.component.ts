import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PartidasService } from 'src/app/HttpServices/partidas.service';
import { partida } from 'src/app/Interfaces/partida.interface';
import { AddPartidasContratoComponent } from "../add-partidas-contrato/add-partidas-contrato.component";

@Component({
  selector: 'app-contrato-partidas',
  templateUrl: './contrato-partidas.component.html',
  styleUrls: ['./contrato-partidas.component.css']
})
export class ContratoPartidasComponent implements OnInit {

  id:number;
  cargando: boolean = true;
  partidas:partida[] = [];

  constructor(
    private ps:PartidasService,
    private ar:ActivatedRoute,
    private dialog:MatDialog
  ) { 
    this.id = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.getPartidas();
  }

  getPartidas(){
    this.ps.getPartidasPorContrato(this.id).subscribe(
      res => {
        this.cargando = false;
        this.partidas = res;
      },
      err => console.log(err)
    )
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddPartidasContratoComponent, {
      width: '75%',
      data: {idc : this.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPartidas();
    });
  }

}
