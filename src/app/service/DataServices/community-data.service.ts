// category-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityDataService {
  private communityIDSubject = new BehaviorSubject<number>(1);

  communityID$ = this.communityIDSubject.asObservable();

  setCommunityData(communityID: number): void {
    if (communityID > 0) {
      this.communityIDSubject.next(communityID);
    }
  }
}
