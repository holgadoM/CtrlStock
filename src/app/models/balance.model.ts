import { ProductoModel } from "./producto.model";

export interface ventasPorMetodosPagoModel{
    metodo:string;
    total: number;
    ganancia_neta?:number;
    total_ingreso?: number;
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
    updatedAt: string;
    venta_dolar: any;
    productos:ProductoModel[];
}