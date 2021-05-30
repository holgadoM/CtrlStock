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
    listarEgresos(){
        return this._http.get(`${url}/ventas/egresos/`,).toPromise();
    }
    
    traerPorId(id:any){
        return this._http.get(`${url}/ventas/${id}`,).toPromise();
    }

    crearVenta(data:any){
        return this._http.post(`${url}/ventas/crear`, { ...data }).toPromise();
    }

    crearEgreso(data:any){
        return this._http.post(`${url}/ventas/registrarEgreso`, { ...data }).toPromise();
    }

    crearVentaalCosto(data:any){
        return this._http.post(`${url}/ventas/crear/costo`, { ...data }).toPromise();
    }
    actualizarVenta(data:any, id:any){
        return this._http.put(`${url}/ventas/actualizar/${id}`, { ...data }).toPromise();
    }

    cambiarEstado(estado:string, id:number){
        return this._http.put(`${url}/ventas/cambiarEstado/${id}`, {estado}).toPromise();
    }
    
    eliminarProductoVenta(idVenta:any, idProducto:any, idGusto:any){
        return this._http.delete(`${url}/ventas/eliminarProducto/${idVenta}/${idProducto}/${idGusto}`,).toPromise();
    }

    agregarProductoVenta(idVenta:any, idProducto:any, idGusto:any,cantidad:number, esMayorista:boolean ){
        return this._http.put(`${url}/ventas/agregarProducto/${idVenta}/${idProducto}/${idGusto}`, {cantidad, esMayorista}).toPromise();
    }
}