import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosComponent } from './ContratosComponents/contratos/contratos.component';
import { NuevoContratoComponent } from './ContratosComponents/nuevo-contrato/nuevo-contrato.component';
import { ContratoComponent } from "./ContratosComponents/contrato/contrato.component";
import { InventarioComponent } from "./InventariosComponents/inventario/inventario.component";
import { InventariosComponent } from "./InventariosComponents/inventarios/inventarios.component";
import { CrearInventarioComponent } from './InventariosComponents/crear-inventario/crear-inventario.component';
import { MicuentaComponent } from "./micuenta/micuenta.component";
import { PartidasComponent } from './PartidasComponents/partidas/partidas.component';
import { AgregarPartidaComponent } from './PartidasComponents/agregar-partida/agregar-partida.component';
import { ReportesmaterialComponent } from './ReportesMaterialComponents/reportesmaterial/reportesmaterial.component';
import { NuevoReportematerialComponent } from './ReportesMaterialComponents/nuevo-reportematerial/nuevo-reportematerial.component';
import { ReportematerialComponent } from './ReportesMaterialComponents/reportematerial/reportematerial.component';

const routes: Routes = [
  {path : "contratos", component : ContratosComponent},
  {path : "contratos/nuevo", component : NuevoContratoComponent},
  {path : "contrato/:id", component : ContratoComponent},
  {path : "contrato/reportesmaterial/:id", component : ReportesmaterialComponent},
  {path : "contrato/reportematerial/:id", component : ReportematerialComponent},
  {path : "contrato/reportesmaterial/nuevo/:id", component : NuevoReportematerialComponent},
  {path : "inventarios", component : InventariosComponent},
  {path : "inventario/:id", component : InventarioComponent},
  {path : "inventario/partidas/agregar/:id", component : AgregarPartidaComponent},
  {path : "micuenta", component : MicuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
