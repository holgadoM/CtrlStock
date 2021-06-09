import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as IntroJs from "intro.js";
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as actions from "../../pages/auth/auth.actions";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public esAdmin = false;

  constructor(
    private router:Router,
    private store:Store<AppState>,
    private usuarioService: UsuarioService
  ) { 
    this.esAdmin = this.usuarioService.esAdmin();
  }

  ngOnInit(): void {
    
  }

  StepsVendedores(){
    IntroJs()
    .addStep({
      element: document.querySelectorAll('#registrar-venta')[0],
      intro: "Usuario puede dar de alta un venta, ",
      position: 'right',
      }).addStep({
        element: document.querySelectorAll('#registrar-venta-costo')[0],
        intro: "Un vendedor o administrador registra una venta que se cotiza al costo (venta a empleados)",
        position: 'right',
      })
      .addStep({
        element: document.querySelectorAll('#lista-productos')[0],
        intro: "Se muestra todos los productos con sis variantes, stock, precio, etc",
        position: 'right',
      })
      .addStep({
        element: document.querySelectorAll('#lista-ventas')[0],
        intro: "Se muestran todos las ventas, con su detalle, cliente, productos, ganancia, etc",
        position: 'right',
      }).start();

  }

  StepsAdmin(){
    IntroJs()
    .addStep({
      element: document.querySelectorAll('#registrar-venta')[0],
      intro: "Usuario puede dar de alta un venta, ",
      position: 'right',
      }).addStep({
        element: document.querySelectorAll('#registrar-venta-costo')[0],
        intro: "Un vendedor o administrador registra una venta que se cotiza al costo (venta a empleados)",
        position: 'right',
      })
      .addStep({
        element: document.querySelectorAll('#registrar-egreso')[0],
        intro: "Solo el administrador puede registrar un egrego (pago de mercaderia a proveedores)",
        position: 'right',
      })
      .addStep({
        element: document.querySelectorAll('#lista-productos')[0],
        intro: "Se muestra todos los productos con sos variantes, stock, precio, etc",
        position: 'right',
      })
    .addStep({
      element: document.querySelectorAll('#agregar-producto')[0],
      intro: "Se agregan los productos nuevos que se compran",
      position: 'right',
    })
    .addStep({
      element: document.querySelectorAll('#lista-egresos')[0],
      intro: "Se muestran todos los egresos, descripcion, valor, etc",
      position: 'right',
    })
    .addStep({
      element: document.querySelectorAll('#lista-ventas')[0],
      intro: "Se muestran todos las ventas, con su detalle, cliente, productos, ganancia, etc",
      position: 'right',
    }).addStep({
      element: document.querySelectorAll('#balance')[0],
      intro: "Se elige una fecha y se muestra el balance de todas las cajas que existan y un balance gral",
      position: 'right',
    })
    .addStep({
      element: document.querySelectorAll('#lista-usuarios')[0],
      intro: "Se puede agregar usuarios (de tipo vendedor, o administrador), listarlos y eliminarlos",
      position: 'right',
    })
    .addStep({
      element: document.querySelectorAll('#configuracion')[0],
      intro: "Configracion de la app, por el momento solo se puede agregar metodos de pagos (Caja del balance)",
      position: 'right',
    })
    .start();
  }

  abrirTour(){
    if( this.esAdmin ){
      this.StepsAdmin();
    } else{
      this.StepsVendedores();
    }
  }

  logout(){
    this.store.dispatch( actions.usuarioEliminar() );
    localStorage.removeItem('tokenStock');
    this.router.navigate(['login']);
  }

}
