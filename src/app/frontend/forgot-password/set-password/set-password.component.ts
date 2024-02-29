import { Component,OnInit,ViewChild,ElementRef,Input  } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder} from '@angular/forms';
import { CommonService } from '../../../_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../_services/data.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit{
  form:FormGroup; 
  submitted:boolean=false;
  loading:boolean=false;
  messageData:any;
  errorMessage:any;
  @Input() token: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private messageService: MessageService,
    private dataService:DataService,
  ) { 
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },{ validator: this.passwordMatchValidator.bind(this) }
    );
  }
  async ngOnInit() {
    console.log('token',this.token);
    this.messageData=await this.dataService.getMessageData();
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  submitForm() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this.commonService.updatePassword(this.form.value,this.token)
    .pipe(
      catchError(error => {
         // Handle the error here
         console.log('Login error:', error);
         // Display an error message or perform other actions based on the error response
         if (error.status === 400 && error.error && error.error.message) {
           this.errorMessage = error.error.message;
         } else {
           this.errorMessage = 'An error occurred. Please try again later.';
         }
        // this.commonService.showToast(this.errorMessage,'danger');
         this.loading = false; // Stop the loading spinner
         return throwError(error);
      })
    )
    .subscribe(async(data) => {
      if(data.isError){
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: this.messageData[data.responseCode] })
      }
      else{
        const delayTime = 2000;
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Password updated successfully' });
        // Start the timer and perform the action after the delay
        timer(delayTime).subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
      this.loading = false;
    });
  }
}
