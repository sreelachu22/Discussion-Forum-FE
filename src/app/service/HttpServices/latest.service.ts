import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LatestService {
  constructor(private http: HttpClient) {}

  apiUrl: string = environment.apiUrl;

  getLatest(
    communityCategoryID: number,
    sortType: string,
    postCount: number
  ): Observable<any> {
    return this.http.get(
      this.apiUrl +
        `Thread/top-threads?CommunityCategoryMappingID=${communityCategoryID}&sortBy=${sortType}&topCount=${postCount}`
    );
  }
}
