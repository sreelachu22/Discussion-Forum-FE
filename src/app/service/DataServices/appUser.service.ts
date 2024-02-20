import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  private AppuserIDSubject = new BehaviorSubject<string>('');

  AppuserID$ = this.AppuserIDSubject.asObservable();

  setUserData(userID: string): void {
    this.AppuserIDSubject.next(userID);
  }
}
