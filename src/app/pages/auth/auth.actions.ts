import { createAction, props } from '@ngrx/store';

export const usuarioCrear = createAction( '[USUARIO] CrearUsuario', props<{ usuario: any }>() );
export const usuarioEliminar = createAction( '[USUARIO] EliminarUsuario' );