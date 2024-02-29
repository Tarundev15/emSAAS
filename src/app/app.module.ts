import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ConfirpopupComponent } from './common/popup/confirpopup/confirpopup.component';
import { LoaderService } from './_services/loader.service';
import { TranslationService } from '../assets/translation/translation.service';
import { SharedPipeModule } from './pipe/pipe';



@NgModule({
  declarations: [
    AppComponent,
    ConfirpopupComponent,
    

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedPipeModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard,LoaderService,TranslationService,
     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
