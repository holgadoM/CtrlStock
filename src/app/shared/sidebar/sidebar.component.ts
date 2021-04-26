import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  logout(){
    this.store.dispatch( actions.usuarioEliminar() );
    localStorage.removeItem('tokenStock');
    this.router.navigate(['login']);
  }

}
