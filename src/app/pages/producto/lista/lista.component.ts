import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public productos!:ProductoModel[];

  constructor(
    private productosService: productoService,
    private sweetService: SweetToastService
  ) { }

  ngOnInit(): void {
    this.traerTodos();
  }

  traerTodos(){
    this.productosService.traerTodos().toPromise()
      .then((productos:any)=>{
        this.productos = productos;
        this.armarArrayProductos();
      }).catch((err)=> this.sweetService.danger(err.error.msg) );
  }

  armarArrayProductos(){
    let productosAux:ProductoModel[] = [];
    this.productos.forEach((producto)=>{
      producto.gustos.forEach((gusto)=>{
        productosAux.push(
          {...producto, 
            gusto: gusto, 
            ganciaMayorista: (producto.mayorista - gusto.costo) , 
            ganciaMinorista: (producto.minorista - gusto.costo) 
          });
      });
    });
    this.productos = productosAux;
  }

  borrar(item:any){
    console.log(item);
  }

}
