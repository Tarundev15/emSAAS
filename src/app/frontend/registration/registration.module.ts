import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CommonsModule } from "../../common/commonsModule";
@NgModule({
    declarations: [
        RegistrationComponent
    ],
    providers: [MessageService],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        ToastModule,
        CommonsModule
    ]
})
export class RegistrationModule { }