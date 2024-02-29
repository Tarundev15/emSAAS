import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  GetGroupData(groupType: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/CommonData/GetGroupData?groupType=` + groupType)
      .pipe(map(res => {
        return res;
      }));

  }
  savesrchAdvance(data: any, id: any) {
    const apiUrl = environment.apiUrl + `/api/Core/SaveSavedSearchDetails?userId=${id}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  getcndsn() {
    const apiUrl = environment.apiUrl + `/api/Core/GetSearchConditionList?languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  getsavedUseradvancedata(user: any, nameid: any) {
    const apiUrl = environment.apiUrl + `/api/Core/GetSavedSearchDetail?userId=${user}&savedSearchId=${nameid}&languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  deleteSavedSearch(userId: any, savedid: any) {
    const apiUrl = environment.apiUrl + `/api/Core/DeleteSavedSearch?userId=${userId}&savedSearchId=${savedid}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, '');
  }
  searchsavedName(user: any,pageKey:any) {
    const apiUrl = environment.apiUrl + `/api/Core/GetSavedSearchList?userId=${user}&pageKey=${pageKey}&languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl);
  }
  getcoloumn(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + `/api/Core/GetSearchAvailableColumnList?pageKey=${data}&languageId=1`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.get(apiUrl, data);
  }
  // get city
  GetGroupDataByReferenceID(groupCode: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/CommonData/GetGroupDataByReferenceID?groupCode=` + groupCode)
      .pipe(map(res => {
        return res;
      }));

  }

  ManageKYCAccountProfile(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/AccountDetails/ManageKYCAccountProfile`, param)
      .pipe(map(res => {
        return res;
      }));

  }

  GetKYCDocumentListById(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/AccountDetails/GetKYCDocumentListById?accountDocumentID=0`, param)
      .pipe(map(res => {
        return res;
      }));

  }
  newRegistration(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Accounts/newRegistration`, param)
      .pipe(map(res => {

        return res;
      }));
  }
  verifyOTP(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Accounts/verify-OTP`, param)
      .pipe(map(res => {
        return res;
      }));
  }

  GetServices(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Service/GetServices`, param)
      .pipe(map(res => {
        return res;
      }));

  }
  ManageService(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Service/ManageService`, param)
      .pipe(map(res => {
        return res;
      }));

  }

  GetServiceById(serviceId: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Service/GetServiceById?serviceId=${serviceId}`, null)
      .pipe(map(res => {
        return res;
      }));

  }

  GetGroupDataWithSubCategory(groupType: any) {
    return this.http.get<any>(`${environment.apiUrl}/api/CommonData/GetGroupDataWithSubCategory?groupType=` + groupType)
      .pipe(map(res => {
        return res;
      }));

  }

  UpdateServiceStatus(serviceId: any, status: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Service/UpdateServiceStatus?serviceId=${serviceId}&status=${status}`, null)
      .pipe(map(res => {
        return res;
      }));

  }
  ResendOTP(mobileNumber: any, messageHeader: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Accounts/Resend-OTP?MobileNumber=${mobileNumber}&messageHeader=${messageHeader}`, null)
      .pipe(map(res => {
        return res;
      }));
  }
  updatePassword(param: any, token: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Accounts/update-password?password=` + param.password, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(map(res => {
      return res;
    }));
  }

  
  GetAccount() {
    return this.http.get<any>(`${environment.apiUrl}/api/account`)
      .pipe(map(res => {
        return res;
      }));

  }

  newUserRegistration(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/admin/users`, param)
      .pipe(map(res => {

        return res;
      }));
  }

  GetUser() {
    return this.http.get<any>(`${environment.apiUrl}/api/admin/users`)
      .pipe(map(res => {

        return res;
      }));
  }
  GetDivision() {
    return this.http.get<any>(`${environment.apiUrl}/api/admin/divisions`)
      .pipe(map(res => {

        return res;
      }));
  }

  GetReportingManager() {
    return this.http.get<any>(`${environment.apiUrl}/api/admin/users/reportingManager`)
      .pipe(map(res => {

        return res;
      }));
  }

  GetHrManager() {
    return this.http.get<any>(`${environment.apiUrl}/api/admin/users/hrmanager`)
      .pipe(map(res => {

        return res;
      }));
  }

  GetGroupName() {
    return this.http.get<any>(`${environment.apiUrl}/api/admin/users/groupname`)
      .pipe(map(res => {

        return res;
      }));
  }

  GetDepartment() {
    return this.http.get<any>(`${environment.apiUrl}/api/configuration/lookup/Department`)
      .pipe(map(res => {

        return res;
      }));
  }


  modules(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/authorities/modules?authorityIds=` + id, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            return user;
        }));
}

GetAllUsers() {
  return this.http.get<any>(`${environment.apiUrl}/api/admin/users`)
    .pipe(map(user => {

      return user;
    }));
}

UserList(pageNumber: number, pageSize: number, sortBy: string , sortDir: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/admin/userswithpagination?page=${pageNumber}&size=${pageSize}&sort=${sortBy + ',' +sortDir}`)
    .pipe(map(user => {

      return user;
    }));
}

CreateAccessGroup(param: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/accessgroup/create`, param)
    .pipe(map(res => {

      return res;
    }));
}

AllAccessGroup() {
  return this.http.get<any>(`${environment.apiUrl}/api/accessgroup/allaccessgroup`)
    .pipe(map(res => {

      return res;
    }));
}

AuthorityWithId(group_id: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/accessgroup/data-by-group-id/${group_id}`)
    .pipe(map(res => {

      return res;
    }));
}

AuthorityWithoutId(group_id: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/accessgroup/data-not-by-group-id/${group_id}`)
    .pipe(map(res => {

      return res;
    }));
}

AccessProfileList(pageNumber:number,pageSize:number,sortBy:string,sortDir:string) {
  return this.http.get<any>(`${environment.apiUrl}/api/options/sortprofileOptions?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .pipe(map(res => {

      return res;
    }));
}

AddOrRemove(group_id: string, username: string, addRemoveFlag: boolean ) {
  return this.http.post<any>(`${environment.apiUrl}/api/accessgroup/addremoveusers?group_id=${group_id}&username=${username}&addRemoveFlag=${addRemoveFlag}`, null)
    .pipe(map(res => {

      return res;
    }));
}

AddCustomer(param: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/customers`, param)
    .pipe(map(res => {

      return res;
    }));
}

AllCustomer(pageNumber: string, pageSize: string, sortBy: string, sortDir: string  ) {
  return this.http.get<any>(`${environment.apiUrl}/api/customers/getCustomerData?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}` )
    .pipe(map(res => {

      return res;
    }));
}

EmpSearch(firstName:any,pageNumber: string, pageSize: string, sortBy: string, sortDir: string  ) {
  return this.http.get<any>(`${environment.apiUrl}/api/employeeManagement/search?query=${firstName}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}` )
    .pipe(map(res => {

      return res;
    }));
}

EmpSearchDropDown(firstName:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/employeeManagement/search?query=${firstName}` )
    .pipe(map(res => {

      return res;
    }));
}

AddComment(param: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/comments/addUserComment1`, param)
    .pipe(map(res => {

      return res;
    }));
}

FetchUserComment(requestData:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/comments/fetch?objectCode=${requestData.objectCode}&objectId=${requestData.objectId}&level1=${requestData.level1}&level2=${requestData.level2}&level3=${requestData.level3}&level4=${requestData.level4}&level5=${requestData.level5}&level6=${requestData.level6}&level7=${requestData.level7}&level8=${requestData.level8}&level9=${requestData.level9}&level10=${requestData.level10}`)
  .pipe(map(res => {
    
    return res;
  }));
}

DeleteComment(commentId: any) {
  return this.http.delete<any>(`${environment.apiUrl}/api/comments/deleteUserComment?commentId=${commentId}`)
    .pipe(map(res => {

      return res;
    }));
}

UpdateUserComment(comment_id: any,updatedComment:any,referenceNumber:any) {
  return this.http.put<any>(`${environment.apiUrl}/api/comments/${comment_id}?updatedComment=${updatedComment}&referenceNumber=${referenceNumber}`,null)
    .pipe(map(res => {

      return res;
    }));
}

GetAccessProfieById(profileId:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/options/viewAccessProfile?profileId=${profileId}`)
    .pipe(map(res => {
      return res;
    }));
}

CreateAccessProfile(param: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/options/create`, param)
    .pipe(map(res => {

      return res;
    }));
}

UpdateAccessProfile(profile_OPTION_ID: any,levelcode:any,param: any) {
  return this.http.put<any>(`${environment.apiUrl}/api/options/update/${profile_OPTION_ID}/${levelcode}/${param.levelvalue}`, param)
    .pipe(map(res => {

      return res;
    }));
}

DeleteAccessProfile(profile_OPTION_ID: any, levelcode: any, levelvalue: any) {
  return this.http.delete<any>(`${environment.apiUrl}/api/options/delete/${profile_OPTION_ID}/${levelcode}/${levelvalue}`)
    .pipe(map(res => {

      return res;
    }));
}

GetAllFunctionAccess(groupId:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/authorities/getAllFunctionAccess?groupId=${groupId}`)
    .pipe(map(res => {

      return res;
    }));
}

GetPersonalInfo(id:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/employeeManagement/${id}`)
    .pipe(map(res => {
      return res;
    }));
}

GetWatcher(objectId:any,objectType:any,levelCode:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/managewatcher/getUsersWithFlags?objectId=${objectId}&objectType=${objectType}&levelCode=${levelCode}`)
    .pipe(map(res => {

      return res;
    }));
}

CreateWatcher(param: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/managewatcher/watcherOperation`, param)
    .pipe(map(res => {

      return res;
    }));

}

DeleteWatcher(body: any) {
  return this.http.post<any>(`${environment.apiUrl}/api/managewatcher/watcherOperation`,body)
    .pipe(map(res => {

      return res;
    }));
}

UpdateFunctionAccess(functionIds: any, groupid: string, status: boolean ) {
  return this.http.post<any>(`${environment.apiUrl}/api/authorities/updatefunctionAccessStatus?functionIds=${functionIds}&groupId=${groupid}&status=${status}`, null)
    .pipe(map(res => {

      return res;
    }));
}



// UpdateFunctionAccess(functionId: string, groupid: string, status: boolean) {
//   const body = { functionId, groupid, status };
//   return this.http.post<any>(`${environment.apiUrl}/api/authorities/updatefunctionAccessStatus`, body);
// }

DeleteAccessGroup(groupId: any) {
  return this.http.delete<any>(`${environment.apiUrl}/api/accessgroup/${groupId}`)
    .pipe(map(res => {

      return res;
    }));
}

AccessGroupPage(pageNumber: string, pageSize: string, sortBy: string, sortDir: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/accessgroup/sortGroup?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .pipe(map(res => {

      return res;
    }));
}

GetAllCountryList() {
  return this.http.get<any>(`${environment.apiUrl}/api/customers/all-countries`)
    .pipe(map(res => {

      return res;
    }));
}

GetCustomerType() {
  return this.http.get<any>(`${environment.apiUrl}/api/customers/fetchListFromMasterData?filterKey=CUSTOMER_ACCOUNT_TYPE`)
    .pipe(map(res => {

      return res;
    }));
}


GetCurrencyList() {
  return this.http.get<any>(`${environment.apiUrl}/api/customers/allCurrencyData`)
    .pipe(map(res => {

      return res;
    }));
}

GetCityByCountry(countryId: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/customers/by-country?countryId=${countryId}`)
    .pipe(map(res => {

      return res;
    }));
}

UserAccess(username: any) {
  return this.http.get<any>(`${environment.apiUrl}/api/accessgroup?username=${username}`)
    .pipe(map(res => {

      return res;
    }));
}

UserReport(userDivisions: string, userDepartments: string, joiningDate: string, lastWorkingDate: string, status: string,pageSize:any,pageNumber:any,sort:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/report/getUserReportBasedOnDivisionList?userDivisions=${userDivisions}&userDepartments=${userDepartments}&joiningDate=${joiningDate}&lastWorkingDate=${lastWorkingDate}&status=${status}&pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${sort}`)
    .pipe(map(res => {

      return res;
    }));
}

updateAccessGroup(groupId: number, data: any) {
  const url = `${environment.apiUrl}/api/accessgroup/update/${groupId}`;
  return this.http.put<any>(url, data)
    .pipe(map(res => {
      return res;
    }));
}

UserGroupName(usernames: any, groupId: number, addGroup: any ) {
  return this.http.post<any>(`${environment.apiUrl}/api/accessgroup/update-group-memberships?usernames=${usernames}&groupId=${groupId}&addGroup=${addGroup}`, null)
    .pipe(map(res => {
      return res;
    }));
}

Get_AccessProfie_Level_List(levelCode: any,profileId:any) {
  return this.http.get<any>(`${environment.apiUrl}/api/options/${profileId}?levelCode=${levelCode}`)
    .pipe(map(res => {
      return res;
    }));
}

DownloadUserReport(userDivisions: string, userDepartments: string, joiningDate: string, lastWorkingDate: string, status: string) {
  return this.http.get<any>(`${environment.apiUrl}/api/report/downloadUserReportBasedOnDivisionList?userDivisions=${userDivisions}&userDepartments=${userDepartments}&joiningDate=${joiningDate}&lastWorkingDate=${lastWorkingDate}&status=${status}`)
    .pipe(map(res => {
      return res;
    }));
}

GetSearchUser(searchTerm: any){
  return this.http.get<any>(`${environment.apiUrl}/api/admin/search?searchTerm=${searchTerm}`)
    .pipe(map(res => {
      return res;
    }));
}

getLanguageType() {

  const storedLang = localStorage.getItem("lang");
  switch (storedLang) {
    case 'en':
      return 1;
    case 'fr':
      return 2;
    default:
      return 1;
  }
}

}
