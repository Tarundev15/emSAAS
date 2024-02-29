import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { SettingOneComponent } from './setting-one/setting-one.component';

const routes: Routes = [{ path: '', component: SettingComponent },
{ path: 'one', component: SettingOneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
