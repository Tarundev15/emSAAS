import { Component,OnInit,Inject,ElementRef,EventEmitter,Output,Input} from '@angular/core';
import {DOCUMENT} from '@angular/common';
@Component({
  selector: 'frontend-root',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
  title = 'woom';
  opened = true;
  toggle(): void {
    this.opened = !this.opened;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _el: ElementRef
    ) {
      
     }

    ngOnInit() {
   

    }
   
    
  }
