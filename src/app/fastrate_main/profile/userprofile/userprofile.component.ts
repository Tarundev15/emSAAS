import { Component } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { ValidatorService } from 'src/app/_services/validator.service';
import { first, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/_services/data.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent {
  form: FormGroup;
  issubmitted: boolean = false;
  loading: boolean = false;
  profileImage: any;
  Avatar: boolean = true;
  profileData: any;
  messageData: any
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private validatorService: ValidatorService,
    private messageService: MessageService,
    private dataService: DataService) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      businessName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.messageData = await this.dataService.getMessageData();
    await this.GetProfileDetailsById();
  }
  async GetProfileDetailsById() {
    try {
      const data = await lastValueFrom(this.commonService.GetProfileDetailsById());
      if (data) {
        if (data.profileLogoImage) {
          this.Avatar = false;
        }

        this.profileData = data;
        this.populate();
      }
      console.log(this.profileData);
    } catch (error) {
      if (error) {
        console.log(error);
        this.messageService.add({
          severity: 'error;',
          summary: 'Failure',
          detail: 'An error occurred. Please try again later.'
        });
      }
    }
  }
  setFile(event: any): void {
    var selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.Avatar = false;
      }
      reader.readAsDataURL(selectedFiles[0]);
      console.log("serviceImage", this.form.value.serviceImage);
    }

  }
  populate() {
    if (this.profileData) {
      this.form.controls['firstName'].setValue(this.profileData.firstName);
      this.form.controls['lastName'].setValue(this.profileData.lastName);
      this.form.controls['email'].setValue(this.profileData.email);
      this.form.controls['businessName'].setValue(this.profileData.businessName);
      this.form.controls['address'].setValue(this.profileData.address);
      this.profileImage = this.profileData.profileLogoImage;
    }
  }

  submitForm() {
    this.issubmitted = true;
    if (this.form.invalid)
      return;
    const formData = this.form.value;
    const formattedData = {
      accountId: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      businessName: formData.businessName,
      address: formData.address,
      profileLogoImage: this.profileImage,
      status: "",
      statusCode: ""
    }
    this.manageProfile(formattedData);
  }


  manageProfile(formattedData: any) {
    this.commonService.ManageProfile(formattedData)
      .pipe(
        catchError(error => {
          // Display an error message or perform other actions based on the error response
          if (error) {
            this.messageService.add({
              severity: 'error;',
              summary: 'Failure',
              detail: 'An error occurred. Please try again later.'
            });
          }
          this.loading = false; // Stop the loading spinner
          return throwError(error);
        })
      )
      .subscribe(data => {
        if (data.isError) {
          this.messageService.add({
            severity: 'error;',
            summary: 'Failure',
            detail: this.messageData[data.responseCode]
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.messageData[data.responseCode]
          });
          this.loading = false;
          this.issubmitted = false;
        }
      });
  }

}
