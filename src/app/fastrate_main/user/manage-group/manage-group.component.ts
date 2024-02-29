import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { UserManagementService } from 'src/app/_services/user-management.service';
import { environment } from '../../../../environments/environment';
import { CommonService } from 'src/app/_services/common.service';
import { LangPipe } from 'src/app/pipe/pipe';
import { ToastService } from 'src/app/_services/toast.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { MessageService } from 'primeng/api';

interface MenuItem {
  visible: boolean;
  
}

interface FunctionResponse {
  someCondition: any;
  functionId: number;
  functionName: string;
  status: boolean;
}

interface ModuleResponse {
  moduleId: number;
  moduleName: string;
  functionList: FunctionResponse[];
}

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css']
})
export class ManageGroupComponent {
  accessGroups: any[] = [];
mainCategory: any;
selectedGroup: any;
  allFunction: any;
  
  functionAccessData: ModuleResponse[] = [];

  uploadpopup: boolean = false;
  resetbutton: boolean = false;
  showModal1: boolean = false;
  countryList: any = [];

  mainCheckboxChecked = false;
  childCheckboxChecked = false;
  childCheckboxChecked2 = false;
  childCheckboxChecked3 = false;
  isExpanded = false;
  // groupId: any = [];
  moduleFeaturesAndFunctions: any;

  // functionAccessData: any; 
  // Define the type based on your API response
  groupId: any;
i: any;


// ngOnInit(): void {
//   this.loadAccessGroups();
//   this.loadAllFunction();
//   // this.groupId = 1;
// }

ngOnInit(): void {
  this.loaderService.showLoader();
  // Assuming you have a groupId to pass to the service
  this.groupId = 1;
    this.loadAccessGroups();
    

  // Call the API and set the data
  this.commonService.GetAllFunctionAccess(this.groupId).subscribe((data) => {
    console.log(data, '----------------------')
    this.functionAccessData = data;
    this.loaderService.hideLoader();
  });
}

// setIds() {
//   // Iterate through functionAccessData and update the status
//   for (const module of this.functionAccessData) {
//     for (const feature of module.functionList) {
//       const functionId = feature.functionId;
//       const groupid = module.moduleId;
//       const status = feature.status;

//       // Call the service to update the status
//       this.commonService.UpdateFunctionAccess(functionId, groupid, status)
//         .subscribe(response => {
//           // Handle the response if needed
//           console.log(response);
//         });
//     }
//   }

//   // Close the modal or perform other actions as needed
//   this.closeModal();
// }


loadAllFunction(): void {
  // Ensure groupId is defined before making the call
  if (this.groupId) {
    this.commonService.GetAllFunctionAccess(this.groupId).subscribe(
      (options) => {
        // Handle the response
      },
      (error) => {
        console.error('Error fetching functions', error);
      }
    );
  } else {
    console.error('groupId is not defined.');
  }
}
  


onCheckboxChange(moduleId: number, functionIds: number[]) {
    const module = this.functionAccessData.find(mod => mod.moduleId === moduleId);
    if (module) {
      module.functionList
        .filter((feat: FunctionResponse) => functionIds.includes(feat.functionId))
        .forEach(feature => {
          feature.status = !feature.status;
        });
    }
  }

//   toggle(i: any) {
//     this.moduleFeaturesAndFunctions[i].show = !this.moduleFeaturesAndFunctions[i].show;

//   }

//   toggleFeatures(module: any) {
//   module.showFeatures = !module.showFeatures;
// }



onSave(selectedIds:any,status:any) {
  // Extract selected function IDs
  let selectedFunctionIds = this.functionAccessData
    .flatMap((module) => module.functionList.filter((feat: FunctionResponse) => feat.status))
    .map((feature) => feature.functionId.toString());

  // const selectedIds = selectedFunctionIds.join(',');
  // Call the service method to update function access
  this.commonService.UpdateFunctionAccess(selectedIds, this.groupId, status).subscribe(
    (response) => {
      // Handle success response
      console.log(response);
      // location.reload();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Group Access Updated Successfully',
      });
      this.loadAccessGroups();
      this.loaderService.hideLoader();
    },
    (error) => {
      // Handle error
      console.error('Error updating function access:', error);
    }
  );
}


