import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ventaModel } from 'src/app/models/venta.model';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { ventasService } from 'src/app/services/venta.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { IventasItemModel, ventasPorMetodosPagoModel } from 'src/app/models/balance.model';
import { BalanceService } from 'src/app/services/balance.service';
import { IEgreso } from 'src/app/models/egreso.model';
import SweetAlert from "sweetalert2";

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  isCollapsed:boolean = true;
  @ViewChild('inputBuscar') cntrolBuscar!:ElementRef;

  public ventas!:ventaModel[];
  public egreso!:IEgreso[];
  public ventasTabla:ventaModel[] = [];

  public ventasPorMetodosPago :ventasPorMetodosPagoModel[] = [];
  private _arrayMetodosDePago:string[] = [];
  public fecha:any;

  constructor(
    private ventasService:ventasService,
    private sweetService: SweetToastService,
    private clipboard: Clipboard,
    private router:Router,
    private balanceService: BalanceService,
  ) { }

  ngOnInit(): void {
    this.traerVentas();
    this.cargarCajas();
  }

  traerVentas(){
    this.ventasService.listarVentas()
      .then((ventas:any)=>{
        this.ventas = ventas;
        this.ventas
        this.ventasTabla = this.ventas;
        this.asignarEstado();
      });
  }

  asignarEstado(){
    this.ventasTabla.forEach((venta)=>{
      this.cambiarEstado(venta.estado, venta.id);
    });
  }

  buscar(){
    this.ventasTabla = this.ventas.filter((venta)=>{
      if(this.cntrolBuscar.nativeElement.value == '') return venta;
      if( venta.cliente.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return venta;
      if( venta.metodo_pago.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return venta;
      if( venta.usuario.nombre.toLowerCase().includes( String( this.cntrolBuscar.nativeElement.value ).toLowerCase() ) ) return venta;
      return;
    });
  }

  editar(id:any){
    this.router.navigate([`editar-venta/${id}`]);
  }

  cambiarEstado(estado:string, id?:number){
    if(!id) return;
    let index:any = null;
    this.ventas.map((venta)=>{
      if( venta.id == id && estado != venta.estado ){
        index = this.ventasTabla.indexOf(venta);
        this.ventasService.cambiarEstado(estado,id)
        .then((rest:any)=>{
          if(index){
          venta.estado = rest.estado;
            this.ventasTabla[index].estado = rest.estado;
          }else{
            this.traerVentas();
          }
          this.sweetService.success("Estado de la venta actualizado");
        })
        .catch((err)=>{
          this.sweetService.danger(err.error.msg);
        });
      }
    });
  }

  copiarProductos(id:any){
    let textoProductos = '';
    this.ventasTabla.forEach((venta)=>{
      if( venta.id == id ){

        venta.productos.forEach((producto, index)=>{
          textoProductos += `#${index+1} ${ producto.producto.marca } - ${ producto.producto.modelo } - ${ producto.gusto.sabor } - ${ producto.cantidad }\n`;
        });
      }
    });
    let estaCopiado = this.clipboard.copy(textoProductos);
    if( estaCopiado ) this.sweetService.success("Copiado");
  }

  cargarCajas(){
    this.balanceService.obtenerTodosMetodoDePago()
      .then((r:IventasItemModel[])=>{
        r.map((venta)=>{
          if( !this._arrayMetodosDePago.includes( venta.metodo_pago ) ){
            this._arrayMetodosDePago.push(venta.metodo_pago);
          }
        });

        this._arrayMetodosDePago.map((rst)=>{
          const auxVentas = r.filter((venta)=> venta.metodo_pago == rst);
          let total = 0;
          let ganancia_aux = 0;
          let total_ingreso = 0;
          let total_egreso = 0;
          auxVentas.map((auxVenta)=>{
            if( auxVenta.esEgreso ){
              total_egreso += parseFloat(auxVenta.precio.toString());
              total_ingreso -= total_egreso;
            }else{
              total += parseFloat(auxVenta.precio.toString());
              total_ingreso += parseFloat(auxVenta.ingreso.toString());
              ganancia_aux += parseFloat(auxVenta.ganancia.toString());
            }
          });
          this.ventasPorMetodosPago.push({
            metodo : rst,
            items: auxVentas,
            total: total,
            ganancia_neta: ganancia_aux,
            total_ingreso: total_ingreso,
            total_egreso: total_egreso
          });
        });
      })
      .catch((err)=> this.sweetService.warning(err.error.msg) )
  }

  eliminarVenta(venta:ventaModel){
    SweetAlert.fire({
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      position: 'center',
      reverseButtons: true,
      text: `Quiere eliminar: ID: #${venta.id} - Cliente: ${venta.cliente} - Valor: $${venta.precio}?`,
      
    }).then((resultado)=>{
      if( resultado.isConfirmed ){
         this.ventasService.eliminarVenta(venta.id)
          .then((rst)=>{
              this.sweetService.success("Venta eliminada!");
              this.traerVentas();
              this.cargarCajas();
          })
          .catch((err)=> this.sweetService.danger(err.error.msg) )
      }
    });
  }

}
