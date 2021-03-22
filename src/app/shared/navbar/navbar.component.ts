import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { sidebarAbrirCerrar } from "../ui.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public sidebarestado?:boolean = false;
  public usuario:any;

  constructor(
    private _store:Store<AppState>
  ) { 
    this._store.select('ui').subscribe(({sidebarEstado})=>{
      this.sidebarestado = sidebarEstado;
    });
    this._store.select('usuario').subscribe(({usuario})=>{
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {
  }

  cambiarEstadoSidebar(){
    this._store.dispatch( sidebarAbrirCerrar({sidebarEstado: !this.sidebarestado }) );
  }

}
