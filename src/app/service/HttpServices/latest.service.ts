import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LatestService {
  //communityCategoryID!:number;
  //sortType!:string;
  //postCount!:number;
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;

  getLatest(
    communityCategoryID: number,
    sortType: string,
    postCount: number
  ): Observable<any> {
    return this.http.get(
      this.apiurl +
        `Thread/top-threads?CommunityCategoryMappingID=${communityCategoryID}&sortBy=${sortType}&topCount=${postCount}`
    );
  }
}
