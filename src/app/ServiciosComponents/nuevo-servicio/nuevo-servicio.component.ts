import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/HttpServices/servicios.service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  formServicio!:FormGroup;

  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<NuevoServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss:ServiciosService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formServicio = this.fb.group({
      POS : ["",[Validators.required]],
      descripcion : ["",[Validators.required,Validators.maxLength(500)]],
      precio_venta : ["",[Validators.required]],
      fk_id_contrato : [this.data.idc,[]],
      fk_id_unidad_medida : [10,[]]
    });
  }

  trySave(){
    console.log(this.formServicio.value)
    this.ss.saveServicio(this.formServicio.value).subscribe(
      res => {
        this.dialogRef.close();
      },err => console.log(err)
    );
  }
  /**
   * pos
   * descripcion
   * precio_venta
   * fk_id_contrato
   */

}
