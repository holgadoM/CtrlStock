import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ventaModel } from 'src/app/models/venta.model';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  @ViewChild('inputBuscar') cntrolBuscar!:ElementRef;

  public ventas!:ventaModel[];
  public ventasTabla:ventaModel[] = [];

  constructor(
    private ventasService:ventasService,
    private sweetService: SweetToastService,
    private zone:NgZone
  ) { }

  ngOnInit(): void {
    this.traerVentas()
  }

  traerVentas(){
    this.ventasService.listarVentas()
      .then((ventas:any)=>{
        this.ventas = ventas;
        this.ventasTabla = this.ventas;
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

}
