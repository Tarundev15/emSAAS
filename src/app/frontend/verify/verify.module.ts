import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './verify-routing.module';
import {  VerifyComponent } from './verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
   
    ReactiveFormsModule,
    FormsModule,
    AboutusRoutingModule
  ]
})
export class verifyModule { }
