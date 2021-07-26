import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  constructor(
    private rt:Router
  ) { }

  ngOnInit(): void {
  }

  gotoDetail(){
    this.rt.navigateByUrl('/inventario/1')
  }

}
