import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { LookupService } from 'src/app/_services/lookup.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofileOption.component.html',
  styleUrls: ['./userprofileOption.component.css']
})
export class UserprofileOptionComponent {



	currentPage: number = 1;
	default_list = { "searchValue": "", "sortColumn": "", "sortOrder": "", "pageIndex": 1, "pageSize": 100, "totalCount": 0, "status": "", "type": "", "meaning": "", "description": "", "moduleFeatureId": 0, "languageId": 1 }
	editcode = false;
	edittable = false;
	featureList: any = []
	filter = {
		type: '',
		meaning: '',
		description: '',
		status: '',
		model: "",
		moduleFeatureId: ''
	};
	featureID: any = ''
	itemsPerPage: number = 20;
	moduleList: any = [];
	lookup_type = ''
	lookuptype_List: any = [];
	lookupmin: any;
	lookupcodemin: any;
	lookupcodemax: any;
	lookupmax: any;
	lookuptypeForm: any = FormGroup;
	lookup_Code_Form: any = FormGroup;
	showModal: boolean = false;
	showModal1: boolean = false;
	submitted: boolean = false;
	submit = false;
	totalPages: number = 0;
	totalRecords: any;
	totalPagesArray: any = [];

	constructor(private formbuilder: FormBuilder, private LookupService: LookupService, private renderer: Renderer2, private el: ElementRef) {
		this.addFormmethod();
		this.addCodeForm();
		this.GetTranslationModuleList();
		this.getAllLookup_type(1);
		this.filter.status = "";
		this.filter.model = ""
		this.lookuptypeForm.controls['type'].valueChanges.subscribe((value: any) => {
			this.lookuptypeForm.controls['type'].setValue(
				value!.replace(/ /g, '').toUpperCase(),
				{ emitEvent: false }
			);
		});
		this.lookup_Code_Form.controls['code'].valueChanges.subscribe((value: any) => {
			this.lookup_Code_Form.controls['code'].setValue(
				value!.replace(/ /g, '').toUpperCase(),
				{ emitEvent: false }
			);
		});
	}

	get g() { return this.lookup_Code_Form.controls; }
	get f() { return this.lookuptypeForm.controls; }

