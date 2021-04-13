import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import SweetAlert from "sweetalert2";

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  public listaMetodos:any[] = [];
  public formControl:FormGroup;

  constructor(
    private fb: FormBuilder,
    private metodos: ConfiguracionService,
    private sweetService: SweetToastService
  ) { 
    this.formControl = fb.group({
      inputMetodo: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.traerTodos();
  }

  traerTodos(){
    this.metodos.obtenerMetodosPago()
      .then((r:any)=>{
        this.listaMetodos = [];
        this.listaMetodos = r;
      })
      .catch((err)=> this.sweetService.warning(err.error.msg) );
  }

  crearMetodo(){
    this.metodos.crearMetodoPago(this.formControl.controls['inputMetodo'].value)
      .then((rst)=>{
        this.formControl.reset();
        this.sweetService.success('Metodo creado');
        this.traerTodos();
      }).catch((err)=> this.sweetService.danger(err.error.msg));
  }

  borrarMetodo(item:any){
    SweetAlert.fire({
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      position: 'center',
      text: `Quiere eliminar: ${item.metodo} ?`,
      
    }).then((resultado)=>{

      if( resultado.isConfirmed ){

        this.metodos.eliminarMetodo(item.id)
        .then((rst)=>{
          this.sweetService.success('Metodo eliminado');
          this.traerTodos();
        })
        .catch((err)=> this.sweetService.danger(err.error.msg))
      }
    });
  }

}
