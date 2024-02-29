import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { debounceTime, switchMap } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-emp-assignment',
  templateUrl: './emp-assignment.component.html',
  styleUrls: ['./emp-assignment.component.css']
})
export class EmpAssignmentComponent {
  firstName: string = '';
  groupName: string = '';
  accessGroups: any[] = [];
  authorityList: any[] = [];
  authorityNotList: any[] = [];
  selectedGroupName: string = '';
  selectedGroupId: string = '';
  selectedUsername: string = '';
  ManageSearchInput: any;
  filterArray: any = [];
  // LocalDateTime dateTime = LocalDateTime.parse(dateString, formatter);

   currentDate = new Date();

  // Format the date as "YYYY-MM-DDTHH:mm:ss"
   formattedDate = this.currentDate.toISOString().slice(0, 19);
   id:any;

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
  totalPagesArray: any = [];
   tableHeaders = [
    { label: 'User Name', width: '10', name: 'username',code:'LC2-35M', sort: 'ASC' },
    { label: 'Group Name', width: '10', name: 'groupName',code:'LC2-35M', sort: 'ASC' },
    { label: 'Created By', width: '10', name: 'createdBy',code:'LC2-36M', sort: 'ASC' },
    { label: 'Created On', width: '10',code:'LC2-37M', name: 'createdOn', sort: 'ASC' },
    { label: 'Last Modified On', width: '15',code:'LC2-38M', name: 'lastModifiedOn', sort: 'ASC' },
  ];
group: any;
  SearchedEmpdata: any;
  searchForm!: FormGroup;
  searchResults: any[] = [];
  showDropdown: boolean = false;
  TrimmedfirstName: any;
  currentPage: any = 1;
  itemsPerPage: any = 10;
  totalPages: any = 0;
  totalRecords: any = 0;
  page: any;
  groupOptions: any;
  empList: boolean = false;
  items: MenuItem[] | undefined;

  // position: string = 'top';
  position: 'bottom' | 'top' | 'left' | 'right' = 'left';


  positionOptions = [
      {
          label: 'Bottom',
          value: 'bottom'
      },
      {
          label: 'Top',
          value: 'top'
      },
      {
          label: 'Left',
          value: 'left'
      },
      {
          label: 'Right',
          value: 'right'
      }
  ];
  activeTab: string | null = null;
  collapsed: boolean = true;
  personalInfo: any;

  // Toggle the collapsed state
  toggleFieldset() {
    this.collapsed = !this.collapsed;
  }
  
  selectedMenuItem: string | null = null; 
  // openCard(cardContent: string) {
  //   const cardContentElement = document.getElementById('cardContent');
  //   if (cardContentElement) {
  //       cardContentElement.innerHTML = cardContent;
  //   }
  // }
  selectedCard: number | null = null;

