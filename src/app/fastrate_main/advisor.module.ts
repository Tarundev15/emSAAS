import { NgModule } from '@angular/core';

import { AdvisorRoutingModule } from './advisor-routing.module';
import { AdvisorComponent } from './advisor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipeModule } from '../pipe/pipe';
import { CommonsModule } from '../common/commonsModule';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AdvisorComponent,

    // AdvanceSearchComponent,
  ],
  providers: [MessageService],
  imports: [
   CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdvisorRoutingModule,
   CommonsModule,
    SharedPipeModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    // SharedModule
   
  ]
})
export class AdvisorModule { }
