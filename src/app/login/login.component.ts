import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private rt:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
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
    trying.date = new Date().toISOString();
    setTimeout(() => {
      if(this.logForm.value.usr==='raul.crvjl@gmail.com' && this.logForm.value.pwd==='admin'){
        this.trying = false;
        this.rt.navigateByUrl('/');
      }else{
        this.trying = false;
        this.failed = true;
        this.try++;
      }
    }, 3000);
  }

}
