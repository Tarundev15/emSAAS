import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CommonService } from '../../_services/common.service';
import { first, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { DataService } from '../../_services/data.service';
import { MessageService } from 'primeng/api';
@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	form: FormGroup;
	submitted:boolean=false;
	loading:boolean=false;
	error:any;
	errorMessage:any;
	messageData:any;
	divisionOptions: any[]=[];
	rmOptions: any []=[];
	hrOptions: any []=[];
	groupOptions: any []=[];
	departmentOptions: any[]=[];

	constructor(
		private formBuilder: FormBuilder,
		private commonService: CommonService,
		private router: Router,
		private dataService: DataService,
		private messageService: MessageService
	) {
		this.form = this.formBuilder.group({
			login: ['user1234', [Validators.required]],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required,Validators.email]],
			imageUrl:["https://example.com/avatar.jpg", [Validators.required]],
			activated:[true],
			langKey:['en'],
			createdBy:['admin1111'],
			createdDate: ['2023-10-31T10:15:30Z'],
			lastModifiedBy:['admin11'],
			lastModifiedDate: ['2023-10-31T10:15:30Z'],
			authorities: [[2,3], [Validators.required]],
			employeeId: ['', [Validators.required]],
			joiningDate: ['', [Validators.required]],
			dob: ['', [Validators.required]],
			division: ['', [Validators.required]],
			rm: ['', [Validators.required]],
			hr: ['', [Validators.required]],
			groupName: ['', [Validators.required]],
			department: ['', [Validators.required]],
			// remark: [''],

		});
	}

	async ngOnInit() {
		this.loadDivisionOptions();
		this.loadRmOptions();
		this.loadHrOptions();
		this.loadGroupName();
		this.loadDepartment();
		// this.messageData=await this.dataService.getMessageData();
	}
	adminDetails=localStorage.getItem('userInfo.login');


	loadDivisionOptions() {
		this.commonService.GetDivision().subscribe(
		  (options) => {
			this.divisionOptions  = options;
		  },
		  (error) => {
			console.error('Error fetching dropdown options', error);
		  }
		);
	  }

	loadRmOptions() {
		this.commonService.GetReportingManager().subscribe(
		  (options) => {
			this.rmOptions  = options;
		  },
		  (error) => {
			console.error('Error fetching dropdown options', error);
		  }
		);
	  }

	loadHrOptions() {
		this.commonService.GetHrManager().subscribe(
		  (options) => {
		
			this.hrOptions  = options;
		  },
		  (error) => {
			console.error('Error fetching dropdown options', error);
		  }
		);
	  }

	loadGroupName() {
		this.commonService.GetGroupName().subscribe(
		  (options) => {
		
			this.groupOptions  = options;
		  },
		  (error) => {
			console.error('Error fetching dropdown options', error);
		  }
		);
	  }

	loadDepartment() {
		this.commonService.GetDepartment().subscribe(
		  (options) => {
		
			this.departmentOptions  = options;
		  },
		  (error) => {
			console.error('Error fetching dropdown options', error);
		  }
		);
	  }

	submitForm() {

		const adminDetail=localStorage.getItem('userInfo.login');
		this.submitted = true;
		// if (this.form.invalid) {
		// 	console.log("invalid", this.form.value);
		// 	return;
		// }
		//   return;
		const formData = this.form.value;
		console.log("valid", this.form.value);
		const formattedData = {
			login: formData.email,
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			imageUrl:formData.imageUrl,
			langKey:formData.langKey,
			activated:formData.activated,
			createdBy:formData.createdBy,
			createdDate: formData.createdDate,
			lastModifiedBy:	formData.lastModifiedBy,
			lastModifiedDate: formData.lastModifiedDate,
			authorities: formData.authorities,
			// employeeId: formData.employeeId,
			// joiningDate: formData.joiningDate,
			// dob:formData.dob,
			division: formData.division,
			rm: formData.rm,
			hr: formData.rm,
			groupName: formData.groupName,
			department: formData.department,
			// remark: formData.remark,
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
				} else {
					console.log('data NEW USER SUMBIT', data);
					this.messageService.add({
						severity: 'success',
						summary: 'Success',
						// detail: this.messageData[data.responseCode]
					});
					//   this.loading = false;
					this.submitted = false;
				}
			});
	}


}
