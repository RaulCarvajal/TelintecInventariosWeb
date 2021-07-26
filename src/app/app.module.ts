import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';
registerLocaleData(localeEsMX, 'es-MX');

//Imports Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
//Imports Angular Material

//Componentes de la app
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContratosComponent } from './ContratosComponents/contratos/contratos.component';
import { NuevoContratoComponent } from './ContratosComponents/nuevo-contrato/nuevo-contrato.component';
import { ContratoComponent } from './ContratosComponents/contrato/contrato.component';
import { InventariosComponent } from './InventariosComponents/inventarios/inventarios.component';
import { InventarioComponent } from './InventariosComponents/inventario/inventario.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { PartidasComponent } from './PartidasComponents/partidas/partidas.component';
import { AgregarPartidaComponent } from './PartidasComponents/agregar-partida/agregar-partida.component';
import { CrearInventarioComponent } from './InventariosComponents/crear-inventario/crear-inventario.component';
import { ReportesmaterialComponent } from './ReportesMaterialComponents/reportesmaterial/reportesmaterial.component';
import { NuevoReportematerialComponent } from './ReportesMaterialComponents/nuevo-reportematerial/nuevo-reportematerial.component';
import { ReportematerialComponent } from './ReportesMaterialComponents/reportematerial/reportematerial.component';
//Componentes de la app
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ContratosComponent,
    NuevoContratoComponent,
    ContratoComponent,
    InventariosComponent,
    InventarioComponent,
    MicuentaComponent,
    PartidasComponent,
    AgregarPartidaComponent,
    CrearInventarioComponent,
    ReportesmaterialComponent,
    NuevoReportematerialComponent,
    ReportematerialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    MatNativeDateModule,
    MatDatepickerModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
