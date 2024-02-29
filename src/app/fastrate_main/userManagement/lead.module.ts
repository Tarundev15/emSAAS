import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadaddComponent } from './leadadd/leadadd.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LeadlistComponent } from './leadlist/leadlist.component';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MobileNumberDirective } from 'src/app/_directives/mobile-number.directive';
import { CharNumericOnlyDirective } from 'src/app/_directives/char-numeric-only.directive';




@NgModule({
  declarations: [
    LeadaddComponent,
    LeadlistComponent,
    MobileNumberDirective,
    CharNumericOnlyDirective
  ],
  imports: [
    CommonModule,
    
    LeadRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    CascadeSelectModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    SelectButtonModule,
    PaginatorModule
  ],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class LeadModule { }
