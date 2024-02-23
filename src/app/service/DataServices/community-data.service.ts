// category-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityDataService {
  private communityIDSubject = new BehaviorSubject<number>(0);

  communityID$ = this.communityIDSubject.asObservable();

  setCommunityData(communityID: number): void {
    this.communityIDSubject.next(communityID);
  }
}
