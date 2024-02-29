import { Component, OnInit,AfterViewInit } from '@angular/core';

import {FormGroup,FormControl,Validators,FormArray,FormBuilder} from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  SignupForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    this.SignupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }
  get f() { return this.SignupForm.controls; }
  onSubmit(){
    if (this.SignupForm.invalid) {
      return;
    }
     this.authenticationService.login(this.SignupForm.value)
          .pipe(first())
          .subscribe(
              data => {
                console.log('data',data.role);
                if(data){
                    this.router.navigate(['/admin']);
                   
                }else{
                  alert(data.message)
                }
              },
              error => {
                 alert(error.error.message)
              });
}


}
