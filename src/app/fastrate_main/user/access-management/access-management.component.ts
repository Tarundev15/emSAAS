import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/_services/common.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/_services/toast.service';
import { LangPipe } from 'src/app/pipe/pipe';

@Component({
  selector: 'app-access-management',
  templateUrl: './access-management.component.html',
  styleUrls: ['./access-management.component.css']
})


export class AccessManagementComponent {
  groupName: string = '';
  // accessGroups: any[] = [];
  selectedGroupName: string = '';
  selectedGroupId: string = '';
  selectedUsername: string = '';
  ManageSearchInput: any;
  filterArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;
  totalRecords: any = 0;
  userList: any = [];

  editMode : boolean = false; 
  WatcherForm:any = FormGroup;
  
  
  

  showDetails: boolean = false;
  addUserVisible: boolean = false;
  

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
    "userName": "",
    "displayName": "",
    "email": "",
    "mobileNumber": "",
    "location": ""
  }

  totalPagesArray: any = [];

  // LocalDateTime dateTime = LocalDateTime.parse(dateString, formatter);

   currentDate = new Date();

  // Format the date as "YYYY-MM-DDTHH:mm:ss"
   formattedDate = this.currentDate.toISOString().slice(0, 19);


   tableHeaders = [
    { label: 'Group Name', width: '10', name: 'groupName',code:'LC2-35M', sort: 'ASC' },
    { label: 'Created By', width: '10', name: 'createdBy',code:'LC2-36M', sort: 'ASC' },
    { label: 'Created On', width: '10',code:'LC2-37M', name: 'createdOn', sort: 'ASC' },
    { label: 'Last Modified On', width: '15',code:'LC2-38M', name: 'lastModifiedOn', sort: 'ASC' },
  ];
group: any;
  allUserList: any;
user: any;
  allUserList_Y: any;
  allUserList_N: any;

  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private langFilepipe: LangPipe,
    ) {}

  ngOnInit() {
     this.loadAccessGroups(this.currentPage);

  }



  loadAccessGroups(pageNumber: number): void {
    this.loaderService.showLoader();
    const params = {
      pageNumber: pageNumber.toString(), 
      pageSize: this.itemsPerPage.toString(),
      sortBy: 'groupid',
      sortDir: 'asc'
    };

     this.commonService.AccessGroupPage(params.pageNumber, params.pageSize, params.sortBy, params.sortDir)
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
    this.loadAccessGroups(1); // Reset to the first page when changing items per page
  }

  navigateToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.loadAccessGroups(pageNumber);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadAccessGroups(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadAccessGroups(this.currentPage - 1);
    }
  }


  groups :any=''
  loadUserList(group: any) {
    console.log(group)
    this.groups = group;
    this.selectedGroupName = group.groupname;
    this.selectedGroupId = group.groupid;
    console.log(this.selectedGroupName)
    this.commonService.UserGroupName('', group.groupid, '').subscribe(
      (response: any) => {
        this.allUserList = response.resultData;
        this.allUserList_N = this.allUserList.filter((item:any) => item.activeFlag === 'N');
        this.allUserList_Y = this.allUserList.filter((item:any) => item.activeFlag === 'Y');
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  selectedUsers: any[] = [];
  selectedUsernames: number[] = [];
  groupId: any;
  

  saveUserList(selectedUsers:any) {
    // Ensure groupId is defined before proceeding
    // if (!this.groupId) {
    //   console.error('groupId is not defined.');
    //   return;
    // }

    // Filter out the selected usernames
    // this.selectedUsernames = this.allUserList
    //   .filter((user: any) => user.isSelected)
    //   .map((user: any) => user.username);
    //   console.log(this.selectedUsernames,'----selectedUsernames---------');

    if (selectedUsers.length > 0) {
      // You can perform API call here using this.selectedUsernames array
      // For example:
      const selectedUsernamesString = selectedUsers.join(',');
      this.commonService.UserGroupName(selectedUsernamesString, +this.selectedGroupId, true).subscribe(
        (response: any) => {
          console.log('Selected Usernames:', this.selectedUsernames);
          console.log('API Response:', response);
          this.loadUserList(this.groups);
          // selectedUsers.reset();

        },
        (error: any) => {
          console.error('Error saving users:', error);
        }
      );

      // Reset checkbox selection
      // this.allUserList.forEach((user: any) => user.isSelected = false);
    } else {
      console.warn('No users selected.');
    }
  }

  DeleteUser(selectedUsers: any) {
    // debugger;
    // if (selectedUsers.length > 0) {
      // You can perform API call here using this.selectedUsernames array
      // For example:
      // const selectedUsernamesString = selectedUsers.join(',');
      this.commonService.UserGroupName(selectedUsers, +this.selectedGroupId, false).subscribe(
        (response: any) => {
          console.log('deleted Usernames:', this.selectedUsernames);
          this.messageService.add({
            severity: 'warn',
            summary: 'Success',
            detail: 'Access group deleted successfully'
          });
          console.log('delet user API Response:', response);
          this.loadUserList(this.groups);
        },
        (error: any) => {
          console.error('Error deleting users:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting users. Please try again.'
          });
        }
      );

      // Reset checkbox selection
      // this.allUserList.forEach((user: any) => user.isSelected = false);
    // } else {
    //   console.warn('No users selected.');
    // }
  }




deleteAccessGroup(row: any): void {
  const isConfirmed = window.confirm('Are you sure you want to delete the access group?');

  if (isConfirmed) {
    console.log(row);

    this.commonService.DeleteAccessGroup(row.groupid).subscribe(
      () => {
        console.log('Access group deleted successfully');

        // Show success message using PrimeNG MessageService
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Access group deleted successfully'
        });

        // Remove the deleted row from the user list
        this.userList = this.userList.filter((item: { groupid: any; }) => item.groupid !== row.groupid);
      },
      (error) => {
        console.error('Error deleting access group:', error);

        // Handle error scenarios if needed

        // Show error message using PrimeNG MessageService
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error deleting access group. Please try again.'
        });
      }
    );
  } else {
    console.log('User canceled access group deletion.');
  }
}