	onChange(e: any) {

		if (e.target.value == 'ADD') {
			this.openModal();
      const selectElement = this.el.nativeElement.querySelector('#mySelect');
    selectElement.value = 'Action';
		}
	}
	reset() {
		this.filter.type = "";
		this.filter.meaning = ""
		this.filter.description = ""
		this.filter.status = ""
		this.filter.moduleFeatureId = ""
		this.getAllLookup_type(1);
	}
	getAllLookup_type(number: any) {

		let data = this.default_list;
		data.type = this.filter.type;
		data.meaning = this.filter.meaning;
		data.description = this.filter.description;
		data.status = this.filter.status;
		data.moduleFeatureId = Number(this.filter.moduleFeatureId);
		data.pageIndex = number;
		data.pageSize = this.itemsPerPage;
		this.LookupService.getAll_lookup_type(data).subscribe(
			(response) => {
				this.lookuptype_List = response.data.lookups;
				this.currentPage = number;
				this.totalRecords = response.data.totalRecord;
				this.totalPages = Math.ceil(response.data.totalRecord / this.itemsPerPage)
				this.generateTotalPagesArray();
				const index = this.lookuptype_List.findIndex((obj: any) => obj.lookupType === this.lookup_type);
				console.log(index);
				this.lookuptype_List.forEach((x: any) => {
					x["subTableVisible"] = false;
					x["highlighted"] = false;
				})
				if (index >= 0) {

					const element = document.getElementById(`parent_${index}`);
					this.lookuptype_List[index].subTableVisible = true;
					this.lookuptype_List[index].highlighted = true;
					if (element !== null) {
						element.scrollIntoView({
							behavior: 'smooth'
						});
					} else {
						console.error('Element not found');
					}
				}
				console.log('POST Response:', response, this.lookuptype_List);
			},
			(error) => {

				console.error('POST Error:', error);
			}
		);
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
	getModuleFeature(e: any) {

		this.LookupService.modulefeatureList(e.target.value).subscribe(
			(response) => {
				this.featureList = response.data;
				this.filter.moduleFeatureId = ""
				console.log('POST Response:', response, this.lookuptype_List);
			},
			(error) => {

				console.error('POST Error:', error);
			}
		);
	}

	addFormmethod() {
		this.lookuptypeForm = this.formbuilder.group({
			type: ['', [Validators.required]],
			moduleId: ['', [Validators.required]],
			moduleFeatureId: ['', [Validators.required]],
			meaning: ['', [Validators.required]],
			description: ['', [Validators.required]],
			effectiveStartDate: ['', [Validators.required]],
			effectiveEndDate: [''],
			status: ['', [Validators.required]],
		});
	}

	openModal() {
		var selectElement = document.getElementById("feature") as HTMLSelectElement;
		selectElement.disabled = false;
		this.submitted = false;
		var selectElement = document.getElementById("module") as HTMLSelectElement;
		selectElement.disabled = false;
		this.showModal = true;
		this.lookuptypeForm.reset();
		this.lookuptypeForm.controls['moduleFeatureId'].setValue("");
		this.lookuptypeForm.controls['moduleId'].setValue("");
		let date = this.formatDate(new Date());
		this.lookuptypeForm.controls['effectiveStartDate'].setValue(date);
		this.lookuptypeForm.controls['status'].setValue("A");
		this.lookupmin = date;
		this.edittable = false;

	}
	openModalCode(lookupType: any, moduleFeatureId: any) {
		this.lookup_type = lookupType;
		this.showModal1 = true;
		this.submit = false;
		this.featureID = moduleFeatureId;
		this.editcode = false;
		this.lookup_Code_Form.reset();
		this.lookup_Code_Form.controls['status'].setValue("A");
		let date = this.formatDate(new Date());
		this.lookup_Code_Form.controls['effectiveStartDate'].setValue(date);
		this.lookupcodemin = date;
	}
	closeModal() {
		this.showModal = false;
	}
	closeModalCode() {
		this.showModal1 = false;
		this.showModal = false;
	}

	getFeature(d: any) {
		this.featureID = ''
		this.featureID = d.target.value;
	}

	addlookup_type() {

		let data = this.lookuptypeForm.value;
		delete (data.moduleId);
		data['createdBy'] = "api";
		data.moduleFeatureId = this.featureID;
		data['lastUpdatedBy'] = "api";
		if (this.edittable) {
			data['languageId'] = 1;
			data['transactionType'] = "UPDATE"
		}
		else {
			data['languageId'] = 0;
			data['transactionType'] = "INSERT"
		}

		if (this.lookuptypeForm.invalid) {
			this.submitted = true;
			return false;
		}
		else {

			data.type = data.type.toUpperCase();
			if (data.effectiveEndDate == null) {
				data.effectiveEndDate = ''
			}
			this.LookupService.createlookup_type(data).subscribe(
				(response) => {
					if (response?.data?.statusMessage) {
						alert(response.data.statusMessage)
					}
					else if (response.isError == true) {
						alert(response.data)
					}
					if (this.edittable) {
						this.showModal = false;
					}
					else {
						this.lookup_type = data.type;
						this.openModalCode(this.lookup_type, data.moduleFeatureId);
						this.lookuptypeForm.reset();
						this.lookuptypeForm.controls['moduleFeatureId'].setValue("");
						this.lookuptypeForm.controls['moduleId'].setValue("");
						let date = this.formatDate(new Date());
						this.lookuptypeForm.controls['effectiveStartDate'].setValue(date);
						this.lookuptypeForm.controls['status'].setValue("A");
					}
					if (this.edittable) {
						this.getAllLookup_type(this.currentPage);
					}
					else {
						this.getAllLookup_type(1);
					}

					console.log('POST Response:', response);
				},
				(error) => {

					console.error('POST Error:', error);
				}
			);
			return;
		}
	}
	GetTranslationModuleList(): Promise<void> {

		const languageId = 1;

		return new Promise<void>((resolve, reject) => {

			this.LookupService.GetTranslationModuleList()

				.pipe(

					catchError(error => {

						reject(error);

						return throwError(error);

					})

				)

				.subscribe((result: any) => {
					this.moduleList = result.data;
					console.log(this.moduleList)


				});

		});

	}

	editlookuptype(val: any) {

		this.showModal = true;
		this.edittable = true;
		this.submitted = false;
		this.lookup_type = val.lookupType;
		this.lookuptypeForm.controls['type'].setValue(val.lookupType);
		this.lookuptypeForm.controls['moduleId'].setValue(val.moduleId);

		this.LookupService.modulefeatureList(val.moduleId).subscribe(
			(response) => {


				this.featureList = response.data;
				setTimeout(() => {
					this.featureID = val.moduleFeatureId;
					this.lookuptypeForm.controls['moduleFeatureId'].setValue(val.moduleFeatureId);
					var selectElement = document.getElementById("feature") as HTMLSelectElement;


					selectElement.disabled = true;

					var selectElement = document.getElementById("module") as HTMLSelectElement;


					selectElement.disabled = true;

				}, 100)

				console.log('POST Response:', response, this.lookuptype_List);
			},
			(error) => {

				console.error('POST Error:', error);
			}
		);



		this.lookuptypeForm.controls['meaning'].setValue(val.lookuptypeMeaning);
		this.lookuptypeForm.controls['description'].setValue(val.lookuptypDescription);

		let date = this.formatDate(val.effectiveStartDate);

		this.lookuptypeForm.controls['effectiveStartDate'].setValue(date);
		let date1 = this.formatDate(val.effectiveEndDate);
		this.lookupmax = date1;
		if (date1 == "1969-12-31") {
			this.lookuptypeForm.controls['effectiveEndDate'].setValue('');
		}
		else {
			this.lookuptypeForm.controls['effectiveEndDate'].setValue(date1);
			this.lookupmin = date;
		}

		this.lookuptypeForm.controls['status'].setValue(val.status);
	}

	editlookupcode(val: any, name: any, moduleFeatureId: any) {
		// 
		this.lookup_type = name;
		this.showModal1 = true;
		this.editcode = true;
		this.submit = false;
		this.featureID = moduleFeatureId;
		this.lookup_Code_Form.controls['code'].setValue(val.code);
		this.lookup_Code_Form.controls['meaning'].setValue(val.lookupcodeMeaning);
		this.lookup_Code_Form.controls['description'].setValue(val.lookupcodeDescription);
		var date = this.formatDate(val.lcEffectiveStartDate);

		console.log(date);
		this.lookup_Code_Form.controls['effectiveStartDate'].setValue(date);
		var date = this.formatDate(val.lcEffectiveEndDate);
		this.lookupcodemax = date;
		if (date == "1969-12-31") {
			this.lookup_Code_Form.controls['effectiveEndDate'].setValue('');
		}
		else {
			this.lookup_Code_Form.controls['effectiveEndDate'].setValue(date);
			this.lookupcodemin = date;
		}

		this.lookup_Code_Form.controls['status'].setValue(val.status);
	}
	toggleSubTable(data: any): void {
		if (data.subTableVisible) {
			data.subTableVisible = false; 
		} else {
			
			this.lookuptype_List.forEach((r: any) => (r.subTableVisible = false));
			data.subTableVisible = true; 
		}
		// this.lookuptype_List.forEach((r:any) => (r.subTableVisible = false));
		// data.subTableVisible = !data.subTableVisible;
		data.highlighted = !data.highlighted;
		if (data.lookupCodes) {
			data.lookupCodes.forEach((subRow: any) => {

				subRow.highlighted = data.highlighted;
			});
		}

	}
	addCodeForm() {
		this.lookup_Code_Form = this.formbuilder.group({
			code: ['', [Validators.required]],

			meaning: ['', [Validators.required]],
			description: ['', [Validators.required]],
			displaySequence: ['', [Validators.required]],
			effectiveStartDate: ['', [Validators.required]],
			effectiveEndDate: [''],
			status: ['', [Validators.required]],
		})

	}

	addlookup_code() {
		let data = this.lookup_Code_Form.value;
		data['type'] = this.lookup_type;

		data['createdBy'] = "api";
		data['lastUpdatedBy'] = "api";
		if (this.editcode) {
			data['languageId'] = 1;
			data['transactionType'] = "UPDATE"
		}
		else {
			data['languageId'] = 1;
			data['transactionType'] = "INSERT"
		}
		data.moduleFeatureId = this.featureID;
		// 
		if (this.lookup_Code_Form.valid) {
			if (data.effectiveEndDate == null) {
				data.effectiveEndDate = ''
			}
			this.LookupService.createlookup_code(data).subscribe(
				(response) => {
					alert(response.data.statusMessage)
					// this.showModal = false;
					this.getAllLookup_type(this.currentPage);
					if (this.editcode) {
						this.showModal1 = false;
					}
					else {
						this.lookup_Code_Form.reset();
						this.lookuptypeForm.reset();
						this.lookup_Code_Form.controls['status'].setValue("A");
						let date = this.formatDate(new Date());
						this.lookup_Code_Form.controls['effectiveStartDate'].setValue(date);
					}
					console.log('POST Response:', response);
				},
				(error) => {

					console.error('POST Error:', error);
				}
			);
			console.log('Validation successful, can create');

		} else {
			this.submit = true;
			console.log(this.lookup_Code_Form)
			console.log('The form is invalid, cannot submit');

		}
	}
	formatDate(inputDate: any) {
		const date = new Date(inputDate);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).padStart(2, '0');;

		return `${year}-${month}-${day}`;
	}

