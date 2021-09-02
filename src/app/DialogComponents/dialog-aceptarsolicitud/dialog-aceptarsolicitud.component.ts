import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { SolicitudesMaterialService } from 'src/app/HttpServices/solicitudes-material.service';

@Component({
  selector: 'app-dialog-aceptarsolicitud',
  templateUrl: './dialog-aceptarsolicitud.component.html',
  styleUrls: ['./dialog-aceptarsolicitud.component.css']
})
export class DialogAceptarsolicitudComponent implements OnInit {

  constructor(
    private sms:SolicitudesMaterialService,
    private sbs:SnackbarService,
    public dialogRef: MatDialogRef<DialogAceptarsolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
  }

  setAceptar(id:number){
    this.sms.setAutorizado(id).subscribe(
      res => {
        if(res.error){
          this.sbs.alert(res.msg,1)
        }else{
          this.sbs.alert(res.msg,3);
        }
        this.onNoClick();
      },
      err => console.log(err)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
