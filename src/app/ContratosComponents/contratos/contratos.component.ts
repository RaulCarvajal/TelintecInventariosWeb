import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  hoy:string =  new Date().toISOString();

  constructor() { }

  ngOnInit(): void {
  }



}