import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { NotFoundComponent } from './common/not-found/not-found.component';
const routes: Routes = [
 
  { 
    path: '', loadChildren: () => 
    import('./frontend/frontend.module').then(m => m.FrontendModule)
  },
 
  { 
    path: 'eManager', loadChildren: () => import('./fastrate_main/advisor.module').then(m => m.AdvisorModule),
   // canActivateChild: [AuthGuard],
  },
  {
    path: 'userManagement', loadChildren: () =>
      import('./fastrate_main/userManagement/lead.module').then(m => m.LeadModule),
  },
  { path: 'user', loadChildren: () => 
    import('./fastrate_main/user/user.module').then(m => m.UserModule) 
  },
  // {
  //   path: 'configuration/lookup-configuration', loadChildren: () =>
  //     import('./fastrate_main/configurations/configuration.module').then(m => m.configurationModule),
  // },
  
  {
    path:'not-found', component:NotFoundComponent
  },
  
  // otherwise redirect to home
  { path: '**', redirectTo: 'not-found' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
