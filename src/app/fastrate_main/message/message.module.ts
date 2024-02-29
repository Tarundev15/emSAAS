import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule
  ]
})
export class MessageModule { }
