import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface Thread {
  threadID: number;
  title: string;
  content: string;
  createdBy: string;
  createdByUser: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedByUser: string;
  modifiedAt: Date;
  threadStatusName: string;
  isAnswered: boolean;
  upVoteCount: number;
  downVoteCount: number;
  tagNames: string[];
  threadOwnerEmail: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  BASE_URL =
    this.apiurl + 'Thread?CommunityCategoryMappingID=1&pageNumber=1&pageSize=1';
  getThread(
    CommunityCategoryMappingID: number,
    pageNumber: number,
    pageSize: number,
    filterOption: number,
    sortOption: number
  ): Observable<any> {
    return this.http.get(
      this.apiurl +
        `Thread?CommunityCategoryMappingID=${CommunityCategoryMappingID}&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}`
    );
  }

  getClosedThread(
    CommunityID: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      this.apiurl +
        `Thread/ClosedThreads?CommunityID=${CommunityID}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  singleThreadURL = this.apiurl + 'Thread';

  getSingleThread(threadID: number): Observable<any> {
    return this.http.get(`${this.singleThreadURL}/${threadID}`);
  }

  closeThread(threadID: number, modifierId: string): Observable<any> {
    const apiUrl = `${this.singleThreadURL}/CloseThread/${threadID}?ModifierId=${modifierId}`;
    return this.http.put(apiUrl, null);
  }

  reopenThread(threadID: number, modifierId: string): Observable<any> {
    const apiUrl = `${this.singleThreadURL}/ReopenThread/${threadID}?ModifierId=${modifierId}`;
    return this.http.put(apiUrl, null);
  }

  deleteThread(threadID: number, modifierId: string): Observable<any> {
    const apiUrl = `${this.singleThreadURL}/${threadID}?ModifierId=${modifierId}`;
    return this.http.delete(apiUrl);
  }

  getMyThreads(
    userID: string | null,
    pageNumber: number,
    pageSize: number,
    filterOption: number,
    sortOption: number
  ): Observable<any> {
    return this.http.get(
      this.apiurl +
        `Thread/MyThreads?userId=${userID}&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}`
    );
  }
}
