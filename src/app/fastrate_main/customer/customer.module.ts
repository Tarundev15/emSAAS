import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';

import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/common/commonsModule';
import { SharedModule } from 'src/app/common/shared.module';
import { SharedPipeModule } from 'src/app/pipe/pipe';

import { ToastModule } from 'primeng/toast';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


;


@NgModule({
  declarations: [
    CustomerDetailsComponent
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    SharedPipeModule,
   
    ToastModule
    
  ]
})
export class CustomerModule { }
