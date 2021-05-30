import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { ventasService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-registrar-egreso',
  templateUrl: './registrar-egreso.component.html',
  styleUrls: ['./registrar-egreso.component.css']
})
export class RegistrarEgresoComponent implements OnInit {

  public cargandoModificar:boolean = false;
  public ListametodosPagos:string[] = [];
  public egresoForm!:FormGroup;

  constructor(
    private metodosConfgService: ConfiguracionService,
    private formBuilder: FormBuilder,
    private ventasService:ventasService,
    private sweetService: SweetToastService
  ) {
    this.egresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      metodo_pago: ['', Validators.required],
      total: ['',[ Validators.required, Validators.min(0) ]],
    });
   }

  ngOnInit(): void {
    this.traerMetodosPago();
  }

  traerMetodosPago(){
    this.metodosConfgService.obtenerMetodosPago()
      .then((r)=>{
        this.ListametodosPagos = [];
        r.map((metodo)=>{
          this.ListametodosPagos.push(metodo.metodo);
        });
      }).catch(err=>{});
  }

  guardar(){
    this.cargandoModificar = true;
    let data:any = {};
    
    data['descripcion'] = this.egresoForm.controls.descripcion.value;
    data['metodo_pago'] = this.egresoForm.controls.metodo_pago.value;
    data['total'] = this.egresoForm.controls.total.value;

    this.ventasService.crearEgreso(data)
      .then((r)=>{
        this.sweetService.success('Venta actualizada correctamente!');
        this.cargandoModificar = false;
        this.egresoForm.reset();
      }).catch((err)=>{
        this.cargandoModificar = false;
        console.log(err);
        this.sweetService.danger(err.error.msg);
      });
  }

}
