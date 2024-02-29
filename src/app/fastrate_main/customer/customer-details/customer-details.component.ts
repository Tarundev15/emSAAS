import { Component, Pipe, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { UserManagementService } from 'src/app/_services/user-management.service';
import { LangPipe } from 'src/app/pipe/pipe';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent {
  resetbutton: boolean = false;
  showModal1: boolean = false;
  allCountry: any = [];
  allCurrency: any = [];
  allCustomer: any[] = [];
  flterArray: any[] = [];
  filter1Array: any[] = [];
  form: any;
  loading: boolean = false;


  close1() {
    this.showModal1 = false;
  }
  currentUser: any = [];

  advanceTxt = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  totalRecords: any = 0;
  searchFilter: any;
  uploadpopup: boolean = false;
  toastMsgObj: any;
  defaultobj = {
    searchValue: '',
    sortColumn: '',
    sortOrder: '',
    pageIndex: 1,
    pageSize: 100,
    totalCount: 100,
    status: '',
    savedSearchId: 0,

    languageId: 1,
    firstName: '',
    displayName: '',
    email: '',
    mobileNumber: '',
    location: '',
  };
  totalPagesArray: any = [];
  tableHeaders = [
    // {
    //   label: 'ID',
    //   width: '10',
    //   name: 'firstName',
    //   code: 'LC2-35M',
    //   sort: 'ASC',
    // },
    { label: 'Code', width: '10', name: 'email', code: 'LC2-36M', sort: 'ASC' },
    {
      label: 'Name',
      width: '10',
      code: 'LC2-37M',
      name: 'mobileNumber',
      sort: 'ASC',
    },
    {
      label: 'Description',
      width: '10',
      code: 'LC2-37M',
      name: 'division',
      sort: 'ASC',
    },
    {
      label: 'Country',
      width: '10',
      code: 'LC2-37M',
      name: 'reportingmanager',
      sort: 'ASC',
    },
    {
      label: 'Currency',
      width: '10',
      code: 'LC2-37M',
      name: 'hrmanager',
      sort: 'ASC',
    },
    {
      label: 'Credit Enable',
      width: '10',
      code: 'LC2-37M',
      name: 'usergroup',
      sort: 'ASC',
    },
    {
      label: 'Created By',
      width: '10',
      code: 'LC2-37M',
      name: 'usergroup',
      sort: 'ASC',
    },
    {
      label: 'Created On',
      width: '10',
      code: 'LC2-37M',
      name: 'usergroup',
      sort: 'ASC',
    },

    // { label: 'Display Name', width: '15',code:'LC2-38M', name: 'displayName', sort: 'ASC' },
    // { label: 'Status', width: '10', code:'LC20-31M',name: 'Status', sort: 'ASC' },
    // { label: 'Added By', width: '10',code:'LC2-39M', name: 'Added By' },
    // { label: 'Added On', width: '10',code:'LC2-40M', name: 'Added On' },
  ];
  uploadInput: boolean = false;
  filterth: any = '';
  showuploadinput() {
    this.uploadInput = true;
  }
  popupVisibility: { [key: string]: boolean } = {};
  hideUpLoadPopup() {
    this.uploadpopup = false;
  }
  showUpLoadPopup() {
    this.uploadpopup = true;
  }
  assendingdesending(th: any, value: any, i: any) {
    if (value == 'ASC') {
      this.defaultobj.sortColumn = th;
      this.defaultobj.sortOrder = value;
      this.tableHeaders.map((x: any) => {
        x.sort = 'ASC';
      });
      this.tableHeaders[i].sort = 'DESC';
    } else {
      this.defaultobj.sortColumn = th;
      this.defaultobj.sortOrder = value;
      this.tableHeaders.map((x: any) => {
        x.sort = 'ASC';
      });
      this.tableHeaders[i].sort = 'ASC';
    }
    // this.userRoleList(1);
  }
  private shownHeaderNames: string[] = [];
  showPopup(headerName: string) {
    this.closeAllPopups();
    this.popupVisibility[headerName] = true;
    // if(this.searchFilter!='' && this.searchFilter!=undefined){
    if (this.shownHeaderNames.includes(headerName)) {
      if (this.searchFilter != '' && this.searchFilter != undefined) {
        return;
      } else {
        this.searchFilter = '';
        this.reset();
      }
    } else {
      this.searchFilter = '';
      this.reset();
      this.shownHeaderNames = [];
      this.shownHeaderNames.push(headerName);
    }
  }

  searchbytId(e: any) {
    this.defaultobj.savedSearchId = e;
    document.getElementById('reset_button')!.style.display = 'block';
    // this.userRoleList(1);

    this.resetbutton = true;
  }
  roleerror: any;
  closefn(e: any) {
    this.resetbutton = false;

    this.showModal1 = false;
  }
  openModelAdvance() {
    this.showModal1 = true;
  }
  closePopup(headerName: string) {
    this.popupVisibility[headerName] = false;
  }
  closeAllPopups() {
    for (const headerName in this.popupVisibility) {
      if (this.popupVisibility.hasOwnProperty(headerName)) {
        this.popupVisibility[headerName] = false;
      }
    }
  }
  addForm: any = FormGroup;
  roleForm: any = FormGroup;
  show: boolean = false;
  submitted: boolean = false;
  selectAll: boolean = false;
  falseJson: any = [];
  userList: any = [];
  userLoginId: any;
  constructor(
    private formbuilder: FormBuilder,
    private useService: UserManagementService,
    public commonService: CommonService,
    private lang: LangPipe,
    // private toastService: ToastService,
    private loaderService: LoaderService,
    private messageService: MessageService
  ) {
    this.addForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      currency: ['', Validators.required],
    });

    // this.getCountry();
    // this.addFormmethod();

    this.getUserRoleList();
    // this.userRoleList(1);
    let id: any = localStorage.getItem('currentUser');
    id = JSON.parse(id);
    this.userLoginId = id.userId;
    console.log('loginId', id, this.userLoginId);
  }
  link = environment.apiUrl + '/UsersTemplates/UserUploadTemplate.xlsx';
  upload: any;
  private selectedFile!: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.importError = false;
  }
  errorLink: any;
  importError: boolean = false;
  convertAndDownload() {
    // this.loaderService.showLoader();
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        let base64String = btoa(event.target.result);
        base64String =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
          base64String;

        this.useService.uploadfile(base64String).subscribe(
          (response: any) => {
            //this.loaderService.hideLoader();
            // this.userRoleList(1);

            if (!response.isError) {
              this.importError = false;
              // alert(response.responseCode)
              this.toastMsgObj = {
                msgType: 'ATMCMN-01_INFO-M',
                msgText: this.lang.transform(response.responseCode),
              };
              // this.toastService.addToast(this.toastMsgObj);
            } else {
              this.toastMsgObj = {
                msgType: 'ATMCMN-04_ERROR-M',
                msgText: this.lang.transform(response.responseCode),
              };
              // const fileInput = document.getElementById('file') as HTMLInputElement;;

              // if (fileInput) {
              //   fileInput.value = '';
              // }
              // this.toastService.addToast(this.toastMsgObj);
              // this.commonService.downloadErrorFileLink().subscribe(
              // (response: any) => {

              console.log(response);
              this.errorLink = response.message.responseCode;
              this.importError = true;

              // })
              // this.importError=true;
              //             this.toastMsgObj = {
              //               msgType: response.responseMessageType,
              //               msgText: this.lang.transform(response.responseCode)
              //             }
              //             this.toastService.addToast(this.toastMsgObj);
            }
          },
          (error) => {
            //this.loaderService.hideLoader();
            console.error('POST Error:', error);
          }
        );
      };

      reader.onerror = (error) => {
        //this.loaderService.hideLoader();
      };

      reader.readAsBinaryString(this.selectedFile);
    } else {
      //this.loaderService.hideLoader();
      this.toastMsgObj = {
        msgType: 'ATMCMN-04_ERROR-M',
        msgText: this.lang.transform('ATMUSR-FLUPL-D'),
      };
      // this.toastService.addToast(this.toastMsgObj);
      // alert("jitu");
      return;
    }
  }


  selectedCountry: any;
  filteredCities: any[] = [];
  filteredCurrencies: any[] = [];
  selectedCity: any;
  selectedCurrency: any;

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 ngOnInit(): void {
  this.loaderService.showLoader();
  this.loadAllCustomer();
  this.loadAllCountry();
  this.loadAllCurrency();
    //  this.loadallcustomer('1', '10', 'Description', 'desc');
     this.customerList(this.currentPage);
    

    // this.addForm = this.formbuilder.group({

    //   country: [''],
    //   city: [''],
    //   currency: ['']
    // });

    // Set up the initial selected country
    // this.selectedCountry = this.countriesData[0];
    // this.updateCityAndCurrency();
  }

  loadAllCustomer() {
		this.commonService.GetCustomerType().subscribe(
			(options) => {
				this.allCustomer = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

  loadAllCountry() {
		this.commonService.GetAllCountryList().subscribe(
			(options) => {
				this.allCountry = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

  loadAllCurrency() {
		this.commonService.GetCurrencyList().subscribe(
			(options) => {
				this.allCurrency = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

  customerList(pageNumber: number): void {
    this.loaderService.showLoader();
    const params = {
      pageNumber: pageNumber.toString(), 
      pageSize: this.itemsPerPage.toString(),
      sortBy: 'accountId',
      sortDir: 'desc'
    };

  this.commonService.AllCustomer(params.pageNumber, params.pageSize, params.sortBy, params.sortDir)
      .subscribe((response: any) => {
        this.loaderService.hideLoader();
        this.userList = response.content; // Update with the actual property in your response
        this.totalRecords = response.totalElements;
        this.totalPages = response.totalPages;
        this.totalPagesArray = this.generatePageArray(this.totalPages);
        this.currentPage = pageNumber;
        // this.totalPages = Math.ceil(response.data[0].totalRecord / this.itemsPerPage)
        // this.generateTotalPagesArray();
      });
  }

  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  onChangeItemsPerPage(): void {
    this.customerList(1); // Reset to the first page when changing items per page
  }

  navigateToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.customerList(pageNumber);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.customerList(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.customerList(this.currentPage - 1);
    }
  }

  onCountryChange(event: any) {
    console.log(event.target.value)
    const selectedCountryId = event.target.value;

    if (selectedCountryId) {
      // Use your service method to get cities by country
      this.commonService.GetCityByCountry(selectedCountryId).subscribe(
        (cities: any[]) => {
          this.flterArray = cities;
          console.log(cities,'------------------------')
          // Optionally, you can reset the city selection here if needed
          this.form.get('city').reset();
        },
        (error) => {
          console.error('Error fetching cities', error);
        }
      );
    }
  }


  searchFilterMethod(label: any) {
    if (this.searchFilter != '' && this.searchFilter != undefined) {
      this.filterth = label;
      if (label == 'Name') {
        // this.defaultobj.userName = this.searchFilter;
        this.defaultobj.firstName = this.searchFilter;
      } else if (label == 'Email') {
        this.defaultobj.email = this.searchFilter;
      } else if (label == 'Contact') {
        this.defaultobj.mobileNumber = this.searchFilter;
      } else if (label == 'Display Name') {
        this.defaultobj.displayName = this.searchFilter;
      } else if (label == 'Status') {
        this.defaultobj.status = this.searchFilter;
      }
      this.closeAllPopups();
      // this.userRoleList(1);
    } else {
      this.closeAllPopups();
    }
  }
  reset() {
    this.loaderService.showLoader();
    this.searchFilter = '';

    // this.defaultobj.userName = "";
    this.defaultobj.firstName = '';
    this.defaultobj.savedSearchId = 0;
    this.defaultobj.email = '';
    this.defaultobj.displayName = '';
    this.defaultobj.status = '';
    this.defaultobj.mobileNumber = '';
    this.filterth = '';
    document.getElementById('reset_button')!.style.display = 'none';
    localStorage.removeItem('adsearch');
 
  }

  addbutton: boolean = false;
  editbutton: boolean = false;
  editIndex: any;
  editId: any;
 

  generateTotalPagesArray() {
    const maxPageButtons = 5;
  
    if (this.totalPages <= maxPageButtons) {
      this.totalPagesArray = Array.from(
        { length: this.totalPages },
        (_, i) => i + 1
      );
    } else {
      let startPage = Math.max(
        Math.min(
          this.currentPage - Math.floor(maxPageButtons / 2),
          this.totalPages - maxPageButtons + 1
        ),
        1
      );
  
      let endPage = Math.min(startPage + maxPageButtons - 1, this.totalPages);
  
      this.totalPagesArray = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      );
    }
  }
  
  

  showDetails: boolean = false;
  details(data: any, i: any) {
    this.showDetails = true;

    document.getElementById('details')!.classList.add('disabled-div');
  }
  detailsClose() {
    document.getElementById('details')!.classList.remove('disabled-div');
    this.showDetails = false;
  }

  addroleForm() {}

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  permissionArray: any = [
    {
      rolenames: 'billing',
      permission: [
        {
          txt: 'usermanagement',
          acess: true,
          subpermisson: [
            { text: 'edit', acess: true },
            { text: 'delete', acess: false },
            { text: 'notification', acess: true },
          ],
        },
      ],
    },
  ];

  submitForm() {
    this.submitted = true;

    if (this.addForm.valid) {
    const formData = this.addForm.value;
    console.log('----------data',formData);
    const formattedData = {
      // "countryId": formData.city,
    "accountCode": formData.accountCode,
    "name": formData.name,
    "customerTypeId": formData.customer,
    "description": formData.description,
    "paymentTermId": 2,
    "isTaxable": "Y",
    "taxNumber": "TAX123",
    "isCreditEnable": "Y",
    "isDeleted": "N",
    "isActive": "Y",
    "countryId": formData.country,
    "currencyId": formData.currency,
    "createdBy": "John Doe",
    "lastUpdatedBy": "Jane Smith",
    "creationDate": "2021-10-11",
    "lastUpdateDate": "2024-02-29"
    };
    this.addCustomer(formattedData);
  }else {
    // If the form is invalid, mark all form controls as touched
    this.markFormGroupTouched(this.addForm);
  }

  //    setTimeout(() => {
  //   this.closeModal();
  // }, 5000);
  }

  addCustomer(formattedData: any) {
    this.commonService.AddCustomer(formattedData)
      .pipe(
        catchError((error) => {
          // Display an error message or perform other actions based on the error response
          if (error) {
            this.messageService.add({
              severity: 'error;',
              summary: 'Failure',
              detail: 'An error occurred. Please try again later.',
            });
          }
          //   this.loading = false; // Stop the loading spinner
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log('C-data',data)
        if (data.isError) {
          this.messageService.add({
            severity: 'error;',
            summary: 'Failure',
            // detail: this.messageData[data.responseCode]
          });
        } else if (data) {
          // alert('success');
          console.log('data NEW USER SUMBIT', data);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Customer added successfully',
            // detail: this.messageData[data.responseCode]
          });
          this.ngOnInit();
          // this.loading = false;
          // this.submitted = false;
          // document.getElementById("cncl")?.click();
          
          setTimeout(() => {
            this.loading = false;
            this.submitted = false;
            document.getElementById("cncl")?.click();
          }, 1000);
        }
      });
      // this.ngOnInit();
  }

  // Helper function to mark all form controls as touched
markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
}

  clearForm() {
    this.addForm.reset();
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegex = /^[a-zA-Z\s]*$/;

      if (!nameRegex.test(control.value)) {
        return { invalidInput: true };
      }

      return null;
    };
  }
  obj = {
    resetToken: '',
    resetTokenExpires: '2023-10-13T10:21:37.493Z',
    userId: 0,
    userName: 'string',
    email: 'string',

    displayName: 'string',
    mobileCountryCode: '91',
    mobileNumber: 'string',

    isAdUser: false,

    roleIds: '',

    landMark: '',
    city: 'string',
    state: 'string',
    zipcode: 'string',
    country: 'string',

    status: 'string',
  };
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  conditionalMinLengthValidator(minLength: number) {
    const digitRegex = /^[0-9]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLength) {
        const valueString: string = control.value.toString();
        if (!digitRegex.test(valueString)) {
          control.setValue('');
          return null;
        }
        return { minlength: true };
      }
      return null;
    };
  }
  // addFormmethod() {
  //   this.addForm = this.formbuilder.group({
  //     name: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(20),
  //       ],
  //     ],
  //     displayName: ['', [Validators.minLength(3), Validators.maxLength(20)]],
  //     email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
  //     contact: ['', [this.conditionalMinLengthValidator(10)]],

  //     country: ['', [Validators.required]],
  //     status: ['', [Validators.required]],
  //     street: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(35),
  //       ],
  //     ],
  //     city: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(15),
  //       ],
  //     ],
  //     state: ['', [Validators.required]],
  //     zip: [
  //       '',
  //       [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
  //     ],
  //   });
  // }



  stateList: any = [];

  getFixRoleList: any = [];
  extractPermissions(jsonObj: any): any[] {
    let extractedPermissions: any[] = [];

    if (jsonObj && jsonObj.permission && Array.isArray(jsonObj.permission)) {
      extractedPermissions = jsonObj.permission;

      jsonObj.permission.forEach((permission: any) => {
        if (permission.child && Array.isArray(permission.child)) {
          extractedPermissions = extractedPermissions.concat(
            this.extractPermissions(permission)
          );
        }
      });
    }

    return extractedPermissions;
  }

  idList: any = [];
  codeList: any = [];
  setIds() {
    this.closeModal();
    this.idList = [];
    this.codeList = [];
    this.getFixRoleList.forEach((x: any) => {
      if (x.select == true) {
        this.idList.push(x.roleId);
        this.codeList.push(x.roleName);
      }
    });

    if (this.idList.length > 0) {
      this.roleerror = false;
    }
  }
  showpermission(index: any) {
    this.getFixRoleList[index].show = !this.getFixRoleList[index].show;
  }
  getUserRoleList() {
    // this.loaderService.showLoader();
    this.useService.userRole().subscribe(
      (response: any) => {
        //this.loaderService.hideLoader();
        this.getFixRoleList = response.data;
        for (let i = 0; i < this.getFixRoleList.length; i++) {
          const permissions = this.extractPermissions(this.getFixRoleList[i]);
          delete this.getFixRoleList[i].permission;
          this.getFixRoleList[i].show = false;

          this.getFixRoleList[i].select = false;
          this.getFixRoleList[i].child = permissions[0]?.child[0]?.child;
        }
      },
      (error) => {
        //this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );
  }

  add() {
    // this.loaderService.showLoader();
    this.submitted = false;
    let data: any;
    this.roleerror = false;
    data = this.obj;

 
  }
  get f() {
    return this.addForm.controls;
  }
  get g() {
    return this.roleForm.controls;
  }

  showstatus: boolean = false;

  namediv = false;
  filtervalue: any;
  showdivname(val: any) {
    this.namediv = !this.namediv;
    this.filtervalue = val;
  }
  // filter for search
  name_srch = '';

  unlockUser(data: any) {
   
    let id = data.userId;
   
  }


}

