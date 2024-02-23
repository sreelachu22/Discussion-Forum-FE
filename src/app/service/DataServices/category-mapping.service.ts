// category-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryMappingService {
  private communityCategoryMappingIDSubject = new BehaviorSubject<number>(0);

  communityCategoryMappingID$ =
    this.communityCategoryMappingIDSubject.asObservable();

  setcategoryMappingIDData(communityCategoryMappingID: number): void {
    this.communityCategoryMappingIDSubject.next(communityCategoryMappingID);
  }
}
