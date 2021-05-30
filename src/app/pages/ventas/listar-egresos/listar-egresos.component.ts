import { Component, OnInit } from '@angular/core';
import { IEgreso } from 'src/app/models/egreso.model';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-listar-egresos',
  templateUrl: './listar-egresos.component.html',
  styleUrls: ['./listar-egresos.component.css']
})
export class ListarEgresosComponent implements OnInit {

  public listaEgresos:IEgreso[] = [];

  constructor(
    private ventasService: ventasService,
    private sweetService: SweetToastService
  ) { }

  ngOnInit(): void {
  this.ventasService.listarEgresos()
    .then((egresos:any)=>{
      this.listaEgresos = egresos;
    }).catch((err)=>{
      this.sweetService.warning(err.error.msg);
    });
  }

}
