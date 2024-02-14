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
    const url = this.apiurl + `Reply/${replyID}/updateHasViewed`;
    return this.http.post(url, {});
  }
}
