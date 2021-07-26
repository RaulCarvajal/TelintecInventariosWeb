import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-contrato',
  templateUrl: './nuevo-contrato.component.html',
  styleUrls: ['./nuevo-contrato.component.css']
})
export class NuevoContratoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  plantas:any[]=["Guerrero","Churubusco","Pesqueria","Universidad","Juventud","Largos Norte","CSI - Apodaca"];
}
