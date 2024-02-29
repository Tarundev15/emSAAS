
import { NgModule } from '@angular/core';
import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../common/commonsModule';
import { CalendarModule } from 'primeng/calendar';
// import { UserComponent } from './user/user.component';
// import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
  declarations: [
    FrontendComponent,
    // UserComponent,
    // VerifyEmailComponent,
  ],
  imports: [
   
    HttpClientModule,
    //BrowserAnimationsModule,
    FrontendRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CommonsModule

  ],
  exports: [RouterModule],

  providers: [
     
   ],
  bootstrap: [FrontendComponent]
})
export class FrontendModule { }
