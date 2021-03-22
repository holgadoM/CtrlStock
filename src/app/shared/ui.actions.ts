import { createAction, props } from '@ngrx/store';

export const sidebarAbrirCerrar = createAction( '[SIDEBAR] AbrirCerrar', props<{ sidebarEstado: boolean }>() );