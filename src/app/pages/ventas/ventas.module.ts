import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { SharedModule } from '../../shared/shared.module';

import { VentasComponent } from './ventas.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AgregarComponent } from '../producto/agregar/agregar.component';
import { ListaComponent } from '../producto/lista/lista.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ListaUsuariosComponent } from '../usuarios/lista/lista.component';
import { BalanceComponent } from '../balance/balance.component';
import { ConfiguracionesComponent } from '../configuraciones/configuraciones.component';
import { EditableComponent } from 'src/app/directive/editable/editable.component';
import { ViewModeDirective } from 'src/app/directive/editable/view-mode.directive';
import { EditableOnEnterDirective } from 'src/app/directive/editable/editable-on-enter.directive';
import { EditModeDirective } from 'src/app/directive/editable/edit-mode.directive';
import { FocusableDirective } from 'src/app/directive/focusable.directive';

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
    FocusableDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutesModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
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
