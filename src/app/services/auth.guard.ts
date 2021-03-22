import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
      private usuarioService:UsuarioService,
      private router:Router
    ){

    }
  canLoad(): any {
    if(this.usuarioService.estaLogueado()){
      return true;
    }else{
      this.router.navigate(['login']);
    }
  }
  
}
