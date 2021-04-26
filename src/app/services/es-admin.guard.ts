import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {
  constructor(
    private usuarioService:UsuarioService,
  ){}
  canActivate(): boolean {
    let esAdmin = this.usuarioService.esAdmin();
    return esAdmin;
  }
  
}
