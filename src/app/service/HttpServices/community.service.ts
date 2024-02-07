import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CommunityDetails{
  communityId : number;
  communityName : string;
  communityStatusName : string;
  createdBy : string;
  createdAt : Date;
  modifiedBy : string | null;
  modifiedAt : Date | null;
  categoryCount : number | null;
  postCount : number | null;
  topCategories : string [] | null;
}
@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://localhost:7160/api/Community'

  getAllCommunities(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }

  getACommunity(id: number): Observable<CommunityDetails> {
    return this.http.get<CommunityDetails>(`${this.BASE_URL}/${id}`);
  }
}
