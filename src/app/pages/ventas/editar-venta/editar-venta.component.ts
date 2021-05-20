import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GustosModel } from 'src/app/models/gustos.model';
import { ProductoEditarModel } from 'src/app/models/producto.model';
import { ventaEditarModel } from 'src/app/models/venta.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styles: [
  ]
})
export class EditarVentaComponent implements OnInit {

  ventaForm!:FormGroup;
  cargando:boolean = true;
  id:any;
  public error:boolean = false;
  public venta!:ventaEditarModel;

  public producto?:ProductoEditarModel;
  public productos:ProductoEditarModel[] = [];
  public produtosStock: ProductoEditarModel[] = [];
  public cantidadStock:number[] = [];
  public productoGustos:GustosModel[] = [];
  public ListametodosPagos:string[] = [];

  constructor(
    private fb:FormBuilder,
    private prodcutosService:productoService,
    private ventasService: ventasService,
    private metodosConfgService: ConfiguracionService,
    private sweetService: SweetToastService,
    private route:ActivatedRoute

  ) {
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      pago: ['', Validators.required],
      ingreso: ['',[ Validators.required, Validators.min(0) ]],
      esMayorista:[false],
      esDolar:[false]
    });
    this.traerProductos();
    this.traerMetodosPago();

    this.id = this.route.snapshot.params.id;
    this.ventasService.traerPorId(this.id)
      .then((ventaRst:any)=>{
        this.cargando = !this.cargando;
        this.venta = ventaRst;
        console.log(this.venta)
        this.venta.productos.forEach((prod:any)=>{
          this.producto = prod;
          if( this.producto?.cantidad && this.producto.precio ){
            this.producto.total = this.producto?.cantidad * this.producto?.precio;
          }
          this.agregarProducto();
        });
        this.ventaForm.controls.cliente.setValue(this.venta.cliente);
        this.ventaForm.controls.pago.setValue(this.venta.metodo_pago);
        this.ventaForm.controls.ingreso.setValue(this.venta.ingreso);
        this.ventaForm.controls.esDolar.setValue(this.venta.venta_dolar);
      }).catch((err)=>{
        this.cargando = !this.cargando;
        this.error = true;
        this.sweetService.danger(err.error.msg);
      });
     
   }

  ngOnInit(): void {
    
  }

  traerProductos(){
    this.prodcutosService.traerTodos().then((productos:any)=>{
      if( productos.length > 0 ){
        this.produtosStock = productos;
        this.cargarProductoDefault();
      }
    });
  }

  traerMetodosPago(){
    this.metodosConfgService.obtenerMetodosPago()
      .then((r)=>{
        this.ListametodosPagos = [];
        r.map((metodo)=>{
          this.ListametodosPagos.push(metodo.metodo);
        });
        this.ventaForm.controls['pago'].setValue(this.ListametodosPagos[0]);
      }).catch(err=>{});
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
            prod.cantidad +=  parseInt(this.producto!.cantidad.toString());
            if( prod.cantidad > this.cantidadStock.length ){
              prod.cantidad -=  parseInt(this.producto!.cantidad.toString());
              this.sweetService.warning("Stock insuficiente");
            }
              agregar = false;
          }
        }
      });
      if( agregar ){
        console.log(this.producto);
        this.productos.push({...this.producto});
      }
      this.calcularTotalPorProducto();

    }
  }

  borrar(item:ProductoEditarModel){
    console.log(item);
    this.ventasService.eliminarProductoVenta(this.venta.id, item.Producto_id, item.Gusto_id)
      .then((rst)=>{
        console.log(rst);
        this.productos = this.productos.filter((prod)=> {
          if( prod.id == item.id && prod.gusto?.id == item.gusto?.id){
            return;
          } 
          return prod;
        } );
      }).catch((err)=>{
        console.log(err.error);
        this.sweetService.danger(err.error.msg);
      });
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
    if(this.ListametodosPagos.length > 0){
      this.ventaForm.controls['pago'].setValue(this.ListametodosPagos[0]);
    }
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
        this.sweetService.success('Venta registrada correctamente');
      }).catch((err)=>{
        console.log(err);
        this.sweetService.danger(err.error.msg);
      });

  }

}
