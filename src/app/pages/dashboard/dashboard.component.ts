import { Component, OnInit,  } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[
    trigger('AbiertoCerrado',[
      state('abierto',style({
        opacity: 1,
        display: 'block'
      })),
      state('cerrado', style({
        opacity:0,
        display: 'none'
      })),
      transition('abierto => cerrado', [ animate('.3s') ]),
      transition('cerrado => abierto', [ animate('.3s') ])
    ])
  ]
  
})
export class DashboardComponent implements OnInit {

  public AbiertoCerrado:boolean = true;

  constructor(
    private _store:Store<AppState>
  ) { 
    this._store.select('ui').subscribe(({sidebarEstado})=>{
      this.AbiertoCerrado = sidebarEstado;
    });
  }

  ngOnInit(): void {
  }

}
