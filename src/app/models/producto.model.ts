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
}

