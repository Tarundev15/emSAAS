import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { SidebarMenuComponent } from '../common/sidebar-menu/sidebar-menu.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from '../pipe/pipe';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarMenuComponent,
    FooterComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedPipeModule
  ],
  exports: [
    HeaderComponent,
    SidebarMenuComponent,
    FooterComponent,
    LoaderComponent
  ] // Export the component
})
export class CommonsModule {}
