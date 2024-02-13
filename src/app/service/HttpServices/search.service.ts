import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  constructor(private http: HttpClient) {}

  searchThreads(
    term: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const url = `https://localhost:7160/api/Thread/SearchThreads?searchTerm=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  searchReplies(term: string): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/Reply/SearchReplies?searchTerm=${term}`
    );
  }
}
