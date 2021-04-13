import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "../../config/config";

@Injectable({
    providedIn: 'root'
})
export class productoService{
    constructor(
        private _http:HttpClient
    ){}

    traerTodos(){
        return this._http.get(`${url}/producto/`).toPromise();
    }

    crearProducto(data:any){
        return this._http.post(`${url}/producto/agregar`,{...data}).toPromise();
    }
    
    agregarGusto(id:number,data:any){
        return this._http.post(`${url}/producto/${id}/agregarGusto`,{...data}).toPromise();
    }

    eliminarGusto(id:number){
        return this._http.delete(`${url}/producto/${id}`).toPromise();
    }
}