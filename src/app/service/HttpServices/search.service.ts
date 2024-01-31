import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`https://localhost:7160/api/CommunityCategory`);
  }

  searchResult(term: string): Observable<any> {
    return this.http.get(
      `https://localhost:7160/api/Thread/SearchThreads?searchTerm=${term}`
    );
  }
}