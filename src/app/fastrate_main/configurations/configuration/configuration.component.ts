import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { catchError, throwError } from 'rxjs';
// import { NoSpaceValidator } from 'src/app/_helpers/two-dates-validator';
import { CommonService } from 'src/app/_services/common.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { LookupService } from 'src/app/_services/lookup.service';
// import { SharedService } from 'src/app/_services/shared.service';
import { ToastService } from 'src/app/_services/toast.service';
import { LangPipe } from 'src/app/pipe/pipe';

@Component({
	selector: 'app-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['./configuration.component.css']
})
export class configurationComponent  implements AfterViewInit{
	currentPage: number = 1;
	currentUser: any;
	default_list = { "searchValue": "", "sortColumn": "", "dynamicColumn": "", "sortOrder": "", "pageIndex": 1, "pageSize": 100, "totalCount": 0, "status": "", "type": "", "meaning": "", "description": "", "moduleFeatureId": 0, "languageId": this.commonService.getLanguageType() }
	editcode = false;
	edittable = false;
	editDetailsView: boolean = false
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
	lookup_type = ''
	lookuptype_List: any = [];
	lookupmin: any;
	lookupcodemin: any;
	lookupcodemax: any='2999-12-31';
	lookupmax: any='2999-12-31';
	lookuptypeForm: any = FormGroup;
	lookup_Code_Form: any = FormGroup;
	moduleList: any = [];
	showModal: boolean = false;
	showModal1: boolean = false;
	submitted: boolean = false;
	submit = false;
	showtypeDetails: boolean = false;
	totalPages: number = 0;
	totalRecords: any = 0;
	totalPagesArray: any = [];
	toastMsgObj: any;
    lookupData:any;
	constructor(private formbuilder: FormBuilder,private LookupService: LookupService, private renderer: Renderer2,
		private el: ElementRef,
		private loaderService:LoaderService,
		private toastService:ToastService,
		private lang:LangPipe,
		// private sharedService: SharedService,
		public commonService:CommonService,
		private titleSv:Title
		) {
	    // const title=this.lang.transform("LT6M");
	    // const title='eMSAAS';
		// this.titleSv.setTitle(title);
		this.addLookupForm();
		this.addCodeForm();
		this.GetTranslationModuleList();
		// this.getAllLookup_type(1);
		this.filter.status = "";
		this.filter.model = ""
		// this.lookuptypeForm.controls['type'].valueChanges.subscribe((value: any) => {
		// 	this.lookuptypeForm.controls['type'].setValue(
		// 		value!.replace(/ /g, '').toUpperCase(),
		// 		{ emitEvent: false }
		// 	);
		// });
		// this.lookup_Code_Form.controls['code'].valueChanges.subscribe((value: any) => {
		// 	this.lookup_Code_Form.controls['code'].setValue(
		// 		value!.replace(/ /g, '').toUpperCase(),
		// 		{ emitEvent: false }
		// 	);
		// });
		// this.GetAllLookup();
		this.getAll_lookup_type_dropdown();


	}
ngAfterViewInit(): void {
	// this.getAllLookup_type(1)
	this.GetAllLookup();
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
		this.filter.moduleFeatureId = "";
		this.filter.model=""
		this.getAllLookup_type(1);
	}
	lookup_type_dropdown: any[]=[];
	getAll_lookup_type_dropdown() {
		this.LookupService.LookupDropdown().subscribe((Response)=> {
		this.lookup_type_dropdown=Response;
		});

	}
	getAllLookup_type(number: any)
	{

		this.loaderService.showLoader();
		let data = this.default_list;
		data.type = this.filter.type;
		data.meaning = this.filter.meaning;
		data.description = this.filter.description;
		data.status = this.filter.status;
		data.moduleFeatureId = Number(this.filter.moduleFeatureId);
		data.pageIndex = number;
		data.pageSize = this.itemsPerPage;
		this.LookupService.getAll_lookup_type(this.filter.type).subscribe(
			(response) => {
				this.loaderService.hideLoader();

				// this.lookuptype_List = response.data[0].lookups;
				// this.currentPage = number;
				// this.totalRecords = response.data[0].totalRecord;
				// this.totalPages = Math.ceil(response.data[0].totalRecord / this.itemsPerPage)
				this.lookuptype_List = response.lookups;
				this.currentPage = number;
				this.totalRecords = response.totalRecord;
				this.totalPages = Math.ceil(response.totalRecord / this.itemsPerPage)
				this.generateTotalPagesArray();
				const index = this.lookuptype_List.findIndex((obj: any) => obj.lookupType === this.lookup_type);

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

					}
				}

			},
			(error) => {
				this.loaderService.hideLoader();
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
		this.loaderService.showLoader();

		this.LookupService.modulefeatureList(e.target.value).subscribe(
			(response) => {
				this.loaderService.hideLoader();
				this.featureList = response.data;
				this.filter.moduleFeatureId = ""

			},
			(error) => {
				this.loaderService.hideLoader();
				console.error('POST Error:', error);
			}
		);
	}

