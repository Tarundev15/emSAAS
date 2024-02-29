import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileOptionRoutingModule } from './profileOption-routing.module';

import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserprofileOptionComponent } from './userprofile/userprofileOption.component';

@NgModule({
  declarations: [
    UserprofileOptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfileOptionRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class ProfileModule { }
