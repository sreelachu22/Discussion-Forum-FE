// category-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryModalService {
  private communityCategoryMappingIDSubject = new BehaviorSubject<number>(0);
  private descriptionSubject = new BehaviorSubject<string>('');

  communityCategoryMappingID$ =
    this.communityCategoryMappingIDSubject.asObservable();
  description$ = this.descriptionSubject.asObservable();

  setCategoryData(
    communityCategoryMappingID: number,
    description: string
  ): void {
    this.communityCategoryMappingIDSubject.next(communityCategoryMappingID);
    this.descriptionSubject.next(description);
  }
}
