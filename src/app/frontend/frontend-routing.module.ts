import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend.component';
const myRoutes: Routes = [
  {
    path: '', component: FrontendComponent, children:
      [
        { 
            path: '', loadChildren: () => 
            import('./login/login.module').then(m => m.LoginModule)   //old
        },
       
    
        {
          path: 'verify', loadChildren: () =>
            import('./verify/verify.module').then(m => m.verifyModule)   //new
        },
        {
          path: 'contact', loadChildren: () =>
            import('./contact/contact.module').then(m => m.ContactModule)   //new
        },
        {
          path: 'blog', loadChildren: () =>
            import('./blog/blog.module').then(m => m.BlogModule)   //new
        },
        {
          path: 'news', loadChildren: () =>
            import('./news/news.module').then(m => m.NewsModule)   //new
        },
        { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'otp-verification', loadChildren: () => import('./otp-verification/otp-verification.module').then(m => m.OtpVerificationModule) },
        { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
        { path: '*', redirectTo: '' },
        // { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(myRoutes)], // changed forRoot with forChild
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
