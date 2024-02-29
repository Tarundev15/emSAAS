import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }


  // createlookup_type(data: any): Observable<any> {                                        //ATM
  //   const apiUrl = environment.apiUrl + '/api/Lookup/LookupTypeCreation';
  //   // const headers = new HttpHeaders({
  //   //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
  //   //   'Content-Type': 'application/json'
  //   // });
  //   return this.http.post(apiUrl, data);
  // }
  createlookup_type(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + '/api/configuration';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  createlookup_code(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + '/api/Lookup/LookupCodeCreation';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  GetTranslationModuleList() {
    let languageId = 1
    return this.http.get<any>(`${environment.apiUrl}/api/CommonData/GetTranslationModuleList?languageId=${languageId}`)

      .pipe(map(res => {

        return res;

      }));
  }
  modulefeatureList(d: any): Observable<any> {
    const apiUrl = environment.apiUrl + `/api/CommonData/GetTranslationModuleFeatureList?languageId=1&ModuleId=${d}`;

    // });
    return this.http.get(apiUrl);
  }
  // getAll_lookup_type(data: any): Observable<any> { // ATM
  //   const apiUrl = environment.apiUrl + '/api/Lookup/GetAllLookupTypeList';
  //   return this.http.post(apiUrl, data);
  // }
  getAll_lookup_type(data: any): Observable<any> { 
    const apiUrl = `${environment.apiUrl}/api/configuration/lookup/${data}`;
    return this.http.get(apiUrl, data);
  }
  LookupDropdown(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/configuration`)
    .pipe(map(res => {

      return res;
    }));
}
  getAll_lookup_code(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + '/api/Lookup/GetAllLookupCode';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  GetLookup_Lang_Translation(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + '/api/Lookup/GetLookupLanguageTranslation';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  LookupLanguageCreation(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + '/api/Lookup/LookupLanguageCreation';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(apiUrl, data);
  }
  GetAllLookup() {
    return this.http.get<any>(`${environment.apiUrl}/api/configuration/lookuptype`)
      .pipe(map(res => {

        return res;
      }));
  }
}
