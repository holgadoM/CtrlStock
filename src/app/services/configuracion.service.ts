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

  obtenerMetodosPago(){
    return this._http.get(`${url}/configuracion/metodos`).toPromise();
  }

  crearMetodoPago(metodo:string){
    return this._http.post(`${url}/configuracion/metodos/agregar`,{metodo}).toPromise();
  }
}
