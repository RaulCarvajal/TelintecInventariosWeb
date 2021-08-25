import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  constructor(
    private ts:Title
  ) { }

  ngOnInit(): void {
    this.ts.setTitle('SGAT - Inventarios')
  }
}
