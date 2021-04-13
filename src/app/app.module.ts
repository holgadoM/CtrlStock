import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';
import { AuthModule } from './pages/auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpInterceptorService } from './services/http-interceptor.service';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

export function tokenGetter() {
  return localStorage.getItem("tokenStock");
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers,{}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
    },
    {provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent],
  exports:[
    BrowserModule
  ]
})
export class AppModule { }