determineStatus(feature: FunctionResponse): boolean {
  // Your logic to determine the dynamic status goes here
  // For example, you can replace the following line with your own logic:
  return feature.someCondition ? true : false;
}






  onCategoryChange(category: any): void {
    // Handle category checkbox change
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    console.log('Category selected:', category);
  }

  onSubcategoryChange(subcategory: any): void {
    // Handle subcategory checkbox change
    this.mainCheckboxChecked = !this.mainCheckboxChecked;
    console.log('Subcategory selected:', subcategory);
  }



  close1() {
    this.showModal1 = false;
  }
  currentUser: any = []

  advanceTxt = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  totalRecords: any = 0;
  searchFilter: any;
  // uploadpopup: boolean = false;

  
 
  uploadInput: boolean = false;
  filterth: any = ''
  showuploadinput() {
    this.uploadInput = true;
  }
  popupVisibility: { [key: string]: boolean } = {};
  hideUpLoadPopup() {
    this.uploadpopup = false;
    var fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.value = '';
    this.importError=false;

    this.selectedFile= null;
  }
  showUpLoadPopup() {
    this.uploadpopup = true;

  }

  onCheckboxClick(item: any): void {
    console.log('Checkbox clicked:', item);

    if (item.type == 'module') {
      item.child.forEach((feature: any) => {
        feature.selected = !item.selected;
        feature.child.forEach((func: any) => {
          func.selected = !item.selected;
        });
      });
    }

    if (item.type == 'feature') {
      item.child.forEach((fun: any) => {
        fun.selected = !item.selected;
      });
    }
    // console.log("rolepermission", this.moduleFeaturesAndFunctions)
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) {
      this.childCheckboxChecked = false;
    }
  }

  // toggle(i: any) {
  //   this.functionAccessData[i].show = !this.functionAccessData[i].show;

  // }

  featuretoggle(mod_i: any, fea_i: any) {
    const modulechild = this.moduleFeaturesAndFunctions[mod_i].child;
    modulechild[fea_i].show = !modulechild[fea_i].show;
  }


  showfeatureCount(i: any): string {
    const totalcount = this.moduleFeaturesAndFunctions[i].child.length;
    let selectedCount = 0;

    this.moduleFeaturesAndFunctions[i].child.forEach((modulechild: any) => {
      if (modulechild.selected) {
        selectedCount++
      }
      console.log("feature", modulechild)
    });

    return `${selectedCount}/${totalcount} Feature Selected`;

  }

  
  private shownHeaderNames: string[] = [];


  async loadAccessGroups() {
    try {
      const response = await this.commonService.AllAccessGroup().toPromise();
      this.accessGroups = response;
      this.loaderService.hideLoader();
      console.log(this.accessGroups,'accessGroup')
    } catch (error) {
      console.error('Error loading access groups:', error);
    }
  }

  onGroupChange() {
    this.openModal();
    if (this.selectedGroup) {
      this.groupId = this.selectedGroup.groupid;

      // Call the API to get function access data based on the selected group
      this.commonService.GetAllFunctionAccess(this.groupId).subscribe((data) => {
        this.functionAccessData = data;
        this.loaderService.hideLoader();
      });

    }
  }

  selectionChanged() {
  console.log('Selected Group:', this.selectedGroup);
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
  addForm: any = FormGroup;
  roleForm: any = FormGroup
  show: boolean = false;
  submitted: boolean = false;
  selectAll: boolean = false;
  falseJson: any = [];
  userList: any = [];
  userLoginId:any;
  constructor(
    private formbuilder: FormBuilder, 
    private useService: UserManagementService,
    public commonService: CommonService,
    private lang: LangPipe,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private messageService: MessageService,

  ) {


let id:any= localStorage.getItem('currentUser');
id=JSON.parse(id)
this.userLoginId=id.userId;
console.log("loginId",id,this.userLoginId)
  }
  link = environment.apiUrl + "/UsersTemplates/UserUploadTemplate.xlsx";
  upload: any;
  private selectedFile: File | null = null;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.importError=false;
  }
  errorLink:any;
importError:boolean=false;
  


  addbutton: boolean = false;
  editbutton: boolean = false;
  editIndex: any;
  editId: any;
  
  showDetails: boolean = false;
  details(data: any, i: any) {
    this.showDetails = true;
    document.getElementById('details')!.classList.add('disabled-div');
  }
  detailsClose() {
    document.getElementById('details')!.classList.remove('disabled-div');
    this.showDetails = false;
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

  addUser() {
    this.showDetails = false;
    this.submitted = false;
    this.addForm.reset();
    this.addbutton = true;
    this.editbutton = false;
    this.codeList = [];
    this.idList = [];
    this.getFixRoleList.map((x: any) => {
      x.select = false;
    })
    this.addForm.controls['country'].setValue('');
    this.addForm.controls['contact'].setValue('');
    this.addForm.controls['state'].setValue("");
    this.addForm.controls['displayName'].setValue("");
    this.addForm.controls['status'].setValue('A');
   
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
  // setIds() {
  //   this.closeModal();
  //   this.idList = [];
  //   this.codeList = [];
  //   this.getFixRoleList.forEach((x: any) => {
  //     if (x.select == true) {
  //       this.idList.push(x.roleId);
  //       this.codeList.push(x.roleName);
  //     }
  //   })
   
  //   if (this.idList.length > 0) {
  //     this.roleerror = false;
  //   }
  // }
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
  
}