	lokup_setMaxDate(e: any) {
		this.lookupmin = e.target.value;

		if (new Date(this.lookuptypeForm.value.effectiveStartDate) < new Date(this.lookuptypeForm.value.effectiveEndDate)) {
			console.log("date1 is earlier than date2");
		} else if (new Date(this.lookuptypeForm.value.effectiveStartDate) > new Date(this.lookuptypeForm.value.effectiveEndDate)) {
			console.log("date1 is later than date2");
			this.lookuptypeForm.controls['effectiveEndDate'].setValue('')
		} else {
			console.log("date1 and date2 are the same");
		}
	}
	setcodeMaxDate(e: any) {
		this.lookupcodemin = e.target.value;

		if (new Date(this.lookup_Code_Form.value.effectiveStartDate) < new Date(this.lookup_Code_Form.value.effectiveEndDate)) {
			console.log("date1 is earlier than date2");
		} else if (new Date(this.lookup_Code_Form.value.effectiveStartDate) > new Date(this.lookup_Code_Form.value.effectiveEndDate)) {
			console.log("date1 is later than date2");
			this.lookup_Code_Form.controls['effectiveEndDate'].setValue('')
		} else {
			console.log("date1 and date2 are the same");
		}
	}

	lookup_setMinDate(e: any) {
		this.lookupmax = e.target.value;
		if (new Date(this.lookuptypeForm.value.effectiveStartDate) < new Date(this.lookuptypeForm.value.effectiveEndDate)) {
			console.log("date1 is earlier than date2");
		} else if (new Date(this.lookuptypeForm.value.effectiveStartDate) > new Date(this.lookuptypeForm.value.effectiveEndDate)) {
			this.lookuptypeForm.controls['effectiveStartDate'].setValue('')
			console.log("date1 is later than date2");
		} else {
			console.log("date1 and date2 are the same");
		}
	}
	setcodeMinDate(e: any) {
		this.lookupcodemax = e.target.value;
		if (new Date(this.lookup_Code_Form.value.effectiveStartDate) < new Date(this.lookup_Code_Form.value.effectiveEndDate)) {
			console.log("date1 is earlier than date2");
		} else if (new Date(this.lookup_Code_Form.value.effectiveStartDate) > new Date(this.lookup_Code_Form.value.effectiveEndDate)) {
			this.lookup_Code_Form.controls['effectiveStartDate'].setValue('')
			console.log("date1 is later than date2");
		} else {
			console.log("date1 and date2 are the same");
		}
	}
	changeStatus(event: any, item: any) {

		let status = event.target.checked ? 'A' : 'I';
		item.status = status;
		this.featureID = item.moduleFeatureId;
		console.log(status, item);
		if (item.effectiveEndDate == null) {
			item.effectiveEndDate = ""
		}
		let obj = {

			"type": item.lookupType,
			"moduleFeatureId": item.moduleFeatureId,
			"languageId": 1,
			"meaning": item.lookuptypeMeaning,
			"description": item.lookuptypDescription,
			"effectiveStartDate": item.effectiveStartDate,
			"effectiveEndDate": item.effectiveEndDate,
			"status": status,
			"transactionType": "UPDATE",
			"createdBy": "api",
			"lastUpdatedBy": "api"
		}
		this.LookupService.createlookup_type(obj).subscribe(
			(response) => {
				alert(response.data.statusMessage)



				this.getAllLookup_type(1);
				console.log('POST Response:', response);
			},
			(error) => {

				console.error('POST Error:', error);
			}
		);
	}

	changeStatusCode(event: any, subRow: any, lookupType: any, moduleFeatureId: any) {

		this.lookup_type = lookupType;
		this.featureID = moduleFeatureId;
		let status = event.target.checked ? 'A' : 'I';
		if (subRow.lcEffectiveEndDate == null) {
			subRow.lcEffectiveEndDate = ""
		}
		let obj = {
			"type": lookupType,
			"moduleFeatureId": moduleFeatureId,
			"languageId": 1,
			"code": subRow.code,
			"meaning": subRow.lookupcodeMeaning,
			"description": subRow.lookupcodeDescription,
			"status": status,
			"effectiveStartDate": subRow.lcEffectiveStartDate,
			"effectiveEndDate": subRow.lcEffectiveEndDate,
			"transactionType": "UPDATE",
			"createdBy": "api",
			"lastUpdatedBy": "api"
		}

		this.LookupService.createlookup_code(obj).subscribe(
			(response) => {
				alert(response.data.statusMessage)
				// this.showModal = false;
				this.getAllLookup_type(1);

				console.log('POST Response:', response);
			},
			(error) => {

				console.error('POST Error:', error);
			}
		);
	}

}
