import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VentasComponent } from './ventas.component';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AgregarComponent } from '../producto/agregar/agregar.component';
import { ListaComponent } from '../producto/lista/lista.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';
import { ListaUsuariosComponent } from '../usuarios/lista/lista.component';
import { BalanceComponent } from '../balance/balance.component';



@NgModule({
  declarations: [
    VentasComponent,
    DashboardComponent,
    AgregarComponent,
    ListaComponent,
    ListaVentasComponent,
    ListaUsuariosComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutesModule,
    SharedModule,
    ReactiveFormsModule
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
