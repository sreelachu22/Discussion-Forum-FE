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
  modifiedAt:string;
  threadOwnerEmail:string;
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

  deleteReply(ReplyID:number, ModifyingUser:string){    
    const url = `${this.BASE_URL}/${ReplyID}?modifierId=${ModifyingUser}`
    return this.http.delete(url);
    }

    editReply(replyID: number, modifierID: string, content: any): Observable<any> {
      //https://localhost:7160/api/Reply/126?modifierId=150F06A6-1B0D-43DC-A8BD-2378697E3782
      const url = `${this.BASE_URL}/${replyID}?modifierId=${modifierID}`;
      return this.http.put(url, JSON.stringify(content), {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });
}
}
