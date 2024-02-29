import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { KeyManagementComponent } from './key-management/key-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycComponent } from './kyc.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    KeyManagementComponent,
    KycListComponent,
    KycComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KycRoutingModule,
    ReactiveFormsModule,
    MessagesModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class KycModule { }
