import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticesService {
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  addData(url: string, notice: any): Observable<any> {
    return this.http.post(url, notice);
  }

  updateData(
    url: string,
    noticeId: number,
    updatedNotice: any
  ): Observable<any> {
    const apiUrl = `${url}/${noticeId}`;
    return this.http.put(apiUrl, updatedNotice);
  }

  deleteData(url: string, noticeId: number): Observable<any> {
    const apiUrl = `${url}/${noticeId}`;
    return this.http.delete(apiUrl);
  }
}
