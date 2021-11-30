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
import { CambiosPartidaComponent } from './PartidasComponents/cambios-partida/cambios-partida.component';
import { EppComponent } from './EppComponents/epp/epp.component';
import { EppDetalleComponent } from './EppComponents/epp-detalle/epp-detalle.component';
import { EppAgregarComponent } from './EppComponents/epp-agregar/epp-agregar.component';
import { EppSolicitudesComponent } from './EppComponents/epp-solicitudes/epp-solicitudes.component';
import { EppSolicitudComponent } from './EppComponents/epp-solicitud/epp-solicitud.component';
import { MovimientoComponent } from "./MovimientosComponents/movimiento/movimiento.component";
import { NoautorizadoComponent } from './ErrorPagesComponents/noautorizado/noautorizado.component';
import { SolicitudesmaterialComponent } from './SolicitudesMaterialComponents/solicitudesmaterial/solicitudesmaterial.component';
import { SolicitudmaterialComponent } from './SolicitudesMaterialComponents/solicitudmaterial/solicitudmaterial.component';
import { NuevaSolicitudmaterialComponent } from './SolicitudesMaterialComponents/nueva-solicitudmaterial/nueva-solicitudmaterial.component';
import { NuevoReportesolicitudComponent } from './ReportesMaterialComponents/nuevo-reportesolicitud/nuevo-reportesolicitud.component';
import { RemitoComponent } from './RemitosComponents/remito/remito.component';
import { RemitosComponent } from './RemitosComponents/remitos/remitos.component';
import { RemitoscontratoComponent } from './RemitosComponents/remitoscontrato/remitoscontrato.component';
import { ContratoPartidasComponent } from './PartidasComponents/contrato-partidas/contrato-partidas.component';
import { AddPartidasContratoComponent } from './PartidasComponents/add-partidas-contrato/add-partidas-contrato.component';
import { ServiciosContratoComponent } from './ServiciosComponents/servicios-contrato/servicios-contrato.component';
import { SolicitudesContratoComponent } from './SolicitudesMaterialComponents/solicitudes-contrato/solicitudes-contrato.component';


const routes: Routes = [
  {path : "", component : InventariokpiComponent},
  {path : "error403", component : NoautorizadoComponent},
  {path : "login", component : LoginComponent},
  {path : "contratos", component : ContratosComponent},
  {path : "contratos/nuevo", component : NuevoContratoComponent},
  {path : "contrato/:id", component : ContratoComponent},
  {path : "contrato/areas/:id", component : AreasContratoComponent},
  {path : "contrato/areas/area/:id", component : AreaComponent},
  {path : "contrato/areas/nueva/:id", component : NuevaAreaComponent},
  {path : "contrato/reportesmaterial/:id", component : ReportesmaterialcontratoComponent},
  {path : "contrato/reportematerial/:id", component : ReportematerialComponent},
  {path : "contrato/partidas/:id", component : ContratoPartidasComponent},
  {path : "contrato/partidas/agregar/:id", component : AddPartidasContratoComponent},
  {path : "contrato/servicios/:id", component : ServiciosContratoComponent},
  {path : "contrato/remito/:id", component : RemitoComponent},
  {path : "contrato/remitos/:id", component : RemitoscontratoComponent},
  {path : "contrato/solicitudes/:id", component : SolicitudesContratoComponent},
  {path : "contrato/reportesmaterial/nuevo/:id", component : NuevoReportematerialComponent},
  {path : "inventarios", component : InventariosComponent},
  {path : "inventario/partidas", component : PartidasComponent},
  {path : "inventario/partida/:id", component : PartidaComponent},
  {path : "inventario/partida/:id/cambios", component : CambiosPartidaComponent},
  {path : "inventario/partida/moviento/:id", component : MovimientoComponent},
  {path : "inventario/partidas/agregar", component : AgregarPartidaComponent},
  {path : "reportes", component : ReportesmaterialComponent},
  {path : "remitos", component : RemitosComponent},
  {path : "reportes/nuevo", component : NuevoReportematerialComponent},
  {path : "inventario/epp", component : EppComponent},
  {path : "inventario/epp/solicitudes", component : EppSolicitudesComponent},
  {path : "inventario/epp/nuevo", component : EppAgregarComponent},
  {path : "inventario/epp/:id", component : EppDetalleComponent},
  {path : "inventario/epp/solicitud/:id", component : EppSolicitudComponent},
  {path : "micuenta", component : MicuentaComponent},
  {path : "usuarios", component : UsuariosComponent},
  {path : "usuarios/nuevo", component : NuevoUsuarioComponent},
  {path : "usuario/:id", component : UsuarioComponent},
  {path : "material/solicitudes", component : SolicitudesmaterialComponent},
  {path : "material/solicitud/nueva", component : NuevaSolicitudmaterialComponent},
  {path : "material/solicitud/:id", component : SolicitudmaterialComponent},
  {path : "material/solicitud/reporte/:id", component : NuevoReportesolicitudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
