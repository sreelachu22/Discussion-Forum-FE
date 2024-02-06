import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  constructor(private http: HttpClient) {}

  getCommunities(): Observable<any> {
    return this.http.get(`https://localhost:7160/api/Community`);
  }
}
