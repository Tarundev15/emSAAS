import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpAssignmentRoutingModule } from './emp-assignment-routing.module';
import { EmpAssignmentComponent } from './emp-assignment.component';
import { SharedPipeModule } from "../../../pipe/pipe";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EmpAssignmentRoutingModule,
        SharedPipeModule
    ]
})
export class EmpAssignmentModule { }
