import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { configurationComponent } from './configuration/configuration.component';
import { configurationOneComponent } from './configuration-one/configuration-one.component';

const routes: Routes = [
  { path: "", component: configurationComponent },
{ path: "lookup-configuration", component: configurationComponent },
// { path: 'one', component: configurationOneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class configurationRoutingModule { }
