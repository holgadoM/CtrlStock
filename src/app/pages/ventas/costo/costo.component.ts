import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GustosModel } from 'src/app/models/gustos.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.component.html',
  styleUrls: ['./costo.component.css']
})
export class CostoComponent implements OnInit {

  ventaForm!:FormGroup;
  cargando:boolean = false;

  public producto?:ProductoModel;
  public productos:ProductoModel[] = [];
  public produtosStock: ProductoModel[] = [];
  public cantidadStock:number[] = [];
  public productoGustos:GustosModel[] = [];
  public ListametodosPagos:string[] = [];

  usuarios:string[] = [];

  constructor(
    private fb:FormBuilder,
    private prodcutosService:productoService,
    private ventasService: ventasService,
    private metodosConfgService: ConfiguracionService,
    private sweetService: SweetToastService,
    private usuaruiService: UsuarioService,

  ) {
    this.traerProductos();
    this.traerMetodosPago();
    this.traerUsuarios();
    this.ventaForm = this.fb.group({
      usuario: ['', Validators.required],
      pago: ['', Validators.required],
      ingreso: ['',[ Validators.required, Validators.min(0) ]],
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

  traerUsuarios(){
    this.usuaruiService.listarUsuarios()
      .then(( usuarios:any )=>{
        usuarios.forEach((usuario:UsuarioModel)=>{
          this.usuarios.push(`${usuario.nombre} - ${usuario.usuario}`)
        });
      }).catch((err)=> console.log(err));
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
      if( prod.gusto?.costo  ){
        prod.total = prod.gusto?.costo;
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
    if(this.ListametodosPagos.length > 0){
      this.ventaForm.controls['pago'].setValue(this.ListametodosPagos[0]);
    }
  }

  guardar(){

    if(this.ventaForm.invalid) return;

    let data:any = {};
    data['usuario'] = this.ventaForm.controls.usuario.value;
    data['metodo_pago'] = this.ventaForm.controls.pago.value;
    data['ingreso'] = this.ventaForm.controls.ingreso.value;
    data['total'] = this.sumaTotal();
    data['productos'] = this.productos;
    this.ventasService.crearVentaalCosto(data)
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
