import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientosService } from 'src/app/HttpServices/movimientos.service';
import { UsuariosService } from 'src/app/HttpServices/usuarios.service';
import { movimiento, movimiento_partida } from 'src/app/Interfaces/movimientos.interface';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {

  comentario:string | undefined;
  nombre:string | undefined;

  constructor(
    public dialogRef: MatDialogRef<MovimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: movimiento_partida,
    private ms:MovimientosService,
    private us:UsuariosService
  ) { }

  ngOnInit(): void {
    this.getMovimiento();
  }

  getMovimiento(){
    this.ms.get(this.data.id_movimeinto).subscribe(
      res => {
        this.comentario = res.comentario;
        this.getNombreUsuario(res.fk_id_usuario)
      },
      err => console.log(err)
    );
  }

  getNombreUsuario(idu:number){
    this.us.getUsuario(idu).subscribe(
      res => {
        this.nombre = res.nombre+' '+res.apellidos
      }
    );
  }

}
