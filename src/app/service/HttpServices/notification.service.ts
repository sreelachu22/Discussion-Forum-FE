import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  Base_URL: string = "https://localhost:7160/api/Reply/unviewed";  

  getNotifications(userID:string, categoryID:number, sortOrder:string, pageNumber:number, pageSize:number): Observable<any> {
    return this.http.get(
        `${this.Base_URL}?userId=${userID}&categoryId=${categoryID}&sortDirection=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  markAsRead(replyID: number): Observable<any> {    
    const url = `https://localhost:7160/api/Reply/${replyID}/updateHasViewed`;
    return this.http.post(url, {});
  }
}
