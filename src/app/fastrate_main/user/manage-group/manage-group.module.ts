import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageGroupRoutingModule } from './manage-group-routing.module';
import { ManageGroupComponent } from './manage-group.component';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPipeModule } from 'src/app/pipe/pipe';


@NgModule({
  declarations: [
    // ManageGroupComponent
  ],
  imports: [
    CommonModule,
    SharedPipeModule,
    ReactiveFormsModule,
    ToastModule,
    CascadeSelectModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    SelectButtonModule,
    PaginatorModule,
    SharedModule,
    ManageGroupRoutingModule,
    // DropdownModule,
    FormsModule,
  ],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class ManageGroupModule { }