detailsClose() {
  document.getElementById('details')!.classList.remove('disabled-div');
  this.showDetails = false;
  this.addUserVisible = false;
  this.loaderService.hideLoader();
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
    // if (this.totalPages - startPage < maxPageButtons - 1) {
    //   startPage = this.totalPages - maxPageButtons + 1;
    // }
    let endPage = Math.min(startPage + maxPageButtons - 1, this.totalPages);

    this.totalPagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }
}





  
showGroupDetails(group:any): void {
  this.selectedGroupName = group.groupname;
  this.selectedGroupId = group.groupid;
}



 

  createGroup(): void {
    this.editMode = false;
    if (this.groupName.trim() === '') {
      
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter a valid group name.'
      });
      return;
    }
  

    const isConfirmed = window.confirm('Are you sure you want to create the group?');
  
    if (isConfirmed) {
      const groupData = {
        groupname: this.groupName,
        createdby: '',
        createdon: new Date(),
        lastmodifiedby: '',
        lastmodifiedon: this.formattedDate,
        activeflag: 'A'
      };
  
      this.commonService.CreateAccessGroup(groupData).subscribe(
        (response) => {
          console.log('Group created successfully:', response);
  

          this.groupName = '';
  

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Group created successfully'
          });
          this.ngOnInit();
        },
        (error) => {
          console.error('Error creating group:', error);
  
 
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating group. Please try again.'
          });
        }
      );
    } else {
      console.log('User canceled group creation.');
    }
  }

  clearGroupName(): void {
    this.groupName = ''; // Clear the groupName variable
    this.editMode = false;
}


viewUser() {

  this.addUserVisible = !this.addUserVisible;

}

  // editGroup(groupId: number) {
  //   console.log('Edit group with ID:', groupId);
  //   this.editMode = true;
  //   this.groupId = groupId; // Assuming you have a property to store the group ID being edited
  //   // Fetch the group data using the groupId and populate the groupname
  //   this.commonService.updateAccessGroup(groupId, '').subscribe(
  //     (group) => {
  //       // Assuming 'group' contains the data for the group being edited
  //       this.groupName = group.groupname;
  //       // Populate other form fields if needed
  //     },
  //     (error) => {
  //       console.error('Error fetching group data:', error);
  //       // Handle error appropriately
  //     }
  //   );
  // }

  editGroup(groupId: number, groupname: string){
    this.editMode = true;
      
    this.groupId = groupId;
    this.groupName = groupname;
    // this.submitEditGroup(groupId, groupname);
  }
  // submitEditGroup() {
  //   console.log('Edit group with ID:', this.groupId);
    
  //   // this.groupId = groupId; // Assuming you have a property to store the group ID being edited
  //   // this.groupName = group.groupname;
  //   // Fetch the group data using the groupId and populate the groupname
  //   const data={
  //     "groupname": this.groupName,
  //     "activeflag": "Y"
  //   }
  //   this.commonService.updateAccessGroup(this.groupId, data).subscribe(
  //     (group: any) => {
  //       // Assuming 'group' contains the data for the group being edited
  //       if (group && group.groupname) {
  //         this.groupName = group.groupname;
  //         this.ngOnInit();
  //         // Populate other form fields if needed
  //       } else {
  //         console.error('Invalid group data received:', group);
  //         // Handle error when group data is invalid or missing
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching group data:', error);
  //       // Handle error when API call fails
  //     }
  //   );
  // }

  submitEditGroup() {
    console.log('Edit group with ID:', this.groupId);
    
    const data = {
      "groupname": this.groupName,
      "activeflag": "Y"
    };
  
    this.commonService.updateAccessGroup(this.groupId, data).subscribe(
      (group: any) => {
        if (group && group.groupname) {
          this.groupName = group.groupname;
          this.ngOnInit();
          
          // Show success message
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Access Group Name updated successfully'
          });
        } else {
          console.error('Invalid group data received:', group);
          // Handle error when group data is invalid or missing
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to edit group. Invalid group data received.'
          });
        }
      },
      (error) => {
        console.error('Error fetching group data:', error);
        // Handle error when API call fails
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to edit group. Please try again later.'
        });
      }
    );
  }
  
  
  

  
  get getFormTitle() {
    return this.editMode ? 
    this.langFilepipe.transform("Edit Access Group Name") : this.langFilepipe.transform("Add New Access Group");
  }
 


 

}
