import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { MessageService, SharedModule } from 'primeng/api';
import { SharedPipeModule } from 'src/app/pipe/pipe';
import { CommonsModule } from 'src/app/common/commonsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProjectComponent
  ],
  providers: [MessageService],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    SharedPipeModule,
    SharedModule
  ]
})
export class ProjectModule { }
