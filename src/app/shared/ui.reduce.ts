import { createReducer, on, Action } from '@ngrx/store';
import { sidebarAbrirCerrar } from './ui.actions';

export interface State {
    sidebarEstado: boolean; 
}

export const initialState: State = {
    sidebarEstado: true,
}

const _uiReducer = createReducer(initialState,

    on(sidebarAbrirCerrar  , (state,{sidebarEstado}) => ({ ...state, sidebarEstado: sidebarEstado})),

);

export function uiReducer(state:any, action:Action) {
    return _uiReducer(state, action);
}