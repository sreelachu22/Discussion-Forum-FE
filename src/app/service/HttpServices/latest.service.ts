import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LatestService {
    //communityCategoryID!:number;
    //sortType!:string;
    //postCount!:number;
  constructor(private http: HttpClient) {}

  getLatest(communityCategoryID:number,sortType:string, postCount:number): Observable<any> {
    //https://localhost:7160/api/Thread/top-threads?CommunityCategoryMappingID=1&sortBy=createdat&topCount=10
    return this.http.get(`https://localhost:7160/api/Thread/top-threads?CommunityCategoryMappingID=${communityCategoryID}&sortBy=${sortType}&topCount=${postCount}`);
  }
}
