import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedPipeModule } from "../../pipe/pipe";
//import {ToastModule} from 'primeng/toast';
@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule,
        CardModule,
        FullCalendarModule,
        SharedPipeModule
    ]
})
export class DashboardModule { }
