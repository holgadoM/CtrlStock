import { ProductoModel } from "./producto.model";
import { ProductoVentaModel } from "./productoVenta.model";
import { UsuarioModel } from "./usuario.model";

export interface ventaModel{
    id?:number,
    cliente:string,
    metodo_pago:string,
    precio: number,
    ganancia:number,
    venta_dolar:number,
    ingreso: number,
    usuario:UsuarioModel,
    productos: ProductoVentaModel[],
    estado: string,
    createdAt:any
}

export interface ventaEditarModel{
    id?:number,
    ganancia:number,
    productos: ProductoVentaModel[],
    metodo_pago:string,
    cliente:string,
    usuario:UsuarioModel,
    estado: string,
    precio: number,
    venta_dolar:number,
    ingreso: number,
    createdAt:any
}