import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { productoService } from 'src/app/services/producto.service';
import { SweetToastService } from 'src/app/services/sweetToast.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public idProducto!:number;
  
  public productoForm!:FormGroup;
  public gustoForm!:FormGroup;
  public productos!:ProductoModel[];

  constructor(
    private fb:FormBuilder,
    private productoService:productoService,
    private sweetService:SweetToastService
  ) { 
    this.productoForm = this.fb.group({
      marca: ['',Validators.required],
      modelo: ['',Validators.required],
      minorista: ['',[Validators.required, Validators.minLength(1)]],
      mayorista: ['',[Validators.required, Validators.minLength(1)]],
    });

    this.gustoForm = this.fb.group({
      sabor:['',Validators.required],
      stock: ['',Validators.required],
      costo: ['',[Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    this.productoService.traerTodos()
      .subscribe(( productos:any)=>{
        this.productos = productos;
        this.idProducto = this.productos[0].id;
      });
  }

  cambiarProducto($event:any){
    this.idProducto = $event.target.value;
    console.log(this.idProducto);
  }

  crearProducto(){
    let data:any = {};
    data['marca'] = this.productoForm.controls.marca.value;
    data['modelo'] = this.productoForm.controls.modelo.value;
    data['minorista'] = this.productoForm.controls.minorista.value;
    data['mayorista'] = this.productoForm.controls.mayorista.value;
    this.productoService.crearProducto(data)
      .then((rest)=>{
        this.traerProductos();
        this.productoForm.reset();
      }).catch((err)=> this.sweetService.danger(err.error.msg) );
  }

  agregarGusto(){
    let data:any = {};
    data['sabor'] = this.gustoForm.controls.sabor.value;
    data['stock'] = this.gustoForm.controls.stock.value;
    data['costo'] = this.gustoForm.controls.costo.value;
    this.productoService.agregarGusto(this.idProducto, data)
      .then((rest)=>{
        console.log(rest);
        this.gustoForm.reset();
      }).catch((err)=> this.sweetService.danger(err.error.msg) );
  }

}
