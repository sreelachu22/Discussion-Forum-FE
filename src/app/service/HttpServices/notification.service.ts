import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { UserNotificationService } from '../DataServices/userNotification.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private userNotificationService:UserNotificationService) {}
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
  getNotificationCount(userID: string | null): void {
    if (userID !== null) {
      this.http.get<any>(`${this.Base_URL}?userId=${userID}&sortDirection=desc&pageNumber=1&pageSize=100`)
        .pipe(
          map((data: any) => data.totalCount)
        )
        .subscribe(count => {
          this.userNotificationService.setNotificationCount(count);
        });
    } else {      
      this.userNotificationService.setNotificationCount(0);
    }
  }
}
