import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Vote{    
    userID: string;
    replyID: number;
    isUpVote: boolean;
    isDeleted: boolean;    
}

@Injectable({
  providedIn: 'root'
})  

export class VoteService {  
    URL = 'https://localhost:7160/api/ReplyVote/vote'; // Replace with your actual API endpoint
    constructor(private http: HttpClient) {}
    sendVote(voteData: Vote): Observable<Vote> {
      console.log("Vote Data:", voteData); // Log to check if data is correct
      return this.http.post<any>(`${this.URL}`, voteData);
    }
}
