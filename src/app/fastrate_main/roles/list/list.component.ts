import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  rolepermission: any = [];
  addForm: any;
  issubmitted: boolean = false;
  maxDate: any;
  minDate: any;
  rolesData: any = []
  moduleFeaturesAndFunctions: any;
  moduleFeatureData: any;
  moduleData: any;
  page: number = 1;
  totalPages: number = 0;
  totalRecords: any;
  totalPagesArray: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  rolepermissiondata: any;
  isEditMode: boolean = false;
  editId: any;
  lookupCodeData: any;
  fieldList: boolean = false;
  constructor(private formbuilder: FormBuilder,
    private commonService: CommonService) {
    this.addFormmethod();
    console.log("moduleFeaturesAndFunctions", this.moduleFeaturesAndFunctions)
  }
  ngOnInit() {
    this.getRoleList(1);

    this.GetAllLookupCode();
  }
  ngAfterViewInit() {
    this.GetTranslationModuleList();
    this.getRolePermission();


  }
  afterModelOpen() {
    this.addForm.get('roleCode').enable();
    this.resetForm();
    console.log(this.moduleData);
    // event of pop open on click of add message
  }
  formatDate(inputDate: any) {
    if (inputDate == null)
      return;
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(2, '0');;

    return `${year}-${month}-${day}`;
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
  addFormmethod() {
    this.addForm = this.formbuilder.group({
      roleCode: ['', [Validators.required]],
      moduleId: ['', [Validators.required]],
      moduleFeatureId: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      roleDescription: [''],
      adRoleName: [''],
      effectiveStartDate: ['', [Validators.required]],
      effectiveEndDate: [''],
    });
  }
  onMessageCodeInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase(); // Convert to uppercase
    this.addForm.get('roleCode').setValue(inputElement.value); // Update the form control value
  }

  getRoleList(PageNumber: number): Promise<void> {
    this.page = PageNumber;
    const items = {
      searchValue: "",
      sortColumn: "",
      sortOrder: "",
      pageIndex: this.page,
      pageSize: this.itemsPerPage,
      totalCount: 0,
      status: 'A'//this.filter
    };
    return new Promise<void>((resolve, reject) => {
      this.commonService.GetRoleList(items)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (!result.isError) {
            this.rolesData = result.data;
            this.totalRecords = result.totalRecords;
            this.currentPage = this.page;
            this.totalPages = Math.ceil(result.totalRecords / this.itemsPerPage);
            this.generateTotalPagesArray();
          }
          resolve();
        });
    });
  }
  newformatDates(inputDate: any) {
    const dateParts = inputDate.split(' ')[0].split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const year = dateParts[2];

    return `${day} ${month} ${year}`;
  }

  Edit(rowData: any) {
    console.log("rowData", rowData)
    this.isEditMode = true;
    if (rowData) {
      this.editId = rowData.roleId
      const editRolepermission = rowData.permission;
      const editmoduleFeaturesAndFunctions = editRolepermission.flatMap((application: any) =>
        application.child.map((module: any) => ({
          applicationId: application.applicationId,
          moduleID: module.moduleID,
          description: module.description,
          type: "module",  // this added for identify

          child: module.child.map((feature: any) => ({
            applicationModuleFeatureId: feature.applicationModuleFeatureId,
            description: feature.description,
            type: "feature",
            child: feature.child.map((func: any) => ({
              applicationFeatureFunctionId: func.applicationFeatureFunctionId,
              description: func.description,
              type: "function",
            })),

          })),
        }))
      );
      this.setModuleFeatureFunction(this.rolepermissiondata)
      // console.log("editmoduleFeaturesAndFunctions", editmoduleFeaturesAndFunctions)
      //console.log("moduleFeaturesAndFunctions", this.moduleFeaturesAndFunctions)
      this.moduleFeaturesAndFunctions.forEach((module: any) => {
        editmoduleFeaturesAndFunctions.forEach((el: any) => {
          if (module.description === el.description) {
            if (module.child.length === el.child.length) {

              module.child.map((p: any) => {
                p.selected = true;
              })
              module.selected = true;
            }
            else {
              el.child.forEach((elChild: any) => {
                module.child.forEach((modChild: any) => {
                  if (elChild.description === modChild.description) {
                    if (elChild.child.length === modChild.child.length) {
                      modChild.child.map((x: any) => {
                        x.selected = true;
                      })
                      modChild.selected = true;
                      //all true child
                    }
                    else {
                      elChild.child.forEach((el_elchild: any) => {
                        modChild.child.map((mod_modchild: any) => {
                          if (el_elchild.description === mod_modchild.description) {
                            mod_modchild.selected = true;
                          }
                        })
                      });

                      // if (elChild.child.description == modChild.child.description) {
                      //   modChild.child.selected = true;

                      // }
                      //move to child loop
                    }
                  }
                });
              });

              //move to child loop
            }
          }
        });
      });

      //readlony dropdown
      var selectElement = document.getElementById("module123") as HTMLSelectElement;
      selectElement.disabled = true;

      var selectElement = document.getElementById("moduleFeatureID123") as HTMLSelectElement;
      selectElement.disabled = true;
      this.addForm.get('roleCode').disable();
      this.addForm.controls['roleCode'].setValue(rowData.roleCode);
      this.addForm.controls['adRoleName'].setValue(rowData.adRoleName);
      this.addForm.controls['roleDescription'].setValue(rowData.roleDescription);
      this.addForm.controls['roleName'].setValue(rowData.roleName);
      let date = this.formatDate(rowData.effectiveStartDate);
      this.addForm.controls['effectiveStartDate'].setValue(date);
      let date1 = this.formatDate(rowData.effectiveEndDate);
      this.addForm.controls['effectiveEndDate'].setValue(date1);
      this.addForm.controls['moduleId'].setValue(rowData.moduleId);
      if (rowData.moduleId > 0) {
        this.GetTranslationModuleFeatureList(rowData.moduleId)
      }
      this.addForm.controls['moduleFeatureId'].setValue(rowData.featureId);
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
  getRolePermission(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.commonService.GetRolePermission()
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result) {
            this.rolepermissiondata = result;
            this.setModuleFeatureFunction(this.rolepermissiondata)
          }
          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  setModuleFeatureFunction(rolepermission: any) {
    this.moduleFeaturesAndFunctions = rolepermission.flatMap((application: any) =>
      application.child.map((module: any) => ({
        applicationId: application.applicationId,
        moduleID: module.moduleID,
        description: module.description,
        selected: false, //assume at first all are not selected
        type: "module",  // this added for identify
        show: false,

        child: module.child.map((feature: any) => ({
          applicationModuleFeatureId: feature.applicationModuleFeatureId,
          description: feature.description,
          selected: false,
          type: "feature",
          show: false,
          child: feature.child.map((func: any) => ({
            applicationFeatureFunctionId: func.applicationFeatureFunctionId,
            description: func.description,
            selected: false,
            type: "function",
            //  show: true,
          })),

        })),
      }))
    );
  }

  toggle(i: any) {
    this.moduleFeaturesAndFunctions[i].show = !this.moduleFeaturesAndFunctions[i].show;

  }
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
  showfunctionCount(mod_i: any, fea_i: any): string {
    const modulechild = this.moduleFeaturesAndFunctions[mod_i].child;
    const featurechild = modulechild[fea_i].child;
    const totalcount = featurechild.length;
    let selectedCount = 0;

    modulechild[fea_i].child.forEach((featurechild: any) => {
      if (featurechild.selected) {
        selectedCount++
      }
      console.log("feature", modulechild)
    });

    return `${selectedCount}/${totalcount} Function Selected`;

  }

  onModuleSelectionChange(e: any) {
    const moduleId = parseInt(e.target.value);
    this.GetTranslationModuleFeatureList(moduleId);
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


  add() {
    this.issubmitted = true;
    if (this.addForm.invalid) {
      return;
    }
    const formData = this.addForm.value;
    const selectedFunctionIds: any = [];
    this.moduleFeaturesAndFunctions.forEach((module: any) => {
      module.child.forEach((feature: any) => {
        feature.child.forEach((func: any) => {
          if (func.selected) {
            const item = {
              rolePermissionId: 0,
              roleId: 0,
              applicationId: 0,
              moduleId: 0,
              moduleFeatureId: 0,
              ModuleFunctionId: func.applicationFeatureFunctionId
            }
            selectedFunctionIds.push(item);
          }
        });
      });
    });

    const formattedData = {
      roleId: this.isEditMode ? this.editId : 0,
      roleCode: formData.roleCode,
      roleNameCode: "",
      roleDescriptionCode: "",
      roleName: formData.roleName,
      adRoleName: formData.adRoleName,
      roleDescription: formData.roleDescription,
      effectiveStartDate: formData.effectiveStartDate,
      effectiveEndDate: formData.effectiveEndDate,
      FeatureId: formData.moduleFeatureId,
      rolepermission: selectedFunctionIds
    }
    console.log('formattedData', formattedData);
    this.saveRoles(formattedData);
  }

  saveRoles(data: any): Promise<void> {
    const languageId = 1;
    return new Promise<void>((resolve, reject) => {
      this.commonService.SaveRole(data)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.statusCode == '102') {
            alert(result.statusMessage);
            this.getRoleList(1);
            this.resetForm();
            this.issubmitted = false;

          }
          if (result.statusCode == '105') {
            alert(result.statusMessage);
          }
          resolve();
        });
    });
  }

  resetForm() {
    this.moduleFeaturesAndFunctions.forEach((module: any) => {
      module.selected = false;
      module.child.forEach((feature: any) => {
        feature.selected = false;
        feature.child.forEach((func: any) => {
          func.selected = false;
        });
      });
    });

    // Reset the form
    this.addForm.reset();
    this.addForm.controls['moduleFeatureId'].setValue("");
    this.addForm.controls['moduleId'].setValue("");
    let date = this.formatDate(new Date());
    this.addForm.controls['effectiveStartDate'].setValue(date);
    this.issubmitted = false;
    var selectElement = document.getElementById("module123") as HTMLSelectElement;
    selectElement.disabled = false;
    var selectElement = document.getElementById("moduleFeatureID123") as HTMLSelectElement;
    selectElement.disabled = false;

    this.isEditMode = false;
    this.minDate = date;
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
    console.log("rolepermission", this.moduleFeaturesAndFunctions)
  }

  setMaxDate(e: any) {
    this.minDate = e.target.value;
    const formData = this.addForm.value;
    if (new Date(formData.effectiveStartDate) < new Date(formData.effectiveEndDate)) {
      console.log("date1 is earlier than date2");
    } else if (new Date(formData.effectiveStartDate) > new Date(formData.effectiveEndDate)) {
      console.log("date1 is later than date2");
      this.addForm.controls['effectiveEndDate'].setValue('')
    } else {
      console.log("date1 and date2 are the same");
    }
  }
  setMinDate(e: any) {
    this.maxDate = e.target.value;
    const formData = this.addForm.value;
    if (new Date(formData.effectiveStartDate) < new Date(formData.effectiveEndDate)) {
      console.log("date1 is earlier than date2");
    } else if (new Date(formData.effectiveStartDate) > new Date(formData.effectiveEndDate)) {
      this.addForm.controls['effectiveStartDate'].setValue('')
      console.log("date1 is later than date2");
    } else {
      console.log("date1 and date2 are the same");
    }
  }
  Delete(rowData: any) {
    if (confirm("Are you sure?") == true) {
      this.deleteRole(rowData.roleId);
    }
  }

  deleteRole(roleId: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.commonService.DeleteRoleById(roleId)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (!result.isError) {
            const data = result.data;
            if (data.statusCode == '102') {
              alert(data.statusMessage);
              this.getRoleList(1);
            }
          }

          resolve();
        });
    });
  }

  GetAllLookupCode(): Promise<void> {
    const items = {
      searchValue: "",
      sortColumn: "",
      sortOrder: "",
      pageIndex: 1,
      pageSize: 100,
      totalCount: 0,
      status: "",
      type: 'ROLESMANAGECOLUMN',
      meaning: "",
      description: "",
      moduleFeatureId: 2,
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
            this.lookupCodeData = lookupsdata[0].lookupCodes
            this.lookupCodeData.map((code: any) => {
              code.selected = false;
            })

            this.ManageColumnGetList();
            console.log("this.lookupCodeData", this.lookupCodeData)

          }

          resolve(); // Resolve the promise when the data is available
        });
    });
  }

  ManageColumnGetList(): Promise<void> {
    const lookyoptype = "ROLESMANAGECOLUMN";
    const manageName = "ROLES";
    return new Promise<void>((resolve, reject) => {
      this.commonService.ManageColumnGetList(lookyoptype, manageName)
        .pipe(
          catchError(error => {
            reject(error);
            return throwError(error);
          })
        )
        .subscribe((result: any) => {
          if (result.data) {
            const userManageColumnDetails = result.data.userManageColumnDetails;
            this.setSelectedColumn(userManageColumnDetails);
            console.log("userManageColumnDetails", userManageColumnDetails)

          }
          resolve(); // Resolve the promise when the data is available
        });
    });


  }

  setSelectedColumn(userManageColumnDetails: any) {
    if (userManageColumnDetails) {
      userManageColumnDetails.forEach((coldetail: any) => {
        this.lookupCodeData.map((codedata: any) => {
          if (coldetail.columnLookupCode == codedata.code) {
            codedata.selected = true;
          }

        })
      });
    }

  }

  showlist() {
    this.fieldList = !this.fieldList
  }
}
