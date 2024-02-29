import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessManagementRoutingModule } from './access-management-routing.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

import { SharedModule } from 'src/app/common/shared.module';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DropdownModule,
    AccessManagementRoutingModule,
    ToastModule
    
  ]
})
export class AccessManagementModule { }
