import { Component,OnInit,AfterViewInit  } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'CrezApp';
  ngOnInit(): void {
   localStorage.setItem("lang","en")
    //  localStorage.removeItem('lang') 
  }
  
}
