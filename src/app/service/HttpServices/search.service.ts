import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  constructor(private http: HttpClient) {}
  apiurl: string = environment.apiUrl;
  searchThreads(
    term: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const url =
      this.apiurl +
      `Thread/SearchThreads?searchTerm=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  searchReplies(term: string): Observable<any> {
    return this.http.get(
      this.apiurl + `Reply/SearchReplies?searchTerm=${term}`
    );
  }
}
