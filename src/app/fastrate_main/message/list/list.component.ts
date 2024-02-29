import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { ValidatorService } from 'src/app/_services/validator.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  messageData: any;
  addForm: any
  applicationId: number | undefined;
  ModuleId: number | undefined;
  MessageNumber: any;
  moduleFeatureId: number | undefined;
  MessageCode: string = '';
  page: number = 1;
  moduleFeatureData: any = [];
  moduleData: any = [];
  editId: any;
  isEditMode: boolean = false;
  first: number = 0;
  issubmitted: boolean = false;
  messageTypeData: any = [];
  messageSeverityeData: any = [];
  totalPages: number = 0;
  totalRecords: any;
  totalPagesArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedValue: string = '';
  isSearchClicked: boolean = false;
  constructor(private formbuilder: FormBuilder,
    private commonService: CommonService,
    private validatorService: ValidatorService,
    private el: ElementRef) {
    this.addFormmethod();
  }
  addFormmethod() {
    this.addForm = this.formbuilder.group({
      messageCode: ['', [Validators.required]],
      messageType: ['', [Validators.required]],
      messageSeverity: ['', [Validators.required]],
      moduleId: ['', [Validators.required]],
      moduleFeatureID: ['', [Validators.required]],
      messageText: ['', [Validators.required]],
      messageDescription: [''],
    });
  }

  ngOnInit() {
    this.GetMessageList(0, 0, 0, this.page);
    this.GetTranslationModuleList();
    this.GetAllLookupCode("MESSAGE TYPE");
    this.GetAllLookupCode("MESSAGE SEVERITY");
  }
  reset() {
    this.isSearchClicked = false;
    this.MessageCode = "";
    this.ModuleId = 0;
    this.moduleFeatureId = 0;
    this.MessageNumber = "";
    this.GetMessageList(0, 0, 0, 1);
  }
  onMessageCodeInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convert to uppercase
    this.addForm.get('messageCode').setValue(inputElement.value); // Update the form control value
  }

  GetMessageList(moduleFeatureId: number, ModuleId: number, MessageNumber: number, PageNumber: number): Promise<void> {
    this.page = PageNumber;
    const items = {
      searchValue: this.MessageCode,
      sortColumn: "",
      sortOrder: "",
      pageIndex: this.page,
      pageSize: this.itemsPerPage,
      totalCount: 0,
      status: ''//this.filter
    };

    return new Promise<void>((resolve, reject) => {
      this.commonService.GetMessageList(items, moduleFeatureId, ModuleId, MessageNumber)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.data) {
            const data = result.data;
            this.messageData = data.messages;
            this.totalRecords = data.totalRecord;
            this.currentPage = this.page;
            this.totalPages = Math.ceil(data.totalRecord / this.itemsPerPage)
            this.generateTotalPagesArray();
          }
          else {
            this.messageData = [];
            this.totalRecords = 0;
          }
          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  generateTotalPagesArray() {
    const maxPageButtons = 5;

    if (this.totalPages <= maxPageButtons) {

      this.totalPagesArray = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } else {

      let startPage = Math.max(
        this.currentPage - Math.floor(maxPageButtons / 2),
        1
      );
      if (this.totalPages - startPage < maxPageButtons - 1) {
        startPage = this.totalPages - maxPageButtons + 1;
      }
      let endPage = Math.min(startPage + maxPageButtons - 1, this.totalPages);

      this.totalPagesArray = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      );
    }
  }

  afterModelOpen() {
    //remove from readonly
    var selectElement = document.getElementById("module123") as HTMLSelectElement;
    selectElement.disabled = false;
    this.isEditMode = false;
    var selectElement = document.getElementById("moduleFeatureID123") as HTMLSelectElement;
    selectElement.disabled = false;

    this.addForm.reset();
    this.addForm.controls['moduleFeatureId'].setValue("");
    this.addForm.controls['moduleId'].setValue("");
    this.issubmitted = false;
    console.log(this.moduleData);
    // event of pop open on click of add message
  }
  add() {

    this.issubmitted = true;
    if (this.addForm.invalid) {
      return;
    }

    const formData = this.addForm.value;

    const formattedData = {
      MessageNumber: this.isEditMode ? this.editId : 0,
      messageCode: formData.messageCode.toUpperCase(),
      messageDescriptionCodeLang: "",//code will be generate at server side,
      messageTextCodeLang: "",//code will be generate at server side ",
      messageType: formData.messageType,
      messageSeverity: formData.messageSeverity,
      moduleFeatureID: parseInt(formData.moduleFeatureID),
      messageText: formData.messageText,
      messageDescription: formData.messageDescription
    }
    console.log("formattedData", formattedData)

    this.SaveMessage(formattedData)
  }

  SaveMessage(data: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.commonService.SaveMessage(data)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.statusCode == '102') {
            alert(result.statusMessage);
            this.addForm.reset();
            this.issubmitted = false;
            this.GetMessageList(0, 0, 0, this.page);
          }
          if (result.statusCode == '105') {
            alert(result.statusMessage);
          }

          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  Edit(data: any) {
    console.log("Edit", data);
    if (data) {
      this.editId = data.messageNumber;
      this.isEditMode = true;


      //readlony dropdown
      var selectElement = document.getElementById("module123") as HTMLSelectElement;
      selectElement.disabled = true;

      var selectElement = document.getElementById("moduleFeatureID123") as HTMLSelectElement;
      selectElement.disabled = true;

      this.addForm.controls['messageCode'].setValue(data.messageCode);
      this.addForm.controls['messageText'].setValue(data.messageText);
      this.addForm.controls['messageDescription'].setValue(data.messageDescription);
      this.addForm.controls['moduleId'].setValue(data.moduleId);


      this.addForm.controls['messageSeverity'].setValue(data.messageSeverity);
      this.addForm.controls['messageType'].setValue(data.messageType);
      if (data.moduleId > 0) {
        this.GetTranslationModuleFeatureList(data.moduleId)
      }
      this.addForm.controls['moduleFeatureID'].setValue(data.moduleFeatureID);

    }

  }

  search() {
    // this done for when remove dinput value from text box clck on search button then  this.applicationId giving "" blank value so handle 
    this.isSearchClicked = true;
    let appblank: boolean = false;
    let ModuleIdblank: boolean = false;
    let numblank: boolean = false;
    let ModulefeatureIdblank: boolean = false;
    if (this.applicationId?.toString() === "") {
      appblank = true
    }
    if (this.ModuleId?.toString() === "") {
      ModuleIdblank = true
    }
    if (this.MessageNumber?.toString() === "") {
      numblank = true
    }
    if (this.moduleFeatureId?.toString() === "") {
      ModulefeatureIdblank = true
    }

    const applicationId = (this.applicationId === undefined || appblank) ? 0 : this.applicationId;

    const ModuleId = (this.ModuleId == undefined || ModuleIdblank) ? 0 : this.ModuleId
    const MessageNumber = (this.MessageNumber == undefined || numblank) ? 0 : this.MessageNumber
    const moduleFeatureId = (this.moduleFeatureId === undefined || ModulefeatureIdblank) ? 0 : this.moduleFeatureId;
    this.GetMessageList(moduleFeatureId, ModuleId, MessageNumber, this.page);
  }

  GetTranslationModuleList(): Promise<void> {
    const languageId = 1; // it will change later it will get from session
    return new Promise<void>((resolve, reject) => {
      this.commonService.GetTranslationModuleList(languageId)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.data) {
            const data = result.data;
            this.moduleData = data;
          }
          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  GetTranslationModuleFeatureList(ModuleId: number): Promise<void> {
    const languageId = 1;
    return new Promise<void>((resolve, reject) => {
      this.commonService.GetTranslationModuleFeatureList(languageId, ModuleId)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.data) {
            const data = result.data;
            this.moduleFeatureData = data;
          }
          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  onModuleSelectionChange(e: any) {
    const moduleId = parseInt(e.target.value);
    this.GetTranslationModuleFeatureList(moduleId);
  }

  // onPageChange(event: any) {
  //   this.first = event.first;
  //   this.size = event.rows;
  //   this.page = event.page + 1;
  //   this.GetMessageList(0, 0, 0);
  // }



  GetAllLookupCode(type: string): Promise<void> {
    const items = {
      searchValue: "",
      sortColumn: "",
      sortOrder: "",
      pageIndex: 1,
      pageSize: 100,
      totalCount: 0,
      status: "",
      type: type,
      meaning: "",
      description: "",
      moduleFeatureId: 1,
      languageId: 1 // later its should be changed
    };
    return new Promise<void>((resolve, reject) => {
      this.commonService.GetAllLookupTypeList(items)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.data) {
            const lookupsdata = result.data.lookups;
            if (lookupsdata && lookupsdata.length > 0) {
              const lookupCodesArray = lookupsdata[0].lookupCodes;
              if (lookupCodesArray && lookupCodesArray.length > 0) {
                if (type === 'MESSAGE TYPE') {
                  this.messageTypeData = lookupCodesArray;
                }
                else if (type === 'MESSAGE SEVERITY') {
                  this.messageSeverityeData = lookupCodesArray;
                }
              }
            }
            console.log("messageTypeData", this.messageTypeData);
            console.log("messageSeverityeData", this.messageSeverityeData);
          }

          resolve(); // Resolve the promise when the data is available
        });
    });
  }
  onChange(e: any) {
    if (e.target.value == 'ADD') {
      document.getElementById('modelpop')?.click();
     // this.selectedValue = "";
      const selectElement = this.el.nativeElement.querySelector('#actions');
      selectElement.value = 'Action';
      this.afterModelOpen();
    }
  }

}
