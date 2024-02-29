import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { configurationComponent } from './configuration/configuration.component';
import { configurationOneComponent } from './configuration-one/configuration-one.component';
import { configurationRoutingModule } from './configuration-routing.module';
import { NumberOnlyDirective } from 'src/app/_directives/number-only.directive';
@NgModule({
  declarations: [
   configurationComponent,
  //  configurationOneComponent,
   NumberOnlyDirective
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    configurationRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class configurationModule { }
