import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyManagementComponent } from './key-management/key-management.component';
import { KycComponent } from './kyc.component';
const routes: Routes = [
  {
    path: '', component: KycComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycRoutingModule { }
