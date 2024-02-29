import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  // unloackUser(id: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) { }
  addUserManagement(data:any){
    const apiUrl = environment.apiUrl + '/api/User/SaveUser';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  country(){
    const apiUrl = environment.apiUrl + '/api/User/GetCountryList?languageId=1';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  state(id:any){
    const apiUrl = environment.apiUrl + `/api/User/GetStateList?CountryId=${id}&languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  userDetailsById(id:any){
    const apiUrl = environment.apiUrl + `/api/User/GetUserDetailsById?userId=${id}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  userlist(data:any){
  
    const apiUrl = environment.apiUrl + `/api/User/GetUsersList`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl,data);
  
  }
  userRole(){
    let obj={
      "searchValue": "",
      "sortColumn": "",
      "sortOrder": "",
      "pageIndex": 1,
      "pageSize": 1000,
      "totalCount": 0,
      "status": ""
    }
    const apiUrl = environment.apiUrl + `/api/CommonData/GetRoleList`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl,obj);
  }
  templateFormat(){
    const apiUrl = environment.apiUrl + `/api/User/GetUserUploadExcelTemplate`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl,'');
  }
  uploadfile(data:any){
    const apiUrl = environment.apiUrl + `/api/User/UploadUsersByExcelFile?languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    let obj={
      content:data
    }
    return this.http.post(apiUrl,obj);
  }
}
