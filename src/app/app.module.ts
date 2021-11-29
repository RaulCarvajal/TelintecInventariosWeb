import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
//Imports Angular Material

//Charts
import { ChartsModule } from 'ng2-charts';
//Charts

//Pipe Personalizado
import { FolioPipe } from "./Pipes/folio.pipe";
import { PosPipe } from "./Pipes/pos.pipe";
import { EstatusPipe } from "./Pipes/estatus.pipe";
import { RolPipe } from "./Pipes/rol.pipe";
import { DatePipe, CurrencyPipe } from '@angular/common';
//Pipe Personalizado

//Componentes de la app
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContratosComponent } from './ContratosComponents/contratos/contratos.component';
import { NuevoContratoComponent } from './ContratosComponents/nuevo-contrato/nuevo-contrato.component';
import { ContratoComponent } from './ContratosComponents/contrato/contrato.component';
import { InventariosComponent } from './InventariosComponents/inventarios/inventarios.component';
import { MicuentaComponent } from './micuenta/micuenta.component';
import { PartidasComponent } from './PartidasComponents/partidas/partidas.component';
import { AgregarPartidaComponent } from './PartidasComponents/agregar-partida/agregar-partida.component';
import { ReportesmaterialComponent } from './ReportesMaterialComponents/reportesmaterial/reportesmaterial.component';
import { NuevoReportematerialComponent } from './ReportesMaterialComponents/nuevo-reportematerial/nuevo-reportematerial.component';
import { ReportematerialComponent } from './ReportesMaterialComponents/reportematerial/reportematerial.component';
import { InventariokpiComponent } from './inventariokpi/inventariokpi.component';
import { AreasContratoComponent } from './AreasComponents/areas-contrato/areas-contrato.component';
import { AreaComponent } from './AreasComponents/area/area.component';
import { NuevaAreaComponent } from './AreasComponents/nueva-area/nueva-area.component';
import { PartidaComponent } from './PartidasComponents/partida/partida.component';
import { ReportesmaterialcontratoComponent } from './ReportesMaterialComponents/reportesmaterialcontrato/reportesmaterialcontrato.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './UsuariosComponent/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './UsuariosComponent/nuevo-usuario/nuevo-usuario.component';
import { UsuarioComponent } from './UsuariosComponent/usuario/usuario.component';
import { CambiosPartidaComponent } from './PartidasComponents/cambios-partida/cambios-partida.component';
import { EppComponent } from './EppComponents/epp/epp.component';
import { EppDetalleComponent } from './EppComponents/epp-detalle/epp-detalle.component';
import { EppAgregarComponent } from './EppComponents/epp-agregar/epp-agregar.component';
import { EppSolicitudesComponent } from './EppComponents/epp-solicitudes/epp-solicitudes.component';
import { EppSolicitudComponent } from './EppComponents/epp-solicitud/epp-solicitud.component';
import { MovimientoComponent } from './MovimientosComponents/movimiento/movimiento.component';
import { NoautorizadoComponent } from './ErrorPagesComponents/noautorizado/noautorizado.component';
import { SolicitudesmaterialComponent } from './SolicitudesMaterialComponents/solicitudesmaterial/solicitudesmaterial.component';
import { SolicitudmaterialComponent } from './SolicitudesMaterialComponents/solicitudmaterial/solicitudmaterial.component';
import { NuevaSolicitudmaterialComponent } from './SolicitudesMaterialComponents/nueva-solicitudmaterial/nueva-solicitudmaterial.component';
import { DialogAceptarsolicitudComponent } from './DialogComponents/dialog-aceptarsolicitud/dialog-aceptarsolicitud.component';
import { DialogSurtirsolicitudComponent } from './DialogComponents/dialog-surtirsolicitud/dialog-surtirsolicitud.component';
import { NuevoReportesolicitudComponent } from './ReportesMaterialComponents/nuevo-reportesolicitud/nuevo-reportesolicitud.component';
import { DialogOrdencompraComponent } from './DialogComponents/dialog-ordencompra/dialog-ordencompra.component';
import { DialogRemitosolicitudComponent } from './DialogComponents/dialog-remitosolicitud/dialog-remitosolicitud.component';
import { RemitoComponent } from './RemitosComponents/remito/remito.component';
import { RemitosComponent } from './RemitosComponents/remitos/remitos.component';
import { RemitoscontratoComponent } from './RemitosComponents/remitoscontrato/remitoscontrato.component';
import { ContratoPartidasComponent } from './PartidasComponents/contrato-partidas/contrato-partidas.component';
import { AddPartidasContratoComponent } from './PartidasComponents/add-partidas-contrato/add-partidas-contrato.component';
import { ServiciosContratoComponent } from './ServiciosComponents/servicios-contrato/servicios-contrato.component';
import { NuevoServicioComponent } from './ServiciosComponents/nuevo-servicio/nuevo-servicio.component';
import { DialogDevolucionmaterialComponent } from './DialogComponents/dialog-devolucionmaterial/dialog-devolucionmaterial.component';
//Componentes de la app
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ContratosComponent,
    NuevoContratoComponent,
    ContratoComponent,
    InventariosComponent,
    MicuentaComponent,
    PartidasComponent,
    AgregarPartidaComponent,
    ReportesmaterialComponent,
    NuevoReportematerialComponent,
    ReportematerialComponent,
    InventariokpiComponent,
    AreasContratoComponent,
    AreaComponent,
    NuevaAreaComponent,
    FolioPipe,
    PosPipe,
    EstatusPipe,
    RolPipe,
    PartidaComponent,
    ReportesmaterialcontratoComponent,
    LoginComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    UsuarioComponent,
    CambiosPartidaComponent,
    EppComponent,
    EppDetalleComponent,
    EppAgregarComponent,
    EppSolicitudesComponent,
    EppSolicitudComponent,
    MovimientoComponent,
    NoautorizadoComponent,
    SolicitudesmaterialComponent,
    SolicitudmaterialComponent,
    NuevaSolicitudmaterialComponent,
    DialogAceptarsolicitudComponent,
    DialogSurtirsolicitudComponent,
    NuevoReportesolicitudComponent,
    DialogOrdencompraComponent,
    DialogRemitosolicitudComponent,
    RemitoComponent,
    RemitosComponent,
    RemitoscontratoComponent,
    ContratoPartidasComponent,
    AddPartidasContratoComponent,
    ServiciosContratoComponent,
    NuevoServicioComponent,
    DialogDevolucionmaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    MatNativeDateModule,
    MatDatepickerModule,
    FolioPipe,
    PosPipe,
    EstatusPipe,
    RolPipe,
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
