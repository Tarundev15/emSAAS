import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any;
  constructor(private http: HttpClient) { }

  async getMessageData() {
    return this.http
      .get<any>('../../assets/json/message.json')
      .pipe(
    ).toPromise();

  }


  setData(data: any): void {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
