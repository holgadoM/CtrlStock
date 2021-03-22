import { ProductoModel } from "./producto.model";
import { ProductoVentaModel } from "./productoVenta.model";
import { UsuarioModel } from "./usuario.model";

export interface ventaModel{
    id?:number,
    cliente:string,
    metodo_pago:string,
    precio: number,
    venta_dolar:number,
    ingreso: number,
    usuario:UsuarioModel,
    productos: ProductoVentaModel[],
    estado: string
}