import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CommonsModule } from 'src/app/common/commonsModule';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddUserComponent } from './add-user/add-user.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { AccessManagementComponent } from './access-management/access-management.component';
import { UserReportComponent } from './user-report/user-report.component';
import { SharedPipeModule } from "../../pipe/pipe";
import { SharedModule } from 'src/app/common/shared.module';
import { AccessProfileComponent } from './access-profile/access-profile.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    declarations: [
        UserComponent,
        AddUserComponent,
        ModifyUserComponent,
        AccessProfileComponent,
        ManageGroupComponent,
        AccessManagementComponent,
        UserReportComponent
    ],
    providers: [MessageService],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        ToastModule,
        CommonsModule,
        SharedPipeModule,
        SharedModule,
        TabViewModule,
        DropdownModule,
        MultiSelectModule,
        DialogModule,
        InputSwitchModule,
        ConfirmDialogModule,
        ProgressBarModule
    ]
})
export class UserModule { }
