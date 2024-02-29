import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAssignmentComponent } from './emp-assignment/emp-assignment.component';

const routes: Routes = [
  { path: "", component: EmpAssignmentComponent },
  { path: 'emp-assignment', component: EmpAssignmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EPayrollRoutingModule { }
