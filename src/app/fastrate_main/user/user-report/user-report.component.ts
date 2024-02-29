// import { DatePipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { ToastService } from 'src/app/_services/toast.service';
import { LangPipe } from 'src/app/pipe/pipe';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css'],
})
export class UserReportComponent {
  lookupData: any;
  featureList: any;
  featureID: any = '';
  moduleList: any = [];
  totalPages: number = 0;
  totalRecords: any;
  totalPagesArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  page: number = 1;
  allProfileOptionsLists: any = [];
  profileOptionValueChilds: any = [];
  filter = {
    userDivisions: '',
    userDepartments: '',
    joiningDate: '',
    lastWorkingDate: '',
    status: '',
  };
  lastworkingdate: any;
  profileOptionValues: any = [];
  toastMsgObj: any;
  toggleData: any;
  childfilter = {
    levelName: '',
    levelDisplayValue: '',
    profileOptionValues: '',
  };
  divisionOptions: any=[];
  selectedDateRange!: Date[];
  // selectedDateRange!: string;
  customHeader!: string;
  customSelectionMode: any;
  @ViewChild('calendarButton') calendarButton!: ElementRef;
  // isCalendarVisible = false;
  isDialogVisible = false;
  // customSelectionMode: any;
  // selectedDateRange: Date[];
  DateForm: any= FormGroup;
  departmentOptions: any=[];
  // addForm: any = FormGroup;
  selectedDates0: any;
  selectedDates1: any;
issubmitted: boolean=false;
@ViewChild('divisionInput') divisionInput: any;
dateInput: any;
@ViewChild('calendar') calendar: any;
  onInputChange_LastWorkDate: any;
  onInputChange_JoinDate: any;
  LastDate_variable: any;
  JoinDate_variable: any;
  joiningForm: FormGroup;
  lastWorkingForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private datePipe: DatePipe,
    private lookupService: LookupService,
    private renderer: Renderer2,
    private el: ElementRef,
    //  private sharedService:SharedService,
    private loaderService: LoaderService,
    public commonService: CommonService,
    private toastService: ToastService,
     private langFilepipe: LangPipe,
  ) {
    // this.customSelectionMode = this.getLastMonthRange.bind(this);
    // this.loaderService.showLoader();
    this.joiningForm = this.fb.group({
      joiningdate: 0,
    });
    
    this.lastWorkingForm = this.fb.group({
      lastworkingdate:0,
    });

  }
  
  ngOnInit() {
    this.loaderService.showLoader();
    this.DateForm = this.fb.group({
      joiningdate: 0, // Use null as the initial value
      lastworkingdate: 0
    });
    // this.loaderService.showLoader();
    // this.getLastMonthRange();
    this.loadDivisionOptions();
    this.loadDepartment();
    // this.GetTranslationModuleList();
    // this.GetProfileOptionsList();
    this.onSubmit_DateForm();
  }


  loadDivisionOptions() {
		this.commonService.GetDivision().subscribe(
			(options) => {
				this.divisionOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}
  loadDepartment() {
		this.commonService.GetDepartment().subscribe(
			(options) => {

				this.departmentOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}
  reset() {
    this.filter.userDivisions = '';
    this.filter.userDepartments = '';
    this.filter.status = '';
    this.filter.lastWorkingDate = '';
    this.GetProfileOptionsList();
    this.onSubmit_DateForm();
    this.divisionInput.control.markAsPristine();
    this.divisionInput.control.markAsUntouched();
  }
  GetProfileOptionsList() {
    const param = {
      searchValue: '',
      sortColumn: '',
      sortOrder: '',
      pageIndex: this.currentPage,
      pageSize: this.itemsPerPage,
      totalCount: 0,
      status: '',
      dynamicColumn: '',
      // profileOptionCode: this.filter.profileOptionCode,
      // profileDisplayName: this.filter.profileDisplayName,
      // applicationId: this.filter.applicationId,
      // moduleFeatureId: this.filter.moduleFeatureId,
      // languageId: this.commonService.getLanguageType(),
    };

    // return new Promise<void>((resolve, reject) => {
    //   this.lookupService
    //     .GetProfileOptionsList(param)
    //     .pipe(
    //       catchError((error) => {
    //         reject(error);
    //         this.loaderService.hideLoader();
    //         return throwError(error);
    //       })
    //     )
    //     .subscribe((result: any) => {
    //       if (result.data.length > 0) {
    //         const data = result.data;
    //         this.allProfileOptionsLists = data[0].profileOption;
    //         this.totalRecords = data[0].totalRecord;
    //         this.currentPage = this.currentPage;
    //         this.totalPages = Math.ceil(
    //           data[0].totalRecord / this.itemsPerPage
    //         );
    //         this.generateTotalPagesArray();
    //       } else {
    //         this.allProfileOptionsLists = [];
    //         this.totalRecords = 0;
    //       }
    //       this.loaderService.hideLoader();
    //       resolve(); // Resolve the promise when the data is available
    //     });
    // });
  }
  

  selectLast30Days(Set_joiningdate:any,Set_lastworkingdate:any): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
  
    this.selectedDateRange = [startDate, endDate];
    if(Set_joiningdate)
    {
      this.joiningForm.patchValue({ joiningdate: this.selectedDateRange });
    }
    if(Set_lastworkingdate)
    {
      this.lastWorkingForm.patchValue({ lastworkingdate: this.selectedDateRange });
    }
  }
  
  selectThisMonth(Set_joiningdate:any,Set_lastworkingdate:any): void {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    this.selectedDateRange = [startDate, endDate];
    if(Set_joiningdate)
    {
      this.joiningForm.patchValue({ joiningdate: this.selectedDateRange });
    }
    if(Set_lastworkingdate)
    {
      this.lastWorkingForm.patchValue({ lastworkingdate: this.selectedDateRange });
    }
  }
  
  selectLastMonth(Set_joiningdate:any,Set_lastworkingdate:any): void {
    const endDate = new Date(new Date().setDate(0));
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    this.selectedDateRange = [startDate, endDate];
 
    if(Set_joiningdate)
    {
      this.joiningForm.patchValue({ joiningdate: this.selectedDateRange });
    }
    if(Set_lastworkingdate)
    {
      this.lastWorkingForm.patchValue({ lastworkingdate: this.selectedDateRange });
      console.log(this.DateForm.lastworkingdate.value());
    }
    
   
  }
  // Add this method to close the calendar programmatically
  closeCalendar() {
    // this.calendarButton.nativeElement.hideOverlay(); // Adjust based on the PrimeNG version you are using
  }

  formatDateInput(event: KeyboardEvent,type: string) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  
    if (/^\d*$/.test(inputValue)&& type=='lastworkingdate') {
    // if (inputValue.length > 0) {
      let formattedValue = '';
  
      // Add first 2 characters (day)
      if (inputValue.length >= 1) {
        formattedValue += inputValue.substring(0, 2) + '-';
      }
  
      // Add next 2 characters (month)
      if (inputValue.length >= 3) {
        formattedValue += inputValue.substring(2, 4) + '-';
      }
  
      // Add next 4 characters (year)
      if (inputValue.length >= 5) {
        formattedValue += inputValue.substring(4, 8) + ' - ';
      }
  
      // Add next 2 characters (day)
      if (inputValue.length >= 9) {
        formattedValue += inputValue.substring(8, 10) + '-';
      }
  
      // Add next 2 characters (month)
      if (inputValue.length >= 11) {
        formattedValue += inputValue.substring(10, 12) + '-';
      }
  
      // Add next 4 characters (year)
      if (inputValue.length >= 13) {
        formattedValue += inputValue.substring(12, 16);
      }

      // Set the formatted value back to the input
      inputElement.value = formattedValue;
      this.onInputChange_LastWorkDate=formattedValue;
      // this.DateForm.get('lastworkingdate')?.setValue(formattedValue);
      // this.DateForm.get('lastworkingdate')?.setErrors({ invalidFormat: true });
    }
    else if (/^\d*$/.test(inputValue)&& type=='joiningdate')
    {
      let formattedValue = '';
  
      // Add first 2 characters (day)
      if (inputValue.length >= 1) {
        formattedValue += inputValue.substring(0, 2) + '-';
      }
  
      // Add next 2 characters (month)
      if (inputValue.length >= 3) {
        formattedValue += inputValue.substring(2, 4) + '-';
      }
  
      // Add next 4 characters (year)
      if (inputValue.length >= 5) {
        formattedValue += inputValue.substring(4, 8) + ' - ';
      }
  
      // Add next 2 characters (day)
      if (inputValue.length >= 9) {
        formattedValue += inputValue.substring(8, 10) + '-';
      }
  
      // Add next 2 characters (month)
      if (inputValue.length >= 11) {
        formattedValue += inputValue.substring(10, 12) + '-';
      }
  
      // Add next 4 characters (year)
      if (inputValue.length >= 13) {
        formattedValue += inputValue.substring(12, 16);
      }

      // Set the formatted value back to the input
      inputElement.value = formattedValue;
      this.onInputChange_JoinDate=formattedValue;

    }
    inputValue=''
  }
  
    
  dateFormat(dateFormatted: Date): string { //updates 01-01-2018 - 12-12-2099
    if (!dateFormatted) {
      return ''; // or return some default value if needed
    }
    let date = new Date(dateFormatted);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }  
  searchPerformed: boolean = false;
  onSubmit_DateForm() {
    // debugger;
    console.log('Joining Form Submitted:', this.joiningForm.value);
    console.log('Last Working Form Submitted:', this.lastWorkingForm.value);
    this.issubmitted = true;
    const params = {
      pageNumber: this.currentPage, 
      pageSize: this.itemsPerPage,
      sortBy: 'firstName,asc',
      // sortDir: 'asc'
    };
    // if (this.onInputChange_JoinDate == null || this.onInputChange_LastWorkDate == null) {
    //   this.DateForm.get('joiningdate')?.setErrors({ invalidFormat: true });
    //   this.DateForm.get('lastworkingdate')?.setErrors({ invalidFormat: true });
    // } 
    // Assuming you have a FormGroup named DateForm
    let joiningdate = this.joiningForm.get('joiningdate')?.value || this.onInputChange_JoinDate || null;
    console.log('JD',joiningdate);
    let lastworkingdate = this.lastWorkingForm.get('lastworkingdate')?.value || this.onInputChange_LastWorkDate || null;
    console.log('LWD',lastworkingdate);
    // let lastworkingdate=this.DateForm.get('lastworkingdate')?.value ?  this.DateForm.get('lastworkingdate')?.value:this.onInputChange_LastWorkDate;
    // this.selectedDates0=this.dateFormat(joiningdate[0]) ;
    // this.selectedDates1=this.dateFormat(lastworkingdate[1]) ;
    // let Formatted_joiningdate :string = this.dateFormat(joiningdate[0]) + ' - ' + this.dateFormat(joiningdate[1]);
    // let Formatted_lastworkingdate :string = this.dateFormat(lastworkingdate[0]) + ' - ' + this.dateFormat(lastworkingdate[1]);
    let Formatted_joiningdate: string = joiningdate
    ? this.dateFormat(joiningdate[0]) + ' - ' + this.dateFormat(joiningdate[1])
    : '';
  let Formatted_lastworkingdate: string = lastworkingdate
    ? this.dateFormat(lastworkingdate[0]) + ' - ' + this.dateFormat(lastworkingdate[1])
    : '';
    const selectedDates = {
      joiningDate: Formatted_joiningdate,
      lastWorkingDate: Formatted_lastworkingdate
      // joiningDate: '2017-04-12 - 2021-11-15',
      // lastWorkingDate: '2017-04-12 - 2021-11-15'
    };
    this.JoinDate_variable=selectedDates.joiningDate;
    this.LastDate_variable=selectedDates.lastWorkingDate;
    this.loaderService.showLoader();
    this.commonService.UserReport(this.filter.userDivisions, this.filter.userDepartments, selectedDates.joiningDate,
       selectedDates.lastWorkingDate, this.filter.status, params.pageNumber, params.pageSize, params.sortBy).subscribe(
      (response: any) => {
        // this.allProfileOptionsLists  = response;
        this.searchPerformed = true;
        this.allProfileOptionsLists  = response.content[0];
        console.log(response.content);
        console.log(this.allProfileOptionsLists);
        this.currentPage = this.currentPage;
        this.totalRecords = response.totalElements;
        this.totalPages = response.totalPages;
        this.generateTotalPagesArray();
        this.loaderService.hideLoader();
      },
      (error) => {
        console.error('POST Error:', error);
        this.loaderService.hideLoader();
      }
      );
  }
  
  openDialog(): void {
    this.isDialogVisible = true;
  }

  onOverlayVisibleChange(event: any): void {
    if (!event.visible) {
      this.isDialogVisible = false; // Close the dialog when the calendar is closed
    }
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
  GetTranslationModuleList(): Promise<void> {
    const languageId = 1;
    return new Promise<void>((resolve, reject) => {
      this.lookupService
        .GetTranslationModuleList()
        .pipe(
          catchError((error) => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          this.moduleList = result.data;
        });
    });
  }
  getModuleFeature(e: any) {
    this.lookupService.modulefeatureList(e.target.value).subscribe(
      (response) => {
        this.featureList = response.data;
      },
      (error) => {
        console.error('POST Error:', error);
      }
    );
  }
  getFeature(d: any) {
    this.featureID = '';
    this.featureID = d.target.value;
  }
  openLookupDialogBox(data: any, type: any) {
    this.lookupData = {
      showModal: true,
      items: data,
      type: type,
      moduleList: this.moduleList,
    };
    // this.sharedService.triggerFunction(this.lookupData);
  }
  openLookupDialogBoxChild(data: any, type: any) {
    this.lookupData = {
      showModal2: true,
      items: this.profileOptionValueChilds,
      parentData: data,
      type: type,
    };
    // this.sharedService.triggerFunction(this.lookupData);
  }
  toggleSubTable(data: any) {
    this.childfilter = {
      levelName: '',
      levelDisplayValue: '',
      profileOptionValues: '',
    };
    this.toggleData = data;
    console.log('toggleData', this.toggleData);
    if (data.subTableVisible) {
      data.subTableVisible = false;
    } else {
      this.GetProfileOptionValuesByProfileOptionId(data);
      this.allProfileOptionsLists.forEach(
        (r: any) => (r.subTableVisible = false)
      );
      data.subTableVisible = true;
    }
  }
  edit(data: any, type: any) {
    this.lookupData = {
      showModal: true,
      items: data,
      type: type,
      moduleList: this.moduleList,
    };
    // this.sharedService.triggerFunction(this.lookupData);
  }
  showResults(itemsPerPage: any) {
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.GetProfileOptionsList();
    this.onSubmit_DateForm();
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.GetProfileOptionsList();
    this.onSubmit_DateForm();
  }
  receiveDataFromChild(data: any) {
    this.GetProfileOptionsList();
  }

  GetProfileOptionValuesByProfileOptionId(data: any) {
    var param = {
      searchValue: '',
      sortColumn: '',
      sortOrder: '',
      pageIndex: 1,
      pageSize: 10000,
      totalCount: 0,
      status: '',
      dynamicColumn: '',
      languageId: 0,
      profileOptionId: data.profileOptionId,
    };

    // return new Promise<void>((resolve, reject) => {
    //   this.lookupService
    //     .GetProfileOptionValuesByProfileOptionId(param)
    //     .pipe(
    //       catchError((error) => {
    //         reject(error);
    //         return throwError(error);
    //       })
    //     )
    //     .subscribe((result: any) => {
    //       console.log('data1', result);
    //       this.profileOptionValueChilds = result.data[0];
    //       this.profileOptionValues =
    //         this.profileOptionValueChilds.profileOptionValue;
    //     });
    // });
  }
  profileValueDiscription(code: any): string | undefined {
    const matchingItem = this.profileOptionValueChilds.sqlValidationData.find(
      (item: any) => item.profileCode === code
    );
    if (matchingItem) {
      return matchingItem.profileDescription;
    }
    // If no match is found, you can return a default value or handle it as needed
    return code;
  }
  searchByLevelName(levelNameToSearch: string, column: any): any[] {
    return this.profileOptionValueChilds.profileOptionValue.filter(
      (item: any) =>
        item[column].toLowerCase().includes(levelNameToSearch.toLowerCase())
    );
  }
  onInputChange(event: any, column: any): void {
    // const searchResult = this.searchByLevelName(event.target.value,column);
    // this.profileOptionValues=searchResult;
    // console.log("Search result:", searchResult);
  }

  delete(item: any) {
    console.log('item', item);
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    // if (isConfirmed) {
    //   this.lookupService
    //     .DeleteProfileOptionValue(item.profileOptionValueId)
    //     .subscribe(
    //       (result) => {
    //         if (!result.isError) {
    //           this.toastMsgObj = {
    //             msgType: result.responseMessageType,
    //             msgText: this.langFilepipe.transform(result.responseCode),
    //           };
    //           this.GetProfileOptionValuesByProfileOptionId(item);
    //         } else {
    //           this.toastMsgObj = {
    //             msgType: result.responseMessageType,
    //             msgText: this.langFilepipe.transform(result.responseCode),
    //           };
    //         }
    //         this.toastService.addToast(this.toastMsgObj);
    //       },
    //       (error) => {
    //         console.error('POST Error:', error);
    //       }
    //     );
    // } else {
    //   console.log('Deletion canceled');
    // }
  }
  handleChildEvent(data: any) {
    console.log('toggleData', this.toggleData);
    this.GetProfileOptionValuesByProfileOptionId(this.toggleData);
  }
  childSearch() {
    var searchResult = this.profileOptionValueChilds.profileOptionValue.filter(
      (item: any) => {
        const match =
          item.levelName
            .toLowerCase()
            .includes(this.childfilter.levelName.toLowerCase()) &&
          item.levelDisplayValue
            .toLowerCase()
            .includes(this.childfilter.levelDisplayValue.toLowerCase()) &&
          item.profileOptionValues
            .toLowerCase()
            .includes(this.childfilter.profileOptionValues.toLowerCase());
        return match;
      }
    );
    this.profileOptionValues = searchResult;
  }
  childreset() {
    this.childfilter = {
      levelName: '',
      levelDisplayValue: '',
      profileOptionValues: '',
    };
    this.profileOptionValues = this.profileOptionValueChilds.profileOptionValue;
  }
  DownloadUserReport(){
    this.commonService.DownloadUserReport(this.filter.userDivisions, this.filter.userDepartments, this.JoinDate_variable,
      this.LastDate_variable, this.filter.status).subscribe((data: any) => {
      // const blob = new Blob([data], { type: 'application/pdf' });
      // const url = window.URL.createObjectURL(blob);
  }
  );
  }
}
