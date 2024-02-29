import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/_services/data.service';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
	form: FormGroup;
	submitted: boolean = false;
	loading: boolean = false;
	error: any;
	errorMessage: any;
	messageData: any;
	divisionOptions: any[] = [];
	rmOptions: any[] = [];
	hrOptions: any[] = [];
	groupOptions: any[] = [];
	departmentOptions: any[] = [];
	toastMsgObj: any;

	constructor(
		private formBuilder: FormBuilder,
		private commonService: CommonService,
		private router: Router,
		private dataService: DataService,
		private toastService: ToastService,
		private messageService: MessageService
	) {
		this.form = this.formBuilder.group({
			login: ['', [Validators.required]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			imageUrl: ['https://example.com/avatar.jpg', [Validators.required]],
			activated: [true],
			langKey: ['', [Validators.required]],
			createdBy: [''],
			createdDate: [''],
			lastModifiedBy: [''],
			lastModifiedDate: [''],
			authorities: ['', [Validators.required]],
			employeeId: ['', [Validators.required]],
			joiningdate: ['', [Validators.required]],
			dob: ['', [Validators.required]],
			department: ['', [Validators.required]],
			remark: [''],
			division: ['', [Validators.required]],
			reportingmanager: ['', [Validators.required]],
			divisionid: ['', [Validators.required]],
			hrmanager: ['', [Validators.required]],
			usergroup: ['', [Validators.required]],
			userstatus: ['Active', [Validators.required]],
			policyGroup: ['GroupB', [Validators.required]],
			salutation: ['Mrs.', [Validators.required]],
			genderCode: ['M', [Validators.required]]

		});
	}

	async ngOnInit() {
		await this.loadDivisionOptions();
		await this.loadRmOptions();
		await this.loadHrOptions();
		await this.loadGroupName();
		await this.loadDepartment();
		this.showMessage();
		// this.messageData=await this.dataService.getMessageData();
	}
	adminDetails = localStorage.getItem('userInfo.login');


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

	submitForm() {
	console.log('langKey', this.langKey);
		this.submitted = true;
		// if (this.form.invalid) {
		// 	console.error("invalid", this.form.value);
		// 	return;
		// }
		//   return;
		const formData = this.form.value;
		const formatauthorities=[JSON.parse(formData.usergroup)];
		console.log("valid", this.form.value);
		const formattedData = {
			"login": formData.email,
			"firstName": formData.firstName,
			"lastName": formData.lastName,
			"email": formData.email,
			"imageUrl": formData.imageUrl,
			"langKey": this.langKey,
			"activated": formData.activated,
			"createdBy": this.login,
			"createdDate": formData.createdDate,
			"lastModifiedBy": this.login,
			"lastModifiedDate": formData.lastModifiedDate,
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
			"policyGroup": formData.policyGroup,
			"salutation": formData.salutation,
			"genderCode": formData.genderCode,
		}
		console.log("formattedData-----", formattedData);
		this.addUser(formattedData);
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
					this.loading = false;
					this.submitted = false;
				}
			});

	}
	showMessage() {
		this.toastService.addToast('Hello, this is a toast!');
	  }	


}

