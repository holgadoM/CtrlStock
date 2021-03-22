import { Routes } from "@angular/router";
import { AgregarComponent } from "../producto/agregar/agregar.component";
import { ListaComponent } from "../producto/lista/lista.component";
import { ListaUsuariosComponent } from "../usuarios/lista/lista.component";
import { ListaVentasComponent } from "../ventas/lista-ventas/lista-ventas.component";
import { VentasComponent } from "../ventas/ventas.component";


export const dashboardRoutes : Routes = [
    { path: '', component: VentasComponent },
    { path: 'agregar', component: AgregarComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'venta-lista', component: ListaVentasComponent },
    { path: 'usuarios', component: ListaUsuariosComponent }
];