import { Component, Pipe } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/_models';
import { CommonService } from 'src/app/_services/common.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { UserManagementService } from 'src/app/_services/user-management.service';
import { LangPipe } from 'src/app/pipe/pipe';
import { environment } from 'src/environments/environment';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent {
  editingComment: any = null;
  resetbutton: boolean = false;
  showModal1: boolean = false;
  countryList: any = [];
  userComments: any=[];
  commentId: any;
  comments: any;
  lastUpdateDate: any;
  creationDate: any;
  createdBy: any;
  createdByFullName: any;
  levelMeaning: any;
  cities: City[] | undefined;
  formGroup: FormGroup<{ selectedwatchers: any; }>;
  // WatcherUserList = [
  //   {
  //     fullName: " Tarun Devsheesh SES245 ",
  //     email: "tarundevasheesh@atomicnorth.com",
  //     username: "116",
  //     activeFlag: "N",
  //     removeAccessFlag: "N",
  //     userWatcherId: null
  //   },
  //   {
  //     fullName: " Sunny Singh SITS507",
  //     email: "sunny.singh750@sesabc.com",
  //     username: "750",
  //     activeFlag: "N",
  //     removeAccessFlag: "N",
  //     userWatcherId: null
  //   },
  //   {
  //     fullName: " Tarun Devsheesh SES245 ",
  //     email: "tarundevasheesh@atomicnorth.com",
  //     username: "116",
  //     activeFlag: "N",
  //     removeAccessFlag: "N",
  //     userWatcherId: null
  //   },
  //   {
  //     fullName: " Tarun Devsheesh SES245 ",
  //     email: "tarundevasheesh@atomicnorth.com",
  //     username: "116",
  //     activeFlag: "N",
  //     removeAccessFlag: "N",
  //     userWatcherId: null
  //   },
  //   {
  //     fullName: " Tarun Devsheesh SES245 ",
  //     email: "tarundevasheesh@atomicnorth.com",
  //     username: "116",
  //     activeFlag: "N",
  //     removeAccessFlag: "N",
  //     userWatcherId: null
  //   },
  // ];
  // WatcherUserList_username= this.WatcherUserList.username;
  // WatcherUserList_username:any = this.WatcherUserList.map(user => user.username);
  WatcherUserList_response: any=[];
  WatcherUserList_N: any=[];
  WatcherUserList_Y: any=[];
//   WatcherUserList_response = [
//     {
//         "fullName": "Sunny Singh SITS507",
//         "email": "sunny.singh750@sesabc.com",
//         "username": "750",
//         "activeFlag": "N",
//         "removeAccessFlag": "N",
//         "userWatcherId": null
//     }
// ];

  flagoptions: any;
  seleccteduserid: any;
  editingCommentID: any;
  selectWatcherList: any;
  selectedwatcherList: any;
  // userName: any;
  
// WatcherUserList=this.WatcherUserListvar.fullName;

  close1() {
    this.showModal1 = false;
  }
  currentUser: any = []

  advanceTxt = '';
  totalPages: number = 0;
  totalRecords: any;
  totalPagesArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  page: number = 1;
  searchFilter: any;
  uploadpopup: boolean = false;
  toastMsgObj: any;
  defaultobj = {
    "searchValue": "",
    "sortColumn": "",
    "sortOrder": "",
    "pageIndex": 1,
    "pageSize": 100,
    "totalCount": 100,
    "status": "",
    "savedSearchId": 0,

    "languageId": 1,
    "firstName": "",
    "displayName": "",
    "email": "",
    "mobileNumber": "",
    "location": ""
  }
  tableHeaders = [
    { label: 'Name', width: '10', name: 'firstName',code:'LC2-35M', sort: 'ASC' },
    { label: 'Email', width: '10', name: 'email',code:'LC2-36M', sort: 'ASC' },
    // { label: 'Contact', width: '10',code:'LC2-37M', name: 'mobileNumber', sort: 'ASC' },
    { label: 'Division', width: '10',code:'LC2-37M', name: 'division', sort: 'ASC' },
    { label: 'RM', width: '10',code:'LC2-37M', name: 'reportingmanager', sort: 'ASC' },
    { label: 'HR', width: '10',code:'LC2-37M', name: 'hrmanager', sort: 'ASC' },
    
    // { label: 'Display Name', width: '15',code:'LC2-38M', name: 'displayName', sort: 'ASC' },
    { label: 'Status', width: '10', code:'LC20-31M',name: 'Status', sort: 'ASC' },
    { label: 'Joined On', width: '10',code:'LC2-40M', name: 'Joined On' },
    { label: 'Group', width: '10',code:'LC2-37M', name: 'usergroup', sort: 'ASC' },
    { label: 'Profile %', width: '10',code:'LC2-37M', name: 'usergroup', sort: 'ASC' },
    // { label: 'Added By', width: '10',code:'LC2-39M', name: 'Added By' },

  ];
  uploadInput: boolean = false;
  filterth: any = ''
  displayDialog: boolean = false;
  groupOptions: any[] = [];
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
      this.tableHeaders.map((x: any) => { x.sort = 'ASC' });
      this.tableHeaders[i].sort = 'DESC';

    }
    else {
      this.defaultobj.sortColumn = th;
      this.defaultobj.sortOrder = value;
      this.tableHeaders.map((x: any) => { x.sort = 'ASC' });
      this.tableHeaders[i].sort = 'ASC';
    }
    this.userRoleList();
  }
  private shownHeaderNames: string[] = [];
  showPopup(headerName: string) {

    this.closeAllPopups();
    this.popupVisibility[headerName] = true;
    // if(this.searchFilter!='' && this.searchFilter!=undefined){
    if (this.shownHeaderNames.includes(headerName)) {
      if (this.searchFilter != '' && this.searchFilter != undefined) {
        return;
      }
      else {
        this.searchFilter = '';
        this.reset();
      }

    }
    else {
      this.searchFilter = '';
      this.reset();
      this.shownHeaderNames = [];
      this.shownHeaderNames.push(headerName);
    }




  }


  searchbytId(e: any) {

    this.defaultobj.savedSearchId = e;
    document.getElementById("reset_button")!.style.display = 'block';
    this.userRoleList();



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
      };
    }
  }
  AddUserform: any = FormGroup;
  loading: boolean = false;
  error: any;
  errorMessage: any;
  messageData: any;
  divisionOptions: any[] = [];
  departmentOptions: any[] = [];
  rmOptions: any[] = [];
	hrOptions: any[] = [];
  addForm: any = FormGroup;
  roleForm: any = FormGroup
  show: boolean = false;
  submitted: boolean = false;
  selectAll: boolean = false;
  falseJson: any = [];
  userList: any = [];
  userLoginId:any;
  CommentForm:any = FormGroup;
  WatcherForm:any = FormGroup;
  selectedValuesCount: number = 0;
  checked: any;
  addWatcherVisible: boolean = false;
  constructor(private formbuilder: FormBuilder, private useService: UserManagementService,
    public commonService: CommonService,
    private lang: LangPipe,
    private messageService: MessageService,
    // private toastService: ToastService,
    private loaderService: LoaderService

  ) {
    this.AddUserform = this.formbuilder.group({
			// login: ['', [Validators.required]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			// imageUrl: ['https://example.com/avatar.jpg', [Validators.required]],
			// activated: [true],
			// langKey: ['', [Validators.required]],
			// createdBy: [''],
			// createdDate: [''],
			// lastModifiedBy: [''],
			// lastModifiedDate: [''],
			// authorities: ['', [Validators.required]],
			employeeId: ['', [Validators.required]],
			joiningdate: ['', [Validators.required]],
			dob: ['', [Validators.required]],
			department: ['', [Validators.required]],
			remark: ['', [Validators.required]],
			division: ['', [Validators.required]],
			reportingmanager: ['', [Validators.required]],
			divisionid: ['', [Validators.required]],
			hrmanager: ['', [Validators.required]],
			usergroup: ['', [Validators.required]],
			userstatus: ['Active', [Validators.required]],
			// policyGroup: ['GroupB', [Validators.required]],
			// salutation: ['Mrs.', [Validators.required]],
			// genderCode: ['M', [Validators.required]]
 
		});


  

  this.formGroup = new FormGroup({
      selectedwatchers: new FormControl<City[] | null>([{ name: 'Istanbul', code: 'IST' }])
  });
  
    this.createCommentForm();
    this.GetWatcherForm();
    // this.getCountry();
    this.addFormmethod();
    // this.getUserRoleList();
    this.userRoleList();
    // this.downloadLink();
let id:any= localStorage.getItem('currentUser');
id=JSON.parse(id)
this.userLoginId=id.userId;
console.log("loginId",id,this.userLoginId)
  }

  // openDialog(id:any) {
  //   this.displayDialog = true;
  //   this.loadUserAccessGroup(id);
  //   this.seleccteduserid=id;
  // }



  AddOrRemove(group:any,addRemoveFlag:any) {
    // group.activeflag = group.activeflag === 'Y' ? 'N' : 'Y';
    // debugger;
    this.loaderService.showLoader();
    const data = {
      group_id: group,
      username: this.seleccteduserid,
      addRemoveFlag: addRemoveFlag
    }
    console.log("AddOrRemove-data",data);
    this.commonService.AddOrRemove(data.group_id,data.username,data.addRemoveFlag).subscribe(
			(options) => {

        if (options==='Operation successful')
        {
          console.log("AddOrRemove-sucess",options);
          this.messageService.add({severity:'success', summary:'Success', detail:'Operation successful'});
          
        }
        else if (options==='Operation failed')
        {
          console.log("AddOrRemove-failed",options);
          this.messageService.add({severity:'error', summary:'Error', detail:'Operation failed'});
        }
        this.messageService.add({severity:'success', summary:'Success', detail:'User Group access changed  successful'});
        // this.loadUserAccessGroup(this.seleccteduserid);
        this.loaderService.hideLoader();
        // setTimeout(() => {
        //   // this.loading = false;
        //     // this.submitted = false;
        //     document.getElementById("cncl")?.click();
        //   }, 1000);
			},
			(error) => {
        // console.log("AddOrRemove-failed",error);
				console.error('AddOrRemove Error:-failed', error);
        this.loaderService.hideLoader();
			}
		);

  }

  loadUserAccessGroup(id:any) {
    // debugger;
    this.seleccteduserid=id;
		this.commonService.UserAccess(id).subscribe(
			(options) => {

				this.groupOptions = options;
        
        console.log('group loaded', this.groupOptions);
        this.flagoptions = [options.activeflag];
        console.log('flag options', this.flagoptions);
			},
			(error:any) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

  link = environment.apiUrl + "/UsersTemplates/UserUploadTemplate.xlsx";
  upload: any;
  private selectedFile!: File;

	async ngOnInit() {
		await this.loadDivisionOptions();
		await this.loadRmOptions();
		await this.loadHrOptions();
		await this.loadGroupName();
		await this.loadDepartment();
		// this.showMessage();
		// this.messageData=await this.dataService.getMessageData();
	}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.importError=false;
  }
  errorLink:any;
importError:boolean=false;
  convertAndDownload() {
    this.loaderService.showLoader();
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        let base64String = btoa(event.target.result);
        base64String = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + base64String
      
        this.useService.uploadfile(base64String).subscribe(
          (response: any) => {
            this.loaderService.hideLoader();
            this.userRoleList();

            if (!response.isError) {
              this.importError=false;
              // alert(response.responseCode)
              this.toastMsgObj = {
                msgType: "ATMCMN-01_INFO-M",
                msgText: this.lang.transform(response.responseCode)
              }
              // this.toastService.addToast(this.toastMsgObj);
            }
            else {
              this.toastMsgObj = {
                msgType: 'ATMCMN-04_ERROR-M',
                msgText: this.lang.transform(response.responseCode)
              }
              // const fileInput = document.getElementById('file') as HTMLInputElement;;

              // if (fileInput) {
              //   fileInput.value = '';
              // } 
              // this.toastService.addToast(this.toastMsgObj);
// this.commonService.downloadErrorFileLink().subscribe(
  // (response: any) => {
   
    console.log(response)
this.errorLink=response.message.responseCode;
this.importError=true;

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
            this.loaderService.hideLoader();
            console.error('POST Error:', error);
          }
        );

      };

      reader.onerror = (error) => {
        this.loaderService.hideLoader();
      };

      reader.readAsBinaryString(this.selectedFile);
    }
    else{
      this.loaderService.hideLoader();
      this.toastMsgObj = {
        msgType: 'ATMCMN-04_ERROR-M',
        msgText: this.lang.transform("ATMUSR-FLUPL-D")
      }
      // this.toastService.addToast(this.toastMsgObj);
      // alert("jitu");
      return
    }
  }
  downloadLink() {
    this.useService.templateFormat().subscribe(
      (response: any) => {
        this.link = response;
   


      },
      (error) => {

        console.error('POST Error:', error);
      }
    );
  }


  searchFilterMethod(label: any) {
    if (this.searchFilter != '' && this.searchFilter != undefined) {
      this.filterth = label
      if (label == 'Name') {

        // this.defaultobj.userName = this.searchFilter;
        this.defaultobj.firstName = this.searchFilter;
        this.commonService.GetSearchUser(this.searchFilter).subscribe((response:any) => {
          this.userList = response;
          this.currentPage = this.currentPage;
          this.totalRecords = response.totalElements;
          this.totalPages = response.totalPages;
          this.generateTotalPagesArray();
          this.loaderService.hideLoader();
        }
        );
      }
      else if (label == 'Email') {
        this.defaultobj.email = this.searchFilter;
        this.commonService.GetSearchUser(this.searchFilter).subscribe((response:any) => {
          this.userList = response;
          this.currentPage = this.currentPage;
          this.totalRecords = response.totalElements;
          this.totalPages = response.totalPages;
          this.generateTotalPagesArray();
          this.loaderService.hideLoader();
        }
        );
      }
      // else if (label == 'Contact') {
      //   this.defaultobj.mobileNumber = this.searchFilter;
      // }
      // else if(label=='Display Name'){
      //   this.defaultobj.displayName = this.searchFilter;
      // }
      // else if(label=='Status'){
      //   this.defaultobj.status = this.searchFilter; 
      // }
      this.closeAllPopups();
      // this.userRoleList();
    }
    else {
      this.closeAllPopups();
    }

  }
  reset() {
    this.searchFilter = '';

    // this.defaultobj.userName = "";
    this.defaultobj.firstName = "";
    this.defaultobj.savedSearchId = 0;
    this.defaultobj.email = "";
    this.defaultobj.displayName=""
    this.defaultobj.status=''
    this.defaultobj.mobileNumber = "";
    this.filterth = '';
    document.getElementById("reset_button")!.style.display = 'none';
    localStorage.removeItem('adsearch');
    this.userRoleList();
    this.userRoleList();

  }
  userRoleList() {
    this.loaderService.showLoader();

    let data = this.defaultobj;

    // data.pageIndex = number;
    // data.pageSize = this.itemsPerPage;
    const params = {
      pageNumber: this.currentPage, 
      pageSize: this.itemsPerPage,
      sortBy: 'firstName',
      sortDir: 'asc'
    };
    this.commonService.UserList(params.pageNumber, params.pageSize, params.sortBy, params.sortDir).subscribe(
      (response: any) => {
        this.userList = response.content;
        this.currentPage = this.currentPage;
        this.totalRecords = response.totalElements;
        this.totalPages = response.totalPages;
        this.generateTotalPagesArray();
        this.loaderService.hideLoader();
      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );
  }
  async loadDivisionOptions() {
		this.commonService.GetDivision().subscribe(
			(options) => {
				this.divisionOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

	async loadRmOptions() {
		this.commonService.GetReportingManager().subscribe(
			(options) => {
				this.rmOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

	async loadHrOptions() {
		this.commonService.GetHrManager().subscribe(
			(options) => {

				this.hrOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

	async loadGroupName() {
		this.commonService.AllAccessGroup().subscribe(
			(options) => {

				this.groupOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

	async loadDepartment() {
		this.commonService.GetDepartment().subscribe(
			(options) => {

				this.departmentOptions = options;
			},
			(error) => {
				console.error('Error fetching dropdown options', error);
			}
		);
	}

  login = JSON.parse(localStorage.getItem('userInfo') || '{}').login;
	langKey=localStorage.getItem('lang'); // default
 
  SubmitAddUserform() {
    // debugger;
    console.log('langKey', this.langKey);
      this.submitted = true;
      // if (this.form.invalid) {
      //   this.markFormGroupTouched(this.form);
      //   return;
      // }
      // if (this.AddUserform.invalid) {
      // 	console.error("invalid", this.AddUserform.value);
      // 	return;
      // }
      const formData = this.AddUserform.value;
      const formatauthorities=[JSON.parse(formData.usergroup)];
      console.log("valid", this.AddUserform.value);
      const formattedData = {
        "login": formData.email,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        "imageUrl": 'https://example.com/avatar.jpg',
        "activated": true,
        "langKey": this.langKey,
        // "createdBy": this.login,
        // "createdDate": formData.createdDate,
        // "lastModifiedBy": this.login,
        // "lastModifiedDate": formData.lastModifiedDate,
        // "authorities": formData.usergroup,
        "authorities": formatauthorities,
        "employeeId": formData.employeeId,
        "joiningdate": formData.joiningdate,
        "dob": formData.dob,
        "groupName": formData.groupName,
        "department": formData.department,
        "remark": formData.remark,
        "reportingmanager": +formData.reportingmanager,
        "divisionid": formData.divisionid,
        "division": formData.division,
        "hrmanager": +formData.hrmanager,
        "usergroup": formData.usergroup,
        "userstatus": formData.userstatus,
        "policyGroup": 'SUPRA-Noida',
        "salutation": 'Mrs.',
        "role": 'USER',
        "genderCode": "",
      }
      console.log("formattedData-----", formattedData);
      this.addUser(formattedData);
    // }
    // else {
    //   // If the form is invalid, mark all form controls as touched
    //   this.markFormGroupTouched(this.form);
    // }
    }
 
    addUser(formattedData: any) {
      this.commonService.newUserRegistration(formattedData)
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
            //   this.loading = false; // Stop the loading spinner
            return throwError(error);
          })
        )
        .subscribe(data => {
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
              detail: 'User added successfully'
              // detail: this.messageData[data.responseCode]
            });
            this.GetAllUsers();
            this.loading = false;
            this.submitted = false;
          }
        });
    }
 
    // markFormGroupTouched(formGroup: FormGroup) {
    //   Object.values(formGroup.controls).forEach(control => {
    //     control.markAsTouched();
    //     if (control instanceof FormGroup) {
    //       this.markFormGroupTouched(control);
    //     }
    //   });
    // }
  addbutton: boolean = false;
  editbutton: boolean = false;
  editIndex: any;
  editId: any;
  showResults(itemsPerPage:any){
		this.currentPage = 1;
		this.itemsPerPage = itemsPerPage;
		this.userRoleList();
	}

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.userRoleList();
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
  showDetails: boolean = false;
  GetWatcherForm() {
    const login = JSON.parse(localStorage.getItem('userInfo') || '{}').login;
    const currentDateWithoutMilliseconds = new Date().toISOString().slice(0, -5) + 'Z';
    this.WatcherForm = this.formbuilder.group({
      // comment_id: [this.userList.id, Validators.required],
      objectCode:[''],
      watcherOperation: ["ADD_USER", Validators.required],
      levelCode: ['', Validators.required],
      watcherCode: ['USER', Validators.required],
      username: [[], Validators.required],
      objectId: ["", Validators.required],
      level1: ['', Validators.required],
      level2: [0, Validators.required],
      level3: [0, Validators.required],
      level4: [0, Validators.required],
      level5: [0, Validators.required],
      level6: [0, Validators.required],
      level7: [0, Validators.required],
      level8: [0, Validators.required],
      level9: [0, Validators.required],
      level10:[0, Validators.required],
      watcherLevelCode: ['USER', Validators.required],
    });
  }
  addWatcher() {

    this.addWatcherVisible = !this.addWatcherVisible;

  }

  submitWatcherForm() {
    this.loaderService.showLoader();
    const originalArray: string[]= this.WatcherForm.value.username;
    const newArray: number[] = originalArray.map(str => Number(str.replace(/"/g, '')));
    this.WatcherForm.value.username= newArray;
    this.WatcherForm.value.objectCode=this.groupname.toUpperCase();
    this.WatcherForm.value.levelCode=this.groupname.toUpperCase();
    this.WatcherForm.value.objectId=this.username.toString();
    this.WatcherForm.value.level1=this.username;
    let watcherformdata=this.WatcherForm.value;
    // alert(watcherformdata);
    this.commonService.CreateWatcher(watcherformdata).subscribe(
      (response)=> {
        console.log('Watcher added successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Watcher added successfully'
        });
        this.fetchWatcherUserList(this.username, this.groupname);
      },
      (error) => {
        console.error('Error adding Watcher:', error);
      }
      );
      this.fetchWatcherUserList(this.username, this.groupname);
      // Assuming this.WatcherForm is your form group
      this.WatcherForm.get('username').reset();
      console.log('this.watcherForm.value', this.WatcherForm.value);
      this.loaderService.hideLoader();
  }
  groupname :any = '';
  username:any = '';
  fetchWatcherUserList(username: any, objectType:any) {
    // debugger
    this.groupname=objectType;
    this.username=username;
    this.loaderService.showLoader();
    this.commonService.GetWatcher(username,"USER","USER").subscribe(
      (response) => {
        this.WatcherUserList_response = response;
        this.WatcherUserList_N = this.WatcherUserList_response.filter((item:any) => item.activeFlag === 'N');
        this.WatcherUserList_Y = this.WatcherUserList_response.filter((item:any) => item.activeFlag === 'Y');
        console.log('WatcherUserList_N',this.WatcherUserList_N);
        console.log('WatcherUserList_Y',this.WatcherUserList_Y);
        console.log('WatcherUserList_response',this.WatcherUserList_response);
        // this.userName=response.userName;
        this.loaderService.hideLoader();
        // this.showDetails = true;
      },
      (error) => {
        console.error('Error fetching Watcher:', error);
        // Handle the error appropriately
      }
    );
  } 

  selectWatcher(e: any) {
    // debugger
      this.selectWatcherList.push(e);
      this.selectedwatcherList.push({ userID: e.userId, status: 'A' })
      this.addWatcherVisible = false;
  }
  filterincidentWatcher(e: any) {
  // debugger
    const inputValue = e.target.value.toLowerCase();
    this.WatcherUserList_response = this.WatcherUserList_response;
    this.WatcherUserList_response = this.WatcherUserList_response.filter((item: any) => {
      return item.userName.toLowerCase().includes(inputValue.toLowerCase());
    });

  }

  DeleteWatcher(watcherOperation:string,userWatcherId:number){
    this.loaderService.showLoader();
    const body = {
      watcherOperation:watcherOperation,
      userWatcherId:userWatcherId
    };
    this.commonService.DeleteWatcher(body).subscribe(
      (response) => {
        if(response.success== true){ 
          // alert('innnnnn');
          // this.fetchWatcherUserList(this.username, this.groupname);
          setTimeout(() => {
            this.fetchWatcherUserList(this.username, this.groupname);
            this.loaderService.hideLoader();
          }, 1000);
          setTimeout(() => {
            // this.fetchWatcherUserList(this.username, this.groupname);
            // this.loaderService.hideLoader();
            this.messageService.add({severity:'success', summary:'Success', detail:'Watcher Deleted successfully'});
          }, 1000);
        }
      }
    );
  }


  async createCommentForm() {
    const login = JSON.parse(localStorage.getItem('userInfo') || '{}').login;
    const currentDateWithoutMilliseconds = new Date().toISOString().slice(0, -5) + 'Z';
    this.CommentForm = this.formbuilder.group({
      referenceNumber: [this.userList.email, Validators.required],
      object_code: ['Manager', Validators.required],
      object_id: ['1', Validators.required],
      comments: ['', Validators.required],
      level1: [1, Validators.required],
      level2: [2, Validators.required],
      level3: [3, Validators.required],
      level4: [4, Validators.required],
      level5: [5, Validators.required],
      level6: [6, Validators.required],
      level7: [7, Validators.required],
      level8: [8, Validators.required],
      level9: [9, Validators.required],
      level10: [10, Validators.required],
      level_code: ['1', Validators.required],
      // is_private: ['N', Validators.required],
      // is_deleted: ['N', Validators.required],
      // entity_id: ['1', Validators.required],
      // client_id: ['1', Validators.required],
      // last_updated_by: [login, Validators.required],
      // last_update_date: [currentDateWithoutMilliseconds, Validators.required],
      // created_by: [login, Validators.required],
      // creation_date: [currentDateWithoutMilliseconds , Validators.required],
      // last_update_session_id: [null, Validators.required]
    });
  }

  AddComment() {
    this.CommentForm.value.referenceNumber=this.selected_Comment_user_email.toString();
    const Commentedformatdata = this.CommentForm.value;
    const Commentedformatteddata = {
      "referenceNumber": this.selected_Comment_user_email.toString(),
      "object_code": this.selected_Comment_user_usergroup.toString(),
      "object_id": this.selected_Comment_user_id.toString(),
      "comments": Commentedformatdata.comments,
      "level1": this.selected_Comment_user_id,
      "level2": 0,
      "level3": 0,
      "level4": 0,
      "level5": 0,
      "level6": 0,
      "level7": 0,
      "level8": 0,
      "level9": 0,
      "level10": 0,
      "level_code": this.selected_Comment_user_usergroup.toString(),
      "is_private": "N",
      "is_deleted": "N",
    };
    // this.commonService.AddComment(Commentedformatdata).subscribe(
    this.commonService.AddComment(Commentedformatteddata).subscribe(
      (response) => {
        console.log('Comment added successfully:', response);
        this.messageService.add({severity:'success', summary:'Success', detail:'Comment added successfully'}); 
      //   setTimeout(() => {
      //     location.reload();
      // }, 2000);
      this.fetchUserComment(this.selected_Comment_user_id,this.selected_Comment_user_usergroup,this.selected_Comment_user_id);
      this.CommentForm.reset();
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
    // this.CommentForm.reset();
    // this.fetchUserComment(this.selected_Comment_user_id,'User',this.selected_Comment_user_id);
  }
  selected_Comment_user_id:any='';
  selected_Comment_user_email:any='';
  selected_Comment_user_usergroup:any='';
  fetchUserComment(id: any,usergroup: any,email: any) {
    this.selected_Comment_user_id=id;
    this.selected_Comment_user_email=email;
    this.selected_Comment_user_usergroup=usergroup;
    this.loaderService.showLoader();
    const requestData = {
      objectCode: usergroup,
      // objectCode: 'USER',
      // objectId: 71,
      objectId: id,
      // level1: 71,
      level1: id,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0,
      level10: 0,
    };
    this.commonService.FetchUserComment(requestData).subscribe(
      (response) => {
        this.userComments = response;
        this.loaderService.hideLoader();
        // this.showDetails = true;
        console.log('User comment fetched successfully:', response);
        // You can handle the response or valueCsetValueperform any additional logic here
      },
      (error) => {
        console.error('Error fetching user comment:', error);
        // Handle the error appropriately
      }
    );
  } 

  editCommentdata:any='';
  editComment(comment: any,commentIds:any) {
    console.log("commentid",commentIds);
    console.log("comment",comment);
    // this.editingComment = { ...comment };
    // const { commentId, ...newObjectWithoutCommentId } = comment;
    this.editingCommentID = commentIds;
    this.editCommentdata = comment;
  }
  saveEditedComment() {
    console.log(this.userComments)
    // debugger
    // console.log('Saving edited comment:', this.editingComment);
    this.commonService.UpdateUserComment(this.editingCommentID,this.editCommentdata.comments,this.selected_Comment_user_email).subscribe(
      (response) => {
        if (response)
        {
          console.log('Comment updated successfully:', response);
          this.messageService.add({severity:'success', summary:'Success', detail:'Comment updated successfully'});
        }
        // this.fetchUserComment(71,'USER');
        
      }
      );  
      // setTimeout(() => {
        // location.reload();
        // this.detailsClose();
      // this.editCommentdata = null;
      // this.editingComment = null;
    // }, 1000);
    // this.fetchUserComment(this.selected_Comment_user_id,this.selected_Comment_user_usergroup,this.selected_Comment_user_id);
  }
  deleteComment(commentId: any) {
    this.commonService.DeleteComment(commentId).subscribe(
      (response) => {
        if (response)
        {
          this.messageService.add({severity:'error', summary:'Success', detail:'Comment deleted successfully'});
          setTimeout(() => {
            // this.detailsClose();
            window.location.reload();
          // this.editCommentdata = null;
          // this.editingComment = null;
        }, 1000);
          console.log('Comment deleted successfully:', response);
          this.fetchUserComment(this.selected_Comment_user_id,this.selected_Comment_user_usergroup,this.selected_Comment_user_id);
        }
        else if(response.status="NOT_FOUND")
        {
          console.log('Comment not deleted successfully:', response);
          this.messageService.add({severity:'error', summary:'Error', detail:'Comment not deleted successfully'});
        }
      }
    )
    
  }
  deleteComment1(commentId: any) {
    this.commonService.DeleteComment(commentId).subscribe(
      (response) => {
        if (response.status="OK")
        {

          console.log('Comment deleted successfully:', response);
          this.fetchUserComment(this.selected_Comment_user_id,this.selected_Comment_user_usergroup,this.selected_Comment_user_id);
          this.messageService.add({severity:'error', summary:'Success', detail:'Comment deleted successfully'});
        }
        else if(response.status="NOT_FOUND")
        {
          console.log('Comment not deleted successfully:', response);
          this.messageService.add({severity:'error', summary:'Error', detail:'Comment not deleted successfully'});
        }
      }
    )
    
  }
  details(data: any, i: any) {
    this.showDetails = true;
    this.edit(data, i);
    document.getElementById('details')!.classList.add('disabled-div');
  }
  detailsCloseComment(e:any) {
    document.getElementById('Commentmodal')?.click()
  }
  detailsCloseUserAccessGroupmodal(e:any) {
    document.getElementById('UserAccessGroupmodal')?.click()
  }
  detailsCloseWatchermodal(e:any) {
    document.getElementById('Watchermodal')?.click()
  }
  detailsClosestaticBackdrop(e:any) {
    document.getElementById('staticBackdrop')?.click()
  }
  
  detailsClose(e:any,id: string) {
    // debugger
    document.getElementById(id)?.click();
    // document.getElementById('details')!.classList.remove('disabled-div');
    this.showDetails = false;
    this.editingCommentID='';
    // this.editCommentdata=false;
    this.addWatcherVisible = false;
    this.WatcherForm.get('username').reset();
    this.WatcherUserList_N='';
    this.WatcherUserList_Y='';
    this.AddUserform.reset();
 e.preventDefault()
    // this.loadUserAccessGroup(this.seleccteduserid);
  }
  edit(data: any, i: any) {
    this.loaderService.showLoader();
    this.editId = data.userId;
    this.submitted = false;
    this.addbutton = false;
    this.editbutton = true;

    this.editIndex = i;
    this.useService.userDetailsById(this.editId).subscribe(
      (response: any) => {
       
        this.loaderService.hideLoader();
        response = response.data[0];

        this.addForm.controls['name'].setValue(response.userName);
        this.addForm.controls['displayName'].setValue(response.displayName);
        this.addForm.controls['email'].setValue(response.email);
        this.addForm.controls['contact'].setValue(response.mobileNumber);
        this.addForm.controls['status'].setValue(response.status);
        this.addForm.controls['country'].setValue(response.country);
        this.useService.state(response.country).subscribe(
          (response: any) => {
            this.stateList = response.data[0];
        
          },
          (error) => {
            this.loaderService.hideLoader();
            console.error('POST Error:', error);
          }
        );
        setTimeout(() => {
          this.addForm.controls['state'].setValue(response.state);
        }, 200);

        this.addForm.controls['city'].setValue(response.city);
        this.addForm.controls['street'].setValue(response.landMark);
        this.addForm.controls['zip'].setValue(response.zipcode);
        let role = response.roleIds.split(',');
        this.codeList = []
        role.map((x: any) => {
          this.getFixRoleList.map((y: any) => {

            x = x.trim()
            if (x == y.roleId) {
              y.select = true;
              this.codeList.push(y.roleName)
            }
          })
        })
      

      },
      (error) => {

        console.error('Get Error:', error);
      }
    );


  }
  addroleForm() {

   
  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;

  }

  closeModal() {
    this.showModal = false;
    
  }

  permissionArray: any = [{
    rolenames: "billing",
    permission: [
      {
        txt: "usermanagement",
        acess: true,
        subpermisson: [
          { text: "edit", acess: true },
          { text: "delete", acess: false },
          { text: "notification", acess: true }
        ]
      }
    ]
  }];

  // addUser() {
  //   this.showDetails = false;
  //   this.submitted = false;
  //   this.addForm.reset();
  //   this.addbutton = true;
  //   this.editbutton = false;
  //   this.codeList = [];
  //   this.idList = [];
  //   this.getFixRoleList.map((x: any) => {
  //     x.select = false;
  //   })
  //   this.addForm.controls['country'].setValue('');
  //   this.addForm.controls['contact'].setValue('');
  //   this.addForm.controls['state'].setValue("");
  //   this.addForm.controls['displayName'].setValue("");
  //   this.addForm.controls['status'].setValue('A');
   
  // }
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
    "resetToken": "",
    "resetTokenExpires": "2023-10-13T10:21:37.493Z",
    "userId": 0,
    "userName": "string",
    "email": "string",

    "displayName": "string",
    "mobileCountryCode": "91",
    "mobileNumber": "string",


    "isAdUser": false,





    "roleIds": "",


    "landMark": "",
    "city": "string",
    "state": "string",
    "zipcode": "string",
    "country": "string",


    "status": "string"

  }
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  conditionalMinLengthValidator(minLength: number) {
    
    const digitRegex = /^[0-9]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
   if (control.value && control.value.length < minLength) {
        const valueString: string = control.value.toString();
        if(!digitRegex.test(valueString)){
          control.setValue('');
         return null;
        }
        return { minlength: true };
      }
      return null;
    };
  }
  addFormmethod() {
    this.addForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      displayName: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      contact: ['', [this.conditionalMinLengthValidator(10)]],


      country: ['', [Validators.required]],
      status: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]


    });
  }
  getCountry() {
    this.useService.country().subscribe(
      (response: any) => {
        this.countryList = response.data[0];
       
      },
      (error) => {

        console.error('POST Error:', error);
      }
    );
  }

  stateList: any = [];
  getstate(e: any) {
    this.loaderService.showLoader();
    this.addForm.controls['state'].setValue('');
    this.useService.state(e.target.value).subscribe(
      (response: any) => {
        this.loaderService.hideLoader();
        this.stateList = response.data[0];
       
      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );
  }
  getFixRoleList: any = []
  extractPermissions(jsonObj: any): any[] {
    let extractedPermissions: any[] = [];

    if (jsonObj && jsonObj.permission && Array.isArray(jsonObj.permission)) {
      extractedPermissions = jsonObj.permission;

      jsonObj.permission.forEach((permission: any) => {
        if (permission.child && Array.isArray(permission.child)) {
          extractedPermissions = extractedPermissions.concat(this.extractPermissions(permission));
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
    })
   
    if (this.idList.length > 0) {
      this.roleerror = false;
    }
  }
  showpermission(index: any) {
    this.getFixRoleList[index].show = !this.getFixRoleList[index].show
  }
  getUserRoleList() {
    this.loaderService.showLoader();
    this.useService.userRole().subscribe(
      (response: any) => {
        this.loaderService.hideLoader();
        this.getFixRoleList = response.data;
        for (let i = 0; i < this.getFixRoleList.length; i++) {
          const permissions = this.extractPermissions(this.getFixRoleList[i]);
          delete (this.getFixRoleList[i].permission);
          this.getFixRoleList[i].show = false;
         
          this.getFixRoleList[i].select = false;
          this.getFixRoleList[i].child = permissions[0]?.child[0]?.child;
        
        }


      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );
  }






  // add() {
  //   this.loaderService.showLoader();
  //   this.submitted = false;
  //   let data: any;
  //   this.roleerror = false;
  //   data = this.obj;
   
  //   if (this.addForm.invalid) {

  //     this.submitted = true;
  //     this.loaderService.hideLoader();
  //     return;
  //   }
  //   // else if(this.idList.length==0){
  //   //   this.roleerror=true;
  //   // }
  //   else {

  //     data.userName = this.addForm.value.name;
  //     data.email = this.addForm.value.email;
  //     data.password = this.addForm.value.password;
  //     data.displayName = this.addForm.value.displayName;
  //     data.mobileNumber = this.addForm.value.contact;
  //     data.country = this.addForm.value.country;
  //     data.landMark = this.addForm.value.street;
  //     data.zipcode = this.addForm.value.zip;
  //     data.city = this.addForm.value.city;
  //     data.state = this.addForm.value.state;
  //     data.status = this.addForm.value.status;
  //     data.roleIds = ""
  //     data.roleIds = this.idList.toString();

  //     if (this.addbutton) {
  //       data.userId = 0;

       
  //     }
  //     else {
  //       data.userId = this.editId;
  //     }
  //     this.useService.addUserManagement(data).subscribe(
  //       (response: any) => {
  //         this.loaderService.hideLoader();
  //         this.userRoleList();

  //         if (response.isError) {

  //           this.toastMsgObj = {
  //             msgType: response.responseMessageType,
  //             msgText: this.lang.transform(response.responseCode)
  //           }
  //           // this.toastService.addToast(this.toastMsgObj);
  //           return;
  //         }
  //         if (this.editbutton) {
  //           this.toastMsgObj = {
  //             msgType: response.responseMessageType,
  //             msgText: this.lang.transform(response.responseCode)
  //           }
  //           // this.toastService.addToast(this.toastMsgObj);
  //           // alert(response.responseCode)
  //           document.getElementById('cncl')?.click();
  //           return;
  //         }
  //         else {
  //           this.toastMsgObj = {
  //             msgType: response.responseMessageType,
  //             msgText: this.lang.transform(response.responseCode)
  //           }
  //           // this.toastService.addToast(this.toastMsgObj);
  //           // alert(response.responseCode);

  //           this.addUser();
  //         }
         
  //       },
  //       (error) => {
  //         this.loaderService.hideLoader();
  //         console.error('POST Error:', error);
  //       }
  //     );
  //   }
  //   // document.getElementById('cncl')?.click()
  // }
  get f() { return this.addForm.controls; }
  get g() { return this.roleForm.controls; }

  showstatus: boolean = false;

  namediv = false;
  filtervalue: any
  showdivname(val: any) {
    this.namediv = !this.namediv;
    this.filtervalue = val;
  }
  // filter for search
  name_srch = "";

  unlockUser(data: any) {
    this.loaderService.showLoader();
    let id = data.userId;
    // this.useService.unloackUser(id).subscribe(
    //   (response: any) => {
    //     this.loaderService.hideLoader();
    //     if (!response.isError) {
    //       this.toastMsgObj = {
    //         msgType: response.responseMessageType,
    //         msgText: this.lang.transform(response.responseCode)
    //       }
    //       // this.toastService.addToast(this.toastMsgObj);
    //       // alert(response.responseCode);
    //       return;
    //     }
    //     else {
    //       this.toastMsgObj = {
    //         msgType: response.responseMessageType,
    //         msgText: this.lang.transform(response.responseCode)
    //       }
    //       // this.toastService.addToast(this.toastMsgObj);
    //       // alert(response.responseCode);
    //       this.userRoleList(1)
    //     }


    //   },
    //   (error: any) => {
    //     this.loaderService.hideLoader();
    //     console.error('POST Error:', error);
    //   }
    // );
  }

  GetAllUsers() {
    this.commonService.GetAllUsers().subscribe(
      (response: any) => {
        this.userList = response;
        console.log(this.userList, 'this.userList');
      }
    )
  }


}
