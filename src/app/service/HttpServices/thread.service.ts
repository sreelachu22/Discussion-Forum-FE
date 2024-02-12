import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Thread {
  threadID: number;
  communityCategoryMappingID: number;
  title: string;
  content: string;
  threadStatusID: number;
  isAnswered: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdAt: string;
  modifiedBy: Date;
  modifiedAt: Date;
  communityCategoryMapping: any;
  threadStatus: any;
  createdByUser: any;
  modifiedByUser: any;
  threadVotes: any;
}

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://localhost:7160/api/Thread?CommunityCategoryMappingID=1&pageNumber=1&pageSize=1';
  getThread(
    CommunityCategoryMappingID: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    console.log('hello api ');
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

  getSingleThread(threadID:number):Observable<Thread>{
    const singleThreadURL = 'https://localhost:7160/api/Thread'
    return this.http.get<Thread>(`${singleThreadURL}/${threadID}`)
  }
}
