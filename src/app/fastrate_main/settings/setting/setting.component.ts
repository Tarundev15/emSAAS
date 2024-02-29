import { Component } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { ValidatorService } from 'src/app/_services/validator.service';
import { first, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/_services/data.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  form: FormGroup;
  issubmitted: boolean = false;
  timeZoneData: any;
  currrencyData: any;
  PreviewFile: any[] = [];
  imageBase64: any;
  messageData: any;
  settingData: any


  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private validatorService: ValidatorService,
    private messageService: MessageService,
    private dataService: DataService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      timezone: ['', Validators.required],
      email: ['', [Validators.required, validatorService.EmailValidator()]],
      currency: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', [Validators.required, validatorService.MobileNumberValidator()]],
    });
  }

  async ngOnInit() {
    this.messageData = await this.dataService.getMessageData();
    await this.bindTimeZone();
    await this.bindCurrency();
    await this.GetGeneralSettingsById();
  }


  async GetGeneralSettingsById() {
    try {
      const data = await lastValueFrom(this.commonService.GetGeneralSettingsById());
      if (data) {
        console.log(data);
        this.settingData = data;
        this.populate();
      }
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

  populate() {
    if (this.settingData) {
      this.form.controls['title'].setValue(this.settingData.generalSettingTitle);
      this.form.controls['timezone'].setValue(this.settingData.timeZoneId);
      this.form.controls['email'].setValue(this.settingData.email);
      this.form.controls['contact'].setValue(this.settingData.contactNumber);
      this.form.controls['address'].setValue(this.settingData.address);
      this.form.controls['currency'].setValue(this.settingData.currencyId);
     this.imageBase64 = this.settingData.generalSettingImage;
    }
  }

  bindTimeZone() {
    this.commonService.GetGroupData('TZ01').pipe(
      catchError(error => {
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.timeZoneData = data;
      });

  }
  bindCurrency() {
    this.commonService.GetGroupData('CU01').pipe(
      catchError(error => {
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.currrencyData = data;
      });

  }

  setFile(event: any) {
    var selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
      }
      reader.readAsDataURL(selectedFiles[0]);
      console.log("imageBase64", this.imageBase64);
    }
  }

  submitForm() {
    this.issubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    const formattedData = {
      generalSettingTitle: formData.title,
      timeZoneId: formData.timezone,
      email: formData.email,
      currencyId: formData.currency,
      contactNumber: formData.contact,
      address: formData.address,
      generalSettingImage: this.imageBase64

    }
    this.ManageGeneralSetting(formattedData);
  }

  ManageGeneralSetting(formattedData: any) {
    this.commonService.ManageGeneralSetting(formattedData)
      .pipe(
        catchError(error => {
          if (error) {
            this.messageService.add({
              severity: 'error;',
              summary: 'Failure',
              detail: 'An error occurred. Please try again later.'
            });
          }
          return throwError(error);
        })
      )
      .subscribe(data => {
        if (data.isError) {
          this.messageService.add({
            severity: 'error;',
            summary: 'Failure',
            detail: 'Something went wrong.'
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.messageData[data.responseCode]
          });
          this.issubmitted = false;


        }
      });

  }

  removeImage(file: any) {
    this.imageBase64 = null;
    file.value = null;

  }

}
