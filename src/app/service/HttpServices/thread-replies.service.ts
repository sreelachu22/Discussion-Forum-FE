import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ThreadReplies {
  replyID: number;
  threadID: number;
  parentReplyID: number | null;
  content: string;
  nestedReplies?: ThreadReplies[];
}
@Injectable({
  providedIn: 'root',
})
export class ThreadRepliesService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://localhost:7160/api/Reply';

  getRepliesOfThread(
    ThreadId: number,
    ParentReplyId: number | null,
    page: number,
    pageSize: number
  ): Observable<any> {
    const url = `${this.BASE_URL}/getAllNestedRepliesOfaPost/${ThreadId}?page=1&pageSize=10`;
    return this.http.get<any>(url);
  }

  getReplyByID(ReplyID: number): Observable<any> {
    const url = `${this.BASE_URL}/${ReplyID}`;
    return this.http.get<any>(url);
  }
}
