import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleUserService {
  private userIDSubject = new BehaviorSubject<string>('');

  userID$ = this.userIDSubject.asObservable();

  setUserData(userID: string): void {
    this.userIDSubject.next(userID);
  }
}
