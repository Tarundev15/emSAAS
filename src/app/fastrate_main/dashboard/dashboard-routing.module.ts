import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

// const routes: Routes = [
//   {
//     path: '', component: DashboardComponent, children:
//       [
//         {
//           path: 'Kyc', loadChildren: () =>
//             import('../kyc/kyc.module').then(m => m.KycModule),

//         }

//       ]
//   },


// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
