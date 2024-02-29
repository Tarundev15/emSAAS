import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadaddComponent } from './leadadd/leadadd.component';
import { LeadlistComponent } from './leadlist/leadlist.component';
const routes: Routes = [
  {
    path: '', component: LeadlistComponent
  },
  {
    path: 'add', component: LeadaddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
