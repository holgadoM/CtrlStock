import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import SweetAlert from "sweetalert2";
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @ViewChild('inputBuscar') cntrolBuscar!:ElementRef;

  public productos!:ProductoModel[];
  public productosTabla:ProductoModel[] = [];

  controls!: FormArray;

  public esAdmin = false;

  constructor(
    private productosService: productoService,
    private sweetService: SweetToastService,
    private usuarioService:UsuarioService
  ) { 
    this.esAdmin = this.usuarioService.esAdmin();
  }

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

  setControl(){
    const toGroups = this.productosTabla.map(producto => {
      return new FormGroup({
        stock: new FormControl(producto.gusto?.stock),
        minorista: new FormControl(producto.minorista),
        mayorista: new FormControl(producto.mayorista)
      });
    });
    this.controls = new FormArray(toGroups);
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
    this.productosTabla = this.productos;
    this.setControl();
  }

  buscar(){
    this.productosTabla = this.productos.filter((producto)=>{
      if(this.cntrolBuscar.nativeElement.value == '') return producto;
      if( producto.marca.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return producto;
      if( producto.modelo.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return producto;
      if( producto.gusto?.sabor.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return producto;
      return;
    });
  }

  async updateField(index: number, field: string) {
    const control = this.getControl(index, field);

    if (control.valid) {
      this.productos = this.productos.map((e, i) => {
        if (index === i) {

            if( field == 'stock' ){
              this.productosService.actualizarStock(e.id, control.value)
              .then((rst)=>{
                    if(e.gusto){
                      e.gusto.stock = parseFloat(control.value);
                    }
                    return;
                  })
                  .catch((err)=>{
                    this.sweetService.danger(err.error.msg);
                    this.traerTodos();
                  });
                return e;
            }else{
              let aux = {
                ...e,
                [field] : control.value,
              };
              if( field == 'mayorista' ){
                aux.ganciaMayorista = ( parseFloat(control.value.toString()) - e.gusto!.costo);
              }else{
                aux.ganciaMinorista = ( parseFloat(control.value.toString()) - e.gusto!.costo);
              }

              let auxRst = this.productosService.modificarProducto(aux)
                .then((rst) => rst)
                .catch((err)=>{
                  this.sweetService.danger(err.error.msg);
                  this.traerTodos();
                });
              if(auxRst){
                return aux;
              }else{
                return e;
              }
            }
        }else{
          return e;
        }
      });
      this.productosTabla = this.productos;
    }
  }

  getControl(index: number, field: string): FormControl {
    return this.controls.at(index).get(field) as FormControl;
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
