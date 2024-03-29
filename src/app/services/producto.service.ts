import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "../../config/config";
import { ProductoModel } from "../models/producto.model";

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

    traerSoloProductos(){
        return this._http.get(`${url}/producto/solo`).toPromise();
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

    eliminarProducto(id:number){
        return this._http.delete(`${url}/producto/eliminar/${id}`).toPromise();
    }

    actualizarStock(id:number, stock:number){
        return this._http.put(`${url}/producto/agregar/stock`,{ id, stock }).toPromise();
    }
    actualizarCosto(id:number, costo:number){
        return this._http.put(`${url}/producto/modificar/gusto/costo`,{ id, costo }).toPromise();
    }
    actualizarSabor(id:number, sabor:string){
        return this._http.put(`${url}/producto/modificar/gusto/nombre`,{ id, sabor }).toPromise();
    }

    modificarProducto(producto:ProductoModel){
        return this._http.put(`${url}/producto/modificar`,{ ...producto }).toPromise();
    }
}