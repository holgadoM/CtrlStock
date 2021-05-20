import { GustosModel } from "./gustos.model";

export interface ProductoModel{
    id: number,
    marca: string,
    modelo: string,
    minorista: number,
    mayorista: number,
    costo: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
    gustos: GustosModel[]
    gusto?:GustosModel,
    cantidad?:number,
    total:number,
    ganciaMayorista?:number,
    ganciaMinorista?:number,
    Gusto_id?:number,
    Producto_id?:number,
}

export interface ProductoEditarModel{
    id: number,
    marca: string,
    modelo: string,
    minorista: number,
    mayorista: number,
    costo: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
    gustos: GustosModel[]
    gusto?:GustosModel,
    cantidad:number,
    total:number,
    Gusto_id?:number,
    Producto_id?:number,
    precio:number
}

