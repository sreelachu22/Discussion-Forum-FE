import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TopUsers {
  userID: string;
  name: string;
  email: string;
  score: number;
  departmentName: string | null;
  designationName: string | null;
  roleName: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private http: HttpClient) {}

  getTopUsers(limit: number): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/users/TopUsersByScore/${limit}`
    );
  }
}
