import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SharedPipeModule } from 'src/app/pipe/pipe';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    SharedPipeModule
  ],
  providers: [MessageService],
})
export class LoginModule { }
