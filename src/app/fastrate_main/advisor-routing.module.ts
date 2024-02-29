import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvisorComponent } from './advisor.component';
import { AddUserComponent } from './user/add-user/add-user.component';

const myRoutes: Routes = [
  {
    path: '', component: AdvisorComponent, children:
      [
        {
          path: '', loadChildren: () =>
            import('./dashboard/dashboard.module').then(m => m.DashboardModule),

        },
        {
          path: 'dashboard', loadChildren: () =>
            import('./dashboard/dashboard.module').then(m => m.DashboardModule),

        },
        {
          path: 'userManagement', loadChildren: () =>
            import('./userManagement/lead.module').then(m => m.LeadModule),

        },
        { path: 'user', loadChildren: () => 
          import('./user/user.module').then(m => m.UserModule), 
        },
        {
          path: 'configuration', loadChildren: () =>
            import('./configurations/configuration.module').then(m=>m.configurationModule)
        },
        // { path: 'user/add-user', loadChildren: () => 
        //   import('./user/add-user/add-user.module').then(m => m.AddUserModule),
        // },
        { path: 'customer', loadChildren: () => 
          import('./customer/customer.module').then(m => m.CustomerModule), 
        },
        { path: 'e-payroll', loadChildren: () => 
          import('./e-payroll/e-payroll.module').then(m => m.EPayrollModule), 
        },
        {
          path: 'project',loadChildren:()=>
          import('./project/project.module').then(m => m.ProjectModule),
        },
        {
          path: 'attendance',loadChildren:()=>
          import('./attendance/attendance.module').then(m => m.AttendanceModule),
        },

        
        // otherwise redirect to home
        { path: '*', redirectTo: '' },
      ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(myRoutes)],
  exports: [RouterModule]
})
export class AdvisorRoutingModule { }
