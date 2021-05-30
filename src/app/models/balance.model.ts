import { ProductoModel } from "./producto.model";

export interface ventasPorMetodosPagoModel{
    metodo:string;
    total: number;
    ganancia_neta?:number;
    total_ingreso?: number;
    total_egreso?: number;
    items:IventasItemModel[];
}

export interface IventasItemModel {
    Usuario_id: number;
    cliente: string;
    createdAt: string;
    deletedAt: any;
    estado: string;
    id: number;
    ingreso: number;
    metodo_pago: string;
    precio: number;
    ganancia: number;
    updatedAt: string;
    venta_dolar: any;
    esEgreso:boolean;
    productos:ProductoModel[];
}