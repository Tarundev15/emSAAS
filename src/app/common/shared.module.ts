
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvanceSearchComponent } from '../fastrate_main/advance-search/advance-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
// import {PaginationComponent} from '../common/pagination/pagination.component'
// import {LookupCodeComponent} from '../common/dialog-box/lookup-code/lookup-code.component';
// import { LoaderComponent } from './loader/loader.component';
import { SharedPipeModule } from '../pipe/pipe';
import { LoaderComponent } from './loader/loader.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import { ToastmessageComponent } from './toastmessage/toastmessage.component'
@NgModule({
  declarations: [
    AdvanceSearchComponent,
    PaginationComponent,
    NotFoundComponent,
    // LookupCodeComponent,
    // LoaderComponent,
   // ToastmessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedPipeModule
  ],
  exports: [
    AdvanceSearchComponent,
    PaginationComponent,
    // LookupCodeComponent,
    //ToastmessageComponent
  ]
})
export class SharedModule {}