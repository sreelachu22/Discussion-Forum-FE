import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface ThreadReplies {
  replyID: number;
  threadID: number;
  parentReplyID: number | string;
  content: string;
  upvoteCount: number;
  downvoteCount: number;
  isDeleted: boolean;
  createdBy: string;
  createdUserName: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  threadOwnerEmail: string;
  nestedReplies?: ThreadReplies[];
  childReplyCount: number;
}
@Injectable({
  providedIn: 'root',
})
export class ThreadRepliesService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;

  BASE_URL = this.apiurl + 'Reply';

  getRepliesOfThread(
    ThreadId: number,
    ParentReplyId: number | string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    const url = `${this.BASE_URL}/getAllNestedRepliesOfaPost/${ThreadId}/${ParentReplyId}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }

  getReplyByID(ReplyID: number): Observable<any> {
    const url = `${this.BASE_URL}/${ReplyID}`;
    return this.http.get<any>(url);
  }

  deleteReply(ReplyID: number, ModifyingUser: string) {
    const url = `${this.BASE_URL}/${ReplyID}?modifierId=${ModifyingUser}`;
    return this.http.delete(url);
  }

  editReply(
    replyID: number,
    modifierID: string,
    content: any
  ): Observable<any> {
    const url = `${this.BASE_URL}/${replyID}?modifierId=${modifierID}`;
    return this.http.put(url, JSON.stringify(content), {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    });
  }

  getReplyByParentID(
    threadID: number,
    ParentReplyID: number | string
  ): Observable<ThreadReplies> {
    let url = '';
    if (ParentReplyID == '') {
      url = `${this.BASE_URL}/GetRepliesByParentReplyId/${threadID}`;
    } else {
      //https://localhost:7160/api/Reply/GetRepliesByParentReplyId/65?parentReplyID=51
      url = `${this.BASE_URL}/GetRepliesByParentReplyId/${threadID}?parentReplyID=${ParentReplyID}`;
    }
    return this.http.get<ThreadReplies>(url);
  }

  markReplyAsBestAnswer(
    replyId: number,
    creatorId: string | null
  ): Observable<any> {
    const url = `${this.BASE_URL}/MarkAsBestAnswer/${replyId}?createdBy=${creatorId}`;
    return this.http.post(url, null);
  }

  getBestAnswer(threadId: number): Observable<number> {
    const url = `${this.BASE_URL}/GetBestAnswer/${threadId}`;
    return this.http.get<number>(url);
  }

  unmarkReplyAsBestAnswer(
    replyId: number,
    modifierId: string | null
  ): Observable<any> {
    const url = `${this.BASE_URL}/UnmarkBestAnswer/${replyId}?modifiedBy=${modifierId}`;
    return this.http.post(url, null);
  }
}
