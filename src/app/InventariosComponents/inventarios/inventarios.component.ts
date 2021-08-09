import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventariosService } from 'src/app/HttpServices/inventarios.service';
import { inventario } from 'src/app/Interfaces/inventario.interface';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  inventarios:inventario[]=[];

  constructor(
    private rt:Router,
    private is:InventariosService
  ) { }

  ngOnInit(): void {
    this.getInventarios();
  }

  getInventarios(){
    this.is.getInventarios().subscribe(
      res => {
        this.inventarios = res;
      }, err => console.log(err)
    );
  }

  gotoDetail(id:number){
    this.rt.navigateByUrl('/inventario/inv/'+id)
  }

}
