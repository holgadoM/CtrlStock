import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import * as actionUsuario from "../pages/auth/auth.actions";
import { url } from "src/config/config";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService{

    constructor(
        private _http:HttpClient,
        private jwt:JwtHelperService,
        private store:Store<AppState>
    ){
        this.cargarUsuario();
    }

    login(usuario:string, clave:string){
        return this._http.post(`${url}/login`,{usuario, clave}).toPromise();
    }

    cargarUsuario(){
        const token = localStorage.getItem('tokenStock');
        if( token ){
            let usuario = this.jwt.decodeToken(token);
            this.store.dispatch( actionUsuario.usuarioCrear({ usuario }) );
        }
    }

    estaLogueado():boolean{
        const token = localStorage.getItem('tokenStock');
        if( token ){
            return true;
        }
        return false;
    }

    listarUsuarios(){
        return this._http.get(`${url}/usuario/`).toPromise();
    }

    registrarUsuario(data:{}){
        return this._http.post(`${url}/usuario/registro`,{...data}).toPromise();
    }

    eliminarUsuario(id:number){
        return this._http.delete(`${url}/usuario/eliminar/${id}`).toPromise();
    }
    
    cambiarAdmin(usuario:any){
        return this._http.put(`${url}/usuario/cambiarAdmin/`,{usuario}).toPromise();
    }

    esAdmin():boolean{
        const token = localStorage.getItem('tokenStock');
        if( token ){
            let usuario = this.jwt.decodeToken(token);
            return usuario['esAdmin'];
        }
        return false;
    }
}