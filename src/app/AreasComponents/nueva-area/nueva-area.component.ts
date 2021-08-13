import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/HttpServices/areas.service';
import { rgx } from 'src/app/Validators/regex.validator';

@Component({
  selector: 'app-nueva-area',
  templateUrl: './nueva-area.component.html',
  styleUrls: ['./nueva-area.component.css']
})
export class NuevaAreaComponent implements OnInit {

  formArea!:FormGroup;
  idc:number;
  saving:boolean = false;

  constructor(
    private fb:FormBuilder,
    private ar:ActivatedRoute,
    private as:AreasService
  ) { 
    this.idc = +this.ar.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formArea = this.fb.group({
      numero_pedido : ['',[Validators.required]],
      solicitante : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(rgx.white_space)]],
      usuarios : ['',[Validators.required,Validators.maxLength(100),Validators.pattern(rgx.white_space)]],
      coordinador : ['',[Validators.required,Validators.maxLength(50),Validators.pattern(rgx.white_space)]],
      area : ['',[Validators.required,Validators.maxLength(100),Validators.pattern(rgx.white_space)]],
      descripcion : ['',[Validators.required,Validators.maxLength(150),Validators.pattern(rgx.white_space)]],
      fk_id_contrato : [this.idc,[Validators.required]]
    });
  }

  trySave(){
    this.saving = true;
    this.as.guardarArea(this.formArea.value).subscribe(
      res => {
        this.saving = false;
        window.history.back();
      },err => console.log(err)
    );
  }

}
