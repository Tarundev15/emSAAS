import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/_services/common.service';
import { first, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DataService } from 'src/app/_services/data.service';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/_services/validator.service';
import { LoaderService } from 'src/app/_services/loader.service';
interface accountDocuments {
  "accountDocumentID": 0,
  "accountID": 0,
  "documentNumber": "string",
  "documentFileFolder": "string",
  "documentFileName": "string",
  "documentFileExt": "string",
  "documentType": "string",
  "status": "string",
  "statusCode": "string",
  "documentDisplayName": "string"
}


@Component({
  selector: 'app-key-management',
  templateUrl: './key-management.component.html',
  styleUrls: ['./key-management.component.css']
})
export class KeyManagementComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  error: any;
  errorMessage: any;
  dropdownData: any;
  stateData: any;
  cityData: any;
  panImages: any;
  aadhaarCardImages: any;
  otherDocumentImages: any
  previews: string[] = [];
  selectedFiles: any;
  selectedFileNames: any;
  dataIntoBit: { key: string; value: string; }[] = []; // Initialize an empty array
  messageData: any;
  kycData: any;
  accountDocuments: any = [];
  isEditmode: boolean = false;
  pancarddoc: any;
  aadhaarDoc: any;
  otherDoc: any;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    private messageService: MessageService,
    private validatorService: ValidatorService,
    public loaderService: LoaderService
  ) {

    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      bussinessName: ['', Validators.required],
      gstNumber: [''],
      pannumber: [''],
      address1: ['', Validators.required],
      pinCode: ['', [Validators.required, validatorService.zipCodeValidator()]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['GTGC0014'],  // for time being it passes hard coded for india
      statusCode: [''],
      pancarddocs: [''],
      panCardNumber: ['', validatorService.panCardValidator()],
      aadhaarCarddocs: ['', [Validators.required, validatorService.fileTypeValidator(['png', 'jpg', 'pdf', 'doc'])]],
      aadhaarCardNumber: ['', [Validators.required, validatorService.aadhaarCardValidator()]],
      otherDocument: [''],
    });
  }

  async ngOnInit() {

    this.messageData = await this.dataService.getMessageData();
    this.commonService.GetGroupData('ST01').pipe(
      catchError(error => {
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.stateData = data;
      });

    //to populate data on kyc page
    this.GetKYCDocumentListById();


  }

  GetKYCDocumentListById() {
    const items =
    {
      searchValue: "",
      sortColumn: "",
      sortOrder: "",
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      status: 'A'
    }
    this.commonService.GetKYCDocumentListById(items).pipe(
      catchError(error => {
        // Display an error message or perform other actions based on the error response
        if (error.status === 400 && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        //this.loading = false; // Stop the loading spinner
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.kycData = data;
        this.autoFillKycForm();
      })
  }


  get f() {
    return this.form.controls;
  }


  submitForm() {
    this.submitted = true;
    if (this.form.invalid)
      return;
    this.loaderService.showLoader();
    // Handle form submission
    if (this.form.valid) {
      const currentUser = this.authenticationService.currentUserValue;
      const id = currentUser.id;

      const formData = this.form.value;
      this.setDocsData(id, formData);

      const formattedData = {
        accountID: id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bussinessName: formData.bussinessName,
        gstNumber: formData.gstNumber,
        pannumber: formData.pannumber,
        address1: formData.address1,
        address2: '',
        pinCode: formData.pinCode,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        accountDocuments: this.accountDocuments
      };
      this.ManageKYCAccountProfile(formattedData);
    }
  }

  ManageKYCAccountProfile(formattedData: any) {
    this.commonService.ManageKYCAccountProfile(formattedData)
      .pipe(
        catchError(error => {
          this.loaderService.hideLoader();
          if (error.status === 400 && error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          this.loading = false; // Stop the loading spinner
          return throwError(error);
        })
      )
      .subscribe(data => {
        this.loaderService.hideLoader();
        if (data.isError) {
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.messageData[data.responseCode]
          });
          this.loading = false;
          this.form.reset();
          this.submitted = false;
          this.aadhaarCardImages = null;
          this.panImages = null;
          this.otherDocumentImages = null;
          location.reload();
        }

      });
  }
  setDocsData(id: any, formData: any) {
    let accountDocId = 0
    if (this.pancarddoc || formData.panCardNumber) {

      const documentIndex = this.accountDocuments.findIndex(
        (doc: any) => doc.documentType === 'pancard'
      );

      if (this.isEditmode && documentIndex !== -1)
        accountDocId = this.accountDocuments[documentIndex].accountDocumentID;
      const items =
      {
        accountDocumentID: this.isEditmode ? accountDocId : 0,
        accountID: id,
        documentNumber: formData.panCardNumber,
        documentFileFolder: "",
        documentFileName: this.pancarddoc,
        documentFileExt: "",
        documentType: "pancard",
        status: "",
        statusCode: "",
        documentDisplayName: ""
      }
      if (documentIndex !== -1) {
        // Update the specific document object
        this.accountDocuments[documentIndex] = items;
      }
      else {
        this.accountDocuments.push(items)
      }
    }

    if (this.aadhaarDoc || formData.aadhaarCardNumber) {
      accountDocId = 0
      const documentIndex = this.accountDocuments.findIndex(
        (doc: any) => doc.documentType === 'aadhaar'
      );
      if (this.isEditmode && documentIndex !== -1)
        accountDocId = this.accountDocuments[documentIndex].accountDocumentID;
      const items =
      {
        accountDocumentID: this.isEditmode ? accountDocId : 0,
        accountID: id,
        documentNumber: formData.aadhaarCardNumber,
        documentFileFolder: "",
        documentFileName: this.aadhaarDoc,
        documentFileExt: "",
        documentType: "aadhaar",
        status: "",
        statusCode: "",
        documentDisplayName: ""
      }
      if (documentIndex !== -1) {
        // Update the specific document object
        this.accountDocuments[documentIndex] = items;
      }
      else {
        this.accountDocuments.push(items)
      }
    }

    if (this.otherDoc) {
      accountDocId = 0
      const documentIndex = this.accountDocuments.findIndex(
        (doc: any) => doc.documentType === 'otherdoc'
      );
      if (this.isEditmode && documentIndex !== -1)
        accountDocId = this.accountDocuments[documentIndex].accountDocumentID;
      const items =
      {
        accountDocumentID: this.isEditmode ? accountDocId : 0,
        accountID: id,
        documentNumber: "",
        documentFileFolder: "",
        documentFileName: this.otherDoc,
        documentFileExt: "",
        documentType: "otherdoc",
        status: "",
        statusCode: "",
        documentDisplayName: ""
      }
      if (documentIndex !== -1) {
        // Update the specific document object
        this.accountDocuments[documentIndex] = items;
      }
      else {
        this.accountDocuments.push(items)
      }
    }
  }


  getCity(event: any) {
    this.commonService.GetGroupDataByReferenceID(event.target.value).pipe(
      catchError(error => {

        // Display an error message or perform other actions based on the error response
        if (error.status === 400 && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.loading = false; // Stop the loading spinner
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.cityData = data;
      })
  }
  editGetCity(id: any) {
    this.commonService.GetGroupDataByReferenceID(id).pipe(
      catchError(error => {

        // Display an error message or perform other actions based on the error response
        if (error.status === 400 && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.loading = false; // Stop the loading spinner
        return throwError(error);
      })
    )
      .subscribe(data => {
        this.cityData = data;
      })
  }


  setFile(docType: string, event: any): void {
    var selectedFiles = event.target.files;
    this.previews = [];
    if (selectedFiles && selectedFiles[0]) {
      const numberOfFiles = selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);  //e.target.result usingg for convert into base-64
          if (docType == 'pancard') {
            this.panImages = e.target.result;
            this.pancarddoc = e.target.result;
          }
          else if (docType == 'aadhaar') {
            this.aadhaarCardImages = e.target.result;  // this is for preview
            this.aadhaarDoc = e.target.result;
          }

          else if (docType == 'otherdoc') {
            this.otherDocumentImages = e.target.result;
            this.otherDoc = e.target.result;
          }
          // Find the index of the key in the array
          const index = this.dataIntoBit.findIndex(item => item.key === docType);
          if (index !== -1) {
            this.dataIntoBit[index].value = e.target.result;
          } else {
            // If the key doesn't exist, push a new key-value pair
            this.dataIntoBit.push({ key: docType, value: e.target.result });
          }
        };
        reader.readAsDataURL(selectedFiles[i]);
        console.log("dataIntoBit", this.dataIntoBit);
      }
    }
  }
  autoFillKycForm() {
    if (this.kycData) {
      this.isEditmode = true;
      this.editGetCity(this.kycData.state);
      this.form.controls['address1'].setValue(this.kycData.address1);
      this.form.controls['pinCode'].setValue(this.kycData.pinCode);
      this.form.controls['city'].setValue(this.kycData.city);
      this.form.controls['state'].setValue(this.kycData.state);
      this.form.controls['bussinessName'].setValue(this.kycData.bussinessName);
      this.form.controls['gstNumber'].setValue(this.kycData.gstNumber);

      if (this.kycData.city) {
        this.form.controls['aadhaarCarddocs'].clearValidators();
        this.form.controls['aadhaarCarddocs'].updateValueAndValidity();
      }

      if (this.kycData.accountDocuments) {
        this.kycData.accountDocuments.forEach((item: accountDocuments) => {
          if (item.documentType.toString() === "aadhaar") {
            this.aadhaarCardImages = item.documentFileName;
            this.form.controls['aadhaarCardNumber'].setValue(item.documentNumber);
          } else if (item.documentType.toString() === "pancard") {
            this.panImages = item.documentFileName;
            this.form.controls['panCardNumber'].setValue(item.documentNumber);
          } else if (item.documentType.toString() === "otherdoc") {
            this.otherDocumentImages = item.documentFileName;
          }

          const items =
          {
            accountDocumentID: item.accountDocumentID,
            accountID: item.accountID,
            documentNumber: '',
            documentFileFolder: '',
            documentFileName: '',
            documentFileExt: '',
            documentType: item.documentType,
            status: '',
            statusCode: '',
            documentDisplayName: ''
          }
          this.accountDocuments.push(items)

        });
      }


    }
  }
  removeImage(file: any, filename: string) {
    // Clear the image source or reset the form control value
    if (filename == 'otherDocumentImages') {
      this.otherDocumentImages = null;
      this.otherDoc = null;
    }
    else if (filename == 'aadhaarCardImages') {
      this.aadhaarCardImages = null;
      this.aadhaarDoc = null;
    }
    else if (filename == 'panImages') {
      this.panImages = null;
      this.pancarddoc = null;
    }
    file.value = null;

  }
}