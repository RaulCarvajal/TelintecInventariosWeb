import { Component, OnInit } from '@angular/core';
import { EppService } from 'src/app/HttpServices/epp.service';
import { epp_sol } from 'src/app/Interfaces/epp.interface';

@Component({
  selector: 'app-epp-solicitudes',
  templateUrl: './epp-solicitudes.component.html',
  styleUrls: ['./epp-solicitudes.component.css']
})
export class EppSolicitudesComponent implements OnInit {

  solicitudes:epp_sol[]=[];
  constructor(
    private eps:EppService
  ) { }

  ngOnInit(): void {
    this.getSolicitudesEpp();
  }

  getSolicitudesEpp(){
    this.eps.getEppSolicitudesAdmin().subscribe(
      res => {
        this.solicitudes = res;
      },
      err => console.log(err)
    );
  }
}
