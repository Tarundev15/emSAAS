import { Component, Inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirpopup',
  templateUrl: './confirpopup.component.html',
  styleUrls: ['./confirpopup.component.css']
})
export class ConfirpopupComponent {
  message: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router
  ) {
    this.message = this.config.data.message;
  }

  onOKClick() {
    this.ref.close();
   // this.router.navigate(['your-redirect-route']); // Replace 'your-redirect-route' with the desired route
  }
}
