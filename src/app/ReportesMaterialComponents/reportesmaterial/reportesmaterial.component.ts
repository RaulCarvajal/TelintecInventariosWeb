import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportesmaterial',
  templateUrl: './reportesmaterial.component.html',
  styleUrls: ['./reportesmaterial.component.css']
})
export class ReportesmaterialComponent implements OnInit {

  constructor(
    private rt:Router
  ) { }

  ngOnInit(): void {
  }

  gotoDetail(){
    this.rt.navigateByUrl('/contrato/reportematerial/1')
  }
}
