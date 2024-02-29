import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../_services/common.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { first,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../../_services/data.service';
import { async } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit  {
  otp: string = '';
  mobileNumber:any;
  submitted:boolean=false;
  loading:boolean=false;
  error:any;
  errorMessage:any;
  messageData:any;
  @ViewChild('otpInput1', { read: ElementRef }) otpInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput2', { read: ElementRef }) otpInput2!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput3', { read: ElementRef }) otpInput3!: ElementRef<HTMLInputElement>;
  @ViewChild('otpInput4', { read: ElementRef }) otpInput4!: ElementRef<HTMLInputElement>;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private commonService:CommonService,
    private router:Router,
    private dataService:DataService,
    private messageService: MessageService
    ) {}
  
   async ngOnInit() {
      // Retrieve the otp value from the query parameter
      this.activatedRoute.queryParams.subscribe((params) => {
        this.mobileNumber = params['mobileNumber'];
      });
  
      this.messageData=await this.dataService.getMessageData();
      //console.log('messageData',this.messageData);
    }
  
  onOtpInputChange(event: any, digit: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    if (value.length === 1) {
      // Move focus to the next input field
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      } else {
        // If it's the last input field, trigger verification or next step
        // You can add your logic here
      }
      
      // Update the OTP value
      this.updateOtpValue(digit, value);
    } else if (value.length === 0) {
      // Move focus to the previous input field
      const previousInput = input.previousElementSibling as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
      
      // Update the OTP value
      this.updateOtpValue(digit, '');
    }
  }

  updateOtpValue(digit: number, value: string) {
    // Update the OTP value at the specific digit position
    const otpArray = this.otp.split('');
    otpArray[digit - 1] = value;
    this.otp = otpArray.join('');
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
        mobileNumber: this.mobileNumber
      };
  
      const data = await this.commonService.verifyOTP(param).toPromise();
      if (data.isError) {
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: this.messageData[data.responseCode] })
      }
      else{
        localStorage.setItem('currentUser', JSON.stringify(data.data));
        this.router.navigate(['/admin/kyc']);

      }
      
    } catch (error) {
      console.log('Login error:', error);
     
    } finally {
      this.loading = false; // Stop the loading spinner
    }
  
   
  }
  


  
  getEnteredOtp(): string {
    const otpInput1Value = this.otpInput1 ? this.otpInput1.nativeElement.value : '';
    const otpInput2Value = this.otpInput2 ? this.otpInput2.nativeElement.value : '';
    const otpInput3Value = this.otpInput3 ? this.otpInput3.nativeElement.value : '';
    const otpInput4Value = this.otpInput4 ? this.otpInput4.nativeElement.value : '';
  
    return otpInput1Value + otpInput2Value + otpInput3Value + otpInput4Value;
  }
  
}
