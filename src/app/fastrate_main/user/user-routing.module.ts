import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { AccessManagementComponent } from './access-management/access-management.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { AccessProfileComponent } from './access-profile/access-profile.component';
import { UserReportComponent } from './user-report/user-report.component';

// const routes: Routes = [{ path: '', component: UserComponent }];
const routes: Routes = [
  // { path: '', component: UserComponent }, // Actual route for 'user'
  { path: "", component: ModifyUserComponent },
  { path: 'add-user', component: AddUserComponent }, // Redirect to 'user'
  { path: 'user-details', component: ModifyUserComponent }, // Redirect to 'user'
  { path: 'access-management', component: AccessManagementComponent }, // Redirect to 'user'
  { path: 'manage-group', component: ManageGroupComponent }, // Redirect to 'user'
  { path: 'access-profile', component: AccessProfileComponent }, // Redirect to 'user'
  { path: 'access-profil/:profile_OPTION_ID', component: AccessProfileComponent },
  { path: 'user-report', component: UserReportComponent }, // Redirect to 'user'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
