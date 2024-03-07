import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplyContentService {
  private contentSubject = new BehaviorSubject<string>('');

  constructor() { }

  setContent(content: string) {
    this.contentSubject.next(content);
  }

  getContent() {
    return this.contentSubject.asObservable();
  }
}
