import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/_services/loader.service';
import jwt_decode from 'jwt-decode';
import { CommonService } from 'src/app/_services/common.service';
import { LangPipe } from 'src/app/pipe/pipe';
import { ToastService } from 'src/app/_services/toast.service';
import { TranslationService } from 'src/assets/translation/translation.service';
declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  SignupForm: FormGroup;
  forgotpassword:FormGroup;
  RegisterForm:FormGroup;
  lang1:any='en'
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private commmonService: CommonService,
    private router: Router,
    private messageService: MessageService,
    private toastService:ToastService,
    private lang:LangPipe,
    private translationService:TranslationService,
    public loaderService: LoaderService) {
    this.SignupForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required]],
      clientId: ['', [Validators.required,this.clientIdValidator()]],
      // clientId: ['', [Validators.required,Validators.pattern('Tenant_1'&&'tenant_1'&&'Tenant_2'&&'tenant_2')]],
    });
    this.forgotpassword = this.formBuilder.group({
      email: ['', [Validators.required]],

    });
    this.RegisterForm = this.formBuilder.group({
      login: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      imageUrl: [null],
      activated: [true],
      langKey: ['en'],
      createdBy: ['system'],
      createdDate: [Date.now()],
      lastModifiedBy: ['admin20'],
      lastModifiedDate: [Date.name],
      authorities: [[], Validators.required] 
    });
    this.initializeLanguage();
    if(this.authenticationService.currentUserValue)
    {
      this.router.navigate(['eManager'])
    }
  }

  changeLanguage(newLang: string) {
    localStorage.setItem('lang', newLang);
    this.initializeLanguage();
  }

  private initializeLanguage() {
    const storedLang = localStorage.getItem('lang');
    this.lang1 = storedLang || 'en';
    this.translationService.initialize();
    this.loaderService.hideLoader();
  }

  ngOnInit(): void {

  }
  get f() { return this.SignupForm.controls; }
  get g() { return this.forgotpassword.controls; }
  get r() { return this.RegisterForm.controls; }
  isforgotPassword:boolean=false;
  isRegisterUser:boolean=false;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  clientIdValidator(): ValidatorFn {
    const allowedValues = ['Tenant_1', 'tenant_1', 'Tenant_2', 'tenant_2'];
  
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
  
      if (!allowedValues.includes(value)) {
        return { 'invalidClientId': true };
      }
  
      return null;
    };
  }
  forgot(){
    this.isforgotPassword=true;
  }
  register(){
    this.isRegisterUser=true;
  }
  login(){
    this.isforgotPassword=false;
  }


  RegisterUser() {
    const formData = this.RegisterForm.value;
    console.log('Form submitted with data:', formData);
    this.commmonService.newUserRegistration(this.RegisterForm.value)
    .pipe(first())
    .subscribe(
      data => {
        if (data.isError) {
          this.loaderService.hideLoader();
          this.messageService.add({ severity: 'warn', summary: 'warn', detail: data.responseCode });
        } else {
          this.loaderService.hideLoader();
          console.log("userdata...",data);
        }
      },
      error => {
        alert(error.error.message)
        this.loaderService.hideLoader();
    });

    // Reset the form if needed
    //this.RegisterForm.reset();
  }
  submit:boolean=false;
  // onSubmit() {
  //   this.loaderService.showLoader()
  //   this.submit=false;
  //   // if (this.SignupForm.value.clientId !== 'tennat_1') {
  //   //   this.SignupForm.get('clientId')?.setErrors({ ['invalidValue']: true });
  //   // }
  //   if (this.SignupForm.invalid) {
  //     this.submit=true;
  //     this.loaderService.hideLoader()
  //     return;
  //   }
  //   this.authenticationService.login(this.SignupForm.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
         
  //         if (data.isError) {
  //           this.loaderService.hideLoader();
  //           this.messageService.add({ severity: 'warn', summary: 'warn', detail: data.responseCode });
  //         } else {
  //           this.loaderService.hideLoader();
  //           console.log("data...",data);
  //           this.router.navigate(['/eManager']);
  //             const decodedToken: { sub: string, aud: string, auth: string, exp: number } = jwt_decode(data.id_token);
  //             //localStorage.setItem('currentUser', JSON.stringify(decodedToken));
  //             //this.SignupForm.username = decodedToken.sub; // Use 'sub' key for the username
  //             //this.clientId = decodedToken.aud; // Use 'aud' key for the client ID
  //             console.log("Decoded Token", decodedToken);
  //             // if(decodedToken.aud=="tenant_1")
  //             // {
  //             //   this.router.navigate(['/eManager']);
  //             // }
  //         }
  //       },
  //       (error: any) => {
  //         this.loaderService.hideLoader()
  
  //         // Check if there is a response data in the error object
  //         if (error.error) {
  //           // You can access the response data from error.error
  //           console.log('Error Response Data:', error.error);
  //         }
  //       })
  
  // }

  onSubmit() {
    this.loaderService.showLoader();
    this.submit = false;

    if (this.SignupForm.invalid) {
        this.submit = true;
        this.loaderService.hideLoader();
        return;
    }

    this.authenticationService.login(this.SignupForm.value)
        .pipe(first())
        .subscribe(
            data => {
                if (data.isError) {
                    this.loaderService.hideLoader();
                    if (data.responseCode === 'INVALID_EMAIL') {
                        // Show error message for invalid email
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email' });
                    } else if (data.responseCode === 'INVALID_PASSWORD') {
                        // Show error message for invalid password
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid password' });
                    } else {
                        // Generic error message
                        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: data.responseCode });
                    }
                } else {
                    this.loaderService.hideLoader();
                    console.log("data...", data);
                    this.router.navigate(['/eManager']);
                    const decodedToken: { sub: string, aud: string, auth: string, exp: number } = jwt_decode(data.id_token);
                    console.log("Decoded Token", decodedToken);
                }
            },
            (error: any) => {
              this.loaderService.hideLoader();
              if (error.error) {
                  console.log('Error Response Data:', error.error);
                  const errorMessage = error.error.message || 'Unknown error occurred';
                  // Check if the error message indicates an invalid password
                  if (errorMessage.includes('password')) {
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid password' });
                  } else {
                      // Show a generic error message
                      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
                  }
              } else {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Credentials' });
              }
            }
        );
}

}
