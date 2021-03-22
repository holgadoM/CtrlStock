import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SweetToastService } from 'src/app/services/sweetToast.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as actions from "../auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  cargando:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private swalService: SweetToastService,
    private store:Store<AppState>,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [ Validators.required, Validators.minLength(3) ]],
      clave: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  login(){
    this.usuarioService.login( this.loginForm.controls.usuario.value, this.loginForm.controls.clave.value  )
      .then((r:any)=>{
        localStorage.setItem('tokenStock', r.token);
        this.store.dispatch( actions.usuarioCrear({ usuario: r.usuario }) );
        this.router.navigate(['']);
      })
      .catch((err)=>{
        this.swalService.danger(err.error.msg);
      });
  }

}
