import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserprofileOptionComponent } from './userprofile/userprofileOption.component';

const routes: Routes = [{ path: '', component: UserprofileOptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileOptionRoutingModule { }
