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

  constructor(
    private balanceService: BalanceService,
    private sweetService:SweetToastService
  ) { }

  ngOnInit(): void {
  }

  cambiarFecha($event:any){
    this.ventasPorMetodosPago = [];
    this._arrayMetodosDePago = [];
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
          auxVentas.map((auxVenta)=>{
            total += auxVenta.precio
          });
          this.ventasPorMetodosPago.push({
            metodo : rst,
            items: auxVentas,
            total: total
          });
        });

        console.log(this.ventasPorMetodosPago);
      })
      .catch((err)=> this.sweetService.warning(err.error.msg) )
  }

}
