import { Component, OnInit } from '@angular/core';
import { IventasItemModel, ventasPorMetodosPagoModel } from 'src/app/models/balance.model';
import { BalanceService } from 'src/app/services/balance.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  public ventasPorMetodosPago :ventasPorMetodosPagoModel[] = [];
  private _arrayMetodosDePago:string[] = [];
  public fecha:any;
  public total_gral:number = 0;
  public ganancia_gral:number = 0;
  public egreso_gral:number = 0;
  public ingreso_gral:number = 0;

  constructor(
    private balanceService: BalanceService,
    private sweetService:SweetToastService
  ) { }

  ngOnInit(): void {
  }

  cambiarFecha($event:any){
    this.fecha = $event.target.value;
    this.ventasPorMetodosPago = [];
    this._arrayMetodosDePago = [];
    this.ganancia_gral = 0;
    this.total_gral = 0;
    this.ingreso_gral = 0;
    this.egreso_gral = 0;
    this.balanceService.obtenerPorMetodoDePago($event.target.value)
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
            }
            auxVenta.productos.map((prod)=>{
              if(prod.gusto?.costo){
                ganancia_aux += ( prod.gusto?.costo);
              }
            });
          });
          this.total_gral += total;
          this.ganancia_gral += (total - ganancia_aux);
          this.ingreso_gral += total_ingreso;
          this.egreso_gral += total_egreso;
          this.ventasPorMetodosPago.push({
            metodo : rst,
            items: auxVentas,
            total: total,
            ganancia_neta: (total - ganancia_aux),
            total_ingreso: total_ingreso,
            total_egreso: total_egreso
          });
        });
      })
      .catch((err)=> this.sweetService.warning(err.error.msg) )
  }

}
