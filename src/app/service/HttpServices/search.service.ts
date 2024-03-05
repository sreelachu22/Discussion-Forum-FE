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
      term[0] == '#'
        ? this.apiurl +
          `Thread/SearchThreadsByTags?searchTerm=${encodeURIComponent(term)}`
        : this.apiurl +
          `Thread/SearchThreadsByTitle?searchTerm=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    return this.http.get(url);
  }

  searchReplies(term: string): Observable<any> {
    return this.http.get(
      this.apiurl + `Reply/SearchReplies?searchTerm=${term}`
    );
  }

  displaySearchedThreads(
    term: string,
    pageNumber: number,
    pageSize: number,
    filterOption: number,
    sortOption: number
  ): Observable<any> {
    const url =
      this.apiurl +
      `Thread/displaySearchedThreads?searchTerm=${encodeURIComponent(
        term
      )}&pageNumber=${pageNumber}&pageSize=${pageSize}&filterOption=${filterOption}&sortOption=${sortOption}`;
    return this.http.get(url);
  }
}
