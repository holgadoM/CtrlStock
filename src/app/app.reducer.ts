import { ActionReducerMap } from '@ngrx/store';
import * as uiReduce from '../app/shared/ui.reduce';
import * as usuarioReduce from "../app/pages/auth/auth.reducer";


export interface AppState {
   ui: uiReduce.State,
   usuario: usuarioReduce.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReduce.uiReducer ,
   usuario: usuarioReduce.usuarioReducer
}