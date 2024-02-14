import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface Vote {
  userID: string | null;
  replyID: number;
  isUpVote: boolean;
  isDeleted: boolean;
}

export interface ThreadVote {
  userID: string | null;
  threadID: number;
  isUpVote: boolean;
  isDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  apiurl: string = environment.apiUrl;
  URL = this.apiurl + 'ReplyVote/vote'; // Replace with your actual API endpoint
  constructor(private http: HttpClient) {}
  sendVote(voteData: Vote): Observable<Vote> {
    console.log('Vote Data:', voteData); // Log to check if data is correct
    return this.http.post<any>(`${this.URL}`, voteData);
  }

  sendThreadVote(voteData: ThreadVote): Observable<ThreadVote> {
    console.log('Vote Data:', voteData); // Log to check if data is correct
    return this.http.post<any>(this.apiurl + 'ThreadVote/vote', voteData);
  }
}
