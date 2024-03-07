import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadContentService {
  private contentSubject = new BehaviorSubject<{ title: string, content: string }>({ title: '', content: '' });

  constructor() { }

  setContent(title: string, content: string) {
    this.contentSubject.next({ title, content });
  }

  getContent() {
    return this.contentSubject.asObservable();
  }
}
