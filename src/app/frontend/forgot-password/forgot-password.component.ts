import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators,FormArray,FormBuilder} from '@angular/forms';
import { CommonService } from '../../_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MessageService } from 'primeng/api';
import { DataService } from '../../_services/data.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  SignupForm:FormGroup;
  submitted:boolean=false;
  loading:boolean=false;
  errorMessage:any;
  messageData:any;
  isShowOtp:boolean=false;
  otpIsVerify:boolean=false;
  jwtToken:any;
  @ViewChild('otpInput1', { read: ElementRef }) otpInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput2', { read: ElementRef }) otpInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput3', { read: ElementRef }) otpInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput4', { read: ElementRef }) otpInput4!: ElementRef<HTMLInputElement>;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private messageService: MessageService,
    private dataService:DataService,
  ) { 
    this.SignupForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required]]
    });
  }
  async ngOnInit() {
    this.messageData=await this.dataService.getMessageData();
  }
  get f() { return this.SignupForm.controls; }
  onSubmit(){
    console.log('this.SignupForm.value',this.SignupForm.value.mobileNumber);
    this.submitted = true;
    if (this.SignupForm.invalid) {
      return;
    }
    this.loading = true;
    if(this.isShowOtp){
       this.verifyOtp();
    }else{
      this.commonService.ResendOTP(this.SignupForm.value.mobileNumber,'forgot password otp')
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
          this.isShowOtp=true;
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'OTP is sent Your Mobile Number' })
         // this.router.navigate(['/otp-verification'], { queryParams: { mobileNumber: this.form.value.mobileNumber } });
        }
        this.loading = false;
      });
    }
   
    
   
  }
  getEnteredOtp(): string {
    const otpInput1Value = this.otpInput1 ? this.otpInput1.nativeElement.value : '';
    const otpInput2Value = this.otpInput2 ? this.otpInput2.nativeElement.value : '';
    const otpInput3Value = this.otpInput3 ? this.otpInput3.nativeElement.value : '';
    const otpInput4Value = this.otpInput4 ? this.otpInput4.nativeElement.value : '';
  
    return otpInput1Value + otpInput2Value + otpInput3Value + otpInput4Value;
  }
  async verifyOtp() {
    const otp = this.getEnteredOtp(); 
    // Validate the OTP value
    if (otp.length !== 4) {
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Please enter a 4-digit OTP' })
      return;
    }
     try {
      const param = {
        token: otp,
        mobileNumber: this.SignupForm.value.mobileNumber
      };
  
      const data = await this.commonService.verifyOTP(param).toPromise();
      if (data.isError) {
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: this.messageData[data.responseCode] })
      }
      else{
        this.jwtToken=data.data.jwtToken;
        this.otpIsVerify=true;
        // localStorage.setItem('currentUser', JSON.stringify(data.data));
        //this.router.navigate(['/admin/kyc']);

      }
      
    } catch (error) {
      console.log('Login error:', error);
     
    } finally {
      this.loading = false; // Stop the loading spinner
    }
  
   
  }
  onKeyDown(event: KeyboardEvent, nextInput?: ElementRef): void {
    // Check if the current input has a value and the event key is not a navigation key (ArrowLeft, ArrowRight, etc.)
    if (event.target instanceof HTMLInputElement && event.target.value && !event.key.startsWith('Arrow')) {
      if (nextInput) {
        // Move the focus to the next input field
        nextInput.nativeElement.focus();
      }
    }
  }
}
