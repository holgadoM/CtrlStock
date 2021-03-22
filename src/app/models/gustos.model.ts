export interface GustosModel{
    id: number,
    sabor: string,
    precio: number,
    stock: number,
    costo:number,
    Producto_id: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date
}