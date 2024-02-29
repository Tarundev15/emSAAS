import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SettingOneComponent } from './setting-one/setting-one.component';
@NgModule({
  declarations: [
    SettingComponent,
    SettingOneComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class SettingsModule { }
