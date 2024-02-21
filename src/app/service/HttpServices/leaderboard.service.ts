import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

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
  apiurl: string = environment.apiUrl;

  getTopUsers(limit: number): Observable<any> {
    return this.http.get(this.apiurl + `users/TopUsersByScore/${limit}`);
  }
}
