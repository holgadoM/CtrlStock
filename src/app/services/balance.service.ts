import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from "../../config/config";
import { IventasItemModel } from '../models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerPorMetodoDePago(fecha:string) : Promise<IventasItemModel[]>{
    return this.http.get(`${url}/balance/metodoPago/${fecha}`).toPromise<any>();
  }
}
