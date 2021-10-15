import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {ClipboardModule} from '@angular/cdk/clipboard'; 

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { SharedModule } from '../../shared/shared.module';

//componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgregarComponent } from '../producto/agregar/agregar.component';
import { BalanceComponent } from '../balance/balance.component';
import { ConfiguracionesComponent } from '../configuraciones/configuraciones.component';
import { EditableComponent } from 'src/app/directive/editable/editable.component';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';
import { ListaComponent } from '../producto/lista/lista.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ListaUsuariosComponent } from '../usuarios/lista/lista.component';
import { VentasComponent } from './ventas.component';

//directivas
import { EditableOnEnterDirective } from 'src/app/directive/editable/editable-on-enter.directive';
import { EditModeDirective } from 'src/app/directive/editable/edit-mode.directive';
import { FocusableDirective } from 'src/app/directive/focusable.directive';
import { ViewModeDirective } from 'src/app/directive/editable/view-mode.directive';
import { CostoComponent } from './costo/costo.component';
import { RegistrarEgresoComponent } from './registrar-egreso/registrar-egreso.component';
import { ListarEgresosComponent } from './listar-egresos/listar-egresos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    VentasComponent,
    DashboardComponent,
    AgregarComponent,
    ListaComponent,
    ListaVentasComponent,
    ListaUsuariosComponent,
    BalanceComponent,
    ConfiguracionesComponent,
    EditableComponent,
    ViewModeDirective,
    EditableOnEnterDirective,
    EditModeDirective,
    FocusableDirective,
    EditarVentaComponent,
    CostoComponent,
    RegistrarEgresoComponent,
    ListarEgresosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutesModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ClipboardModule,
    NgbModule
  ],
  exports:[
    DashboardComponent,
    VentasComponent,
    AgregarComponent,
    ListaComponent,
    ListaUsuariosComponent
  ]
})
export class VentasModule { }
