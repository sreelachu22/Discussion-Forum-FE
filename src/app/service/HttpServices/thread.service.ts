import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  constructor(private http: HttpClient) {}
  BASE_URL =
    'https://localhost:7160/api/Thread?CommunityCategoryMappingID=1&pageNumber=1&pageSize=1';
  getThread(
    CommunityCategoryMappingID: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/Thread?CommunityCategoryMappingID=${CommunityCategoryMappingID}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      // `https://localhost:7160/api/Thread?CommunityCategoryMappingID=${CommunityCategoryMappingID}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getClosedThread(
    CommunityID: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    console.log('hello api ');
    return this.http.get(
      `https://localhost:7160/api/Thread/ClosedThreads?CommunityID=${CommunityID}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  singleThreadURL = 'https://localhost:7160/api/Thread';

  getSingleThread(threadID: number): Observable<any> {
    return this.http.get(`${this.singleThreadURL}/${threadID}`);
  }

  closeThread(threadID: number, modifierId: string): Observable<any> {
    const apiUrl = `${this.singleThreadURL}/CloseThread/${threadID}?ModifierId=${modifierId}`;
    console.log(apiUrl);
    return this.http.put(apiUrl, null);
  }
}
