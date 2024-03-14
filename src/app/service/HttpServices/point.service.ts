import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Score } from 'src/app/features/community_head/score-management/score-management.component';

@Injectable({
  providedIn: 'root',
})
export class PointService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  updatePoints(communityID: number, updatedPoints: any): Observable<any> {
    const apiUrl = `${this.baseUrl}Point/${communityID}`;
    return this.http.put(apiUrl, updatedPoints);
  }

  getPoints(communityID: number): Observable<any> {
    const apiUrl = `${this.baseUrl}Point/${communityID}`;
    return this.http.get(apiUrl);
  }
}
