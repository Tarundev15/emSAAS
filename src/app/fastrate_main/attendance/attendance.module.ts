import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { MessageService, SharedModule } from 'primeng/api';
import { SharedPipeModule } from 'src/app/pipe/pipe';
import { CommonsModule } from 'src/app/common/commonsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FillMOAFComponent } from './fill-moaf/fill-moaf.component';
import { RegularizeAttendanceComponent } from './regularize-attendance/regularize-attendance.component';
import { ApproveAttendanceComponent } from './approve-attendance/approve-attendance.component';
import { AssignShiftComponent } from './assign-shift/assign-shift.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ShiftRosterComponent } from './shift-roster/shift-roster.component';


@NgModule({
  declarations: [
    ViewAttendanceComponent,
    FillMOAFComponent,
    RegularizeAttendanceComponent,
    ApproveAttendanceComponent,
    AssignShiftComponent,
    ViewReportComponent,
    ShiftRosterComponent
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    SharedPipeModule,
    SharedModule
  ]
})
export class AttendanceModule { }
