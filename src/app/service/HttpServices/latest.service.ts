import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LatestService {   
  constructor(private http: HttpClient) {}

  getLatest(communityCategoryID:number,sortType:string, postCount:number): Observable<any> {    
    return this.http.get(`https://localhost:7160/api/Thread/top-threads?CommunityCategoryMappingID=${communityCategoryID}&sortBy=${sortType}&topCount=${postCount}`);
  }
}
