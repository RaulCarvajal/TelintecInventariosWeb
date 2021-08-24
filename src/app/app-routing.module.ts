import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosComponent } from './ContratosComponents/contratos/contratos.component';
import { NuevoContratoComponent } from './ContratosComponents/nuevo-contrato/nuevo-contrato.component';
import { ContratoComponent } from "./ContratosComponents/contrato/contrato.component";
import { InventariosComponent } from "./InventariosComponents/inventarios/inventarios.component";
import { MicuentaComponent } from "./micuenta/micuenta.component";
import { PartidasComponent } from './PartidasComponents/partidas/partidas.component';
import { PartidaComponent } from './PartidasComponents/partida/partida.component';
import { AgregarPartidaComponent } from './PartidasComponents/agregar-partida/agregar-partida.component';
import { ReportesmaterialComponent } from './ReportesMaterialComponents/reportesmaterial/reportesmaterial.component';
import { ReportesmaterialcontratoComponent } from './ReportesMaterialComponents/reportesmaterialcontrato/reportesmaterialcontrato.component';
import { NuevoReportematerialComponent } from './ReportesMaterialComponents/nuevo-reportematerial/nuevo-reportematerial.component';
import { ReportematerialComponent } from './ReportesMaterialComponents/reportematerial/reportematerial.component';
import { InventariokpiComponent } from "./inventariokpi/inventariokpi.component";
import { AreasContratoComponent } from './AreasComponents/areas-contrato/areas-contrato.component';
import { AreaComponent } from './AreasComponents/area/area.component';
import { NuevaAreaComponent } from './AreasComponents/nueva-area/nueva-area.component';
import { LoginComponent } from "./login/login.component";
import { UsuariosComponent } from './UsuariosComponent/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './UsuariosComponent/nuevo-usuario/nuevo-usuario.component';
import { UsuarioComponent } from './UsuariosComponent/usuario/usuario.component';

const routes: Routes = [
  {path : "", component : InventariokpiComponent},
  {path : "login", component : LoginComponent},
  {path : "contratos", component : ContratosComponent},
  {path : "contratos/nuevo", component : NuevoContratoComponent},
  {path : "contrato/:id", component : ContratoComponent},
  {path : "contrato/areas/:id", component : AreasContratoComponent},
  {path : "contrato/areas/area/:id", component : AreaComponent},
  {path : "contrato/areas/nueva/:id", component : NuevaAreaComponent},
  {path : "contrato/reportesmaterial/:id", component : ReportesmaterialcontratoComponent},
  {path : "contrato/reportematerial/:id", component : ReportematerialComponent},
  {path : "contrato/reportesmaterial/nuevo/:id", component : NuevoReportematerialComponent},
  {path : "inventarios", component : InventariosComponent},
  {path : "inventario/partidas", component : PartidasComponent},
  {path : "inventario/partida/:id", component : PartidaComponent},
  {path : "inventario/partidas/agregar", component : AgregarPartidaComponent},
  {path : "reportes", component : ReportesmaterialComponent},
  {path : "reportes/nuevo", component : NuevoReportematerialComponent},
  {path : "micuenta", component : MicuentaComponent},
  {path : "usuarios", component : UsuariosComponent},
  {path : "usuarios/nuevo", component : NuevoUsuarioComponent},
  {path : "usuario/:id", component : UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
