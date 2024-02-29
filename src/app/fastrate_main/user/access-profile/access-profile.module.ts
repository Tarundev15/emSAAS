import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessProfileRoutingModule } from './access-profile-routing.module';
import { AccessProfileComponent } from './access-profile.component';
import { CommonsModule } from "../../../common/commonsModule";


@NgModule({
    declarations: [
        // AccessProfileComponent
    ],
    imports: [
        CommonModule,
        AccessProfileRoutingModule,
        CommonsModule
    ]
})
export class AccessProfileModule { }
