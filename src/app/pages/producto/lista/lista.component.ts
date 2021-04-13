import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import SweetAlert from "sweetalert2";
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
    this.productosService.traerTodos()
      .then((productos:any)=>{
        this.productos = [];
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
    SweetAlert.fire({
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      position: 'center',
      reverseButtons: true,
      text: `Quiere eliminar: ${item.marca} ${item.modelo} ${item.gusto?.sabor} ?`,
      
    }).then((resultado)=>{
      if( resultado.isConfirmed ){
         this.productosService.eliminarGusto(item.gusto.id)
          .then((rst)=>{
              this.sweetService.success("Gusto eliminado!");
              this.traerTodos();
          })
          .catch((err)=> this.sweetService.danger(err.error.msg) )
      }
    });
  }

}
