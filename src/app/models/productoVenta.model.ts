import { GustosModel } from "./gustos.model";
import { ProductoModel } from "./producto.model";

export interface ProductoVentaModel{
    id:number,
    Producto_id: number,
    Venta_id: number,
    Gusto_id: number,
    cantidad: number,
    producto: ProductoModel,
    gusto: GustosModel
}