import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';







const routes: Routes = [
  { path: "", component: CustomerDetailsComponent },
  { path: 'add-customer', component: CustomerDetailsComponent }, // Redirect to 'user'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
