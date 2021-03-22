import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GustosModel } from 'src/app/models/gustos.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { productoService } from 'src/app/services/producto.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventaForm!:FormGroup;
  cargando:boolean = false;

  public producto?:ProductoModel;
  public productos:ProductoModel[] = [];
  public produtosStock: ProductoModel[] = [];
  public cantidadStock:number[] = [];
  public productoGustos:GustosModel[] = [];

  constructor(
    private fb:FormBuilder,
    private prodcutosService:productoService,
    private ventasService: ventasService,

  ) {
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      pago: ['', Validators.required],
      ingreso: ['',[ Validators.required, Validators.min(0) ]],
      esMayorista:[],
      esDolar:[]
    });
   }

  ngOnInit(): void {
    this.traerProductos()
  }

  traerProductos(){
    this.prodcutosService.traerTodos().subscribe((productos:any)=>{
      if( productos.length > 0 ){
        this.produtosStock = productos;
        this.cargarProductoDefault();
      }
    });
  }

  cargarProductoDefault(){
    this.producto = this.produtosStock[0];
    if(this.producto.gustos.length > 0 ){
      this.productoGustos = this.producto.gustos;
      this.producto.gusto = this.productoGustos[0];
    }
    this.asignarStock();
  }

  cambiarProducto($event:any){
    this.produtosStock.map((prod)=>{
      if( prod.id == $event.target.value ){
        this.producto = prod;
        if( this.producto.gustos.length > 0 ){
          this.productoGustos = this.producto.gustos;
          this.producto.gusto = this.productoGustos[0];
          this.asignarStock();
        }
      }
    });
  }
  
  cambiarSabor($event:any){
    if( this.producto ){
      this.productoGustos.map((gusto)=> {
        if(gusto.id == $event.target.value){
          this.producto!.gusto = gusto;
        }
      });
      this.asignarStock();
    }
  }

  asignarStock(){
    this.cantidadStock = [];
    if( this.producto && this.producto.gusto){
      for (let index = 1; index <= this.producto.gusto.stock; index++) {
        this.cantidadStock.push(index); 
      }
    }
    this.producto!.cantidad = 1;

  }

  cambiarCantidad($event:any){
    if( this.producto ){
      this.producto.cantidad = parseInt($event.target.value.toString());
    }
  }

  calcularTotalPorProducto(){

    this.productos.map((prod)=>{
      prod.total = 0;
      if(this.ventaForm.controls.esMayorista.value){
        if( prod?.cantidad && prod.mayorista ){
          prod.total = parseFloat( ( parseInt(prod.cantidad.toString()) * parseFloat(prod.mayorista.toString())).toString() );
        }
      }else{
        if( prod?.cantidad && prod.minorista ){
          console.log(prod)
          prod.total = parseFloat( ( parseInt(prod.cantidad.toString()) * parseFloat(prod.minorista.toString())).toString() );
        }
      }
    });
  }

  agregarProducto(){
    if( this.producto ){
      let agregar = true;
      this.productos.map((prod)=>{
        if( prod.id == this.producto?.id && prod.gusto?.id == this.producto?.gusto?.id ){
          if( this.producto.cantidad && prod.cantidad){
            prod.cantidad +=  parseInt(this.producto!.cantidad.toString())
            agregar = false;
          }
        }
      });
      if( agregar ){
        this.productos.push({...this.producto});
      }
      this.calcularTotalPorProducto();
    }
  }

  borrar(item:ProductoModel){
    this.productos = this.productos.filter((prod)=> {
      if( prod.id == item.id && prod.gusto?.id == item.gusto?.id){
        return;
      } 
      return prod;
    } );
  }

  sumaTotal(){
    let total = 0;
    this.productos.map((prod)=>{
      total += parseFloat( prod.total.toString() );
    });
    return total;
  }

  borrarTodo(){
    this.ventaForm.reset();
    this.productos = [];
  }

  guardar(){
    let data:any = {};
    data['cliente'] = this.ventaForm.controls.cliente.value;
    data['metodo_pago'] = this.ventaForm.controls.pago.value;
    data['ingreso'] = this.ventaForm.controls.ingreso.value;
    data['esDolar'] = this.ventaForm.controls.esDolar.value;
    data['total'] = this.sumaTotal();
    data['productos'] = this.productos;

    this.ventasService.crearVenta(data)
      .then((r)=>{
        this.borrarTodo();
        this.traerProductos();
      }).catch((err)=>{
        console.log(err);
      });

  }

}
