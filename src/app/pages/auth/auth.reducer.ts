import { Action, createReducer, on } from '@ngrx/store';
import { usuarioCrear,usuarioEliminar } from './auth.actions';

export interface State {
    usuario: any; 
}

export const initialState: State = {
   usuario: null,
}

const _usuarioReducer = createReducer(initialState,

    on(usuarioCrear, (state,{usuario}) => ({ ...state, usuario: usuario})),
    on(usuarioEliminar, (state,) => ({ ...state, usuario: null})),

);

export function usuarioReducer(state:any, action:Action) {
    return _usuarioReducer(state, action);
}