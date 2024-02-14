import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  Base_URL: string = this.apiurl + 'Reply/unviewed';
  //https://localhost:7160/api/Reply/unviewed?userId=211526D8-AB57-4251-8D9B-B19C82BD6C72&categoryId=1&sortDirection=desc&pageNumber=1&pageSize=10

  getNotifications(
    userID: string,
    categoryID: number,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `${this.Base_URL}?userId=${userID}&categoryId=${categoryID}&sortDirection=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  markAsRead(replyID: number): Observable<any> {
    console.log(replyID);
    const url = this.apiurl + `Reply/${replyID}/updateHasViewed`;
    return this.http.post(url, {});
  }
}
