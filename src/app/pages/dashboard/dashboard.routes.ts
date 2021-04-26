import { Routes } from "@angular/router";
import { EsAdminGuard } from "src/app/services/es-admin.guard";
import { BalanceComponent } from "../balance/balance.component";
import { ConfiguracionesComponent } from "../configuraciones/configuraciones.component";
import { AgregarComponent } from "../producto/agregar/agregar.component";
import { ListaComponent } from "../producto/lista/lista.component";
import { ListaUsuariosComponent } from "../usuarios/lista/lista.component";
import { ListaVentasComponent } from "../ventas/lista-ventas/lista-ventas.component";
import { VentasComponent } from "../ventas/ventas.component";


export const dashboardRoutes : Routes = [
    { path: '', component: VentasComponent },
    { path: 'agregar', canActivate:[EsAdminGuard], component: AgregarComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'venta-lista', component: ListaVentasComponent },
    { path: 'usuarios', canActivate:[EsAdminGuard], component: ListaUsuariosComponent },
    { path: 'balance', canActivate:[EsAdminGuard], component: BalanceComponent },
    { path: 'configuracion', canActivate:[EsAdminGuard],component: ConfiguracionesComponent }
];