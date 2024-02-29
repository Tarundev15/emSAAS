import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { FillMOAFComponent } from './fill-moaf/fill-moaf.component';
import { RegularizeAttendanceComponent } from './regularize-attendance/regularize-attendance.component';
import { ApproveAttendanceComponent } from './approve-attendance/approve-attendance.component';
import { ShiftRosterComponent } from './shift-roster/shift-roster.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { AssignShiftComponent } from './assign-shift/assign-shift.component';

const routes: Routes = [
  {
    path: 'view-attendance', component: ViewAttendanceComponent
  },
  {
    path: 'fill-moaf', component: FillMOAFComponent
  },
  {
    path: 'regularize-attendance', component: RegularizeAttendanceComponent
  },
  {
    path: 'approve-attendance', component: ApproveAttendanceComponent
  },
  {
    path: 'assign-shift', component: AssignShiftComponent
  },
  {
    path: 'view-report', component: ViewReportComponent
  },
  {
    path: 'shift-roster', component: ShiftRosterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
