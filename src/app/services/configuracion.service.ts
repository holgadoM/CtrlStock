import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { url } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(
    private _http:HttpClient
  ) { }

  obtenerMetodosPago():Promise<any[]>{
    return this._http.get(`${url}/configuracion/metodos`).toPromise<any>();
  }

  crearMetodoPago(metodo:string){
    return this._http.post(`${url}/configuracion/metodos/agregar`,{metodo}).toPromise();
  }
  
  eliminarMetodo(id:number){
    return this._http.delete(`${url}/configuracion/metodos/eliminar/${id}`,).toPromise();
  }
}
