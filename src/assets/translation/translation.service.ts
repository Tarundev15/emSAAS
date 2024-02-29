// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TranslationService {

//   constructor() { }
// }


import { Injectable, OnInit } from "@angular/core";
import { dictionary } from './translations';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TranslationService implements OnInit {
    
    public language = "en";
    private _translation: any;

    constructor(private http: HttpClient) {
      this.initialize();
    }
  
    public async initialize() {
      try {
        let lang= localStorage.getItem('lang');
        
        const resp = await this.http.get(`/assets/json/${lang}.json`).toPromise();
        this._translation = resp;
        console.log(this._translation);
        // Perform any additional initialization here
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, e.g., display an error message
      }
    }
  
    ngOnInit() {

    }
 

    translate(key: string): string {
    
    
        if (this._translation && this._translation[key])
            return this._translation[key];
        else
            return key;
    }
}
