import { Routes } from "@angular/router";
import { EsAdminGuard } from "src/app/services/es-admin.guard";
import { BalanceComponent } from "../balance/balance.component";
import { ConfiguracionesComponent } from "../configuraciones/configuraciones.component";
import { AgregarComponent } from "../producto/agregar/agregar.component";
import { ListaComponent } from "../producto/lista/lista.component";
import { ListaUsuariosComponent } from "../usuarios/lista/lista.component";
import { CostoComponent } from "../ventas/costo/costo.component";
import { EditarVentaComponent } from "../ventas/editar-venta/editar-venta.component";
import { ListaVentasComponent } from "../ventas/lista-ventas/lista-ventas.component";
import { ListarEgresosComponent } from "../ventas/listar-egresos/listar-egresos.component";
import { RegistrarEgresoComponent } from "../ventas/registrar-egreso/registrar-egreso.component";
import { VentasComponent } from "../ventas/ventas.component";


export const dashboardRoutes : Routes = [
    { path: '', component: VentasComponent },
    { path: 'costo', component: CostoComponent },
    { path: 'agregar', canActivate:[EsAdminGuard], component: AgregarComponent },
    { path: 'egreso', canActivate:[EsAdminGuard], component: RegistrarEgresoComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'venta-lista', component: ListaVentasComponent },
    { path: 'egreso-lista',canActivate:[EsAdminGuard], component: ListarEgresosComponent },
    { path: 'usuarios', canActivate:[EsAdminGuard], component: ListaUsuariosComponent },
    { path: 'balance', canActivate:[EsAdminGuard], component: BalanceComponent },
    { path: 'configuracion', canActivate:[EsAdminGuard],component: ConfiguracionesComponent },
    { path: 'editar-venta/:id', canActivate:[EsAdminGuard], component: EditarVentaComponent }
];