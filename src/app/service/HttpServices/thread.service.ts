import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  constructor(private http: HttpClient) {}

  getThread(
    CommunityCategoryMappingID: number,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    console.log('hello api ');
    return this.http.get(
      `https://localhost:7160/api/Thread?CommunityCategoryMappingID=${CommunityCategoryMappingID}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