	addLookupForm() {
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
		selectElement.style.backgroundColor = 'white'
		this.submitted = false;
		var selectElement = document.getElementById("module") as HTMLSelectElement;
		selectElement.disabled = false;
		selectElement.style.backgroundColor = 'white'
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
		this.showtypeDetails = false;
		document.getElementById('details')!.classList.remove('disabled-div');
		this.showModal = false;
	}
	closeModalCode() {
		this.showModal1 = false;
		document.getElementById('detailscode')!.classList.remove('disabled-div');
		this.showModal = false;
		this.editDetailsView = false;
	}

	getFeature(d: any) {
		this.featureID = ''
		this.featureID = d.target.value;
	}

	addlookup_type() {

		this.loaderService.showLoader();
		let data = this.lookuptypeForm.value;
    data.type=data.type.toUpperCase()
		delete (data.moduleId);
		data['createdBy'] = "api";
		data.moduleFeatureId = this.featureID;
		data['lastUpdatedBy'] = "api";
		if (this.edittable) {
			data['languageId'] = this.commonService.getLanguageType();
			data['transactionType'] = "UPDATE"
		}
		else {
			data['languageId'] = 0;
			data['transactionType'] = "INSERT"
		}

		if (this.lookuptypeForm.invalid) {
			this.submitted = true;
			this.loaderService.hideLoader();
			return false;
		}
		else {

			data.type = data.type.toUpperCase();
			if (data.effectiveEndDate == null) {
				data.effectiveEndDate = ''
			}
			this.LookupService.createlookup_type(data).subscribe(
				(response) => {
					this.loaderService.hideLoader();
					if (!response.isError) {

						 this.toastMsgObj = {
							msgType: response.responseMessageType,
							msgText: this.lang.transform(response.responseCode)
						  }
						  this.toastService.addToast(this.toastMsgObj);
					}
					else if (response.isError) {

						this.toastMsgObj = {
							msgType: response.responseMessageType,
							msgText: this.lang.transform(response.responseCode)
						  }
						  this.toastService.addToast(this.toastMsgObj);
						return;
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


				},
				(error) => {
					this.loaderService.hideLoader();
					console.error('POST Error:', error);
				}
			);
			return;
		}
	}
	GetTranslationModuleList(): Promise<void> {

		const languageId = this.commonService.getLanguageType();;

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



				});

		});

	}

	details(val: any) {
		this.showtypeDetails = true;
		document.getElementById('details')!.classList.add('disabled-div');
		this.editlookuptype(val)
	}

	editlookuptype(val: any) {
		this.loaderService.showLoader();

		this.showModal = true;
		this.edittable = true;
		this.submitted = false;
		this.lookup_type = val.lookupType;
		this.lookuptypeForm.controls['type'].setValue(val.lookupType);
		this.lookuptypeForm.controls['moduleId'].setValue(val.moduleId);

		this.LookupService.modulefeatureList(val.moduleId).subscribe(
			(response) => {
				this.loaderService.hideLoader();

				this.featureList = response.data;
				setTimeout(() => {
					this.featureID = val.moduleFeatureId;
					this.lookuptypeForm.controls['moduleFeatureId'].setValue(val.moduleFeatureId);
					var selectElement = document.getElementById("feature") as HTMLSelectElement;


					selectElement.disabled = true;
					selectElement.style.backgroundColor = '#F9F7F4'

					var selectElement = document.getElementById("module") as HTMLSelectElement;

					selectElement.style.backgroundColor = '#F9F7F4'
					selectElement.disabled = true;

				}, 100)


			},
			(error) => {
				this.loaderService.hideLoader();
				console.error('POST Error:', error);
			}
		);



		this.lookuptypeForm.controls['meaning'].setValue(val.lookuptypeMeaning);
		this.lookuptypeForm.controls['description'].setValue(val.lookuptypDescription);

		let date = this.formatDate(val.effectiveStartDate);

		this.lookuptypeForm.controls['effectiveStartDate'].setValue(date);
		let date1 = this.formatDate(val.effectiveEndDate);
		this.lookupmax = date1;
		if (date1 == "1969-12-31" || date1 == '1970-01-01') {
			this.lookuptypeForm.controls['effectiveEndDate'].setValue('');
		}
		else {
			this.lookuptypeForm.controls['effectiveEndDate'].setValue(date1);
			this.lookupmin = date;
		}

		this.lookuptypeForm.controls['status'].setValue(val.status);
	}

	detailscode(val: any, name: any, moduleFeatureId: any) {
		this.editlookupcode(val, name, moduleFeatureId);
		this.editDetailsView = true;
		document.getElementById('detailscode')!.classList.add('disabled-div');
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


		this.lookup_Code_Form.controls['effectiveStartDate'].setValue(date);
		var date1 = this.formatDate(val.lcEffectiveEndDate);
		this.lookupcodemax = date1;
		this.lookupcodemin = date;
		if (date1 == "1969-12-31" || date1 == '1970-01-01') {
			this.lookupcodemax = '2050-05-22';
			this.lookup_Code_Form.controls['effectiveEndDate'].setValue('');
		}
		else {
			this.lookup_Code_Form.controls['effectiveEndDate'].setValue(date);
			this.lookupcodemin = date;
		}

		this.lookup_Code_Form.controls['status'].setValue(val.status);
		this.lookup_Code_Form.controls['displaySequence'].setValue(val.displaySequence)
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
		this.loaderService.showLoader();

		let data = this.lookup_Code_Form.value;
		data['type'] = this.lookup_type;

		data['createdBy'] = "api";
		data['lastUpdatedBy'] = "api";
		if (this.editcode) {
			data['languageId'] = this.commonService.getLanguageType();;
			data['transactionType'] = "UPDATE"
		}
		else {
			data['languageId'] = 0;
			data['transactionType'] = "INSERT"
		}
		data.code=data.code.toUpperCase()
		data.moduleFeatureId = this.featureID;
		if (this.lookup_Code_Form.valid) {
			if (this.lookup_Code_Form.value.length > 1) {
				this.lookup_Code_Form.value.displaySequence = this.lookup_Code_Form.value.displaySequence.replace(/^0+/, '');
			}


			if (data.effectiveEndDate == null) {
				data.effectiveEndDate = ''
			}
			this.LookupService.createlookup_code(data).subscribe(
				(response) => {
					this.loaderService.hideLoader();
					if (!response.isError) {
						// alert(this.lang.transform(response.responseCode))
						this.toastMsgObj = {
							msgType: response.responseMessageType,
							msgText: this.lang.transform(response.responseCode)
						  }
						  this.toastService.addToast(this.toastMsgObj);
					}
					else if (response.isError) {
						// alert(this.lang.transform(response.errors[0].errorCode));
						this.toastMsgObj = {
							msgType: response.responseMessageType,
							msgText: this.lang.transform(response.responseCode)
						  }
						  this.toastService.addToast(this.toastMsgObj);
						return;
					}
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

				},
				(error) => {
					this.loaderService.hideLoader();
					console.error('POST Error:', error);
				}
			);


		} else {
			this.submit = true;
			this.loaderService.hideLoader();



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

		} else if (new Date(this.lookuptypeForm.value.effectiveStartDate) > new Date(this.lookuptypeForm.value.effectiveEndDate)) {

			this.lookuptypeForm.controls['effectiveEndDate'].setValue('')
		} else {

		}
	}
	setcodeMaxDate(e: any) {
		this.lookupcodemin = e.target.value;

		if (new Date(this.lookup_Code_Form.value.effectiveStartDate) < new Date(this.lookup_Code_Form.value.effectiveEndDate)) {

		} else if (new Date(this.lookup_Code_Form.value.effectiveStartDate) > new Date(this.lookup_Code_Form.value.effectiveEndDate)) {

			this.lookup_Code_Form.controls['effectiveEndDate'].setValue('')
		} else {

		}
	}

	lookup_setMinDate(e: any) {
		this.lookupmax = e.target.value;
		if (new Date(this.lookuptypeForm.value.effectiveStartDate) < new Date(this.lookuptypeForm.value.effectiveEndDate)) {

		} else if (new Date(this.lookuptypeForm.value.effectiveStartDate) > new Date(this.lookuptypeForm.value.effectiveEndDate)) {
			this.lookuptypeForm.controls['effectiveStartDate'].setValue('')

		} else {

		}
	}
	setcodeMinDate(e: any) {
		this.lookupcodemax = e.target.value;
		if (new Date(this.lookup_Code_Form.value.effectiveStartDate) < new Date(this.lookup_Code_Form.value.effectiveEndDate)) {

		} else if (new Date(this.lookup_Code_Form.value.effectiveStartDate) > new Date(this.lookup_Code_Form.value.effectiveEndDate)) {
			this.lookup_Code_Form.controls['effectiveStartDate'].setValue('')

		} else {

		}
	}
	changeStatus(event: any, item: any) {
		this.loaderService.showLoader();

		let status = event.target.checked ? 'A' : 'I';
		item.status = status;
		this.featureID = item.moduleFeatureId;

		if (item.effectiveEndDate == null) {
			item.effectiveEndDate = ""
		}
		let obj = {

			"type": item.lookupType,
			"moduleFeatureId": item.moduleFeatureId,
			"languageId": this.commonService.getLanguageType(),
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
				this.loaderService.hideLoader();
				// alert(this.lang.transform(response.responseCode))
				this.toastMsgObj = {
					msgType: response.responseMessageType,
					msgText: this.lang.transform(response.responseCode)
				  }
				  this.toastService.addToast(this.toastMsgObj);


				this.getAllLookup_type(1);

			},
			(error) => {
				this.loaderService.hideLoader();

			}
		);
	}

	changeStatusCode(event: any, subRow: any, lookupType: any, moduleFeatureId: any) {
		this.loaderService.showLoader();

		this.lookup_type = lookupType;
		this.featureID = moduleFeatureId;
		let status = event.target.checked ? 'A' : 'I';
		if (subRow.lcEffectiveEndDate == null) {
			subRow.lcEffectiveEndDate = ""
		}
		let obj = {
			"type": lookupType,
			"moduleFeatureId": moduleFeatureId,
			"languageId": this.commonService.getLanguageType(),
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

				this.loaderService.hideLoader();
				// alert(this.lang.transform(response.responseCode))
				this.toastMsgObj = {
					msgType: response.responseMessageType,
					msgText: this.lang.transform(response.responseCode)
				  }
				  this.toastService.addToast(this.toastMsgObj);
				// this.showModal = false;
				this.getAllLookup_type(1);


			},
			(error) => {
				this.loaderService.hideLoader();

			}
		);
	}
	openLookupDialogBox(data:any,type:any){
		this.lookupData={
			'showModal':true,
			'items':data,
			'type':type
		}
		// this.sharedService.triggerFunction(this.lookupData);
	}
	GetAllLookup(){
	this.loaderService.showLoader();
	this.LookupService.GetAllLookup().subscribe(	
		(response) => {
				this.loaderService.hideLoader();
				this.lookuptype_List = response.lookups;
				console.log('get Response:', this.lookuptype_List);
			},
			(error) => {
				this.loaderService.hideLoader();

			}
		);
	}
}