  openCard(cardNumber: number) {
      this.selectedCard = cardNumber;
  }
     // Function to set the selected menu item
  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }

  toggleFullscreen(card: string) {
    const cardElement = document.getElementById(card);
    if (cardElement) {
        if (!document.fullscreenElement) {
            cardElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

  // Function to check if a menu item is selected
  isMenuItemSelected(menuItem: string): boolean {
    return this.selectedMenuItem === menuItem;
  }

  constructor(private commonService: CommonService, private fb: FormBuilder,
    private toastService: ToastService
    ) {}

  async ngOnInit() {
    this.items = [
      {
          label: 'site',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
      },
      {
          label: 'business group',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
      },
      {
          label: 'operation unit',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
      },
      {
          label: 'access group',
          icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
      },
      {
        label: 'user',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
      }
    ];
    //  await this.loadAccessGroups();
     //await this.loadAuthorityList();
    // await this.loadAuthorityNotList();
    // await this.EmpSearch('Black',"1","1","firstName","desc");
    this.searchForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
    });

   this.searchvalue();

  }

  // handleDockItemClick(event: any) {
  //   const selectedItemLabel = event.item.label;
  //   this.selectedItem(selectedItemLabel);
  // }
  selectedItem(label: any) {
    console.log(label);
    alert("Selected item: " + label);
  
    switch (label.toLowerCase()) {
      case 'site':
      case 'business group':
      case 'operation unit':
      case 'access group':
      case 'user':
        this.activeTab = label.toLowerCase();
        break;
      default:
        // Handle other cases or do nothing
        this.activeTab='';
        break;
    }
  }

  searchvalue(){
    this.searchForm.get('firstName')?.valueChanges.pipe(
      debounceTime(300), // debounce for 300 milliseconds to avoid rapid API calls
      switchMap(value => this.commonService.EmpSearchDropDown(value))
    ).subscribe(results => {
      this.searchResults = results.content;
      console.log(this.searchResults);
      // this.showDropdown = this.searchResults.length > 0;
    });
  }

  onSearchInputChange() {
    // this.showDropdown = true;
    this.showDropdown=this.searchResults.length>=0;
  }

  selectResult(result: any) {
    if (!result.firstName) {
      // Show an error using a toast or any other method you prefer
      // this.showToastError('First Name is required');
      console.warn('Employee name is empty');
      this.toastService.addToast('Employee name is empty');
      return; // Do not proceed further if there's an error
    }
    console.log('selectResult called');
    const firstName = `${result.firstName}`;
    const lastName =`${result.lastName}`;
    const fullName=`${firstName} ${lastName}`;
    (this.searchForm.get('firstName') as AbstractControl<any>).setValue(fullName);
    // (this.searchForm.get('firstName') as AbstractControl<any>).setValue(result.firstName);
    // (this.searchForm.get('lastName') as AbstractControl<any>).setValue(result.lastName);
    this.id = result.username;
    
    this.TrimmedfirstName = fullName.split(' ')[0];
    this.showDropdown=this.searchResults.length==0;
    this.searchForm.get('firstName')?.disable();
    this.EmpSearch(this.TrimmedfirstName, '1', '10', 'firstName', 'desc');
    this.PersonalInfo(result.username);
  }
   
 async EmpSearch(firstName:any,pageNumber: any, pageSize: string, sortBy: string, sortDir: string) {
  
  let data = this.defaultobj;
  this.empList  = true;
  data.pageIndex = pageNumber;
  data.pageSize = this.itemsPerPage;
  firstName=this.TrimmedfirstName;
  if (!firstName) {
    // Show an error using a toast or any other method you prefer
    // this.showToastError('First Name is required');
    console.warn('Employee name is empty');
    this.toastService.addToast('Employee name is empty');
    return; // Do not proceed further if there's an error
  }
   this.commonService.EmpSearch(firstName,pageNumber, pageSize, sortBy, sortDir  ).subscribe(
     (response: any) => {
      // debugger
       this.SearchedEmpdata = response.content;
      //  this.totalPages=response.totalElements;
       this.currentPage = pageNumber;
       this.totalRecords = response.totalElements;
       this.totalPages=response.totalPages;
       this.generateTotalPagesArray();
       console.log('SearchedEmpdata',this.SearchedEmpdata);
     },
     (error) => {
       console.error('Error loading customer list:', error);
     }
   );
 }
 generateTotalPagesArray() {
  const maxPageButtons = 5;
// debugger
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

 resetSearch(): void {
  this.firstName = '';
  this.EmpSearch('', '1', '10', 'firstName', 'desc');
  this.SearchedEmpdata=[];
  this.searchForm.get('firstName')?.setValue('');
  this.searchForm.get('firstName')?.enable();
  this.searchResults=[];
  window.location.reload();
}

PersonalInfo(id:any){
  // const id=this.SearchedEmpdata.username;
  console.log('selected id--------',id);
  this.commonService.GetPersonalInfo(id).subscribe(
    (response: any) => {
      alert('Personal Info: ' + response.employeeNumber);
      this.personalInfo = response;
    },
    (error:any) => {
      console.error('Error loading personal info:', error);
    }
  )
}

  async loadAccessGroups() {
    this.commonService.AllAccessGroup().subscribe(
      (response) => {
        this.accessGroups = response;
      },
      (error) => {
        console.error('Error loading access groups:', error);
      }
    );
  }

  async loadAuthorityList(group_id: string) {
    this.commonService.AuthorityWithId(group_id).subscribe(
      (response: any) => {
        this.authorityList = response.data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  async loadAuthorityNotList(group_id: string) {
    this.commonService.AuthorityWithoutId(group_id).subscribe(
      (response: any) => {
        this.authorityNotList = response.data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // onUserSearch(event: Event) {
  //   const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  
  //   // Filter the authorityList based on the search term
  //   this.authorityList = this.authorityList.filter((user) =>
  //     user.userfullname.toLowerCase().includes(searchTerm)
  //   );
  // }

  onUserSearch(event: any, searchType: string) {
  const searchTerm = event.target.value.toLowerCase();
  let userList: any[] = [];  // Initialize to an empty array

  // Determine which list to filter based on searchType
  if (searchType === 'add') {
    userList = this.authorityList || [];  // Use empty array if authorityList is undefined
  } else if (searchType === 'remove') {
    userList = this.authorityNotList || [];  // Use empty array if authorityNotList is undefined
  } else {
    // Handle unknown search type
    return;
  }

  // Filter the user list based on the search term
  userList = userList.filter((user) =>
    user.userfullname.toLowerCase().includes(searchTerm)
  );

  // Update the original list with the filtered results
  if (searchType === 'add') {
    this.authorityList = userList;
  } else if (searchType === 'remove') {
    this.authorityNotList = userList;
  }
  else {
    this.authorityList = userList;
    this.authorityNotList = userList;
  }
}


filterItems() {
  //let val=e.target.value;
  this.authorityNotList = this.filterArray;
  this.authorityNotList = this.authorityNotList.filter((item: any) => {
    return item.lookupcodeDescription.toLowerCase().includes(this.ManageSearchInput.toLowerCase());
  });
}
  
showGroupDetails(group:any): void {
  this.selectedGroupName = group.groupname;
  this.selectedGroupId = group.groupid;
  this.loadAuthorityList(this.selectedGroupId);
  this.loadAuthorityNotList(this.selectedGroupId);
}

  createGroup() {
    if (this.groupName.trim() !== '') {
      const groupData = { 
        groupname: this.groupName,
        createdby: '',
        createdon:new Date(),
        lastmodifiedby:'',
        lastmodifiedon:this.formattedDate,
        activeflag:'A'

      };

      this.commonService.CreateAccessGroup(groupData).subscribe(
        (response) => {
          console.log('Group created successfully:', response);

          const {
          groupname,
          createdby,
          createdon,
          lastmodifiedby,
          lastmodifiedon,
          activeflag
          } = response;
          console.log('Group Name:', groupname);
          // Add any additional logic here, such as updating UI or navigating to a new page
        },
        (error) => {
          console.error('Error creating group:', error);
          // Handle errors, e.g., show an error message to the user
        }
      );
    } else {
      console.warn('Group name is empty');
      // You can handle this case, e.g., show a validation message to the user
    }
  
  }

  // Method to add or remove a user from the group
  addOrRemoveUser(group_id: string, username: string, addRemoveFlag: boolean) {
    this.commonService.AddOrRemove(group_id, username, addRemoveFlag).subscribe(
      (response) => {
        // Handle success, you can update UI or perform any additional logic
        console.log('User added/removed successfully:', response);

        // Reload the user lists after adding/removing a user
        this.loadAuthorityList(this.selectedGroupId);
        this.loadAuthorityNotList(this.selectedGroupId);
      },
      (error) => {
        console.error('Error adding/removing user:', error);
        // Handle errors, e.g., show an error message to the user
      }
    );
  }

  // Method to handle adding a user to the group
  addUser(username: string) {
    // Ensure that the user is selected
    if (username) {
      this.addOrRemoveUser(this.selectedGroupId, username, true);
    } else {
      console.warn('No user selected to add');
      // You can handle this case, e.g., show a validation message to the user
    }
  }

  // Method to handle removing a user from the group
  removeUser(username: string) {
    // Ensure that the user is selected
    if (username) {
      this.addOrRemoveUser(this.selectedGroupId, username, false);
    } else {
      console.warn('No user selected to remove');
      // You can handle this case, e.g., show a validation message to the user
    }
  }
}

  
