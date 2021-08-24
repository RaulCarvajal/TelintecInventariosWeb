import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogosService } from 'src/app/HttpServices/catalogos.service';
import { SnackbarService } from 'src/app/HttpServices/snackbar.service';
import { UsuariosService } from 'src/app/HttpServices/usuarios.service';
import { puesto } from 'src/app/Interfaces/puesto.interface';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  formUser!:FormGroup;
  puestos:puesto[] = [];
  cargando:boolean = false;

  constructor(
    private fb:FormBuilder,
    private cs:CatalogosService,
    private sbs:SnackbarService,
    private us:UsuariosService,
    private rt:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPuestos();
  }

  initForm(){
    this.formUser = this.fb.group({
      nombre : ['',[Validators.required,Validators.maxLength(75),Validators.pattern(rgx.white_space)]],
      apellidos : ['',[Validators.required,Validators.maxLength(75),Validators.pattern(rgx.white_space)]],
      email : ['',[Validators.required,Validators.maxLength(50),Validators.email]],
      numero_empleado : [null,[Validators.maxLength(20),Validators.pattern(rgx.white_space)]],
      //contrasena : ['',[Validators.required,Validators.maxLength(20),Validators.pattern(rgx.white_space)]],
      fk_id_puesto : ['',[Validators.required]],
      rol : ['',[Validators.required]]
    });
  }

  save(){
    this.cargando = true
    this.formUser.value.contrasena = this.getPassword();
    let data = this.formUser.value;
    data.estatus = true;
    data.fecha_registro = new Date().toISOString();
    this.us.existe_email(data.email).subscribe(
      res => {
        if(res.email){
          this.sbs.alert("Este correo ya fue previamente registrado.")
          this.cargando = false;
        }else{
          this.us.save(data).subscribe(
            res =>{
              this.sbs.alert(`Usuario creado correctamente, la contraseña asignada es la siguiente ${data.contrasena}`)
              window.history.back();
              this.cargando = false;
            },err =>{
              this.sbs.alert("Ocurrio un error, intentelo más tarde.")
              this.cargando = false;
            }
          );
        }
        
      },
      err => {
        this.sbs.alert("Ocurrio un error, intentelo más tarde.")
        this.cargando = false;
      }
    );
    
  }

  getPuestos(){
    this.cs.puestos().subscribe(
      res => this.puestos = res,
      err => console.log(err)
    );
  }

  getPassword():string{
    let nombre:string = this.formUser.value.nombre;
    let apellidos:string = this.formUser.value.apellidos;
    return `${nombre.substr(0,3).toLowerCase()}${apellidos.substr(0,3).toLowerCase()}${new Date().getMinutes()}`
  }

}
