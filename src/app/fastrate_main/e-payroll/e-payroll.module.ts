import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EPayrollRoutingModule } from './e-payroll-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from 'src/app/common/commonsModule';
import { SharedPipeModule } from 'src/app/pipe/pipe';
import { MessageService, SharedModule } from 'primeng/api';
import { EmpAssignmentComponent } from './emp-assignment/emp-assignment.component';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { DockModule } from 'primeng/dock';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
@NgModule({
  declarations: [
    EmpAssignmentComponent
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    EPayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    SharedPipeModule,
    SharedModule,
    ToastModule,
    TabViewModule,
    PasswordModule,
    MenuModule,
    DockModule,
    FieldsetModule,
    AvatarModule
  ]
})
export class EPayrollModule { }
