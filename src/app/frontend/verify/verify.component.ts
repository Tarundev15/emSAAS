import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aboutus',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  resetForm:FormGroup
  constructor( private formBuilder: FormBuilder){
    this.resetForm= this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.resetForm.controls; }
  resetpassword:boolean=false;
  reset(){
    this.resetpassword=true;
  }
  onSubmit(){

  }
}
