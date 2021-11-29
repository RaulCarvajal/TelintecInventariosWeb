import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../HttpServices/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm!:FormGroup;
  try:number=0;
  trying:boolean = false;
  failed:boolean = false;

  constructor(
    private fb:FormBuilder,
    private rt:Router,
    private us:UsuarioService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.redirect();
  }

  initForm(){
    this.logForm = this.fb.group({
      usr : ['',[Validators.required,Validators.email]],
      pwd : ['',[Validators.required]]
    });
  }

  tryLogin(){
    this.trying = true;
    this.failed = false;
    let trying = this.logForm.value;

    this.us.login(trying).subscribe(
      res => {
        this.trying = false;
        if(res.email){
          this.us.saveSession(res);
          this.rt.navigateByUrl('');
        }else{
          this.trying = false;
          this.failed = true;
          this.try++;
        }
      },
      err => {
        this.trying = false;
        this.failed = true;
        this.try++;
      }
    );

    /*setTimeout(() => {
      if(this.logForm.value.usr==='raul.crvjl@gmail.com' && this.logForm.value.pwd==='admin'){
        this.trying = false;
        this.rt.navigateByUrl('/');
      }else{
        this.trying = false;
        this.failed = true;
        this.try++;
      }
    }, 3000);*/
  }

  redirect(){
    if(this.us.loged()){
      this.rt.navigateByUrl('/')
    }
  }
}
