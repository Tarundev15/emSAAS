import { Component } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { first, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CommonService } from 'src/app/_services/common.service';
import { lastValueFrom } from 'rxjs';
@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html'
})
export class KycComponent {
    errorMessage: string = '';
    isKycCompleted: boolean = false;
    showList: boolean = false;
    showForm: boolean = false;
    kycData: any;
    constructor(private dataService: DataService,
        private commonService: CommonService) { }
    async ngOnInit() {
        await this.GetKYCDocumentListById();
        if (this.isKycCompleted) {
            this.showList = true;
            this.showForm = false;
        }
    }

    async GetKYCDocumentListById() {
        const items = {
            searchValue: "",
            sortColumn: "",
            sortOrder: "",
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            status:'A'
        };

        try {
            const data = await lastValueFrom(this.commonService.GetKYCDocumentListById(items));
            console.log("data", data);
            if (data.accountDocuments.length > 0 ) {
                this.kycData = data;
                this.isKycCompleted = true;
                this.dataService.setData(this.kycData);
            }
            else {
                this.showList = false;
                this.showForm = true;
            }
        } catch (error) {
            throw error;
        }
    }

    onEditClicked() {
        this.showForm = true;
        this.showList = false;
    }
}
