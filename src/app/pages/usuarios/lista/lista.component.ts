import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  tipoInput:string = "password";
  usuarios:UsuarioModel[] = [];

  constructor(
    private fb:FormBuilder,
    private usuaruiService: UsuarioService,
    private _sweetService: SweetToastService
  ) { 
    this.usuarioForm = this.fb.group({
      usuario:['',Validators.required],
      nombre:['',Validators.required],
      clave:['',Validators.required],
      esAdmin:[]
    });
  }

  ngOnInit(): void {
    this.traerTodos();
  }

  traerTodos(){
    this.usuaruiService.listarUsuarios()
      .then(( usuarios:any )=>{
        this.usuarios = usuarios;
      }).catch((err)=> console.log(err));
  }

  guardar(){

  }

  cambiarAdmin(usuario:UsuarioModel){

  }

  cambiarInput(){
    if( this.tipoInput == 'password' ){
      this.tipoInput = "text";
    }else{
      this.tipoInput = 'password';
    }
  }

  crearUsuario(){
    let data:any = {};
    data['usuario'] = this.usuarioForm.controls.usuario.value;
    data['nombre'] = this.usuarioForm.controls.nombre.value;
    data['clave'] = this.usuarioForm.controls.clave.value;
    data['esAdmin'] = this.usuarioForm.controls.esAdmin.value;
    this.usuaruiService.registrarUsuario(data)
      .then((user)=>{
        this._sweetService.success(`Usuario ${data['usuario']} creado!`);
        this.usuarioForm.reset();
        this.traerTodos();
      }).catch((err)=>{
        this._sweetService.danger(err.error.msg);
      });
  }

  borrar(item:any){
    console.log(item);
  }

}