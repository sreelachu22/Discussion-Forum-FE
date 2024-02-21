import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationService {
    private notificationCountSubject = new BehaviorSubject<number>(0);

    notificationCount$ = this.notificationCountSubject.asObservable();

    setNotificationCount(count: number): void {
        this.notificationCountSubject.next(count);
    }
}