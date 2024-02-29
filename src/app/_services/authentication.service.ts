import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/authenticate`, { 'username': data.username, 'password': data.password ,'clientId': data.clientId })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log("user token",user);
                if (user && user.id_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userInfo');
        this.currentUserSubject.next(null!);
        this.router.navigate(['login']);

    }
    userAccessRights(id: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/Auth/UserAccessRights?AccountId=` + id, {})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                return user;
            }));
    }
  validateResetToken(data:any){
    
    const apiUrl = environment.apiUrl + '/api/Auth/ValidateResetToken';
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
    let obj={
        resetToken:data
    }
    return this.http.post(apiUrl, obj);
  }
  isemailExist(email:any){
    
    const apiUrl = environment.apiUrl + `/api/Auth/IsEmailExist?email=${email}`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
  
    return this.http.post(apiUrl, '');
  }
  reset_paswword(data:any){
    
    const apiUrl = environment.apiUrl + `/api/Auth/reset-password`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
  
    return this.http.post(apiUrl, data);
  }
  authenticateUser(data:any){
    
    const apiUrl = environment.apiUrl + `/api/Auth/AuthenticateUser`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
  let obj={
    "email":data.email,
    "password": data.password,
  }
    return this.http.post(apiUrl, obj);
  }
  forgot_password(email:any){
    
    const apiUrl = environment.apiUrl + `/api/Auth/ForgotPassword`;
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer your-access-token', // Replace with your actual Bearer token
    //   'Content-Type': 'application/json'
    // });
  let obj={
    email:email
  }
    return this.http.post(apiUrl, obj);
  }


  newRegistration(param: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/admin/users`, param)
      .pipe(map(res => {
        return res;
      }));
  }
}