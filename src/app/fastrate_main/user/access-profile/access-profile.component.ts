import { Component, ViewChild, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { BillingService } from 'src/app/_services/billing.service';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';
import { UserManagementService } from 'src/app/_services/user-management.service';
import { LangPipe } from 'src/app/pipe/pipe';
// import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { catchError, delay, throwError } from 'rxjs';
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-access-profile',
  templateUrl: './access-profile.component.html',
  styleUrls: ['./access-profile.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AccessProfileComponent {
  incidentForm:FormGroup;
  totalPages: number = 0;
  totalRecords: any;
  totalPagesArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  page: number = 1;
  listObj = {
    "searchValue": "",
    "sortColumn": "",
    "sortOrder": "",
    "pageIndex": this.page,
    "pageSize": this.itemsPerPage,
    "totalCount": 0,
    "status": "",
    "dynamicColumn": "",
    "languageId": 1,
    "savedSearchId": 0,
    "title": "",
    "incidentType": ""
  }

  defaultobj = {
    "searchValue": "",
    "sortColumn": "",
    "sortOrder": "",
    "pageIndex": 1,
    "pageSize": 1000,
    "totalCount": 1000,
    "status": "",
    "savedSearchId": 0,

    "languageId": 1,
    "userName": "",
    "displayName": "",
    "email": "",
    "mobileNumber": "",
    "location": ""
  }
  editScreen:boolean=false;
  AccessProfileList: any = [];
  watcherList:any=[]
  toastMsgObj:any;
  watcherFakeJsonFilter:any;
  priorityList:any=[];
  subscribedParam:any='';
  accessProfileForm: any;
  divisionOptions: any;
  siteOptions: any [] =[];
  SiteForm: FormGroup;//Leve0
  businessOptions: any [] =[];
  BusinessUnitForm: FormGroup;//Level
  divisionid: any [] =[];
  OperationUnitForm: FormGroup;//Level2
  groupOptions: any []=[];
  AccessGroupForm: FormGroup;//Level3
  userOptions: any []=[];
  UserGroupForm: FormGroup;//Level4
  // @ViewChild('OperationUnitForm') OperationUnitForm: FormGroup;
  // @ViewChild('AccessGroupForm') AccessGroupForm: FormGroup;
  activeTabIndex = 0;
  Levelvalue: any; //Levelvalue ID
  Levelvalue2: any; //Levelvalue Value
  accessProfileList: any;
  sortedUsers: any[]=[];
  Selected_profile_OPTION_ID: any;
  Level_ListData: any;
  tabIndex = 0;
activeTab = 0;
  CreateAccessProfile_Data: any;
  profileoptionvalue: any;

switchHeaders(tabNumber: any) {
  // debugger;
  if(tabNumber.index == 0){
    this.GetLevelList('LEVEL' + tabNumber.index);
    console.log('LEVEL0' + tabNumber.index);
  }
  else if(tabNumber.index >0){
    this.GetLevelList('LEVEL' + tabNumber.index);
    console.log('LEVEL' + tabNumber.index);
  }
  this.activeTab = tabNumber.index;
}
  constructor(private commonService: CommonService,private formBuilder:FormBuilder,private lang:LangPipe,
    // private billingService:BillingService,
    private toastService:ToastService,
    private userService:UserManagementService
    ,private router:ActivatedRoute,
    private loaderService:LoaderService,    
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,) {
      // this.Get_All_AccessProfileList();
      // this.getallWatchers();
      // this.loadDivisionOptions();
      // this.loadGroupName();
      // this.editScreen=true;
    //   this.router.paramMap.subscribe(params => {
    //     debugger
    //     this.subscribedParam = params.has("profile_OPTION_ID");
       
    //     if(this.subscribedParam!=''&& this.subscribedParam!=undefined){
    //       this.editScreen=true;

    //     }
    //     else{
    //       this.editScreen=false;
    //     }
        
    //   })
    //   if(this.editScreen){
    //     this.commonService.GetAccessProfieById(this.AccessProfileList.profile_OPTION_ID).subscribe(
    //       (response: any) => {
    //         if (response.isError) {
    //           alert(response.errors[0].errorCode);
    //           return;
    
    //         }
    //         else {
    //           this.watcherList=response.data[0].user;
    //           this.watcherFakeJsonFilter=this.watcherList;
    //           // this. editIncident(this.subscribedParam)
    // }
    
    //       },
    //       (error) => {
    
    //         console.error('POST Error:', error);
    //       }
    //     );
        
    //   }
    this.incidentForm=this.formBuilder.group({
      title:['',[Validators.required,Validators.minLength(3), Validators.maxLength(20)]],
      discription:['',[Validators.required,Validators.minLength(3), Validators.maxLength(2000)]],
      priority:['',],
      incident:['',[Validators.required]],
      reportedby:[''],
      reportedOn:[''],
      assignee:[''],
      description:[''],
      ResolutionSummary	:[''],
      RootCause:[''],	
      RootCauseArea:[''],		
      IssueLink:[''],			
      AdditonalNotes:['']
            
    });
    // this.GetAllLookupCode('PRIORITY');
    // this.loaderService.showLoader();
    // this.Get_All_AccessProfileList();

    // this.accessProfileForm = this.formBuilder.group({
    //   // moduleid: [null, Validators.required],
    //   levelcode: [null, Validators.required],
    //   levelvalue: [null, Validators.required],
    //   levelvalue2: [null, Validators.required],
    //   levelvalueapplicationid: [null, Validators.required],
    //   profileoptionid: [null, Validators.required],
    //   profileoptionvalue: ['Y', Validators.required]
    // });
   
    this.SiteForm = this.formBuilder.group({
      // activeTabIndex:["level1"],
      site:[0, Validators.required], 
      profileoptionvalue: ['', Validators.required]
    });
    
    this.BusinessUnitForm = this.formBuilder.group({
      // activeTabIndex:["level1"],
      businessUnit:[0, Validators.required], 
      profileoptionvalue: ['', Validators.required]
    });
    
    this.OperationUnitForm = this.formBuilder.group({
      // activeTabIndex:["level2"],
      divisionid:[0, Validators.required], 
      profileoptionvalue: ['', Validators.required]
    });
    
    this.AccessGroupForm = this.formBuilder.group({
      // activeTabIndex:["level3"],
      usergroup:[0, Validators.required], 
      profileoptionvalue: ['', Validators.required]
    });

    this.UserGroupForm = this.formBuilder.group({
      // activeTabIndex:["level4"],
      user:[0, Validators.required], 
      profileoptionvalue: ['', Validators.required]
    });  
    // this.GetLevelList('LEVEL0');  
  }

  ngOnInit(): void {
    // Call the method to show the loader when the component initializes
    this.loaderService.showLoader();
    
    // Fetch your data here...
    this.Get_All_AccessProfileList();
  }

  showResults(itemsPerPage:any){
		this.currentPage = 1;
		this.itemsPerPage = itemsPerPage;
		this.Get_All_AccessProfileList();
	}

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.Get_All_AccessProfileList();
  }
  handleTabContentClick(event: Event) {
    // Prevent the click event from reaching the header
    event.stopPropagation();
  }
  GetLevelList(levelcode: any) {
    // debugger;
    this.loaderService.showLoader();
    this.Level_ListData='';
    this.commonService.Get_AccessProfie_Level_List(levelcode,this.Selected_profile_OPTION_ID).subscribe(
      (response: any) => {
        this.loaderService.hideLoader();
        this.editScreen=true;
        if (response.status=="NOT_FOUND") {
          this.messageService.add({
						severity: 'failed',
						summary: 'error',
						detail: response.message
					});
          alert(response.errors[0].errorCode);
          return;
        }
        else {
          this.Level_ListData=response[0];
          console.log('Level_ListData',this.Level_ListData);
          // this.watcherList=response;
          // console.log(response);
          // this.accessProfileList=Object.values(response.profileLevel);
          // console.log('accessProfileList',this.accessProfileList);
          // this.BussinessUnitForm=response.LEVEL_LEVEL3;
          // this.OperationUnitForm=response.LEVEL_LEVEL2;
          // this.AccessGroupForm=response.LEVEL_LEVEL3;
          // const firstLevel2Value = Object.keys(this.divisionOptions)[5];
          // this.OperationUnitForm.patchValue({ divisionid: firstLevel2Value });
          
        }
      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );

  }

  // AddAccessProfile(){
  //   if (this.accessProfileForm.valid) {
  //     // Perform your form submission logic here
  //     const formData = this.accessProfileForm.value;
  //     console.log('Access Profile Form :',formData);
  //   }
  // }

  GetAccessProfieById(profile_OPTION_ID:any){
    this.Selected_profile_OPTION_ID=profile_OPTION_ID;
    this.GetLevelList('LEVEL0');
    this.editScreen=true;
    this.loaderService.showLoader();
    // if(){
      this.commonService.GetAccessProfieById(profile_OPTION_ID).subscribe(
        (response: any) => {
          this.editScreen=true;
          if (response.isError) {
            alert(response.errors[0].errorCode);
            return;
          }
          else {
            this.watcherList=response;
            console.log(response);
            // this.accessProfileList=Object.values(response.profileLevel);
            // console.log('accessProfileList',this.accessProfileList);
            // this.BussinessUnitForm=response.LEVEL_LEVEL3;
            // this.OperationUnitForm=response.LEVEL_LEVEL2;
            // this.AccessGroupForm=response.LEVEL_LEVEL3;
            // const firstLevel2Value = Object.keys(this.divisionOptions)[5];
            // this.OperationUnitForm.get('divisionid')!.setValue(firstLevel2Value);
            this.siteOptions=response.LEVEL_LEVEL0;
            this.businessOptions=response.LEVEL_LEVEL1;
            this.divisionOptions=response.LEVEL_LEVEL2;
            this.groupOptions=response.LEVEL_LEVEL3;
            this.userOptions=response.LEVEL_LEVEL4;
            this.sortedUsers = Object.entries(this.userOptions).sort((a, b) => a[1].localeCompare(b[1]));
            this.loaderService.hideLoader();
            console.log('sortedUsers',this.sortedUsers);
            console.log('divisionOptions',this.divisionOptions);
            console.log('groupOptions',this.groupOptions);
            console.log('userOptions',this.userOptions);
            console.log('AccessGroupForm',this.AccessGroupForm,response);  
            // if(response.levelcode=="LEVEL3"){}
            // this.watcherFakeJsonFilter=this.watcherList;
            // this. editIncident(this.subscribedParam)
          } 

        },
        (error) => {
          console.error('POST Error:', error);
        }
        );
        this.loaderService.hideLoader();
  }
  
  CreateAccessProfile(levelcode: string) {
    // debugger;
    if (levelcode === 'level0') {
      // Accessing selected key
      this.Levelvalue = this.SiteForm.get('site')?.value;
      // Accessing selected value
      this.Levelvalue2 = this.siteOptions[this.Levelvalue];
      this.profileoptionvalue= this.SiteForm.get('profileoptionvalue')?.value;
      console.log('siteOptions_Levelvalue ID:',this.Levelvalue);
      console.log('siteOptions_Levelvalue2 VAL:',this.Levelvalue2);
    }
    if (levelcode === 'level1') {
      this.Levelvalue=this.BusinessUnitForm.value.businessUnit;
      this.profileoptionvalue= this.BusinessUnitForm.get('profileoptionvalue')?.value;
      console.log('siteOptions_Levelvalue',this.Levelvalue);
    }
    if (levelcode === 'level2') {
      // this.Levelvalue=this.OperationUnitForm.value.divisionid;
      // debugger;
      console.log('level2',this.OperationUnitForm.value);
      this.Levelvalue=this.OperationUnitForm.get('divisionid')?.value;
      this.Levelvalue2=this.divisionOptions[this.Levelvalue];
      // this.profileoptionvalue= this.OperationUnitForm.get('profileoptionvalue')?.value;
      this.profileoptionvalue= this.OperationUnitForm.value.profileoptionvalue;
      console.log('OperationUnitForm_Levelvalue',this.Levelvalue);
    }
    else if (levelcode === 'level3') {
      // this.Levelvalue=this.AccessGroupForm.value.usergroup;
      this.Levelvalue=this.AccessGroupForm.get('usergroup')?.value;
      this.Levelvalue2=this.groupOptions[this.Levelvalue];
      // this.profileoptionvalue= this.AccessGroupForm.get('profileoptionvalue')?.value;
      this.profileoptionvalue= this.AccessGroupForm?.value.profileoptionvalue;
      console.log('AccessGroupForm_Levelvalue',this.Levelvalue);
    }
    else if (levelcode === 'level4') {
      // this.Levelvalue=this.UserGroupForm.value.user;
      const userValue: string = this.UserGroupForm.get('user')?.value;
      const values: string[] = userValue.split(',');
      this.Levelvalue=values[0];
      this.Levelvalue2 = values[1];
      this.profileoptionvalue= this.UserGroupForm.get('profileoptionvalue')?.value;
      console.log('UserGroupForm_Levelvalue',this.Levelvalue);
    }
    const data = {
      moduleid: "4",                  //Hardcoded
      levelcode: levelcode.toUpperCase(),
      levelvalue: this.Levelvalue,    //Level ID
      // levelvalue2: "Canada",
      levelvalue2: this.Levelvalue2,  //Level Value
      levelvalueapplicationid: 1,     //Hardcoded
      profileoptionid: this.Selected_profile_OPTION_ID,
      profileoptionvalue: this.profileoptionvalue? this.profileoptionvalue:'Y',
    };
    this.commonService.CreateAccessProfile(data).subscribe
    (response => {
      if (response.Message=="Profile value already exists.") {
        this.messageService.add({
          severity: 'danger',
          summary: 'Failed ',
          detail: 'Profile value already exists.'
        });
      }
      else {
        this.CreateAccessProfile_Data=response;
        this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Access Profile Created Successfully'
				});
        this.SiteForm.reset();
        this.BusinessUnitForm.reset();
        this.OperationUnitForm.reset();
        this.AccessGroupForm.reset();
        this.UserGroupForm.reset();
        // this.GetLevelList(response.levelcode);
        this.GetLevelList(levelcode.toUpperCase());
        console.log(response);
      }
    },
    (error:HttpErrorResponse) => {
			console.error('Error fetching', error);
      if (error.status === 409) {
        this.messageService.add({
          severity: 'danger',
          summary: 'Failed ',
          detail: 'Profile value already exists.'
        });
      }
      else {
        this.messageService.add({
          severity: 'danger',
          summary: 'Failed ',
          detail: 'Access Profile Not Created'
        });
		  }
    });
  }

  UpdateAccessProfile(levelcode:any,levelvalue:any,levelvalue2:any,levelvalueapplicationid: any,profileoptionid: any,profileoptionvalue: any) {
    // debugger;
    // this.confirm();
    this.confirmationService.confirm({
      header: 'Do you want to update?',
      // message: 'Are you sure?',
      // acceptIcon: 'pi pi-check mr-2',
      // rejectIcon: 'pi pi-times mr-2',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        const data = {
        moduleid: "4", //Hardcoded
        levelcode: levelcode,
        levelvalue: levelvalue, //Level ID
        // levelvalue2: "Canada",
        levelvalue2: levelvalue2, //Level Value
        levelvalueapplicationid: levelvalueapplicationid,//Hardcoded
        profileoptionid: profileoptionid,
        profileoptionvalue: profileoptionvalue,
        };
        console.log("UpdateAccessProfile-payload",data);
        this.commonService.UpdateAccessProfile(this.Selected_profile_OPTION_ID,levelcode.toUpperCase(),data).subscribe
        (response => {
          if (response) {
              // Do something with the response data
              // this.toastService.addToast("Access Profile Created Successfully");
              console.log(response);
              this.GetLevelList(levelcode);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Access Profile Updated Successfully'
              });
          }
          else {
            console.log('error');
          }
        },
        (error) => {
        	console.error('Error fetching', error);
        }
        );
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }


  async DeleteAccessProfile(profile_OPTION_ID: any, levelcode: any, levelvalue: any) {
    this.confirmationService.confirm({
      // message: 'Do you want to delete this record?',
      header: 'Do you want to delete?',
      // header: 'Delete Confirmation',
      // icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.commonService.DeleteAccessProfile(profile_OPTION_ID, levelcode, levelvalue).subscribe(
          (response) => {
            console.log(response);
            this.GetLevelList(levelcode);
          }
        );
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Access Profile Deleted Successfully' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    }); 
  }

  // loadGroupName() {
	// 	this.commonService.AllAccessGroup().subscribe(
	// 		(options) => {

	// 			this.groupOptions = options;
	// 		},
	// 		(error) => {
	// 			console.error('Error fetching dropdown options', error);
	// 		}
	// 	);
	// }
  back() {
    this.editScreen=false;
  }
  GetAllLookupCode(type: any){
  //   let items = {
  //     searchValue: "",
  //     sortColumn: "",
  //     sortOrder: "",
  //     pageIndex: 1,
  //     pageSize: 100,
  //     totalCount: 0,
  //     status: "A",
  //     type: type,
  //     meaning: "",
  //     description: "",
  //     moduleFeatureId: 4,
  //     languageId: 1 // it getting update in this GetAllLookupTypeList method
  //   };
  //   if(type=='PRIORITY' ||type=='INCIDENT_TYPE'){
  //     items.moduleFeatureId=14;
  //   }
  //   return new Promise<void>((resolve, reject) => {
  //     this.commonService.GetAllLookupTypeList(items)
  //       .pipe(
  //         catchError(error => {
  //           reject(error);
  //           return throwError(error);
  //         })
  //       )
  //       .subscribe((result: any) => {
  //         if (result.data) {
  //           if (type === 'UNIT') {
  //             const lookupData = result.data[0].lookups.filter((type: any) => type.lookupType === 'UNIT');
            
  //           }
    
            
  //           else if(type=='PRIORITY'){
  //             const lookupData = result.data[0].lookups;
  //             this.priorityList = lookupData[0].lookupCodes
            
  //           }
  //         }

  //         resolve(); // Resolve the promise when the data is available
  //       });
  //   });
  // }
  // formatDate(date: Date | string | null | undefined): string {
  //   if (date) {
  //     return this.datePipe.transform(date, 'MM/dd/yyyy') || '';
  //   }
  //   return '';
  }
  getallWatchers() {


  }
  // Get_All_AccessProfileList()
  Get_All_AccessProfileList() {
    let data = this.defaultobj;
    this.loaderService.showLoader();
    // data.pageIndex = 1;
    // data.pageSize = this.itemsPerPage;
    const params = {
      pageNumber: this.currentPage, 
      pageSize: this.itemsPerPage,
      sortBy: 'DESCRIPTION',
      sortDir: 'asc'
    };
    this.commonService.AccessProfileList(params.pageNumber, params.pageSize, params.sortBy, params.sortDir).subscribe(
      (response: any) => {
        if (response.isError) {
          // alert(response.errors[0].errorCode);
          return;

        }
        else {
        this.AccessProfileList = response;
        console.log('acces profile',this.AccessProfileList);
        // this.totalRecords = response.data[0].totalRecord;
        this.currentPage = this.currentPage;
        // this.totalPages = Math.ceil(response.data[0].totalRecord / this.itemsPerPage)
        this.totalRecords = response.totalElements;
        this.totalPages = response.totalPages;
        this.generateTotalPagesArray();
        this.loaderService.hideLoader();
}

      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('POST Error:', error);
      }
    );

    // this.loaderService.hideLoader();

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
  editIndex:any=''
  deleteWatcher(index:any,id:any){
  
// this.selectWatcherList.splice(index,1);
// if(id!=undefined){
//   this.commonService.deletewatcher(id).subscribe(
//     (response: any) => {
//       if (response.isError) {
//         // alert(response.errors[0].errorCode);
//         return;
  
//       }
//       else {
//         this.toastMsgObj = {
//           msgType: response.responseMessageType,
//           msgText: this.lang.transform(response.responseCode)
//         }
//         this.toastService.addToast(this.toastMsgObj);
//   }
  
//     },
//     (error) => {
  
//       console.error('POST Error:', error);
//     }
//   );
}


  
  deleteAttachment(index:any,id:any){
    
    // this.uploadedFiles.splice(index,1);
    // if(id!=undefined){
    //   this.commonService.deleteAttachment(id).subscribe(
    //     (response: any) => {
    //       if (response.isError) {
    //         // alert(response.errors[0].errorCode);
    //         return;
      
    //       }
    //       else {
    //         this.toastMsgObj = {
    //           msgType: response.responseMessageType,
    //           msgText: this.lang.transform(response.responseCode)
    //         }
    //         this.toastService.addToast(this.toastMsgObj);
    //   }
      
    //     },
    //     (error) => {
      
    //       console.error('POST Error:', error);
    //     }
    //   );
    // }
  }
  submitIncident(){
    this.loaderService.showLoader();
    this.editScreen=false;
  //  this.editIndex.incidentAttachments= this.uploadedFiles;
  //  console.log(this.editIndex.incidentAttachments, this.uploadedFiles)
// this.editIndex.incidentWatchers=this.selectedwatcherList;
// this.editIndex.description=this.incidentForm.value.description;
// this.editIndex.severity=this.incidentForm.value.priority;
// this.editIndex.assigneeId=this.incidentForm.value.assignee
// this.editIndex.resolutionSummary=this.incidentForm.value.ResolutionSummary;
// this.editIndex.rootCause=this.incidentForm.value.RootCause;
// this.editIndex.rootCauseArea=this.incidentForm.value.RootCauseArea;
// this.editIndex.issueLink=this.incidentForm.value.IssueLink;
// this.editIndex.additonalNotes=this.incidentForm.value.AdditonalNotes;
// this.billingService.saveIncident(this.editIndex).subscribe(
//   (response: any) => {
    this.loaderService.hideLoader();
//     if (response.isError) {
//       this.toastMsgObj = {
//         msgType: response.responseMessageType,
//         msgText: this.lang.transform(response.responseCode)
//       }
//       this.toastService.addToast(this.toastMsgObj);
    
//       return;
//     }
//     else {
//       this.toastMsgObj = {
//         msgType: response.responseMessageType,
//         msgText: this.lang.transform(response.responseCode)
//       }
//       this.toastService.addToast(this.toastMsgObj);

    
//     }

//   },
//   (error) => {
   
//     console.error('POST Error:', error);
//   }
// );

//   }
//   addWatcherVisible:boolean=false;
//   addWatcher(){
//     this.addWatcherVisible=!this.addWatcherVisible;
    
//   }
//   selectWatcherList:any=[];
//   selectedwatcherList:any=[]
//   selectWatcher(e: any) {
//     // Check if the object already exists in the array
//     const isObjectAlreadyExists = this.selectWatcherList.some((obj:any) => 
//       obj.userId === e.userId
//       // Add more conditions if needed to compare other properties
//     );
  
//     // If the object doesn't exist, push it to the array
//     if (!isObjectAlreadyExists) {
//       this.selectWatcherList.push(e);
//       this.selectedwatcherList.push({userID:e.userId,status:'A'})
//       this.addWatcherVisible=false;
//     }
  }
  filterincidentWatcher(e:any){

    const inputValue = e.target.value.toLowerCase();
    this.watcherList = this.watcherFakeJsonFilter;
     this.watcherList = this.watcherFakeJsonFilter.filter((item: any) => {
      return item.userName.toLowerCase().includes(inputValue.toLowerCase());
     });
   
  }
  // uploadedFiles:any=[];
  // onFileChange(event: any) {
  //  debugger
  //   const files: FileList | null = event.target.files;
  
  //   if (files) {
  //     let data= this.formatBytes(files[0].size) ;
    
  //     for (let i = 0; i < files.length; i++) {
  //       this.convertToBase64(files[i]).then(
  //         (result) => {
  //           console.log("Attachment Name:", result.attachmentName);
  //           console.log("Base64 File:", result.base64File);
  //           this.uploadedFiles.push({attachmentName:result.attachmentName,base64File:result.base64File});
  //         },
  //         (error) => {
  //           console.error("Error converting to base64:", error);
  //         }
  //       );
       

  //     }
    
  //   }
 
  // }
  // convertToBase64(file: File): Promise<{ attachmentName: string, base64File: string }> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       // Get the base64-encoded value directly
  //       const base64Value = reader.result as string;
        
  //       let dummy=file.name;
  //       dummy=dummy.split('.')[1]
  //       console.log("exten",dummy) 
  //       resolve({ attachmentName: file.name, base64File: base64Value});
  //    // Extracting the base64 part
  //     };
  
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  
  //     reader.readAsDataURL(file);
  //   });
  // }
//   formatBytes(bytes: number): string {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   }
//   editIncident(id:any){
//   this.loaderService.showLoader()
//     this.editScreen=true;
//     this.commonService.getIncidentById(id).subscribe(
//       (response: any) => {
//         this.loaderService.hideLoader()
//         if (response.isError) {
         
//           return;

//         }
//         else {
//           this.editIndex=response.data[0];
//         console.log("data",response.data[0])
//         this.incidentForm.controls['reportedby'].setValue(response.data[0].repoterByName)
//         this.incidentForm.controls['reportedOn'].setValue(this.formatDate(response.data[0].closedAt));
//         this.incidentForm.controls['priority'].setValue(response.data[0].severity);
//         this.incidentForm.controls['assignee'].setValue(response.data[0].assigneeId); 
       
//         this.incidentForm.controls['description'].setValue(response.data[0].description);
//         this.incidentForm.controls['ResolutionSummary'].setValue(response.data[0].resolutionSummary);
//         this.incidentForm.controls['RootCause'].setValue(response.data[0].rootCause);
//         this.incidentForm.controls['RootCauseArea'].setValue(response.data[0].rootCauseArea);
//         this.incidentForm.controls['IssueLink'].setValue(response.data[0].issueLink);
//         this.incidentForm.controls['AdditonalNotes'].setValue(response.data[0].additonalNotes);
//         this.uploadedFiles=response.data[0].incidentAttachments;
//         if(response.data[0]?.incidentWatchers){
//           debugger
//           for(let i=0;i<response.data[0].incidentWatchers.length;i++){
//             let data=this.watcherList.filter((x:any)=>{
//               return x.userId==response.data[0].incidentWatchers[i].userID;
               
            
//             })
//             if(data!=null || data!=undefined){
//               response.data[0].incidentWatchers[i].userName=data[0].userName
//               this.selectWatcherList.push(response.data[0].incidentWatchers[i]);
//               this.selectedwatcherList.push(response.data[0].incidentWatchers[i])
//             }
//           }
         
//         }
//         console.log(this.selectedwatcherList)
// }

//       },
//       (error) => {

//         console.error('POST Error:', error);
//       }
//     );
//   }
  // showResults(itemsPerPage:any){
  //   this.page = 1;
  //   this.itemsPerPage = itemsPerPage;
  //   this.listObj.pageSize=this.itemsPerPage;
  //   this.listObj.pageIndex=this.page;
  //   this.Get_All_AccessProfileList();
  // }
  // onPageChange(newPage: number) {
  //   this.page = newPage;
  // this.listObj.pageIndex=this.page;
  //   this.Get_All_AccessProfileList();
  // }
}
