import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/config/config";

@Injectable({
    providedIn: 'root'
})
export class ventasService{
    constructor(
        private _http: HttpClient
    ){}

    listarVentas(){
        return this._http.get(`${url}/ventas/`,).toPromise();
    }

    crearVenta(data:any){
        return this._http.post(`${url}/ventas/crear`, { ...data }).toPromise();
    }

    cambiarEstado(estado:string, id:number){
        return this._http.put(`${url}/ventas/cambiarEstado/${id}`, {estado}).toPromise();
    }
}