import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosComponent } from './ContratosComponents/contratos/contratos.component';
import { NuevoContratoComponent } from './ContratosComponents/nuevo-contrato/nuevo-contrato.component';
import { ContratoComponent } from "./ContratosComponents/contrato/contrato.component";
import { InventarioComponent } from "./InventariosComponents/inventario/inventario.component";
import { InventariosComponent } from "./InventariosComponents/inventarios/inventarios.component";
import { MicuentaComponent } from "./micuenta/micuenta.component";
import { PartidasComponent } from './PartidasComponents/partidas/partidas.component';
import { AgregarPartidaComponent } from './PartidasComponents/agregar-partida/agregar-partida.component';
import { ReportesmaterialComponent } from './ReportesMaterialComponents/reportesmaterial/reportesmaterial.component';
import { NuevoReportematerialComponent } from './ReportesMaterialComponents/nuevo-reportematerial/nuevo-reportematerial.component';
import { ReportematerialComponent } from './ReportesMaterialComponents/reportematerial/reportematerial.component';
import { InventariokpiComponent } from "./inventariokpi/inventariokpi.component";
import { AreasContratoComponent } from './AreasComponents/areas-contrato/areas-contrato.component';
import { AreaComponent } from './AreasComponents/area/area.component';
import { NuevaAreaComponent } from './AreasComponents/nueva-area/nueva-area.component';

const routes: Routes = [
  {path : "", component : InventariokpiComponent},
  {path : "contratos", component : ContratosComponent},
  {path : "contratos/nuevo", component : NuevoContratoComponent},
  {path : "contrato/:id", component : ContratoComponent},
  {path : "contrato/areas/:id", component : AreasContratoComponent},
  {path : "contrato/areas/area/:id", component : AreaComponent},
  {path : "contrato/areas/nueva/:id", component : NuevaAreaComponent},
  {path : "contrato/reportesmaterial/:id", component : ReportesmaterialComponent},
  {path : "contrato/reportematerial/:id", component : ReportematerialComponent},
  {path : "contrato/reportesmaterial/nuevo/:id", component : NuevoReportematerialComponent},
  {path : "inventarios", component : InventariosComponent},
  {path : "inventario/partidas/:id", component : PartidasComponent},
  {path : "inventario/:origin/:id", component : InventarioComponent},
  {path : "inventario/partidas/agregar/:id", component : AgregarPartidaComponent},
  {path : "micuenta", component : MicuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
