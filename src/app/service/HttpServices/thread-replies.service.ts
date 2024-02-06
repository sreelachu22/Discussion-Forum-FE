import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ThreadReplies {
  replyID: number;
  threadID: number;
  parentReplyID: number | string;
  content: string;
  upvoteCount: number;
  downvoteCount: number;
  isDeleted:boolean;
  createdBy:string;
  createdUserName:string;
  createdAt:string;
  modifiedBy:string;
  modifiedAt:string
  nestedReplies?: ThreadReplies[];
}
@Injectable({
  providedIn: 'root',
})
export class ThreadRepliesService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://localhost:7160/api/Reply';
  // BASE_URL = 'https://localhost:7160/api/Reply/getAllNestedRepliesOfaPost';

  getRepliesOfThread(
    ThreadId: number,
    ParentReplyId: number | string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any> {    
    const url = `${this.BASE_URL}/getAllNestedRepliesOfaPost/${ThreadId}/${ParentReplyId}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getReplyByID(ReplyID: number): Observable<any> {
    const url = `${this.BASE_URL}/${ReplyID}`;
    return this.http.get<any>(url);
  }
  
}
